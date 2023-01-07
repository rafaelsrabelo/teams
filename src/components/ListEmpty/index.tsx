import { Image } from "react-native";
import { Container, Message, ImageSoccer } from "./styles";
import soccer from '@assets/soccer.png';


type Props = {
  message: string;
}

export function ListEmpty({ message }: Props) {
  return (
    <Container>
      {/* <ImageSoccer source={soccer} /> */}
      <Message>
        {message}
      </Message>
    </Container>
  )
}