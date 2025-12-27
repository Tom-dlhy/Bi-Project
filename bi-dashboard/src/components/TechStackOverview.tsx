"use client";

import React, { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  MarkerType,
  ConnectionLineType,
  EdgeProps,
  getBezierPath,
} from "reactflow";
import "reactflow/dist/style.css";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Layout,
  Zap,
  Bot,
  Sparkles,
} from "lucide-react";

// --- 1. DONNÉES DES NOEUDS ---
const nodeDetails = {
  openWebUI: {
    label: "Open WebUI",
    icon: Layout,
    logo: null,
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-400",
    textColor: "text-cyan-700",
    desc: "Le Cœur du système. Orchestre toutes les interactions entre l'utilisateur et les services.",
    tech: "Hub Central",
  },
  userQuery: {
    label: "User Query",
    icon: MessageSquare,
    logo: null,
    bgColor: "bg-slate-50",
    borderColor: "border-slate-300",
    textColor: "text-slate-700",
    desc: "Entrée de la question initiale de l'utilisateur via l'interface chat.",
    tech: "Input",
  },
  docling: {
    label: "Docling",
    icon: null,
    logo: "/logo/docling.png",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    textColor: "text-orange-700",
    desc: "Moteur d'extraction pour parser les documents PDF et les convertir en Markdown.",
    tech: "Ingestion",
  },
  qdrant: {
    label: "Qdrant",
    icon: null,
    logo: "/logo/qdrant.png",
    bgColor: "bg-red-50",
    borderColor: "border-red-300",
    textColor: "text-red-700",
    desc: "Base de données vectorielle pour la recherche sémantique ultra-rapide.",
    tech: "Vector DB",
  },
  postgres: {
    label: "PostgreSQL",
    icon: null,
    logo: "/logo/postgres.png",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    textColor: "text-blue-700",
    desc: "Stockage persistant de l'historique des conversations et métadonnées.",
    tech: "History DB",
  },
  redis: {
    label: "Redis",
    icon: null,
    logo: "/logo/redis2.png",
    bgColor: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-600",
    desc: "Cache mémoire haute performance pour les sessions actives.",
    tech: "Cache",
  },
  litellm: {
    label: "LiteLLM",
    icon: Zap,
    logo: null,
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    textColor: "text-purple-700",
    desc: "Passerelle API unifiée pour router les requêtes vers IBM Watsonx.ai.",
    tech: "Gateway",
  },
  watsonx: {
    label: "Watsonx.ai",
    icon: null,
    logo: "/logo/ibm_cloud.png",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-300",
    textColor: "text-pink-700",
    desc: "Plateforme IA IBM avec modèle Llama-3.3-70B pour la génération de texte.",
    tech: "IBM Cloud",
  },
  answer: {
    label: "Response",
    icon: Bot,
    logo: null,
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-300",
    textColor: "text-emerald-700",
    desc: "Réponse générée enrichie par le contexte RAG, formatée en HTML.",
    tech: "Output",
  },
};

// --- 2. CUSTOM EDGE COMPONENT (Courbes élégantes) ---
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  data,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.3,
  });

  const isAnimated = data?.animated;
  const strokeColor = (style?.stroke as string) || "#94a3b8";

  return (
    <>
      {/* Ombre de la ligne */}
      <path
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={6}
        strokeOpacity={0.1}
        style={{ filter: "blur(4px)" }}
      />
      {/* Ligne principale */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={style?.strokeWidth || 2}
        strokeDasharray={style?.strokeDasharray as string}
        markerEnd={markerEnd as string}
        className={isAnimated ? "animate-pulse" : ""}
      />
      {/* Label */}
      {label && (
        <g transform={`translate(${labelX}, ${labelY})`}>
          <rect
            x={-20}
            y={-10}
            width={40}
            height={20}
            rx={6}
            fill="white"
            stroke={strokeColor}
            strokeWidth={1}
          />
          <text
            x={0}
            y={4}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill={strokeColor}
          >
            {label as string}
          </text>
        </g>
      )}
    </>
  );
};

const edgeTypes = { custom: CustomEdge };

