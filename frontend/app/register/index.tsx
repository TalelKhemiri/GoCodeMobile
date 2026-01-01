import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, ActivityIndicator, Alert, 
  KeyboardAvoidingView, Platform, ScrollView, Dimensions 
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Mail, ArrowRight, Briefcase, BookOpen, User, Eye, EyeOff } from 'lucide-react-native';

import { api } from '../../api'; 

const { width, height } = Dimensions.get('window');

const COLORS = {
  sky: '#A4D7E1',
  teal: '#7A9B9E',
  white: '#F0F4F8',
  dark: '#2C3E50',
  gray: '#EDEEF1',
};

export default function Register() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    prenom: "", nom: "", email: "", password: "", role: "student"
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.prenom || !formData.nom || !formData.email || !formData.password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      await api.register({
        username: formData.email,
        email: formData.email,
        password: formData.password,
        first_name: formData.prenom,
        last_name: formData.nom,
        role: formData.role
      });
      
      Alert.alert("Succès", "Compte créé avec succès !");
      router.replace('../login');
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 1. IMAGE DE FOND FIXE */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop' }}
        style={[StyleSheet.absoluteFillObject, { width: width, height: height }]}
        resizeMode="cover"
      />

      {/* 2. OVERLAY FIXE */}
      <LinearGradient
        colors={['rgba(44, 62, 80, 0.9)', 'rgba(44, 62, 80, 0.6)']}
        style={[StyleSheet.absoluteFillObject, { width: width, height: height }]}
      />

      {/* 3. CONTENU SCROLLABLE */}
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
              <Text style={styles.title}>Commencez votre route</Text>
              <Text style={styles.subtitle}>Rejoignez la communauté GoCode</Text>
            </View>

            {/* Role Selector */}
            <View style={styles.roleContainer}>
              <TouchableOpacity 
                style={[styles.roleCard, formData.role === 'student' && styles.roleCardActive]}
                onPress={() => setFormData({...formData, role: 'student'})}
              >
                <BookOpen size={24} color={formData.role === 'student' ? '#FFF' : COLORS.sky} />
                <Text style={[styles.roleText, formData.role === 'student' && styles.roleTextActive]}>
                  Étudiant
                </Text>
                <View style={[styles.checkCircle, formData.role === 'student' && styles.checkCircleActive]} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.roleCard, formData.role === 'monitor' && styles.roleCardActive]}
                onPress={() => setFormData({...formData, role: 'monitor'})}
              >
                <Briefcase size={24} color={formData.role === 'monitor' ? '#FFF' : COLORS.sky} />
                <Text style={[styles.roleText, formData.role === 'monitor' && styles.roleTextActive]}>
                  Moniteur
                </Text>
                <View style={[styles.checkCircle, formData.role === 'monitor' && styles.checkCircleActive]} />
              </TouchableOpacity>
            </View>

            {/* Names Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <View style={styles.iconWrapper}><User size={18} color={COLORS.dark} /></View>
                <TextInput 
                  placeholder="Prénom"
                  placeholderTextColor="#666"
                  style={styles.input}
                  value={formData.prenom}
                  onChangeText={(t) => setFormData({...formData, prenom: t})}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <View style={styles.iconWrapper}><User size={18} color={COLORS.dark} /></View>
                <TextInput 
                  placeholder="Nom"
                  placeholderTextColor="#666"
                  style={styles.input}
                  value={formData.nom}
                  onChangeText={(t) => setFormData({...formData, nom: t})}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <View style={styles.iconWrapper}><Mail size={18} color={COLORS.dark} /></View>
              <TextInput 
                placeholder="Email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                value={formData.email}
                onChangeText={(t) => setFormData({...formData, email: t})}
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <View style={styles.iconWrapper}><Lock size={18} color={COLORS.dark} /></View>
              <TextInput 
                placeholder="Mot de passe"
                placeholderTextColor="#666"
                secureTextEntry={!showPassword}
                style={[styles.input, { paddingRight: 50 }]}
                value={formData.password}
                onChangeText={(t) => setFormData({...formData, password: t})}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} color={COLORS.dark} /> : <Eye size={20} color={COLORS.dark} />}
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.dark} />
              ) : (
                <>
                  <Text style={styles.buttonText}>Créer mon compte</Text>
                  <ArrowRight size={20} color={COLORS.dark} style={{ marginLeft: 10 }} />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Vous avez déjà un compte ? </Text>
              <Link href="../login" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Connexion</Text>
                </TouchableOpacity>
              </Link>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  cardHeader: { alignItems: 'center', marginBottom: 25 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.sky, marginBottom: 5, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#ecf0f1', opacity: 0.9, textAlign: 'center' },
  
  // ROLE SELECTOR
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, gap: 15 },
  roleCard: {
    flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: 15,
    alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  roleCardActive: { backgroundColor: 'rgba(164, 215, 225, 0.2)', borderColor: COLORS.sky },
  roleText: { marginTop: 8, fontSize: 14, fontWeight: '600', color: COLORS.white },
  roleTextActive: { color: '#FFF', fontWeight: '800' },
  checkCircle: { width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', marginTop: 8 },
  checkCircleActive: { backgroundColor: COLORS.sky, borderColor: COLORS.sky },

  // INPUTS
  row: { flexDirection: 'row', marginBottom: 15 },
  inputGroup: { position: 'relative', marginBottom: 15, justifyContent: 'center' },
  iconWrapper: { position: 'absolute', left: 8, zIndex: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 255, 255, 0.9)', justifyContent: 'center', alignItems: 'center' },
  input: {
    backgroundColor: 'rgba(240, 244, 248, 0.9)', borderRadius: 25,
    paddingVertical: 14, paddingLeft: 55, paddingRight: 15,
    fontSize: 16, color: COLORS.dark,
  },
  eyeIcon: { position: 'absolute', right: 15, padding: 5, zIndex: 10 },

  // BUTTON
  button: {
    backgroundColor: COLORS.sky, padding: 16, borderRadius: 12,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5,
  },
  buttonText: { color: COLORS.dark, fontSize: 18, fontWeight: '800' },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  linkText: { color: COLORS.sky, fontWeight: '700', fontSize: 14, textDecorationLine: 'underline' },
});