import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useBookmarks } from '@/APIS/BookmarkContext';

export default function SavedPage() {
  const { bookmarks } = useBookmarks();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Restaurants</Text>
      <FlatList
        data={bookmarks}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No saved restaurants yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '600' },
  location: { fontSize: 14, color: '#666' },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 32 },
});