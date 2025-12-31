// src/App.js - NAVIGATION PRINCIPALE
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Écrans d'authentification
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';

// Pages publiques
import HomeScreen from './src/screens/main/HomeScreen';
import AproposScreen from './src/screens/main/AproposScreen';

// Interface Candidat
import DashboardCandidatScreen from './src/screens/main/DashboardCandidatScreen';
import MyLearningScreen from './src/screens/main/MyLearningScreen';
import CoursePlayerScreen from './src/screens/course/CoursePlayerScreen';
import QuizListScreen from './src/screens/quiz/QuizListScreen';
import QuizPlayerScreen from './src/screens/quiz/QuizPlayerScreen';

// Interface Moniteur
import DashboardMoniteurScreen from './src/screens/monitor/DashboardMoniteurScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          
          {/* ÉCRANS PUBLICS (accessible sans connexion) */}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: 'GoCode - Apprendre le Code',
              headerShown: true,
            }}
          />
          
          <Stack.Screen 
            name="Apropos" 
            component={AproposScreen}
            options={{ 
              title: 'À propos',
              headerShown: true,
            }}
          />
          
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ 
              title: 'Connexion',
              headerShown: true,
            }}
          />
          
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ 
              title: 'Inscription',
              headerShown: true,
            }}
          />
          
          {/* INTERFACE CANDIDAT (après connexion) */}
          <Stack.Screen 
            name="DashboardCandidat" 
            component={DashboardCandidatScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen 
            name="MyLearning" 
            component={MyLearningScreen}
            options={{ 
              title: 'Mes Cours',
              headerShown: true,
            }}
          />
          
          <Stack.Screen 
            name="CoursePlayer" 
            component={CoursePlayerScreen}
            options={{ 
              title: 'Cours en ligne',
              headerShown: true,
            }}
          />
          
          <Stack.Screen 
            name="QuizList" 
            component={QuizListScreen}
            options={{ 
              title: 'Tests & Quiz',
              headerShown: true,
            }}
          />
          
          <Stack.Screen 
            name="QuizPlayer" 
            component={QuizPlayerScreen}
            options={{ 
              title: 'Test en cours',
              headerShown: false,
            }}
          />
          
          {/* INTERFACE MONITEUR (après connexion) */}
          <Stack.Screen 
            name="DashboardMoniteur" 
            component={DashboardMoniteurScreen}
            options={{ headerShown: false }}
          />
        
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}