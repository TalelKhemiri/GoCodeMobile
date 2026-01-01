import React, { useEffect, useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Dimensions 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview'; // Pour lire la vidéo
import { CheckCircle, ChevronLeft, ChevronRight, PlayCircle, BookOpen } from 'lucide-react-native';
import { api } from '../../api'; // On garde ton import API intact

const { width } = Dimensions.get('window');

const CoursePlayer = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // États (Identiques au Web)
  const [course, setCourse] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Ref pour scroller en haut quand on change de leçon
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (id) loadCourseData();
  }, [id]);

  // --- LOGIQUE MÉTIER (COPIÉE DU WEB) ---
  const loadCourseData = (specificLessonId?: number) => {
    // Note: on convertit id en string/number selon besoin car params peut être string[]
    const courseId = Array.isArray(id) ? id[0] : id;

    api.getCourseDetails(courseId)
      .then((data: any) => {
        setCourse(data);
        
        let lessonToActive = null;

        if (specificLessonId) {
           lessonToActive = data.lessons.find((l:any) => l.id === specificLessonId);
        } else if (activeLesson) {
           lessonToActive = data.lessons.find((l:any) => l.id === activeLesson.id);
        } else if (data.lessons && data.lessons.length > 0) {
           lessonToActive = data.lessons[0];
        }

        if (lessonToActive) {
          setActiveLesson(lessonToActive);
          // Scroll en haut sur mobile
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
      })
      .catch((err: any) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleCompleteAndNext = async () => {
    if (!activeLesson) return;

    try {
      // 1. Save Progress
      await api.markLessonComplete(activeLesson.id);

      // 2. Find Next Lesson
      const currentIndex = course.lessons.findIndex((l:any) => l.id === activeLesson.id);
      const nextLesson = course.lessons[currentIndex + 1];

      // 3. Refresh Data AND Force Jump to Next Lesson
      if (nextLesson) {
        loadCourseData(nextLesson.id);
      } else {
        loadCourseData(); // Just refresh if finished
        Alert.alert("Félicitations !", "Vous avez terminé ce cours.");
      }

    } catch (err) {
      console.error("Error saving progress:", err);
      Alert.alert("Erreur", "Impossible de sauvegarder la progression.");
    }
  };

  // --- RENDER ---
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Chargement du cours...</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cours introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* HEADER SIMPLE */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{course.title}</Text>
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- ZONE DU PLAYER (Contenu Actif) --- */}
        {activeLesson ? (
          <View style={styles.viewerContainer}>
            
            {/* Titre Leçon */}
            <View style={styles.lessonHeader}>
               <PlayCircle size={24} color="#3498db" />
               <Text style={styles.activeLessonTitle}>{activeLesson.title}</Text>
            </View>

            {/* Vidéo (WebView) */}
            {activeLesson.video_url && (
              <View style={styles.videoWrapper}>
                <WebView
                  style={styles.webview}
                  source={{ uri: activeLesson.video_url.replace("watch?v=", "embed/") }}
                  allowsFullscreenVideo={true}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                />
              </View>
            )}

            {/* Contenu Texte */}
            <View style={styles.textContent}>
              <Text style={styles.contentText}>{activeLesson.content}</Text>
            </View>

            {/* Bouton Suivant */}
            <TouchableOpacity 
              style={styles.btnNext} 
              onPress={handleCompleteAndNext}
              activeOpacity={0.8}
            >
              <Text style={styles.btnNextText}>Valider et Continuer</Text>
              <ChevronRight size={20} color="#fff" />
            </TouchableOpacity>

          </View>
        ) : (
          <View style={styles.noLesson}>
            <Text>Sélectionnez une leçon ci-dessous</Text>
          </View>
        )}

        {/* --- LISTE DES LEÇONS (Playlist en bas) --- */}
        <View style={styles.playlistContainer}>
          <Text style={styles.playlistHeader}>Programme du cours</Text>
          
          {course.lessons.map((lesson: any, index: number) => {
            const isActive = activeLesson?.id === lesson.id;
            
            return (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.lessonItem, isActive && styles.lessonItemActive]}
                onPress={() => {
                  setActiveLesson(lesson);
                  scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                }}
              >
                {/* Numéro ou Check */}
                <View style={[styles.lessonNum, isActive && styles.lessonNumActive]}>
                  {lesson.is_completed ? (
                    <CheckCircle size={14} color={isActive ? "#fff" : "#27ae60"} />
                  ) : (
                    <Text style={[styles.numText, isActive && styles.numTextActive]}>{index + 1}</Text>
                  )}
                </View>

                {/* Titre */}
                <Text style={[styles.lessonListTitle, isActive && styles.lessonListTitleActive]}>
                  {lesson.title}
                </Text>

                {/* Status Icon à droite */}
                {lesson.is_completed && !isActive && (
                  <CheckCircle size={16} color="#27ae60" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
};

// --- STYLES (Adaptation Mobile de ton CSS) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#7f8c8d' },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#2C3E50', flex: 1 },

  scrollContent: { paddingBottom: 40 },

  // Viewer Zone
  viewerContainer: { padding: 20 },
  lessonHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  activeLessonTitle: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', flex: 1 },
  
  // Video
  videoWrapper: {
    width: '100%',
    height: 220, // Hauteur fixe nécessaire pour WebView
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  webview: { flex: 1 },

  // Content
  textContent: {
    backgroundColor: '#fff', padding: 20, borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2
  },
  contentText: { fontSize: 15, lineHeight: 24, color: '#444' },

  // Button Next
  btnNext: {
    backgroundColor: '#3498db',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 15, borderRadius: 12, gap: 10,
    shadowColor: '#3498db', shadowOpacity: 0.3, shadowRadius: 5, elevation: 4
  },
  btnNextText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  noLesson: { padding: 40, alignItems: 'center' },

  // Playlist (Liste en bas)
  playlistContainer: {
    marginTop: 10, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 20
  },
  playlistHeader: { fontSize: 16, fontWeight: '700', color: '#7f8c8d', marginBottom: 15, textTransform: 'uppercase' },
  
  lessonItem: {
    flexDirection: 'row', alignItems: 'center',
    padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10,
    borderWidth: 1, borderColor: '#f0f0f0'
  },
  lessonItemActive: {
    backgroundColor: '#e3f2fd', borderColor: '#2196f3'
  },
  
  lessonNum: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#eee',
    justifyContent: 'center', alignItems: 'center', marginRight: 12
  },
  lessonNumActive: { backgroundColor: '#2196f3' },
  
  numText: { fontSize: 12, fontWeight: 'bold', color: '#555' },
  numTextActive: { color: '#fff' },
  
  lessonListTitle: { fontSize: 14, color: '#2c3e50', flex: 1 },
  lessonListTitleActive: { fontWeight: '700', color: '#2196f3' },
});

export default CoursePlayer;