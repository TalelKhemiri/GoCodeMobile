import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { TriangleAlert, ArrowLeftRight, HeartPulse, BookOpen, ArrowRightCircle, CircleHelp } from 'lucide-react-native';
import { QUIZ_DATA } from '../../data/QuizData'; // Assure-toi que ce chemin est bon

const { width } = Dimensions.get('window');

// Mapping des icônes (car on ne peut pas passer des strings comme composants en RN facilement)
const IconMap: any = {
  TriangleAlert: TriangleAlert,
  ArrowLeftRight: ArrowLeftRight,
  HeartPulse: HeartPulse,
  BookOpen: BookOpen,
  // Ajoute d'autres icônes ici si nécessaire
};

export default function QuizList() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']} // Le dégradé du CSS
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Tests de <Text style={styles.highlight}>Code de la Route</Text>
          </Text>
          <Text style={styles.headerSubtitle}>
            Choisissez un module et maîtrisez la route.
          </Text>
        </View>

        {/* Liste des Modules */}
        <View style={styles.grid}>
          {QUIZ_DATA.map((module) => {
            const IconComponent = IconMap[module.icon] || BookOpen;

            return (
              <TouchableOpacity
                key={module.id}
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => router.push(`../quiz/${module.id}`)}
              >
                <View style={styles.iconWrapper}>
                  <IconComponent size={28} color="#00838f" strokeWidth={2.5} />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{module.title}</Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {module.description}
                  </Text>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.questionCount}>
                    <BookOpen size={16} color="#7f8c8d" />
                    <Text style={styles.countText}>{module.questions.length} Questions</Text>
                  </View>
                  <View style={styles.btnStart}>
                    <Text style={styles.btnStartText}>Go</Text>
                    <ArrowRightCircle size={18} color="#FFF" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 50, paddingTop: 60 },
  
  // Header
  header: { marginBottom: 30, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#2C3E50', textAlign: 'center', marginBottom: 10 },
  highlight: { color: '#2980b9' },
  headerSubtitle: { fontSize: 16, color: '#7f8c8d', textAlign: 'center' },

  // Grid/List
  grid: { gap: 20 },
  
  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    // Ombres douces (iOS & Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  iconWrapper: {
    width: 50, height: 50,
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 15,
  },
  cardContent: { marginBottom: 15 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#2C3E50', marginBottom: 5 },
  cardDesc: { fontSize: 14, color: '#7f8c8d', lineHeight: 20 },

  // Footer Card
  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: '#f1f1f1', paddingTop: 15,
  },
  questionCount: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  countText: { fontSize: 13, fontWeight: '600', color: '#7f8c8d' },
  
  btnStart: {
    backgroundColor: '#2C3E50',
    paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row', alignItems: 'center', gap: 5,
  },
  btnStartText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});