import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Play, Clock, AlertTriangle, BookOpen } from 'lucide-react-native';
import { api } from '../../api';

const MyLearning = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    api.getMyCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      {/* Thumbnail Image */}
      <View style={styles.imageContainer}>
        {item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <BookOpen size={40} color="#bdc3c7" />
          </View>
        )}
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.courseTitle}>{item.title}</Text>

        {/* --- Logique des status --- */}
        {item.enrollment_status === 'pending' ? (
          <View style={styles.statusBoxPending}>
            <Clock size={20} color="#856404" />
            <View style={{ flex: 1 }}>
              <Text style={styles.statusTitlePending}>En cours de révision</Text>
              <Text style={styles.statusTextPending}>Le moniteur doit valider votre demande.</Text>
            </View>
          </View>
        ) : item.enrollment_status === 'rejected' ? (
          <View style={styles.statusBoxRejected}>
            <AlertTriangle size={20} color="#721c24" />
            <Text style={styles.statusTextRejected}>Demande refusée.</Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.btnStart}
            onPress={() => router.push(`../courseplayer/${item.id}`)} // Redirige vers le lecteur
          >
            <Play size={18} color="white" fill="white" />
            <Text style={styles.btnStartText}>Commencer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Mon Apprentissage</Text>

      {courses.length === 0 ? (
        <View style={styles.emptyState}>
          <BookOpen size={48} color="#bdc3c7" />
          <Text style={styles.emptyText}>Vous n'êtes inscrit à aucun cours.</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  headerTitle: {
    fontSize: 24, fontWeight: 'bold', color: '#2c3e50',
    margin: 20, marginBottom: 10
  },
  
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Card Styles
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    // Shadow
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  
  // Image
  imageContainer: { height: 160, backgroundColor: '#eee' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholderImage: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ecf0f1' },

  // Body
  cardBody: { padding: 15 },
  courseTitle: { fontSize: 18, fontWeight: '700', color: '#2c3e50', marginBottom: 15 },

  // Status: Pending
  statusBoxPending: {
    backgroundColor: '#fff3cd', borderRadius: 8, padding: 12,
    flexDirection: 'row', alignItems: 'center', gap: 10
  },
  statusTitlePending: { fontWeight: 'bold', color: '#856404', marginBottom: 2 },
  statusTextPending: { color: '#856404', fontSize: 12 },

  // Status: Rejected
  statusBoxRejected: {
    backgroundColor: '#f8d7da', borderRadius: 8, padding: 12,
    flexDirection: 'row', alignItems: 'center', gap: 10
  },
  statusTextRejected: { color: '#721c24', fontWeight: 'bold' },

  // Button Start
  btnStart: {
    backgroundColor: '#3498db', borderRadius: 8, paddingVertical: 12,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8
  },
  btnStartText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Empty State
  emptyState: { alignItems: 'center', marginTop: 50, padding: 20 },
  emptyText: { marginTop: 15, color: '#7f8c8d', fontSize: 16 }
});

export default MyLearning;