"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Sparkles } from "lucide-react";

// Import des composants modulaires
import TechStackOverview from "@/components/TechStackOverview";
import KnowledgeBaseAnalytics from "@/components/KnowledgeBaseAnalytics";
import RecentLogs from "@/components/RecentLogs";
import ImprovementAxes from "@/components/ImprovementAxes";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            Intelligent Help Center
          </h2>
          <p className="text-muted-foreground mt-1">
            Équipe 21 - Track Automation
          </p>
          <p className="text-muted-foreground mt-1">
            Tom Delahaye - Gabriel Carlotti - Alexandre Laroudie - Kentin Guillemot - Aymane Sfouli
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="architecture" className="space-y-4">
        <TabsList className="bg-white border p-1 h-12 w-full justify-start gap-2">
          <TabsTrigger value="architecture" className="cursor-pointer data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 px-4">
            Vue d'ensemble & Architecture
          </TabsTrigger>
          <TabsTrigger value="analytics" className="cursor-pointer data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 px-4">
            Données & Analytics
          </TabsTrigger>
          <TabsTrigger value="logs" className="cursor-pointer data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 px-4">
            Liste des Questions
          </TabsTrigger>
          <TabsTrigger value="improvements" className="cursor-pointer data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 px-4">
            Axes d'Amélioration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-4 animate-in fade-in-50 duration-500">
          <TechStackOverview />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 animate-in fade-in-50 duration-500">
          <KnowledgeBaseAnalytics />
        </TabsContent>

        <TabsContent value="logs" className="space-y-4 animate-in fade-in-50 duration-500">
          <RecentLogs />
        </TabsContent>

        <TabsContent value="improvements" className="space-y-4 animate-in fade-in-50 duration-500">
          <ImprovementAxes />
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-12 pt-6">
        <div className="flex justify-between items-center text-sm text-slate-500">
          <p>© 2025 Intelligent Help Center · ESILV Business Intelligence Project</p>
        </div>
      </footer>
    </div>
  );
}