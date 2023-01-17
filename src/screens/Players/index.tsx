//  react
import { useState, useEffect, useRef } from "react";
import { useFocusEffect, useRoute, useNavigation } from "@react-navigation/native";
import { FlatList, Alert, TextInput } from "react-native";
// Components
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
// Style
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroup } from "@storage/player/playerGetByGroup";
import { playertsGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";
type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (player.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informa o nome do jogador!')
    }

    const newPlayer = {
      name: player,
      team,
    }
    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setPlayer('');
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Não foi possível adicionar o jogador!')
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playertsGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possível remover')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Remover grupo', 'Não foi possível')
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Você tem certeza?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove()}
      ]
    )

  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])
  
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        description="adicione os jogadores e separe os times"
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do atleta"
          autoCorrect={false}
          value={player}
          onChangeText={setPlayer}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
                <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do atleta"
          autoCorrect={false}
          value={player}
          onChangeText={setPlayer}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>
      <HeaderList>
      <FlatList 
          data={['Time A', 'Time B','Time C','Time D']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
            )}
          horizontal
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      {
        isLoading ? <Loading /> : 
      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{paddingBottom: 100}, players.length === 0 && { flex: 1}]}
        ListEmptyComponent={() => (
          <ListEmpty message="Não existem jogadores nesse time" />
        )}
        />
      }
      <Button title="Remover todos os times" type="SECONDARY" onPress={handleGroupRemove} />
    </Container>
  )
}