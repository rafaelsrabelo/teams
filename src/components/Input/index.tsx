import { Container } from "./styles";
import { TextInputProps } from 'react-native';
import { useTheme } from "styled-components";

export function Input({ ...rest }: TextInputProps) {
  const theme = useTheme()
  return (
    <Container
      {...rest}
      placeholderTextColor={theme.COLORS.GRAY_300}
    />
  )
}