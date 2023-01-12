import { useState } from "react";
import { FlatList } from "react-native";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container } from "./styles";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigatoin = useNavigation();

  function handleNewGroup() {
    navigatoin.navigate('new')
  }

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
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar o primeiro time?" />
        )}
      />
      <Button 
        onPress={handleNewGroup}
        title="Criar nova equipe"
      />
    </Container>
  )
}

