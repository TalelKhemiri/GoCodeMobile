import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  ActivityIndicator, Alert, RefreshControl, SafeAreaView 
} from 'react-native';
import { Users, CheckCircle, XCircle, BookOpen } from 'lucide-react-native';
import { api } from '../../api'; // Assure-toi que le chemin est bon

const MonitorDashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res: any = await api.getMonitorDashboard();
      const list = Array.isArray(res) ? res : res.results || [];
      setData(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  const handleAction = (id: number, action: 'approve' | 'reject') => {
    Alert.alert(
      "Confirmation",
      `Êtes-vous sûr de vouloir ${action === 'approve' ? 'accepter' : 'rejeter'} cette demande ?`,
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Oui", 
          style: action === 'reject' ? 'destructive' : 'default',
          onPress: async () => {
            try {
              await api.manageEnrollment(id, action);
              loadData(); // Rafraîchir la liste
            } catch (e) {
              Alert.alert("Erreur", "Une erreur est survenue lors de l'opération.");
            }
          }
        }
      ]
    );
  };

  // --- Rendu d'une Carte Étudiant (au lieu d'une ligne de tableau) ---
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      
      {/* Header Carte : Nom & Email */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.studentName}>{item.student_name}</Text>
          <Text style={styles.studentEmail}>{item.student_email}</Text>
        </View>
        {getStatusBadge(item.status)}
      </View>

      {/* Info Cours */}
      <View style={styles.courseRow}>
        <BookOpen size={16} color="#7f8c8d" />
        <Text style={styles.courseTitle}>{item.course_title}</Text>
      </View>

      {/* Barre de Progression */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Progression : {item.progress}%</Text>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                width: `${item.progress}%`,
                backgroundColor: item.progress === 100 ? '#2ecc71' : '#3498db'
              }
            ]} 
          />
        </View>
      </View>

      {/* Actions (Si en attente) */}
      {item.status === 'pending' && (
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.btnReject]} 
            onPress={() => handleAction(item.id, 'reject')}
          >
            <XCircle size={20} color="#e74c3c" />
            <Text style={styles.actionTextReject}>Rejeter</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionBtn, styles.btnApprove]} 
            onPress={() => handleAction(item.id, 'approve')}
          >
            <CheckCircle size={20} color="#27ae60" />
            <Text style={styles.actionTextApprove}>Accepter</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <View style={[styles.badge, { backgroundColor: '#f1c40f' }]}><Text style={styles.badgeText}>En Attente</Text></View>;
      case 'active':
        return <View style={[styles.badge, { backgroundColor: '#2ecc71' }]}><Text style={styles.badgeText}>Actif</Text></View>;
      case 'rejected':
        return <View style={[styles.badge, { backgroundColor: '#e74c3c' }]}><Text style={styles.badgeText}>Rejeté</Text></View>;
      default:
        return null;
    }
  };

  // --- Rendu Principal ---
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={{ marginTop: 10, color: '#7f8c8d' }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Gestion des Étudiants</Text>
      
      {data.length === 0 ? (
        <View style={styles.emptyState}>
          <Users size={48} color="#bdc3c7" />
          <Text style={styles.emptyText}>Aucune inscription pour le moment.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageTitle: {
    fontSize: 22, fontWeight: 'bold', color: '#2c3e50',
    margin: 20, marginBottom: 10
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  // Card Styles
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: 10
  },
  studentName: { fontSize: 16, fontWeight: '700', color: '#2c3e50' },
  studentEmail: { fontSize: 13, color: '#7f8c8d' },
  
  // Course Info
  courseRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  courseTitle: { fontSize: 14, fontWeight: '600', color: '#34495e' },

  // Progress Bar
  progressContainer: { marginBottom: 15 },
  progressLabel: { fontSize: 12, color: '#7f8c8d', marginBottom: 5 },
  progressBarBackground: {
    height: 8, backgroundColor: '#ecf0f1', borderRadius: 4, overflow: 'hidden'
  },
  progressBarFill: { height: '100%', borderRadius: 4 },

  // Badges
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },

  // Actions
  actionsRow: {
    flexDirection: 'row', gap: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0'
  },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 10, borderRadius: 8, borderWidth: 1, gap: 8
  },
  btnReject: { borderColor: '#fadbd8', backgroundColor: '#fdf2f2' },
  btnApprove: { borderColor: '#d5f5e3', backgroundColor: '#eafaf1' },
  
  actionTextReject: { color: '#e74c3c', fontWeight: '600' },
  actionTextApprove: { color: '#27ae60', fontWeight: '600' },

  // Empty State
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { marginTop: 10, color: '#95a5a6', fontSize: 16 }
});

export default MonitorDashboard;