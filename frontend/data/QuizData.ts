// data/QuizData.ts

export interface Question {
  id: number;
  image?: any; // 'any' permet d'accepter le require()
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
}

export const QUIZ_DATA: QuizModule[] = [
  {
    id: "priority",
    title: "Priorité & Intersections",
    description: "Maîtrisez les règles de passage et les intersections.",
    icon: "ArrowLeftRight",
    questions: [
      {
        id: 11,
        // ⚠️ Vérifie si c'est bien route1.png qui correspond à cette question
        image: require('../assets/images/quiz/rout1.png'), 
        question: "Dans quel ordre les véhicules passent-ils ?",
        options: ["Voiture Rouge, puis Bleue", "Voiture Bleue, puis Rouge", "Les deux en même temps"],
        correctAnswer: 0,
        explanation: "La voiture rouge est sur la voie principale (indiquée par le panneau). Elle passe en premier."
      },
      {
        id: 12,
        // Exemple : route2.png pour le stop
        image: require('../assets/images/quiz/rout2.png'),
        question: "Que signifie ce panneau ?",
        options: ["Céder le passage", "Arrêt absolu (STOP)", "Ralentir"],
        correctAnswer: 1,
        explanation: "Le panneau STOP impose l'arrêt absolu des roues à la limite de la chaussée."
      }
    ]
  },
  {
    id: "rules",
    title: "Règles de Circulation",
    description: "Positionnement, dépassement et vitesses.",
    icon: "BookOpen",
    questions: [
      {
        id: 21,
        // Exemple : route3.png
        image: require('../assets/images/quiz/rout3.png'),
        question: "Le dépassement est-il autorisé ?",
        options: ["Oui", "Non", "Seulement pour les motos"],
        correctAnswer: 1,
        explanation: "La ligne continue interdit formellement tout dépassement."
      }
    ]
  },
  {
    id: "firstaid",
    title: "Secourisme",
    description: "Les gestes qui sauvent (PAS : Protéger, Alerter, Secourir).",
    icon: "HeartPulse",
    questions: [
      {
        id: 30,
        // Exemple : route4.png
        image: require('../assets/images/quiz/rout4.png'),
        question: "Première action sur un accident ?",
        options: ["Alerter", "Secourir", "Protéger (Baliser)"],
        correctAnswer: 2,
        explanation: "Il faut d'abord PROTÉGER la zone pour éviter un sur-accident."
      }
    ]
  }
];