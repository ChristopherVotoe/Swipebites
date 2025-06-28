import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getNearbyRestaurants } from '@/APIS/getRestaurants';
import type { LocationObjectCoords } from 'expo-location';

export default function MockScreen() {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  // Mock location object shaped like LocationObjectCoords
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
    const fetchData = async () => {
      const data = await getNearbyRestaurants(mockCoords);
      setRestaurants(data);
    };

    fetchData();
  }, []);

  return (
    <ThemedView>
      <ThemedText>Nearby Restaurants</ThemedText>
      {restaurants.length > 0 ? (
        restaurants.map((r, index) => (
          <ThemedText key={index}>{r.name}</ThemedText>
        ))
      ) : (
        <ThemedText>Loading...</ThemedText>
      )}
    </ThemedView>
  );
}
