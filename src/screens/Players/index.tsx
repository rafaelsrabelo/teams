//  react
import { useState } from "react";
import { FlatList } from "react-native";
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

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState([]);
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome do time"
        description="adicione os jogadores e separe os times"
      />
      <Form>
        <Input
          placeholder="Nome do atleta"
          autoCorrect={false}
        />
        <ButtonIcon icon="add"/>
      </Form>
      <HeaderList>
      <FlatList 
          data={['Time A', 'Time B']}
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
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => {}}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{paddingBottom: 100}, players.length === 0 && { flex: 1}]}
        ListEmptyComponent={() => (
          <ListEmpty message="Não existem jogadores nesse time" />
        )}
      />
      <Button title="Remover Time" type="SECONDARY" />
    </Container>
  )
}