import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';

// Get screen width/height
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Verified Card */}
        <View style={styles.card}>
          {/* LOGO IMAGE */}
          <Image
            source={require('@/assets/images/sb.png')}
            style={styles.logo}
          />

          {/* BANNER IMAGE */}
          <View style={styles.bannerContainer}>
            <Image 
              source={require('@/assets/images/verifiedimg.png')} 
              style={styles.bannerImage} 
            />
            <View style={styles.bannerDarkOverlay} />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>Verified</Text>
              <Text style={styles.bannerSubtitle}>See Only Verified Restaurants</Text>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>TRY NOW</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Section */}
        <Text style={styles.sectionTitle}>Welcome to Explore</Text>
        <Text style={styles.subTitle}>My Vibe...</Text>

        {/* Vibe Cards */}
        <View style={styles.vibeRow}>
          <View style={styles.vibeCard}>
            <Image
              source={require('@/assets/images/mangia.png')}
              style={styles.vibeImage}
            />
            <View style={styles.vibeDarkOverlay} />
            <Text style={styles.vibeText}>Hidden Gems</Text>
          </View>

          <View style={styles.vibeCard}>
            <Image
              source={require('@/assets/images/nightowlimg.png')}
              style={styles.vibeImage}
            />
            <View style={styles.vibeDarkOverlay} />
            <Text style={styles.vibeText}>Late Night Bites</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: screenWidth * 0.04,
    paddingBottom: screenHeight * 0.1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 1,
    marginBottom: screenHeight * 0.04,
  },
  logo: {
    width: screenWidth * 0.35,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  bannerContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  
    // Apple-style depth (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  
    // Android depth
    elevation: 10,
  },
  bannerImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#FFBBAA',
    borderRadius: 16,
  },
  bannerDarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 4,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'thin',
    marginBottom: 4,
    color: '#000',
  },
  subTitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
  },
  vibeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  vibeCard: {
    width: '48%',
    position: 'relative',
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  vibeImage: {
    width: '100%',
    height: screenHeight * 0.25,
    resizeMode: 'cover',
  },
  vibeDarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  vibeText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
