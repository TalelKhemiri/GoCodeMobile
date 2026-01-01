import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, 
  ActivityIndicator, Alert, SafeAreaView 
} from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  BookOpen, PlayCircle, ShieldCheck, MapPin, ArrowRight, 
  TrafficCone, Car, Gauge, UserCheck, AlertTriangle 
} from 'lucide-react-native';

import { api } from '../api'; 
import { styles } from '../constants/styles';
import CustomHeader from '../components/CustomHeader';

const Home = () => {
  const [user, setUser] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- LOGIC (UNTOUCHED BACKEND) ---
  useFocusEffect(
    useCallback(() => {
      const checkUser = async () => {
        try {
          const storedUser = await AsyncStorage.getItem("user");
          setUser(storedUser);
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
      // In React Native, we typically refetch data rather than full reload
    } catch (err) {
      Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      
      {/* HEADER WITH NAV & AUTH */}
      <CustomHeader user={user} setUser={setUser} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* === 1. HERO SECTION === */}
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

                    <TouchableOpacity style={styles.btnHeroGlass}>
                      <PlayCircle size={20} color="#FFF" style={{marginRight:8}} />
                      <Text style={{color:'white', fontWeight:'600'}}>Découvrir la méthode</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.btnHeroSolid}>
                    <Text style={styles.btnHeroSolidText}>Reprendre ma formation</Text>
                    <Car size={20} color="#2C3E50" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* === 2. FEATURES === */}
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

          <View style={styles.featureCard}>
            <View style={[styles.iconBox, styles.bgDark]}>
              <Gauge size={28} color="#FFF" />
            </View>
            <Text style={styles.featureCardTitle}>Rythme Adapté</Text>
            <Text style={styles.featureCardDesc}>Une interface étudiée pour éliminer la fatigue.</Text>
          </View>
        </View>

        {/* === 3. CATALOGUE === */}
        {user && (
          <View style={styles.catalogSection}>
            <View style={styles.catalogHeaderRow}>
              <BookOpen size={24} color="#2C3E50" />
              <Text style={styles.catalogTitle}>Vos Modules</Text>
            </View>
            
            {loading ? (
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
            )}
          </View>
        )}

        {/* === 4. FOOTER === */}
        <View style={styles.footer}>
            <Text style={styles.footerLogo}>GoCode.</Text>
            <Text style={styles.footerText}>La route se partage, la sécurité s'apprend.</Text>
            <Text style={[styles.footerText, { marginTop: 20, fontSize: 10 }]}>
                © 2025 Auto-École Digitale.
            </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;