import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { getNearbyRestaurants } from '@/APIS/getRestaurants';
import type { LocationObjectCoords } from 'expo-location';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function SwipeScreen() {
  const [cards, setCards] = useState<any[]>([]);

  const mockCoords: LocationObjectCoords = {
    latitude: 28.6024,
    longitude: -81.2001,
    altitude: null,
    accuracy: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getNearbyRestaurants(mockCoords);
      setCards(data);
    };
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      {cards.length > 0 ? (
        <Swiper
          cards={cards}
          renderCard={(card) => (
            <View style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.image} />
              <Text style={styles.name}>{card.name}</Text>
              <Text style={styles.info}>{card.categories}</Text>
              <Text style={styles.info}>{card.location}</Text>
            </View>
          )}
          backgroundColor={'transparent'}
          stackSize={3}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
        />
      ) : (
        <Text>Loading restaurants...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe5ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: SCREEN_HEIGHT * 0.65,
    width: SCREEN_WIDTH * 0.85,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '60%',
    borderRadius: 15,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#666',
  },
});
