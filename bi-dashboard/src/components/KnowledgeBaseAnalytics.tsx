"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";

// Import dynamique pour D3
const KnowledgeGraph = dynamic(() => import("@/components/KnowledgeGraph"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 text-slate-400">Chargement D3...</div>
});

export default function KnowledgeBaseAnalytics() {
    return (
        <div className="space-y-4">
            {/* Zone D3.js Spécifique */}
            <div className="grid grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Visualisation de la Base de Connaissance (D3.js)</CardTitle>
                        <CardDescription>Représentation vectorielle des clusters de documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <KnowledgeGraph />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}