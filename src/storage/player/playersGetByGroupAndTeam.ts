import { playerGetByGroup } from "./playerGetByGroup";

export async function playertsGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playerGetByGroup(group);

    const players = storage.filter(player => player.team === team);

    return players;
  } catch (error) {
    console.log(error);
  }
}