import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";
export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Novo time" description="Crie o time para adicionar os jogadores" />
        <Input style={{ marginBottom: 20}} />
        <Button
          title="Criar"
        />
      </Content>
    </Container>
  )
}