import { useState } from 'react';
import { Container, Title } from "./styles";

export function Groups() {
  const [name, setName] = useState('Rafael Santana Rabelo')
  return (
    <Container>
      <Title>Olá, {name}</Title>
    </Container>
  )
}

