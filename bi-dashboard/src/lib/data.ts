// --- Données simulées pour le Dashboard BI du Chatbot ---

// KPIs principaux
export const kpiData = {
    totalQuestions: 1248,
    questionsTrend: "+20.1%",
    averageResponseTime: "1.8s",
    responseTimeTarget: "< 2.0s",
    documentsIndexed: 400,
    documentsSource: "Synchronisé avec Qdrant",
    satisfactionRate: 92,
    satisfactionBasis: "Basé sur les votes (pouce haut/bas)",
};

// Données d'activité hebdomadaire (Questions posées par jour)
export const weeklyActivityData = [
    { name: "Lun", questions: 120, answered: 115, unanswered: 5 },
    { name: "Mar", questions: 145, answered: 140, unanswered: 5 },
    { name: "Mer", questions: 132, answered: 125, unanswered: 7 },
    { name: "Jeu", questions: 180, answered: 172, unanswered: 8 },
    { name: "Ven", questions: 155, answered: 150, unanswered: 5 },
    { name: "Sam", questions: 40, answered: 38, unanswered: 2 },
    { name: "Dim", questions: 30, answered: 29, unanswered: 1 },
];

// Sujets les plus fréquents (classification des intentions)
export const topicsData = [
    { name: "ImaginR / Transports", value: 35, color: "#6366f1" },
    { name: "Certificats Scolarité", value: 25, color: "#22c55e" },
    { name: "Conventions Stage", value: 20, color: "#f59e0b" },
    { name: "Planning / Salles", value: 15, color: "#ec4899" },
    { name: "Connexion WiFi", value: 5, color: "#06b6d4" },
];

// Performance du RAG (Latence au fil du temps)
export const performanceData = [
    { time: "08:00", latency: 1.1, requests: 45 },
    { time: "09:00", latency: 1.3, requests: 78 },
    { time: "10:00", latency: 1.2, requests: 95 },
    { time: "11:00", latency: 1.5, requests: 120 },
    { time: "12:00", latency: 2.8, requests: 180 },
    { time: "13:00", latency: 2.1, requests: 145 },
    { time: "14:00", latency: 1.4, requests: 110 },
    { time: "15:00", latency: 1.3, requests: 98 },
    { time: "16:00", latency: 1.2, requests: 85 },
    { time: "17:00", latency: 1.1, requests: 60 },
];

export const recentQuestionsLog = [
    {
        id: "Q-101",
        timestamp: "2025-12-17 14:45:10",
        question: "Un certificat médical excuse-t-il mon absence ?",
        topic: "Scolarité > Absences",
        responseTime: "0.8s",
        satisfaction: "negative",
        status: "answered",
    },
    {
        id: "Q-102",
        timestamp: "2025-12-17 14:30:22",
        question: "Quelle est la durée min. de l'international en alternance ?",
        topic: "Alternance",
        responseTime: "1.1s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-103",
        timestamp: "2025-12-17 14:15:05",
        question: "Peut-on faire deux stages en labo de recherche ?",
        topic: "Stages",
        responseTime: "1.5s",
        satisfaction: "neutral",
        status: "answered",
    },
    {
        id: "Q-104",
        timestamp: "2025-12-17 13:55:40",
        question: "Comment signaler un acte de harcèlement (VSS) ?",
        topic: "Vie étudiante > Santé",
        responseTime: "0.5s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-105",
        timestamp: "2025-12-17 13:20:12",
        question: "J'ai oublié d'émarger, que faire ?",
        topic: "Absences",
        responseTime: "1.2s",
        satisfaction: "negative",
        status: "answered",
    },
    {
        id: "Q-106",
        timestamp: "2025-12-17 12:58:33",
        question: "Quelle est la gratification minimale pour un stage ?",
        topic: "Stages",
        responseTime: "0.9s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-107",
        timestamp: "2025-12-17 12:42:18",
        question: "Combien d'absences sont autorisées par semestre ?",
        topic: "Absences",
        responseTime: "0.7s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-108",
        timestamp: "2025-12-17 12:15:45",
        question: "Où se trouve l'infirmerie du campus ?",
        topic: "Vie étudiante > Santé",
        responseTime: "0.4s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-109",
        timestamp: "2025-12-17 11:50:22",
        question: "Comment remplir le livret d'apprentissage ?",
        topic: "Alternance",
        responseTime: "1.8s",
        satisfaction: "neutral",
        status: "answered",
    },
    {
        id: "Q-110",
        timestamp: "2025-12-17 11:28:10",
        question: "Quelle est la durée maximale d'un stage ?",
        topic: "Stages",
        responseTime: "0.6s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-111",
        timestamp: "2025-12-17 11:05:55",
        question: "Un bulletin d'hospitalisation excuse-t-il les absences ?",
        topic: "Absences",
        responseTime: "1.0s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-112",
        timestamp: "2025-12-17 10:42:30",
        question: "Comment contacter le référent handicap ?",
        topic: "Vie étudiante > Santé",
        responseTime: "0.8s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-113",
        timestamp: "2025-12-17 10:18:15",
        question: "Peut-on faire un stage dans une structure de recherche ?",
        topic: "Stages",
        responseTime: "1.3s",
        satisfaction: "neutral",
        status: "answered",
    },
    {
        id: "Q-114",
        timestamp: "2025-12-17 09:55:40",
        question: "Les alternants ont-ils un quota d'absences ?",
        topic: "Alternance",
        responseTime: "0.9s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-115",
        timestamp: "2025-12-17 09:32:25",
        question: "Que faire en cas de fraude à l'émargement ?",
        topic: "Absences",
        responseTime: "1.1s",
        satisfaction: "negative",
        status: "answered",
    },
    {
        id: "Q-116",
        timestamp: "2025-12-17 09:10:50",
        question: "Comment obtenir une convention de stage ?",
        topic: "Stages",
        responseTime: "1.4s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-117",
        timestamp: "2025-12-17 08:48:35",
        question: "Quelle est la plateforme de signalement VSS ?",
        topic: "Vie étudiante > Santé",
        responseTime: "0.5s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-118",
        timestamp: "2025-12-17 08:25:12",
        question: "Durée minimale de mobilité internationale en alternance ?",
        topic: "Alternance",
        responseTime: "1.2s",
        satisfaction: "positive",
        status: "answered",
    },
    {
        id: "Q-119",
        timestamp: "2025-12-17 08:05:40",
        question: "Comment justifier une absence pour raisons médicales ?",
        topic: "Absences",
        responseTime: "1.0s",
        satisfaction: "neutral",
        status: "answered",
    },
    {
        id: "Q-120",
        timestamp: "2025-12-17 07:42:18",
        question: "Peut-on cumuler stage et alternance la même année ?",
        topic: "Stages",
        responseTime: "1.6s",
        satisfaction: "negative",
        status: "answered",
    }
];

