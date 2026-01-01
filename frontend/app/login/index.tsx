import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, ActivityIndicator, KeyboardAvoidingView, 
  Platform, ScrollView, Dimensions 
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Lock, ArrowRight, CheckSquare, Square } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../api'; 

const { width, height } = Dimensions.get('window');

const COLORS = {
  sky: '#A4D7E1',
  teal: '#7A9B9E',
  white: '#F0F4F8',
  dark: '#2C3E50',
  error: '#EF4444',
};

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Champs requis.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await api.login({ username, password });
      await AsyncStorage.setItem("accessToken", data.access);
      await AsyncStorage.setItem("user", data.username);
      await AsyncStorage.setItem("role", data.role);
      router.replace('/'); 
    } catch (err: any) {
      setError("Identifiants incorrects.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 1. L'IMAGE DE FOND FIXE (Ne bouge pas) */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop' }}
        style={[StyleSheet.absoluteFillObject, { width: width, height: height }]}
        resizeMode="cover"
      />

      {/* 2. LE DÉGRADÉ FIXE (Ne bouge pas) */}
      <LinearGradient 
        colors={['rgba(44, 62, 80, 0.85)', 'rgba(44, 62, 80, 0.7)']} 
        style={[StyleSheet.absoluteFillObject, { width: width, height: height }]}
      />

      {/* 3. LE CONTENU QUI SCROLLE (Par-dessus le fond) */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Bienvenue</Text>
              <Text style={styles.subtitle}>En route vers le succès</Text>
            </View>

            {error ? <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View> : null}

            <View style={styles.inputGroup}>
              <View style={styles.iconWrapper}><User size={18} color={COLORS.dark} /></View>
              <TextInput 
                placeholder="Utilisateur" placeholderTextColor="#666" style={styles.input}
                value={username} onChangeText={setUsername} autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.iconWrapper}><Lock size={18} color={COLORS.dark} /></View>
              <TextInput 
                placeholder="Mot de passe" placeholderTextColor="#666" secureTextEntry style={styles.input}
                value={password} onChangeText={setPassword}
              />
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.rememberMeContainer} onPress={() => setRememberMe(!rememberMe)}>
                {rememberMe ? <CheckSquare size={18} color={COLORS.sky} /> : <Square size={18} color="rgba(255,255,255,0.7)" />}
                <Text style={styles.rememberMeText}>Se souvenir</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Mdp oublié ?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color={COLORS.dark} /> : (
                <><Text style={styles.buttonText}>Connexion</Text><ArrowRight size={18} color={COLORS.dark} style={{ marginLeft: 8 }} /></>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Pas de compte ? </Text>
              <Link href="/register" asChild>
                <TouchableOpacity><Text style={styles.linkText}>Créer un compte</Text></TouchableOpacity>
              </Link>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Plus besoin de styles pour backgroundImage ici car on utilise absoluteFillObject inline
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
  
  card: {
    width: width * 0.9, 
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8,
  },
  
  cardHeader: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.sky, marginBottom: 2 },
  subtitle: { fontSize: 14, color: '#ecf0f1', opacity: 0.9 },
  
  errorContainer: { backgroundColor: 'rgba(239, 68, 68, 0.9)', padding: 10, borderRadius: 8, marginBottom: 15, alignItems: 'center', width: '100%' },
  errorText: { color: '#FFF', fontSize: 13, fontWeight: '600' },

  inputGroup: { position: 'relative', marginBottom: 15, justifyContent: 'center', width: '100%' },
  iconWrapper: { position: 'absolute', left: 5, zIndex: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 255, 255, 0.9)', justifyContent: 'center', alignItems: 'center' },
  input: {
    backgroundColor: 'rgba(240, 244, 248, 0.9)', borderRadius: 25,
    paddingVertical: 10, paddingLeft: 50, paddingRight: 15,
    fontSize: 15, color: COLORS.dark, height: 48,
  },

  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' },
  rememberMeContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rememberMeText: { color: 'rgba(255,255,255,0.9)', fontSize: 13 },
  forgotPasswordText: { color: COLORS.sky, fontWeight: '700', fontSize: 13 },

  button: {
    backgroundColor: COLORS.sky, paddingVertical: 14, borderRadius: 12,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    width: '100%', elevation: 4,
  },
  buttonText: { color: COLORS.dark, fontSize: 16, fontWeight: '800' },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  linkText: { color: COLORS.sky, fontWeight: '700', fontSize: 13, textDecorationLine: 'underline' },
});