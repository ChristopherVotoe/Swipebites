import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#DF394F', '#FF951B']} // Red to orange background
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientBackground}
    >
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/banner.png')}
        style={styles.banner}
      />
    </View>
    
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  gradientBackground: {
    flex: 1, // fills entire screen height and width
  },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    position: 'absolute',
    left: 159.77,
    top: 381.71,
    width: 83.49,
    height: 111.29,
  },
});
