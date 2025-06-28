import { useEffect } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/(tabs)/mainPage'); 
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#DF394F', '#FF951B']}
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
    flex: 1,
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