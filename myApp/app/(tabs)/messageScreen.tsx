import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getGeminiResponse } from '@/APIS/googleAI';
import { useLocalSearchParams } from 'expo-router';

export default function ChatBox() {
  const params = useLocalSearchParams();
  const initialRestaurant = JSON.parse(params.restaurant as string);
  const initialUserMessage = params.userMessage as string | undefined;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{from: 'user' | 'Mr.Tasty', text: string}[]>(
    initialUserMessage ? [{ from: 'user', text: initialUserMessage }] : []
  );
  const [loading, setLoading] = useState(false);
  const [restaurant] = useState(initialRestaurant);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (initialUserMessage) {
      handleBotReply(initialUserMessage);
    }
  }, []);

  const handleBotReply = async (userMsg: string) => {
    setLoading(true);
    try {
      const prompt = `
You are a charming, witty assistant who’s trying to convince someone to go to a restaurant. Here's the info:

Name: ${restaurant.name}
Location: ${restaurant.location || ''}
Price: ${restaurant.price || ''}

Write a short, flirty, and persuasive message that makes the user want to go tonight.
Keep it under 50 words and use fun, casual language and base it on the food of the restaurant.

User's message: ${userMsg}
      `.trim();

      const response = await getGeminiResponse(prompt);
      const botReply = response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      setMessages(msgs => [...msgs, { from: 'Mr.Tasty', text: botReply }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { from: 'Mr.Tasty', text: 'Error getting response.' }]);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    await handleBotReply(input);
    setInput('');
  };

  if (minimized) {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => setMinimized(false)}>
          <Text style={styles.cardTitle}>{restaurant.name}</Text>
          <Text style={styles.cardLocation}>{restaurant.location || 'No location'}</Text>
          <Text style={styles.cardHint}>(Tap to open chat)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages} contentContainerStyle={{padding: 10}}>
        {messages.map((msg, idx) => (
          <Text key={idx} style={msg.from === 'user' ? styles.user : styles.bot}>
            {msg.from === 'user' ? 'You: ' : 'Mr.Tasty: '}
            {msg.text}
          </Text>
        ))}
        {loading && (
          <View style={styles.botThinkingBubble}>
            <Text style={{ color: '#888' }}>Mr.Tasty is thinking...</Text>
          </View>
        )}
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
        <Button title="Minimize" onPress={() => setMinimized(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  botThinkingBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
    marginVertical: 2,
    padding: 8,
    borderRadius: 8,
    opacity: 0.7,
  },
  messages: { flex: 1 },
  user: { alignSelf: 'flex-end', backgroundColor: '#e0e0e0', marginVertical: 2, padding: 8, borderRadius: 8 },
  bot: { alignSelf: 'flex-start', backgroundColor: '#f5f5f5', marginVertical: 2, padding: 8, borderRadius: 8 },
  inputRow: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#eee' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginRight: 8 },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 3,
    width: '80%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cardHint: {
    fontSize: 12,
    color: '#aaa',
  },
});