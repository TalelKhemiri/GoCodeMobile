import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* La Stack gère la navigation. 
        headerShown: false cache la barre grise par défaut en haut.
      */}
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* On déclare ton écran d'accueil */}
        <Stack.Screen name="index" />
        
        {/* On déclare les autres dossiers/écrans (optionnel mais propre) */}
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="apropos" />
        
      </Stack>
      
      {/* La barre de statut (batterie, heure) en noir */}
      <StatusBar style="dark" />
    </View>
  );
}