export const knowledgeGraphData = {
    nodes: [
        { id: "Pôle De Vinci", group: 1, label: "Pôle De Vinci", size: 45 },

        // Catégorie Absences
        { id: "Absences", group: 2, label: "Gestion des Absences", size: 35 },
        { id: "Quota", group: 2, label: "Quota (18 absences)", size: 18 },
        { id: "Hospitalisation", group: 2, label: "Bulletin Hospitalisation", size: 15 },
        { id: "Emargement", group: 2, label: "Fraude à l'émargement", size: 15 },

        // Catégorie Stages
        { id: "Stages", group: 3, label: "Stages & Conventions", size: 32 },
        { id: "DureeMax", group: 3, label: "6 mois maximum", size: 16 },
        { id: "Gratification", group: 3, label: "Gratification (4,05€/h)", size: 14 },
        { id: "Recherche", group: 3, label: "Structure Recherche", size: 16 },

        // Catégorie Alternance
        { id: "Alternance", group: 4, label: "Alternance / Apprentissage", size: 30 },
        { id: "Livret", group: 4, label: "Livret d'apprentissage", size: 16 },
        { id: "InterAlternant", group: 4, label: "Mobilité (9 semaines)", size: 18 },

        // Catégorie Vie Étudiante & Santé
        { id: "SanteVSS", group: 5, label: "Santé & VSS", size: 28 },
        { id: "Signalement", group: 5, label: "Plateforme Signalement", size: 18 },
        { id: "Infirmerie", group: 5, label: "Infirmerie (E200)", size: 14 },
        { id: "Handicap", group: 5, label: "Référent Handicap", size: 16 }
    ],
    links: [
        // Liens vers le centre
        { source: "Pôle De Vinci", target: "Absences", value: 10 },
        { source: "Pôle De Vinci", target: "Stages", value: 8 },
        { source: "Pôle De Vinci", target: "Alternance", value: 9 },
        { source: "Pôle De Vinci", target: "SanteVSS", value: 7 },

        // Liens Absences
        { source: "Absences", target: "Quota", value: 5 },
        { source: "Absences", target: "Hospitalisation", value: 4 },
        { source: "Absences", target: "Emargement", value: 4 },

        // Liens Stages
        { source: "Stages", target: "DureeMax", value: 5 },
        { source: "Stages", target: "Gratification", value: 3 },
        { source: "Stages", target: "Recherche", value: 4 },

        // Liens Alternance
        { source: "Alternance", target: "Livret", value: 5 },
        { source: "Alternance", target: "InterAlternant", value: 6 },

        // Liens Santé/VSS
        { source: "SanteVSS", target: "Signalement", value: 5 },
        { source: "SanteVSS", target: "Infirmerie", value: 4 },
        { source: "SanteVSS", target: "Handicap", value: 4 },

        // Liens croisés importants
        { source: "Alternance", target: "Absences", value: 3 }, // Pas de quota pour les alternants
        { source: "Signalement", target: "SanteVSS", value: 2 }
    ]
};

export const groupColors = {
    1: "#4f46e5", // Pôle - Indigo
    2: "#ef4444", // Absences - Red (critique)
    3: "#3b82f6", // Stages - Blue
    4: "#f59e0b", // Alternance - Amber
    5: "#10b981", // Santé/VSS - Emerald
};