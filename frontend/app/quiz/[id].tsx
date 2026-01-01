import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, LayoutDashboard, Flag, AlertCircle } from 'lucide-react-native';

// Assure-toi que ce chemin est correct selon ta structure de dossiers
import { QUIZ_DATA } from '../../data/QuizData'; 

// --- COULEURS ---
const COLORS = {
  dark: '#2C3E50',
  sky: '#A4D7E1',
  greenBg: '#d1fae5', greenText: '#064e3b', greenBorder: '#10b981',
  redBg: '#fee2e2', redText: '#7f1d1d', redBorder: '#ef4444',
  blueBg: 'rgba(164, 215, 225, 0.25)', blueBorder: '#2980b9',
};

export default function QuizPlayer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // État du Quiz
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Chargement des données
  useEffect(() => {
    const found = QUIZ_DATA.find((m) => m.id === id);
    if (found) {
      setModule(found);
      setLoading(false);
    } else {
      Alert.alert("Erreur", "Module introuvable", [
        { text: "Retour", onPress: () => router.back() }
      ]);
    }
  }, [id]);

  if (loading || !module) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.dark} />
      </View>
    );
  }

  // --- LOGIQUE ---
  const handleValidate = () => {
    if (selectedOption === null) return;
    
    setIsChecked(true);
    if (selectedOption === module.questions[currentStep].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < module.questions.length - 1) {
      setCurrentStep(c => c + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentStep(0); 
    setScore(0); 
    setShowResult(false); 
    setIsChecked(false); 
    setSelectedOption(null);
  };

  // --- VUE RÉSULTATS ---
  if (showResult) {
    const isSuccess = score >= Math.ceil(module.questions.length / 2);
    return (
      <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
        <View style={[styles.card, styles.resultCard]}>
          {isSuccess ? <CheckCircle size={80} color="#10b981" /> : <XCircle size={80} color="#ef4444" />}
          
          <Text style={styles.resultTitle}>{isSuccess ? "Félicitations !" : "Dommage..."}</Text>
          <Text style={styles.resultSub}>Vous avez terminé le module {module.title}.</Text>

          <Text style={[styles.scoreDisplay, { color: isSuccess ? '#10b981' : '#ef4444' }]}>
            {score} / {module.questions.length}
          </Text>

          <View style={styles.resultActions}>
            <TouchableOpacity style={[styles.btnAction, styles.btnOutline]} onPress={restartQuiz}>
              <RotateCcw size={20} color={COLORS.dark} />
              <Text style={[styles.btnText, { color: COLORS.dark }]}>Réessayer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.btnAction, styles.btnFilled]} onPress={() => router.back()}>
              <LayoutDashboard size={20} color="#fff" />
              <Text style={styles.btnText}>Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  // --- VUE QUESTION ---
  const question = module.questions[currentStep];
  const progressPercent = ((currentStep + 1) / module.questions.length) * 100;

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      
      {/* ScrollView pour le contenu (Header + Question + Feedback) */}
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header & Progress */}
          <View style={styles.header}>
            <View style={styles.metaRow}>
              <Text style={styles.moduleTag}>{module.title}</Text>
              <Text style={styles.stepText}>Q. {currentStep + 1} / {module.questions.length}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <LinearGradient 
                colors={[COLORS.sky, '#2980b9']} 
                start={{x:0, y:0}} end={{x:1, y:0}}
                style={[styles.progressBarFill, { width: `${progressPercent}%` }]} 
              />
            </View>
          </View>

          {/* Carte Question */}
          <View style={styles.card}>
            
            {/* --- CORRECTION IMAGE ICI --- */}
            {/* Utilisation de 'source={question.image}' direct pour fonctionner avec require() */}
            {question.image ? (
              <View style={styles.imageContainer}>
                <Image 
                  source={question.image} 
                  style={styles.questionImage} 
                  resizeMode="contain" // 'contain' évite de couper l'image
                />
              </View>
            ) : null}

            <Text style={styles.questionText}>{question.question}</Text>

            {/* Options */}
            <View style={styles.optionsList}>
              {question.options.map((opt: string, idx: number) => {
                let btnStyle = styles.optionBtn;
                let textStyle = styles.optionText;
                let icon = null;

                if (isChecked) {
                  if (idx === question.correctAnswer) {
                    btnStyle = { ...styles.optionBtn, backgroundColor: COLORS.greenBg, borderColor: COLORS.greenBorder };
                    textStyle = { ...styles.optionText, color: COLORS.greenText };
                    icon = <CheckCircle size={20} color={COLORS.greenText} />;
                  } else if (idx === selectedOption) {
                    btnStyle = { ...styles.optionBtn, backgroundColor: COLORS.redBg, borderColor: COLORS.redBorder };
                    textStyle = { ...styles.optionText, color: COLORS.redText };
                    icon = <XCircle size={20} color={COLORS.redText} />;
                  }
                } else if (selectedOption === idx) {
                  btnStyle = { ...styles.optionBtn, backgroundColor: COLORS.blueBg, borderColor: COLORS.blueBorder };
                  textStyle = { ...styles.optionText, color: COLORS.blueBorder };
                }

                return (
                  <TouchableOpacity 
                    key={idx} 
                    style={btnStyle} 
                    onPress={() => !isChecked && setSelectedOption(idx)}
                    activeOpacity={0.8}
                  >
                    <Text style={textStyle}>{opt}</Text>
                    {icon}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Feedback Box (Apparaît après validation) */}
            {isChecked && (
              <View style={[styles.feedbackBox, selectedOption === question.correctAnswer ? styles.feedSuccess : styles.feedError]}>
                 <View style={styles.feedHeader}>
                   {selectedOption === question.correctAnswer ? <CheckCircle size={18} color={COLORS.greenText}/> : <AlertCircle size={18} color={COLORS.redText}/>}
                   <Text style={[styles.feedTitle, { color: selectedOption === question.correctAnswer ? COLORS.greenText : COLORS.redText }]}>
                     {selectedOption === question.correctAnswer ? "Bonne réponse !" : "Mauvaise réponse"}
                   </Text>
                 </View>
                 <Text style={styles.feedText}>{question.explanation}</Text>
              </View>
            )}
            
          </View>
          {/* Espace vide pour ne pas cacher le dernier élément sous le bouton fixe */}
          <View style={{ height: 100 }} /> 
        </ScrollView>
      </View>

      {/* --- BOUTON FOOTER FIXE --- */}
      <View style={styles.stickyFooter}>
        {!isChecked ? (
          <TouchableOpacity 
            style={[styles.mainBtn, selectedOption === null && styles.disabledBtn]} 
            onPress={handleValidate}
            disabled={selectedOption === null}
          >
            <Text style={styles.mainBtnText}>Valider</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.mainBtn} onPress={handleNext}>
            <Text style={styles.mainBtnText}>
              {currentStep < module.questions.length - 1 ? "Suivant" : "Résultats"}
            </Text>
            {currentStep < module.questions.length - 1 ? <ArrowRight size={20} color="#fff" /> : <Flag size={20} color="#fff" />}
          </TouchableOpacity>
        )}
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 20 },

  // Header
  header: { marginBottom: 20 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 },
  moduleTag: { fontSize: 12, fontWeight: '700', color: '#7f8c8d', backgroundColor: 'rgba(255,255,255,0.6)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, overflow:'hidden' },
  stepText: { fontSize: 14, fontWeight: '700', color: COLORS.dark },
  progressBarBg: { height: 8, backgroundColor: '#dfe6e9', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },

  // Card
  card: {
    backgroundColor: '#fff', borderRadius: 24, padding: 25,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 8,
  },
  
  // Image (Ajusté pour être joli)
  imageContainer: { width: '100%', height: 200, marginBottom: 20, borderRadius: 12, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  questionImage: { width: '100%', height: '100%' },

  questionText: { fontSize: 20, fontWeight: '700', color: COLORS.dark, marginBottom: 25, lineHeight: 28 },

  // Options
  optionsList: { gap: 12, marginBottom: 25 },
  optionBtn: {
    padding: 16, backgroundColor: '#f8f9fa', borderWidth: 2, borderColor: '#e9ecef', borderRadius: 14,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  optionText: { fontSize: 15, fontWeight: '600', color: COLORS.dark, flex: 1 },

  // Feedback
  feedbackBox: { padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1 },
  feedSuccess: { backgroundColor: COLORS.greenBg, borderColor: COLORS.greenBg },
  feedError: { backgroundColor: COLORS.redBg, borderColor: COLORS.redBg },
  feedHeader: { flexDirection: 'row', gap: 8, marginBottom: 5, alignItems: 'center' },
  feedTitle: { fontWeight: '700', fontSize: 14 },
  feedText: { fontSize: 13, color: COLORS.dark },

  // STICKY FOOTER (Le bouton qui flotte en bas)
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 30, // Espace pour les iPhone récents (barre blanche en bas)
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  mainBtn: {
    backgroundColor: COLORS.dark, paddingVertical: 15, borderRadius: 12,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
    shadowColor: COLORS.dark, shadowOffset: {width:0, height:4}, shadowOpacity:0.3, shadowRadius:5, elevation:4
  },
  disabledBtn: { opacity: 0.5 },
  mainBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // Results View
  resultCard: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, marginTop: 40 },
  resultTitle: { fontSize: 28, fontWeight: '800', color: COLORS.dark, marginTop: 20, marginBottom: 5 },
  resultSub: { fontSize: 16, color: '#7f8c8d', textAlign: 'center', marginBottom: 20 },
  scoreDisplay: { fontSize: 50, fontWeight: '900', marginBottom: 30 },
  resultActions: { flexDirection: 'row', gap: 15, width: '100%', justifyContent: 'center' },
  btnAction: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  btnFilled: { backgroundColor: COLORS.dark },
  btnOutline: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#ecf0f1' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});