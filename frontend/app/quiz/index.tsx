import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  TriangleAlert, 
  ArrowLeftRight, 
  HeartPulse, 
  BookOpen, 
  ArrowRightCircle, 
  Car, 
  Signpost 
} from 'lucide-react-native';

// Import des données
import { QUIZ_DATA } from '../../data/QuizData';

const { width } = Dimensions.get('window');

// 1. MAPPING DES ICÔNES
// C'est ici qu'on transforme le texte "HeartPulse" du fichier data en vrai composant <HeartPulse />
const IconMap: any = {
  TriangleAlert: TriangleAlert,
  ArrowLeftRight: ArrowLeftRight,
  HeartPulse: HeartPulse,
  BookOpen: BookOpen,
  Car: Car,
  Signpost: Signpost,
  // Tu peux ajouter d'autres icônes ici si tu en rajoutes dans QuizData
};

export default function QuizIndex() {
  const router = useRouter();

  const handlePressModule = (moduleId: string) => {
    // Navigation vers la page dynamique [id].tsx
    // Exemple : /quiz/priority
    router.push(`/quiz/${moduleId}`);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* Arrière-plan dégradé subtil */}
      <LinearGradient
        colors={['#F0F4F8', '#D9E2EC']}
        style={styles.background}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Tests de <Text style={styles.highlight}>Conduite</Text>
          </Text>
          <Text style={styles.headerSubtitle}>
            Sélectionnez un module pour vous entraîner.
          </Text>
        </View>

        {/* --- LISTE DES MODULES --- */}
        <View style={styles.grid}>
          {QUIZ_DATA.map((module) => {
            // Récupération de l'icône, ou BookOpen par défaut si introuvable
            const IconComponent = IconMap[module.icon] || BookOpen;

            return (
              <TouchableOpacity
                key={module.id}
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => handlePressModule(module.id)}
              >
                {/* Icône à gauche */}
                <View style={styles.iconContainer}>
                  <View style={styles.iconCircle}>
                    <IconComponent size={24} color="#0EA5E9" strokeWidth={2.5} />
                  </View>
                </View>

                {/* Contenu au centre */}
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{module.title}</Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {module.description}
                  </Text>
                  
                  {/* Badge nombre de questions */}
                  <View style={styles.badgeContainer}>
                    <BookOpen size={12} color="#64748B" />
                    <Text style={styles.badgeText}>{module.questions.length} questions</Text>
                  </View>
                </View>

                {/* Flèche à droite */}
                <View style={styles.arrowContainer}>
                   <ArrowRightCircle size={24} color="#CBD5E1" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Espace en bas pour ne pas être collé */}
        <View style={{ height: 40 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  background: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60, // Espace pour la barre de statut
  },

  // --- HEADER ---
  header: { marginBottom: 30 },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  highlight: {
    color: '#0EA5E9', // Bleu ciel
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },

  // --- GRILLE / LISTE ---
  grid: {
    gap: 16, // Espace entre les cartes
  },

  // --- CARTE MODULE ---
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    // Ombres
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3, // Pour Android
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },

  // Icône
  iconContainer: {
    marginRight: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F0F9FF', // Bleu très clair
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },

  // Texte
  cardContent: {
    flex: 1, // Prend toute la place disponible
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 8,
    lineHeight: 18,
  },

  // Badge (questions count)
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  // Flèche
  arrowContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
});