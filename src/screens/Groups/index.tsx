import { StyleSheet, Text, View } from "react-native";
import { useState } from 'react';

export function Groups() {
  const [name, setName] = useState('Rafael Santana Rabelo')
  return (
    <View style={styles.container}>
      <Text>Olá, {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 