import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet } from 'react-native';
import { getGeminiResponse } from '@/APIS/googleAI';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{from: 'user' | 'Mr.Tasty', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  
  const restaurant = {
    name: "Chilli's",
    price: "$",
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setLoading(true);
    try {
      // Build the prompt using your template and restaurant info
      const prompt = `
You are a charming, witty assistant who’s trying to convince someone to go to a restaurant. Here's the info:

Name: ${restaurant.name}
Price: ${restaurant.price}

Write a short, flirty, and persuasive message that makes the user want to go tonight.
Keep it under 50 words and use fun, casual language and base it on the food of the restaurant. If the user says no, try to convinc them


User's message: ${input}
      `.trim();

      const response = await getGeminiResponse(prompt);
      const botReply = response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      setMessages(msgs => [...msgs, { from: 'Mr.Tasty', text: botReply }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { from: 'Mr.Tasty', text: 'Error getting response.' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages} contentContainerStyle={{padding: 10}}>
        {messages.map((msg, idx) => (
          <Text key={idx} style={msg.from === 'user' ? styles.user : styles.bot}>
            {msg.from === 'user' ? 'You: ' : 'Mr.Tasty: '}
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          editable={!loading}
        />
        <Button title="Send" onPress={sendMessage} disabled={loading || !input.trim()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  messages: { flex: 1 },
  user: { alignSelf: 'flex-end', backgroundColor: '#e0e0e0', marginVertical: 2, padding: 8, borderRadius: 8 },
  bot: { alignSelf: 'flex-start', backgroundColor: '#f5f5f5', marginVertical: 2, padding: 8, borderRadius: 8 },
  inputRow: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#eee' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginRight: 8 },
});