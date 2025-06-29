import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('@/assets/images/finallogo.png')} style={styles.logo} />

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileRing}>
          <Image source={require('@/assets/images/profilepicture.png')} style={styles.profileImage} />
        </View>
        <View style={styles.completeContainer}>
          <Text style={styles.completeText}>100% COMPLETE</Text>
        </View>
      </View>

      {/* Name + Badge */}
      <View style={styles.nameRow}>
        <Text style={styles.name}>Adrian Vidal, 72</Text>
        <Image source={require('@/assets/images/verification.png')} style={styles.badge} />
      </View>

      {/* Gray Background Area */}
      <View style={styles.bottomSection}>
        <View style={styles.whiteCard}>
          <Image source={require('@/assets/images/fireyuh.png')} style={styles.teamLogo} />

          <Text style={styles.teamName}>Dalyn Ho</Text>
          <Text style={styles.teamRole}>Frontend Developer</Text>

          <Text style={styles.teamName}>Shianne Wood</Text>
          <Text style={styles.teamRole}>Frontend Developer</Text>

          <Text style={styles.teamName}>Vianna Huynh</Text>
          <Text style={styles.teamRole}>Backend Developer</Text>

          <Text style={styles.teamName}>Christopher Votoe</Text>
          <Text style={styles.teamRole}>Backend Developer</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 300,
    height: 60,
    resizeMode: 'contain',
    marginBottom: -10,
    marginTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileRing: {
    width: 160,
    height: 160,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 140,
    height: 140,
  },
  completeContainer: {
    marginTop: -20,
    backgroundColor: '#FF6B2C',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
  },
  completeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    width: 30,
    height: 30,
    marginLeft: 8,
    resizeMode: 'contain',
  },
  bottomSection: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    marginTop: 30,
    paddingVertical: 40,
    alignItems: 'center',

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  
    // Android Elevation
    elevation: 8,
  },
  whiteCard: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    paddingVertical: 30,
    alignItems: 'center',
  
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  
    // Android Elevation
    elevation: 8,
  },
  teamLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  teamName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
  },
  teamRole: {
    fontSize: 14,
    color: '#555',
  },
});
