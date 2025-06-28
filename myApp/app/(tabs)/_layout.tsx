import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            
            position: 'absolute',
          },
          default: {},
        }),
      }}>

      <Tabs.Screen
        name="mainPage"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Image
          source={
          focused
            ? require('@/assets/images/redBanner.png')
            : require('@/assets/images/banner1.png')
        }
        style={{
          width: 28,
          height: 28,
          resizeMode: 'contain',
        }}
      />
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Image
          source={
          focused
            ? require('@/assets/images/purpleExplore2.png')
            : require('@/assets/images/grayExplore2.png')
        }
        style={{
          width: 28,
          height: 28,
          resizeMode: 'contain',
        }}
      />
        }}
      />

      <Tabs.Screen
        name="messageScreen"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Image
          source={
          focused
            ? require('@/assets/images/blueChat3.png')
            : require('@/assets/images/chat2.png')
        }
        style={{
          width: 28,
          height: 28,
          resizeMode: 'contain',
        }}
      />
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Image
          source={
          focused
            ? require('@/assets/images/profile1.png')
            : require('@/assets/images/profile.png')
        }
        style={{
          width: 28,
          height: 28,
          resizeMode: 'contain',
        }}
      />
        }}
      />

      <Tabs.Screen
        name="savedPage"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Image
          source={
          focused
            ? require('@/assets/images/redBookmark.png')
            : require('@/assets/images/bookmarkIcon1.png')
        }
        style={{
          width: 28,
          height: 28,
          resizeMode: 'contain',
        }}
      />
        }}
      />

    </Tabs>
  );
}
