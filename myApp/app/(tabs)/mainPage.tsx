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
      <Image source={require('@/assets/images/finallogo.png')} style={styles.logo} />

      {cards.length > 0 ? (
        <Swiper
          cards={cards}
          renderCard={(card) => (
            <View style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.image} />
              <View style={styles.cardInfo}>
                <Text style={styles.name}>{card.name}</Text>
                <Text style={styles.info}>{card.categories}</Text>
                <Text style={styles.info}>{card.location}</Text>
              </View>
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

      <View style={styles.buttonRow}>
        <Pressable>
          <Image source={require('@/assets/images/xbutton.png')} style={styles.buttonIcon} />
        </Pressable>
        <Pressable>
          <Image source={require('@/assets/images/bmbutton.png')} style={styles.buttonIcon} />
        </Pressable>
        <Pressable>
          <Image source={require('@/assets/images/likebutton.png')} style={styles.buttonIcon} />
        </Pressable>
      </View>

      <Modal visible={showMatch} transparent animationType="fade">
  <View style={styles.fullScreenModal}>
    {matchedRestaurant?.image && (
      <Image
        source={{ uri: matchedRestaurant.image }}
        style={styles.matchBackgroundImage}
        blurRadius={3}
      />
    )}

    <View style={styles.overlayContent}>
      <Text style={styles.matchGradientText}>IT’S A</Text>
      <Text style={styles.matchMainMatch}>MATCH!</Text>


      <View style={styles.messageBox}>
        <Text style={styles.placeholder}>Say something nice</Text>
        <Text style={styles.sendButton}>Send</Text>
      </View>

      <Pressable style={styles.dismissArea} onPress={() => setShowMatch(false)}>
        <Image source={require('@/assets/images/xbutton.png')} style={styles.dismissIcon} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 30,
  },
  logo: {
    width: 180,
    height: 70,
    resizeMode: 'contain',
  },
  card: {
    position: 'absolute',
    top: '2%',
    left: '2.5%',
    backgroundColor: '#fff',
    borderRadius: 20,
    height: SCREEN_HEIGHT * 0.7,
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
    width: '110%',
    height: '88%',
    borderRadius: 4,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    alignItems: 'flex-start',
  },
  info: {
    fontSize: 16,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  buttonIcon: {
    width: 70,
    height: 80,
    resizeMode: 'contain',
  },
  matchModal: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
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
  cardInfo: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    alignItems: 'flex-start',
  },  
  fullScreenModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  matchBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  overlayContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  matchGradientText: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    marginBottom: -5,
  },

  matchMainMatch: {
    fontSize: 70,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    marginBottom: 10,
  },
  
  messageBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 200,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15, // for Android
  },
  
  placeholder: {
    color: '#888',
    fontSize: 16,
    flex: 1,
  },
  
  sendButton: {
    color: '#888',
    fontWeight: '600',
    fontSize: 16,
  },
  
  dismissArea: {
    position: 'absolute',
    top: 50,
    left: 30,
  },
  
  dismissIcon: {
    width: 50,
    height: 50,
  },
  
});