// --- 3. CUSTOM NODE COMPONENT (Pastel + Logos) ---
const CustomNode = ({ data }: { data: { type: string } }) => {
  const details = nodeDetails[data.type as keyof typeof nodeDetails];

  if (!details) {
    return <div className="p-2 bg-red-100 text-red-700 text-xs rounded">?</div>;
  }

  const Icon = details.icon;
  const isCenter = data.type === "openWebUI";

  return (
    <div
      className={`
        relative cursor-pointer transition-all duration-200
        ${isCenter ? "hover:scale-105" : "hover:scale-110 hover:-translate-y-0.5"}
      `}
    >
      {/* Main card */}
      <div
        className={`
          ${details.bgColor} ${details.borderColor} ${details.textColor}
          ${isCenter ? "w-36 h-36 rounded-full border-4" : "rounded-xl border-2 px-4 py-3 min-w-[120px]"}
          flex flex-col items-center justify-center gap-2 text-center
          shadow-sm hover:shadow-md transition-shadow
        `}
      >
        {/* Handles */}
        <Handle type="target" position={Position.Top} id="top" className="!bg-slate-300 !border-slate-400 !w-2 !h-2" />
        <Handle type="source" position={Position.Top} id="top" className="!bg-slate-300 !border-slate-400 !w-2 !h-2" />
        <Handle type="target" position={Position.Bottom} id="bottom" className="!bg-slate-300 !border-slate-400 !w-2 !h-2" />
        <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-slate-300 !border-slate-400 !w-2 !h-2" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-slate-300 !border-slate-400 !w-2 !h-2" />
        <Handle type="source" position={Position.Left} id="left" className="!bg-slate-300 !border-slate-400 !w-2 !h-2" />
        <Handle type="target" position={Position.Right} id="right" className="!bg-slate-300 !border-slate-400 !w-2 !h-2" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-slate-300 !border-slate-400 !w-2 !h-2" />

        {/* Icon or Logo */}
        <div className={`${isCenter ? "w-12 h-12" : "w-8 h-8"} flex items-center justify-center`}>
          {details.logo ? (
            <Image
              src={details.logo}
              alt={details.label}
              width={isCenter ? 40 : 28}
              height={isCenter ? 40 : 28}
              className="object-contain"
            />
          ) : Icon ? (
            <Icon className={`${isCenter ? "w-8 h-8" : "w-5 h-5"}`} />
          ) : null}
        </div>

        {/* Label */}
        <div>
          <p className={`${isCenter ? "text-sm" : "text-xs"} font-bold leading-tight`}>
            {details.label}
          </p>
          {!isCenter && (
            <p className="text-[9px] opacity-60 mt-0.5 uppercase tracking-wide font-medium">
              {details.tech}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

// --- 4. POSITIONS DES NOEUDS ---
const centerX = 450;
const centerY = 300;

const initialNodes: Node[] = [
  { id: "center", type: "custom", position: { x: centerX, y: centerY }, data: { type: "openWebUI" } },
  { id: "user", type: "custom", position: { x: centerX - 350, y: centerY + 30 }, data: { type: "userQuery" } },
  { id: "answer", type: "custom", position: { x: centerX + 350, y: centerY - 30 }, data: { type: "answer" } },
  { id: "docling", type: "custom", position: { x: centerX - 160, y: centerY - 200 }, data: { type: "docling" } },
  { id: "qdrant", type: "custom", position: { x: centerX + 160, y: centerY - 200 }, data: { type: "qdrant" } },
  { id: "postgres", type: "custom", position: { x: centerX - 200, y: centerY + 200 }, data: { type: "postgres" } },
  { id: "redis", type: "custom", position: { x: centerX + 60, y: centerY + 200 }, data: { type: "redis" } },
  { id: "litellm", type: "custom", position: { x: centerX + 300, y: centerY + 160 }, data: { type: "litellm" } },
  { id: "watson", type: "custom", position: { x: centerX + 520, y: centerY + 160 }, data: { type: "watsonx" } },
];

// --- 5. EDGES AVEC COURBES ÉLÉGANTES ---
const initialEdges: Edge[] = [
  // User → WebUI (flux principal)
  {
    id: "e1",
    source: "user",
    target: "center",
    sourceHandle: "right",
    targetHandle: "left",
    type: "custom",
    data: { animated: true },
    style: { stroke: "#0ea5e9", strokeWidth: 3 },
  },
  // WebUI ↔ Docling
  {
    id: "e2a",
    source: "center",
    target: "docling",
    sourceHandle: "top",
    targetHandle: "bottom",
    type: "custom",
    style: { stroke: "#f97316", strokeWidth: 2 },
  },
  // WebUI ↔ Qdrant
  {
    id: "e3a",
    source: "center",
    target: "qdrant",
    sourceHandle: "top",
    targetHandle: "bottom",
    type: "custom",
    style: { stroke: "#ef4444", strokeWidth: 2 },
  },
  // Docling → Qdrant
  {
    id: "e-doc-qdr",
    source: "docling",
    target: "qdrant",
    sourceHandle: "right",
    targetHandle: "left",
    type: "custom",
    style: { stroke: "#94a3b8", strokeWidth: 1.5, strokeDasharray: "4,4" },
    label: "Index",
  },
  // WebUI ↔ Postgres
  {
    id: "e4a",
    source: "center",
    target: "postgres",
    sourceHandle: "bottom",
    targetHandle: "top",
    type: "custom",
    style: { stroke: "#3b82f6", strokeWidth: 2, strokeDasharray: "6,3" },
  },
  // WebUI ↔ Redis
  {
    id: "e5a",
    source: "center",
    target: "redis",
    sourceHandle: "bottom",
    targetHandle: "top",
    type: "custom",
    style: { stroke: "#ef4444", strokeWidth: 2, strokeDasharray: "6,3" },
  },
  // WebUI → LiteLLM (flux IA)
  {
    id: "e6",
    source: "center",
    target: "litellm",
    sourceHandle: "right",
    targetHandle: "left",
    type: "custom",
    data: { animated: true },
    style: { stroke: "#a855f7", strokeWidth: 3 },
  },
  // LiteLLM ↔ Watsonx
  {
    id: "e7a",
    source: "litellm",
    target: "watson",
    sourceHandle: "right",
    targetHandle: "left",
    type: "custom",
    data: { animated: true },
    style: { stroke: "#ec4899", strokeWidth: 3 },
    label: "API",
  },
  // WebUI → Answer (sortie)
  {
    id: "e8",
    source: "center",
    target: "answer",
    sourceHandle: "right",
    targetHandle: "left",
    type: "custom",
    data: { animated: true },
    style: { stroke: "#10b981", strokeWidth: 3 },
  },
];

export default function TechStackOverview() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<{
    label: string;
    icon: React.ElementType | null;
    logo: string | null;
    desc: string;
    tech: string;
    bgColor: string;
    textColor: string;
  } | null>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const details = nodeDetails[node.data.type as keyof typeof nodeDetails];
    if (details) {
      setSelectedNode(details);
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-500" />
            Architecture Technique
          </h3>
          <p className="text-sm text-slate-500">Cliquez sur un composant pour voir les détails</p>
        </div>
      </div>

      {/* Graph Container - Light background */}
      <div className="relative h-[600px] w-full rounded-xl border border-slate-200 overflow-hidden bg-gradient-to-br from-slate-50 to-white shadow-sm">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          connectionLineType={ConnectionLineType.SmoothStep}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e2e8f0" gap={20} size={1} />
          <Controls className="!bg-white !border-slate-200 !rounded-lg !shadow-sm" />
        </ReactFlow>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 mb-2">Légende</p>
          <div className="flex flex-col gap-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 bg-cyan-500 rounded" />
              <span>Entrée utilisateur</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 bg-purple-500 rounded" />
              <span>Flux IA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 bg-emerald-500 rounded" />
              <span>Sortie</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 bg-slate-400 rounded" style={{ borderTop: "2px dashed #94a3b8" }} />
              <span>Base de données</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              {selectedNode?.logo ? (
                <Image src={selectedNode.logo} alt={selectedNode.label} width={28} height={28} />
              ) : selectedNode?.icon ? (
                <div className={`p-2 rounded-lg ${selectedNode.bgColor}`}>
                  <selectedNode.icon className={`w-5 h-5 ${selectedNode.textColor}`} />
                </div>
              ) : null}
              {selectedNode?.label}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {selectedNode?.tech}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className={`${selectedNode?.bgColor} p-4 rounded-xl text-sm ${selectedNode?.textColor} leading-relaxed border`}>
            {selectedNode?.desc}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}