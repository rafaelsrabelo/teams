import { useState } from "react";
import { FlatList } from "react-native";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container } from "./styles";

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da Rocket'])
  return (
    <Container>
      <Header />
      <Highlight title="Monte seu Racha" description="Separe os times e veja quem vai ser o campeão" />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard title={item} />
        )}
      />
      
    </Container>
  )
}

