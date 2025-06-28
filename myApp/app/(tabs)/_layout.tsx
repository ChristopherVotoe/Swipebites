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
            : require('@/assets/images/banner.png')
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
        name="index"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: () => (<Image
          source={require('@/assets/images/transparent.png')} // a 1x1 transparent PNG
          style={{ width: 0, height: 0 }}
          />
          )
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
            ? require('@/assets/images/purpleExplore.png')
            : require('@/assets/images/grayExplore.png')
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
        name="messages"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Image
          source={
          focused
            ? require('@/assets/images/blueChat.png')
            : require('@/assets/images/chat.png')
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
