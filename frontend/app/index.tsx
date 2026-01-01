import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, 
  ActivityIndicator, Alert, SafeAreaView 
} from 'react-native';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  BookOpen, PlayCircle, ShieldCheck, MapPin, ArrowRight, 
  TrafficCone, Car, Gauge, UserCheck, AlertTriangle, BarChart2 
} from 'lucide-react-native';

import { api } from '../api'; 
import { styles } from '../constants/styles';
import CustomHeader from '../components/CustomHeader';

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- LOGIC: Check User & Role ---
  useFocusEffect(
    useCallback(() => {
      const checkUser = async () => {
        try {
          const storedUser = await AsyncStorage.getItem("user");
          const storedRole = await AsyncStorage.getItem("role");
          
          setUser(storedUser);
          setRole(storedRole ? storedRole.toLowerCase() : null);
        } catch (e) {
          console.error(e);
        }
      };
      checkUser();
    }, [])
  );

  useEffect(() => {
    if (user) {
      setLoading(true);
      setError(null);
      api.getCourses()
        .then((data: any) => {
          if (Array.isArray(data)) setCourses(data);
          else if (data && Array.isArray(data.results)) setCourses(data.results);
          else setCourses([]);
        })
        .catch((err: any) => {
          console.error(err);
          setError("Impossible de charger les modules de formation.");
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleEnroll = async (courseId: number) => {
    if (!user) {
      Alert.alert("Accès refusé", "Veuillez vous connecter pour accéder à ce contenu.");
      return;
    }
    try {
      await api.enrollCourse(courseId);
      Alert.alert("Inscription validée !", "Bonne route.");
    } catch (err) {
      Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription.");
    }
  };

  // --- NAVIGATION ACTION HANDLER (UPDATED LINKS) ---
  const handleMainAction = () => {
    if (role === 'monitor') {
        router.push('/monitordashboard'); // Correct Monitor Link
    } else if (role === 'student') {
        router.push('/mylearning');       // Correct Student Link
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      
      <CustomHeader user={user} setUser={setUser} role={role} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* === HERO SECTION === */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1920' }}
            style={styles.heroBackground}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay} />

            <View style={styles.heroContent}>
              <View style={styles.badgeGlass}>
                <ShieldCheck size={16} color="#A4D7E1" />
                <Text style={styles.badgeText}>Formation Certifiée 2025</Text>
              </View>

              <Text style={styles.heroTitle}>
                La route n'aura plus{'\n'}
                <Text style={styles.heroHighlight}>de secrets pour vous.</Text>
              </Text>

              <Text style={styles.heroSubtitle}>
                Danger, Interdiction, Obligation... Apprenez à lire la signalisation comme un livre ouvert.
              </Text>

              <View style={styles.heroButtons}>
                {!user ? (
                  <>
                    <Link href="../register" asChild>
                      <TouchableOpacity style={styles.btnHeroSolid}>
                        <Text style={styles.btnHeroSolidText}>Débuter l'aventure</Text>
                        <ArrowRight size={20} color="#2C3E50" />
                      </TouchableOpacity>
                    </Link>

                    <Link href="../login" asChild>
                       <TouchableOpacity style={styles.btnHeroGlass}>
                        <Text style={{color:'white', fontWeight:'600'}}>Connexion</Text>
                      </TouchableOpacity>
                    </Link>
                  </>
                ) : (
                  <TouchableOpacity style={styles.btnHeroSolid} onPress={handleMainAction}>
                    <Text style={styles.btnHeroSolidText}>
                      {role === 'monitor' ? 'Accéder au Dashboard' : 'Mes Cours'}
                    </Text>
                    {role === 'monitor' ? <BarChart2 size={20} color="#2C3E50"/> : <Car size={20} color="#2C3E50"/>}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* === FEATURES === */}
        <View style={styles.featuresSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Une conduite <Text style={{color:'#7A9B9E'}}>Sereine</Text></Text>
            <Text style={styles.sectionSubtitle}>Notre palette d'outils pédagogiques pour réduire le stress.</Text>
          </View>
          <View style={styles.featureCard}>
            <View style={[styles.iconBox, styles.bgTeal]}>
              <TrafficCone size={28} color="#7A9B9E" />
            </View>
            <Text style={styles.featureCardTitle}>Maîtrise Technique</Text>
            <Text style={styles.featureCardDesc}>Des modules vidéo HD filmés sur route réelle.</Text>
          </View>
          <View style={styles.featureCard}>
            <View style={[styles.iconBox, styles.bgBlue]}>
              <MapPin size={28} color="#2980b9" />
            </View>
            <Text style={styles.featureCardTitle}>Situations Complexes</Text>
            <Text style={styles.featureCardDesc}>Analysez intersections et ronds-points par drone.</Text>
          </View>
        </View>

        {/* === CATALOGUE OR DASHBOARD LINK === */}
        {user && (
          <View style={styles.catalogSection}>
            <View style={styles.catalogHeaderRow}>
              <BookOpen size={24} color="#2C3E50" />
              <Text style={styles.catalogTitle}>
                {role === 'monitor' ? "Espace Moniteur" : "Catalogue"}
              </Text>
            </View>
            
            {/* MONITOR DASHBOARD CARD */}
            {role === 'monitor' && (
               <TouchableOpacity 
                  onPress={() => router.push('/monitordashboard')} // Updated Link
                  style={[styles.courseCard, { padding: 20, alignItems:'center', justifyContent:'center', minHeight: 150 }]}
               >
                  <BarChart2 size={40} color="#2E7D32" />
                  <Text style={[styles.cardTitle, {marginTop: 15, fontSize: 20}]}>Accéder au Tableau de Bord</Text>
                  <Text style={{color:'#666', textAlign:'center', marginTop:5}}>
                    Gérez les élèves, les inscriptions et suivez la progression globale.
                  </Text>
               </TouchableOpacity>
            )}

            {/* STUDENT COURSE LIST */}
            {role !== 'monitor' && (
                loading ? (
                <ActivityIndicator size="large" color="#7A9B9E" style={{marginTop: 20}} />
                ) : error ? (
                <View style={{alignItems:'center', marginTop:20}}>
                    <AlertTriangle size={30} color="#e74c3c" />
                    <Text style={{color:'#e74c3c', marginTop:10}}>{error}</Text>
                </View>
                ) : (
                courses.map((course) => (
                    <View key={course.id} style={styles.courseCard}>
                        <View>
                            <Image
                            source={{ uri: course.thumbnail || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d" }}
                            style={styles.cardImage}
                            />
                            <View style={styles.cardTag}>
                            <Text style={styles.cardTagText}>Permis B</Text>
                            </View>
                        </View>

                        <View style={styles.cardBody}>
                            <View style={styles.cardMeta}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <UserCheck size={14} color="#5d6d7e" />
                                    <Text style={{marginLeft:5, color:'#5d6d7e', fontSize:12}}>Expert Certifié</Text>
                                </View>
                                <Text style={styles.cardPrice}>
                                    {course.price > 0 ? `${course.price} TND` : "Inclus"}
                                </Text>
                            </View>

                            <Text style={styles.cardTitle}>{course.title}</Text>
                            <Text numberOfLines={2} style={{color:'#5d6d7e', marginBottom:10}}>
                                {course.description}
                            </Text>
                            
                            <TouchableOpacity 
                                style={styles.btnEnroll} 
                                onPress={() => handleEnroll(course.id)}
                            >
                                <Text style={styles.btnEnrollText}>
                                    {course.enrollment_status === 'active' ? 'Reprendre' : 'Démarrer'}
                                </Text>
                                <ArrowRight size={16} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
                )
            )}
          </View>
        )}

        {/* === FOOTER === */}
        <View style={styles.footer}>
            <Text style={styles.footerLogo}>GoCode.</Text>
            <Text style={[styles.footerText, { marginTop: 20, fontSize: 10 }]}>
                © 2025 Auto-École Digitale.
            </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
