import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ExploreScreen() {
  // Track bookmarks per card
  const [bookmarkedNearby, setBookmarkedNearby] = useState([false, false, false, false, false]);
  const [bookmarkedOpenNow, setBookmarkedOpenNow] = useState([false, false, false, false]);

  const toggleBookmark = (index: number, type: 'nearby' | 'open') => {
    if (type === 'nearby') {
      const updated = [...bookmarkedNearby];
      updated[index] = !updated[index];
      setBookmarkedNearby(updated);
    } else {
      const updated = [...bookmarkedOpenNow];
      updated[index] = !updated[index];
      setBookmarkedOpenNow(updated);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Verified Card */}
        <View style={styles.card}>
          <Image source={require('@/assets/images/finallogo.png')} style={styles.logo} />

          <View style={styles.bannerContainer}>
            <Image source={require('@/assets/images/verifiedimg.png')} style={styles.bannerImage} />
            <View style={styles.bannerDarkOverlay} />
            <Image source={require('@/assets/images/verification.png')} style={styles.verificationBadge} />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>Verified</Text>
              <Text style={styles.bannerSubtitle}>See Only Verified Restaurants</Text>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>TRY NOW</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Welcome to Explore</Text>
        <Text style={styles.subTitle}>My Vibe...</Text>

        {/* Vibe Cards */}
        <View style={styles.vibeRow}>
          <View style={styles.vibeCard}>
            <Image source={require('@/assets/images/mangia.png')} style={styles.vibeImage} />
            <View style={styles.vibeDarkOverlay} />
            <Text style={styles.vibeText}>Hidden Gems</Text>
          </View>

          <View style={styles.vibeCard}>
            <Image source={require('@/assets/images/nightowlimg.png')} style={styles.vibeImage} />
            <View style={styles.vibeDarkOverlay} />
            <Text style={styles.vibeText}>Late Night Bites</Text>
          </View>
        </View>

        {/* Nearby Section */}
        <View style={{ marginTop: 10 }}>
          <Text style={styles.sectionTitle}>Nearby</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <View style={styles.blankCard} key={idx}>
                <View style={styles.blankImage}>
                  <View style={styles.blankOverlay} />
                  <TouchableOpacity
                    style={styles.bookmarkWrapper}
                    onPress={() => toggleBookmark(idx, 'nearby')}
                  >
                    <Image
                      source={
                        bookmarkedNearby[idx]
                          ? require('@/assets/images/bookmark.png')
                          : require('@/assets/images/unfillbookmark.png')
                      }
                      style={styles.bookmarkIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.cardTextTitle}>Name Here</Text>
                  <Text style={styles.cardTextStatus}>● 5 miles away</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Open Now Section */}
        <View style={{ marginTop: 28 }}>
          <Text style={styles.sectionTitle}>Open Now</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {[1, 2, 3, 4].map((_, idx) => (
              <View style={styles.blankCard} key={idx}>
                <View style={styles.blankImage}>
                  <View style={styles.blankOverlay} />
                  <TouchableOpacity
                    style={styles.bookmarkWrapper}
                    onPress={() => toggleBookmark(idx, 'open')}
                  >
                    <Image
                      source={
                        bookmarkedOpenNow[idx]
                          ? require('@/assets/images/bookmark.png')
                          : require('@/assets/images/unfillbookmark.png')
                      }
                      style={styles.bookmarkIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.cardTextTitle}>Name Here</Text>
                  <Text style={styles.cardTextStatus}>● Open until 10:00pm</Text>
                </View>
              </View>
            ))}
          </ScrollView>
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
    paddingBottom: 32,
    paddingTop: screenHeight * 0.03,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 1,
    marginBottom: screenHeight * 0.05,
  },
  logo: {
    width: screenWidth * 0.45,
    height: 55,
    resizeMode: 'contain',
    marginBottom: 1,
  },
  bannerContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
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
  verificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    resizeMode: 'contain',
    zIndex: 10,
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
    paddingHorizontal: 20,
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
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  subTitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  vibeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 32,
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
    height: screenHeight * 0.30,
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
  horizontalScroll: {
    marginTop: 12,
  },
  blankCard: { 
    width: 150,
    height: 200,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#eee',
    position: 'relative',
  },
  blankImage: {
    flex: 1,
    backgroundColor: '#ddd',
    borderRadius: 16,
    position: 'relative',
    justifyContent: 'flex-end',
    padding: 12,
  },
  blankOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
  },
  bookmarkWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
  },
  bookmarkIcon: {
    width: 28,
    height: 28,
  },
  cardTextTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cardTextStatus: {
    fontSize: 12,
    color: '#fff',
  },
});
