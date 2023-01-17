import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';
import { playerGetByGroup } from './playerGetByGroup';

import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await playerGetByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

    if (playerAlreadyExists.length > 0) {
      throw new AppError("Essa pessoa já está cadastrada em um time!");
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`,storage); 
  } catch (error) {
    throw (error)
  }
}