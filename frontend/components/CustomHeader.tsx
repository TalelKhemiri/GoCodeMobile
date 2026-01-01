import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import { Link, useRouter, usePathname } from 'expo-router';
// AJOUT : J'ai importé "BookOpen" pour l'icône du Quiz
import { Car, User, LogOut, Home, Mail, Info, BookOpen } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../constants/styles';

interface HeaderProps {
  user: string | null;
  setUser: (u: string | null) => void;
}

const CustomHeader = ({ user, setUser }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname(); // To highlight active link

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("accessToken");
      setUser(null);
      router.replace("/");
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  // Petite aide pour vérifier si le lien est actif (y compris les sous-pages du quiz)
  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <SafeAreaView style={styles.headerSafeArea}>
      {/* === ROW 1: LOGO & AUTH === */}
      <View style={styles.headerTopRow}>
        {/* LEFT: Logo */}
        <Link href="/" asChild>
          <TouchableOpacity style={styles.logoContainer}>
            <Car size={24} color="#2C3E50" strokeWidth={2.5} />
            <Text style={styles.logoText}>GoCode<Text style={styles.logoDot}>.</Text></Text>
          </TouchableOpacity>
        </Link>

        {/* RIGHT: Auth Buttons or User Profile */}
        <View style={styles.authContainer}>
          {user ? (
            <View style={styles.userProfileContainer}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>{user.charAt(0).toUpperCase()}</Text>
              </View>
              <TouchableOpacity onPress={handleLogout} style={styles.btnLogout}>
                <LogOut size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Link href="/login" asChild>
                <TouchableOpacity style={styles.btnLogin}>
                  <Text style={styles.btnLoginText}>Se connecter</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/register" asChild>
                <TouchableOpacity style={styles.btnRegister}>
                  <Text style={styles.btnRegisterText}>S'inscrire</Text>
                </TouchableOpacity>
              </Link>
            </>
          )}
        </View>
      </View>

      {/* === ROW 2: NAVIGATION LINKS === */}
      <View style={styles.navRow}>
        
        <Link href="/" asChild>
          <TouchableOpacity style={styles.navLink}>
            <Home size={16} color={isActive('/') ? '#2C3E50' : '#94a3b8'} />
            <Text style={[styles.navLinkText, isActive('/') && styles.navLinkActive]}>Accueil</Text>
          </TouchableOpacity>
        </Link>

        {/* --- NOUVEAU BOUTON QUIZ --- */}
        <Link href="/quiz" asChild>
          <TouchableOpacity style={styles.navLink}>
            {/* Si on est sur le quiz, l'icône devient foncée, sinon grise */}
            <BookOpen size={16} color={isActive('/quiz') ? '#2C3E50' : '#94a3b8'} />
            <Text style={[styles.navLinkText, isActive('/quiz') && styles.navLinkActive]}>Quiz</Text>
          </TouchableOpacity>
        </Link>
        {/* --------------------------- */}

        <Link href="/contact" asChild>
          <TouchableOpacity style={styles.navLink}>
            <Mail size={16} color={isActive('/contact') ? '#2C3E50' : '#94a3b8'} />
            <Text style={[styles.navLinkText, isActive('/contact') && styles.navLinkActive]}>Contact</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/apropos" asChild>
          <TouchableOpacity style={styles.navLink}>
            <Info size={16} color={isActive('/apropos') ? '#2C3E50' : '#94a3b8'} />
            <Text style={[styles.navLinkText, isActive('/apropos') && styles.navLinkActive]}>À propos</Text>
          </TouchableOpacity>
        </Link>
        
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;