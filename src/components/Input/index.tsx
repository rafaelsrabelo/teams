import { Container } from "./styles";
import { TextInputProps, TextInput } from 'react-native';
import { useTheme } from "styled-components";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
}

export function Input({ inputRef, ...rest }: Props) {
  const theme = useTheme()
  return (
    <Container
      ref={inputRef}
      {...rest}
      placeholderTextColor={theme.COLORS.GRAY_300}
    />
  )
}