import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  ImageBackground, Alert, Linking, KeyboardAvoidingView, Platform, StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Mail, MapPin, Send, Facebook, Instagram, Car } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For the premium buttons
import CustomHeader from '../../components/CustomHeader';

// Reuse your color palette
const COLORS = {
  skyBlue: '#A4D7E1',
  midnight: '#2C3E50',
  textDark: '#2C3E50',
  textLight: '#FFFFFF',
  inputBg: '#F9FBFD',
  border: '#ECF0F1',
};

const Contact = () => {
  const [user, setUser] = useState<string | null>(null); // State for Header
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert("Oups", "Veuillez remplir tous les champs obligatoires.");
      return;
    }
    console.log("Form data:", formData);
    Alert.alert("Envoyé !", "Merci ! Votre message a été transmis à l'équipe GoCode.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader user={user} setUser={setUser} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1920' }}
          style={styles.backgroundImage}
        >
          {/* Overlay Dark */}
          <View style={styles.overlay} />

          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            
            {/* === MAIN CARD === */}
            <View style={styles.cardContainer}>
              
              {/* --- TOP SECTION: INFO (Dark Blue) --- */}
              <View style={styles.infoSection}>
                <Text style={styles.title}>Restons en contact</Text>
                <Text style={styles.description}>
                  Une question sur nos forfaits ? L'équipe <Text style={{fontWeight:'bold'}}>GoCode</Text> est là pour vous accompagner.
                </Text>

                {/* Contact List */}
                <View style={styles.infoList}>
                  <View style={styles.infoItem}>
                    <View style={styles.iconCircle}><Phone size={20} color={COLORS.skyBlue} /></View>
                    <Text style={styles.infoText}>+216 71 000 000</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <View style={styles.iconCircle}><Mail size={20} color={COLORS.skyBlue} /></View>
                    <Text style={styles.infoText}>contact@gocode.tn</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <View style={styles.iconCircle}><MapPin size={20} color={COLORS.skyBlue} /></View>
                    <Text style={styles.infoText}>12 Av. de la Liberté, Tunis</Text>
                  </View>
                </View>

                {/* Social Media Buttons (Premium Gradient) */}
                <View style={styles.socialSection}>
                  <Text style={styles.socialHeader}>SUIVEZ NOTRE ACTUALITÉ :</Text>
                  <View style={styles.socialRow}>
                    
                    {/* Facebook */}
                    <TouchableOpacity onPress={() => openLink('https://facebook.com')} style={{flex:1}}>
                      <LinearGradient
                        colors={['#1877F2', '#0056b3']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.socialCard}
                      >
                        <View style={styles.socialIconBox}>
                          <Facebook size={24} color="#1877F2" />
                        </View>
                        <View>
                          <Text style={styles.socialName}>Facebook</Text>
                          <Text style={styles.socialHandle}>@GoCode.TN</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* Instagram */}
                    <TouchableOpacity onPress={() => openLink('https://instagram.com')} style={{flex:1}}>
                      <LinearGradient
                        colors={['#f09433', '#dc2743', '#bc1888']}
                        start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                        style={styles.socialCard}
                      >
                         <View style={styles.socialIconBox}>
                          <Instagram size={24} color="#dc2743" />
                        </View>
                        <View>
                          <Text style={styles.socialName}>Instagram</Text>
                          <Text style={styles.socialHandle}>@GoCode_Off</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>

                  </View>
                </View>

                {/* Decorative Car Icon */}
                <Car size={120} color="rgba(255,255,255,0.05)" style={styles.bgIcon} />
              </View>

              {/* --- BOTTOM SECTION: FORM (White) --- */}
              <View style={styles.formSection}>
                <Text style={styles.formTitle}>Envoyez-nous un message</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nom complet</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Votre nom"
                    placeholderTextColor="#95a5a6"
                    value={formData.name}
                    onChangeText={(text) => handleChange('name', text)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="votre@email.com"
                    placeholderTextColor="#95a5a6"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Sujet</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Ex: Inscription, Tarifs..."
                    placeholderTextColor="#95a5a6"
                    value={formData.subject}
                    onChangeText={(text) => handleChange('subject', text)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Message</Text>
                  <TextInput 
                    style={[styles.input, styles.textArea]}
                    placeholder="Comment pouvons-nous vous aider ?"
                    placeholderTextColor="#95a5a6"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={formData.message}
                    onChangeText={(text) => handleChange('message', text)}
                  />
                </View>

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                  <Text style={styles.submitBtnText}>Envoyer le message</Text>
                  <Send size={18} color={COLORS.skyBlue} style={{ marginLeft: 10 }} />
                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(44, 62, 80, 0.85)', // Dark Blue Overlay
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 10,
  },
  
  // --- INFO SECTION ---
  infoSection: {
    backgroundColor: 'rgba(44, 62, 80, 0.7)',
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.skyBlue,
    marginBottom: 10,
  },
  description: {
    color: '#ecf0f1',
    lineHeight: 22,
    marginBottom: 25,
    fontSize: 14,
  },
  infoList: {
    gap: 15,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconCircle: {
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(164, 215, 225, 0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  
  // SOCIALS
  socialSection: {
    marginTop: 10,
  },
  socialHeader: {
    color: '#bdc3c7',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 1,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  socialIconBox: {
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center', justifyContent: 'center',
  },
  socialName: {
    color: 'white', fontWeight: 'bold', fontSize: 13,
  },
  socialHandle: {
    color: 'rgba(255,255,255,0.8)', fontSize: 10,
  },
  bgIcon: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    transform: [{ rotate: '-15deg' }],
  },

  // --- FORM SECTION ---
  formSection: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.midnight,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F9FBFD',
    borderWidth: 1.5,
    borderColor: '#ECF0F1',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.midnight,
  },
  textArea: {
    height: 100,
  },
  submitBtn: {
    backgroundColor: COLORS.midnight,
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: COLORS.skyBlue,
    fontSize: 16,
    fontWeight: 'bold',
  },
});