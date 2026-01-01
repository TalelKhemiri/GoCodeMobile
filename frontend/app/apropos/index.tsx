import React, { useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, Easing 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
// On utilise Lucide pour les icônes des cartes (plus propre que des émojis sur mobile)
import { Rocket, ShieldCheck, Smartphone, GraduationCap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// --- PALETTE DE COULEURS (Tirée de ton CSS) ---
const COLORS = {
  sky: '#A4D7E1',
  teal: '#7A9B9E',
  paper: '#F0F4F8',
  ink: '#2C3E50',
  stone: '#EDEEF1',
};

export default function Apropos() {
  const router = useRouter();
  
  // Animation pour la voiture (Rebondissement)
  const carBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(carBounce, {
          toValue: -5,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(carBounce, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. HERO SECTION */}
      <LinearGradient 
        colors={[COLORS.stone, COLORS.sky]} 
        style={styles.heroSection}
      >
        <Text style={styles.heroTitle}>Votre Permis, Notre Mission</Text>
        <Text style={styles.heroSubtitle}>
          La plateforme nouvelle génération pour maîtriser le Code de la Route.
        </Text>

        {/* ROAD STAGE */}
        <View style={styles.roadStage}>
          {/* Ligne pointillée */}
          <View style={styles.roadLine} />
          
          {/* Animated Car (SVG) */}
          <Animated.View style={[styles.carContainer, { transform: [{ translateY: carBounce }] }]}>
            <Svg width="80" height="50" viewBox="0 0 60 40">
              {/* Car Body */}
              <Path 
                d="M10 20 L15 10 L45 10 L50 20 L58 22 V30 H54 V34 H46 V30 H14 V34 H6 V30 H2 V22 Z" 
                fill={COLORS.ink} 
              />
              {/* Wheels */}
              <Circle cx="12" cy="30" r="4" fill={COLORS.sky} />
              <Circle cx="48" cy="30" r="4" fill={COLORS.sky} />
            </Svg>
          </Animated.View>
        </View>
      </LinearGradient>

      {/* 2. MISSION SECTION */}
      <View style={styles.contentSection}>
        <View style={styles.textBlock}>
          <View style={styles.headingWrapper}>
             <Text style={styles.sectionTitle}>Qui sommes-nous ?</Text>
             <View style={styles.underline} />
          </View>
          
          <Text style={styles.paragraph}>
            Nous sommes une équipe passionnée par la sécurité routière et l'éducation numérique. 
            Conscients que l'obtention du permis est une étape cruciale vers la liberté.
          </Text>
          <Text style={styles.paragraph}>
            Notre objectif est simple : rendre le code accessible, compréhensible et 
            même agréable pour tous les candidats.
          </Text>
        </View>

        {/* Image Block (Abstract Visual) */}
        <View style={styles.imageBlock}>
          <GraduationCap size={80} color={COLORS.paper} />
        </View>
      </View>

      {/* 3. VALUES SECTION */}
      <View style={styles.valuesSection}>
        <Text style={styles.centerTitle}>Pourquoi nous choisir ?</Text>

        {/* Card 1 */}
        <View style={styles.valueCard}>
          <View style={styles.iconWrapper}>
            <Rocket size={32} color={COLORS.teal} />
          </View>
          <Text style={styles.cardTitle}>Apprentissage Rapide</Text>
          <Text style={styles.cardText}>
            Des leçons optimisées pour mémoriser les règles plus vite et sans stress.
          </Text>
        </View>

        {/* Card 2 */}
        <View style={styles.valueCard}>
          <View style={styles.iconWrapper}>
            <ShieldCheck size={32} color={COLORS.teal} />
          </View>
          <Text style={styles.cardTitle}>Contenu à Jour</Text>
          <Text style={styles.cardText}>
            Nos cours respectent les dernières réformes officielles de la sécurité routière.
          </Text>
        </View>

        {/* Card 3 */}
        <View style={styles.valueCard}>
          <View style={styles.iconWrapper}>
            <Smartphone size={32} color={COLORS.teal} />
          </View>
          <Text style={styles.cardTitle}>Accessible Partout</Text>
          <Text style={styles.cardText}>
            Révisez sur votre téléphone, votre tablette ou votre ordinateur.
          </Text>
        </View>
      </View>

      {/* 4. CALL TO ACTION */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Prêt à prendre la route ?</Text>
        <Text style={styles.ctaSubtitle}>Rejoignez des milliers d'élèves qui ont réussi.</Text>
        
        <TouchableOpacity 
          style={styles.ctaButton} 
          onPress={() => router.push('/register')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>Commencer Maintenant</Text>
        </TouchableOpacity>
      </View>

      {/* Footer copyright */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>GoCode Version 1.0.0</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.paper },
  
  // HERO
  heroSection: {
    paddingTop: 60,
    paddingBottom: 80, // Space for the road
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden', // Pour couper ce qui dépasse
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.ink,
    textAlign: 'center',
    marginBottom: 15,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.teal,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 40,
    lineHeight: 22,
  },
  
  // ROAD & CAR
  roadStage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: 60,
    backgroundColor: COLORS.ink,
    borderTopWidth: 4,
    borderTopColor: COLORS.teal,
    justifyContent: 'center',
  },
  roadLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: 2,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 1,
  },
  carContainer: {
    position: 'absolute',
    bottom: 20, // Pose la voiture sur la route
    left: '20%',
    zIndex: 10,
  },

  // MISSION
  contentSection: {
    padding: 30,
    backgroundColor: COLORS.paper,
  },
  textBlock: { marginBottom: 30 },
  headingWrapper: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.teal,
  },
  underline: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.sky,
    marginTop: 8,
    borderRadius: 2,
  },
  paragraph: {
    fontSize: 16,
    color: COLORS.ink,
    lineHeight: 24,
    marginBottom: 15,
    opacity: 0.9,
  },
  imageBlock: {
    backgroundColor: COLORS.sky,
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.ink,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  // VALUES
  valuesSection: {
    backgroundColor: COLORS.stone,
    padding: 30,
    alignItems: 'center',
  },
  centerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.ink,
    marginBottom: 30,
  },
  valueCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    // Shadow
    shadowColor: COLORS.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderBottomWidth: 5,
    borderBottomColor: COLORS.sky,
  },
  iconWrapper: {
    backgroundColor: COLORS.paper,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.ink,
    marginBottom: 10,
  },
  cardText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },

  // CTA
  ctaSection: {
    backgroundColor: COLORS.ink,
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ctaSubtitle: {
    color: COLORS.sky,
    marginBottom: 25,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: COLORS.sky,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  ctaButtonText: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Footer
  footer: {
    backgroundColor: COLORS.paper,
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    color: '#bdc3c7',
  }
});