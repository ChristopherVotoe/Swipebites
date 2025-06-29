import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { getGeminiResponse } from '@/APIS/googleAI';
import { useLocalSearchParams } from 'expo-router';

export default function ChatBox() {
  const params = useLocalSearchParams();
  const initialRestaurant = params.restaurant ? JSON.parse(params.restaurant as string) : null;
  const initialUserMessage = params.userMessage as string | undefined;

  if (!initialRestaurant) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>No conversations recorded</Text>
      </View>
    );
  }

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ from: 'user' | 'Mr.Tasty', text: string }[]>(
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

  if (messages.length === 0) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>No conversations recorded</Text>
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
    <SafeAreaView style={styles.safe}>
      <View style={styles.topHeader}>
        <Image source={require('@/assets/images/finallogo.png')} style={styles.topLogo} />
      </View>

      <View style={styles.headerCenter}>
        <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
      </View>

      <View style={styles.separatorLine} />

      <ScrollView style={styles.messages} contentContainerStyle={{ padding: 10 }}>
        {messages.map((msg, idx) => (
          <View key={idx} style={msg.from === 'user' ? styles.userBubbleWrapper : styles.botMessageContainer}>
            {msg.from === 'Mr.Tasty' && (
              <Text style={styles.botName}>{restaurant.name}</Text>
            )}
            <Text style={msg.from === 'user' ? styles.userBubble : styles.botBubble}>
              {msg.text}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={styles.botBubbleWrapper}>
            <Text style={styles.botName}>{restaurant.name}</Text>
            <View style={styles.botThinkingBubble}>
              <Text style={{ color: '#888' }}>Mr.Tasty is thinking...</Text>
            </View>
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
        <TouchableOpacity onPress={() => setMinimized(true)} style={styles.minimizeButton}>
          <Text style={styles.minimizeText}>MINIMIZE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  topLogo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  headerCenter: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%',
    marginBottom: 4,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  messages: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  userBubbleWrapper: {
    alignSelf: 'flex-end',
    marginVertical: 6,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    marginVertical: 6,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  botName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    marginLeft: 4,
  },
  userBubble: {
    backgroundColor: '#f45d48',
    color: '#fff',
    padding: 12,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    fontSize: 15,
  },
  botBubble: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    fontSize: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  botBubbleWrapper: {
    alignSelf: 'flex-start',
    marginVertical: 6,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  botThinkingBubble: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
    opacity: 0.7,
  },
  minimizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f45d48',
    borderRadius: 6,
    marginLeft: 4,
  },
  minimizeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
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
