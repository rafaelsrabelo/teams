import { useState } from "react";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation()

  async function handleNew() {
    if (group.trim().length === 0) {
      return Alert.alert('Novo grupo', 'Preencher nome do time!');
    }
    try {
      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message);
      } else {
        Alert.alert('Novo grupo', 'Não foi possível criar grupo!');
        console.log(error)      
      }
    }
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