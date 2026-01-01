// data/QuizData.ts

export interface Question {
  id: number;
  image?: any; // Changé en 'any' pour accepter les require() ou les URI
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
        // Pour une image locale, utilise require :
        // image: require('../assets/priority/rout11.png'),
        
        // Pour l'instant, je mets une image internet pour que ça marche direct :
        image: "https://images.unsplash.com/photo-1566579092497-6a9c227d8e62?q=80&w=1000&auto=format&fit=crop",
        question: "Dans quel ordre les véhicules passent-ils ?",
        options: ["Voiture Rouge, puis Bleue", "Voiture Bleue, puis Rouge", "Les deux en même temps"],
        correctAnswer: 0,
        explanation: "La voiture rouge est sur la voie principale (indiquée par le panneau). Elle passe en premier."
      },
      {
        id: 12,
        image: "https://images.unsplash.com/photo-1562142289-5435b8042456?q=80&w=1000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1625244503713-332306c59600?q=80&w=1000&auto=format&fit=crop",
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
        image: "https://plus.unsplash.com/premium_photo-1661596707328-97cb002c9183?q=80&w=1000&auto=format&fit=crop",
        question: "Première action sur un accident ?",
        options: ["Alerter", "Secourir", "Protéger (Baliser)"],
        correctAnswer: 2,
        explanation: "Il faut d'abord PROTÉGER la zone pour éviter un sur-accident."
      }
    ]
  }
];