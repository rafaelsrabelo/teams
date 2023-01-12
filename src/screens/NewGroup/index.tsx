import { useState } from "react";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";
export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate('players', { group });
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Novo time" description="Crie o time para adicionar os jogadores" />
        <Input
          placeholder="Nome do time"
          style={{ marginBottom: 20 }}
          onChangeText={setGroup}
        />
        <Button
          onPress={handleNew}
          title="Criar"
        />
      </Content>
    </Container>
  )
}