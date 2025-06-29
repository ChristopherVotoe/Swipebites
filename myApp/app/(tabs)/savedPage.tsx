import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useSaved } from '../context/SavedContext';

export default function SavedPage() {
  const { savedRestaurants } = useSaved();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Saved Restaurants</Text>
      {savedRestaurants.length === 0 ? (
        <Text style={styles.empty}>You haven't saved any restaurants yet.</Text>
      ) : (
        savedRestaurants.map((restaurant) => (
          <View key={restaurant.id} style={styles.card}>
            <Image source={{ uri: restaurant.image }} style={styles.image} />
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.location}>{restaurant.location}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 16,
  },
  empty: {
    fontSize: 16,
    color: 'gray',
  },
  card: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 8,
  },
  location: {
    fontSize: 14,
    marginHorizontal: 8,
    marginBottom: 8,
    color: 'gray',
  },
});
