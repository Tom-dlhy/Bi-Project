"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    TrendingUp,
    Lightbulb,
    Target,
    Zap,
    Users,
    Brain,
    BarChart3,
    Shield,
    Globe,
    MessageSquarePlus,
    Clock,
    CheckCircle2,
    Circle,
    ArrowRight,
} from "lucide-react";

// Données des axes d'amélioration
const improvementAxes = [
    {
        id: 1,
        title: "Analyse de Sentiment",
        description: "Intégrer une analyse de sentiment en temps réel pour détecter la satisfaction des utilisateurs et adapter les réponses.",
        icon: Brain,
        priority: "Haute",
        priorityColor: "bg-red-100 text-red-700 border-red-200",
        effort: 70,
        impact: 85,
        status: "planned",
        category: "IA & NLP",
    },
    {
        id: 2,
        title: "Feedback Loop Automatique",
        description: "Système de collecte automatique des retours utilisateurs pour améliorer continuellement la base de connaissances.",
        icon: MessageSquarePlus,
        priority: "Haute",
        priorityColor: "bg-red-100 text-red-700 border-red-200",
        effort: 50,
        impact: 90,
        status: "in-progress",
        category: "UX",
    },
    {
        id: 3,
        title: "Dashboard Analytics Avancé",
        description: "Tableaux de bord interactifs avec KPIs en temps réel, tendances et alertes personnalisables.",
        icon: BarChart3,
        priority: "Moyenne",
        priorityColor: "bg-amber-100 text-amber-700 border-amber-200",
        effort: 60,
        impact: 75,
        status: "planned",
        category: "BI",
    },
    {
        id: 4,
        title: "Multi-langues",
        description: "Support de l'anglais et d'autres langues pour les étudiants internationaux du Pôle.",
        icon: Globe,
        priority: "Moyenne",
        priorityColor: "bg-amber-100 text-amber-700 border-amber-200",
        effort: 80,
        impact: 65,
        status: "planned",
        category: "Internationalisation",
    },
    {
        id: 5,
        title: "Authentification SSO",
        description: "Intégration avec le SSO du Pôle Léonard de Vinci pour personnaliser les réponses selon le profil étudiant.",
        icon: Shield,
        priority: "Haute",
        priorityColor: "bg-red-100 text-red-700 border-red-200",
        effort: 65,
        impact: 80,
        status: "planned",
        category: "Sécurité",
    },
    {
        id: 6,
        title: "Temps de Réponse < 1s",
        description: "Optimisation du pipeline RAG pour atteindre des temps de réponse inférieurs à 1 seconde.",
        icon: Clock,
        priority: "Basse",
        priorityColor: "bg-green-100 text-green-700 border-green-200",
        effort: 40,
        impact: 60,
        status: "completed",
        category: "Performance",
    },
];

// KPIs de la roadmap
const roadmapKPIs = [
    { label: "Axes identifiés", value: "6", icon: Target, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { label: "En cours", value: "1", icon: Zap, color: "text-amber-600", bgColor: "bg-amber-50" },
    { label: "Complétés", value: "1", icon: CheckCircle2, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { label: "Impact moyen", value: "76%", icon: TrendingUp, color: "text-blue-600", bgColor: "bg-blue-50" },
];

// Statut badge
const StatusBadge = ({ status }: { status: string }) => {
    const config = {
        "planned": { label: "Planifié", className: "bg-slate-100 text-slate-600 border-slate-200" },
        "in-progress": { label: "En cours", className: "bg-blue-100 text-blue-700 border-blue-200" },
        "completed": { label: "Terminé", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    };
    const { label, className } = config[status as keyof typeof config] || config["planned"];
    return <Badge variant="outline" className={className}>{label}</Badge>;
};

export default function ImprovementAxes() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                        <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Axes d'Amélioration</h3>
                        <p className="text-sm text-slate-500">Roadmap des évolutions du projet Intelligent Help Center</p>
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 md:grid-cols-4">
                {roadmapKPIs.map((kpi, index) => (
                    <Card key={index} className="border-0 shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                                    <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
                                    <p className="text-xs text-slate-500">{kpi.label}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Liste des axes d'amélioration */}
            <div className="grid gap-4 md:grid-cols-2">
                {improvementAxes.map((axis) => (
                    <Card key={axis.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg">
                                        <axis.icon className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-semibold">{axis.title}</CardTitle>
                                        <Badge variant="outline" className="mt-1 text-xs">
                                            {axis.category}
                                        </Badge>
                                    </div>
                                </div>
                                <StatusBadge status={axis.status} />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <CardDescription className="text-sm mb-4">
                                {axis.description}
                            </CardDescription>

                            {/* Métriques */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">Effort estimé</span>
                                    <span className="font-medium text-slate-700">{axis.effort}%</span>
                                </div>
                                <Progress value={axis.effort} className="h-1.5" />

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">Impact attendu</span>
                                    <span className="font-medium text-emerald-600">{axis.impact}%</span>
                                </div>
                                <Progress value={axis.impact} className="h-1.5 [&>div]:bg-emerald-500" />
                            </div>

                            {/* Priorité */}
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                                <span className="text-xs text-slate-500">Priorité</span>
                                <Badge variant="outline" className={axis.priorityColor}>
                                    {axis.priority}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Timeline visuelle */}
            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-600" />
                        Chronologie de Déploiement
                    </CardTitle>
                    <CardDescription>Vision stratégique des évolutions prévues</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />

                        {/* Timeline items */}
                        <div className="space-y-6">
                            {/* Q1 2025 */}
                            <div className="relative flex items-start gap-4 pl-10">
                                <div className="absolute left-2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-slate-800">Q1 2025</span>
                                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200" variant="outline">Terminé</Badge>
                                    </div>
                                    <p className="text-sm text-slate-600">Optimisation des performances (temps de réponse &lt; 1s)</p>
                                </div>
                            </div>

                            {/* Q2 2025 */}
                            <div className="relative flex items-start gap-4 pl-10">
                                <div className="absolute left-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow animate-pulse" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-slate-800">Q2 2025</span>
                                        <Badge className="bg-blue-100 text-blue-700 border-blue-200" variant="outline">En cours</Badge>
                                    </div>
                                    <p className="text-sm text-slate-600">Feedback Loop Automatique & Analytics Avancé</p>
                                </div>
                            </div>

                            {/* Q3 2025 */}
                            <div className="relative flex items-start gap-4 pl-10">
                                <div className="absolute left-2 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-slate-800">Q3 2025</span>
                                        <Badge variant="outline">Planifié</Badge>
                                    </div>
                                    <p className="text-sm text-slate-600">Analyse de Sentiment & Authentification SSO</p>
                                </div>
                            </div>

                            {/* Q4 2025 */}
                            <div className="relative flex items-start gap-4 pl-10">
                                <div className="absolute left-2 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-slate-800">Q4 2025</span>
                                        <Badge variant="outline">Planifié</Badge>
                                    </div>
                                    <p className="text-sm text-slate-600">Support Multi-langues pour l'internationalisation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
