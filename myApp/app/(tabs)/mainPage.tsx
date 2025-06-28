import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Modal, Pressable } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { getNearbyRestaurants } from '@/APIS/getRestaurants';
import type { LocationObjectCoords } from 'expo-location';
import { useRouter } from 'expo-router';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function SwipeScreen() {
  const [showMatch, setShowMatch] = useState(false);
  const [matchedRestaurant, setMatchedRestaurant] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const router = useRouter();

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
          onSwipedRight={(cardIndex) => {
          const matched = cards[cardIndex];
          setMatchedRestaurant(matched);
          setShowMatch(true);
        }}
        />
      ) : (
        <Text>Loading restaurants...</Text>
      )}

    <Modal
        visible={showMatch}
        transparent
        animationType="fade"
    >
    <View style={styles.modalBackground}>
        <View style={styles.matchModal}>
        <Text style={styles.matchText}>💘 It's a Match!</Text>
        <Text style={styles.matchTextSmall}>
            You matched with {matchedRestaurant?.name}
        </Text>
        <Pressable onPress={() => alert("awesomeness (i dont want to remove this dummy code)")}>
            <Text style={styles.matchButton} onPress={() => {
                setShowMatch(false);    
                router.push('/messages'); 
                }}
                >
                Send a chat
            </Text>
        </Pressable>
        <Pressable onPress={() => setShowMatch(false)}>
            <Text style={styles.dismissButton}>Keep Swiping</Text>
        </Pressable>
        </View>
    </View>
    </Modal>

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
    matchModal: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 10,
    },
    matchText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d6336c',
    marginBottom: 10,
    },
    matchTextSmall: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
    },
    matchButton: {
    fontSize: 18,
    color: '#0077b6',
    marginBottom: 10,
    },
    dismissButton: {
    fontSize: 16,
    color: '#aaa',
    },
    modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    },

});
