import { View, Text, StyleSheet } from 'react-native';

export default function MessageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Chat! 💬</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
