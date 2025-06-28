

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';


export default function MockScreen() {
  return (
    <ThemedView>
      <ThemedText>Mock Screen</ThemedText>
      <ThemedText>Replace this with your content.</ThemedText>
    </ThemedView>
  );
}