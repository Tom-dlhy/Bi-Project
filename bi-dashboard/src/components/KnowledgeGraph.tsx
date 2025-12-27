"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { knowledgeGraphData, groupColors } from "@/lib/data";

interface Node extends d3.SimulationNodeDatum {
    id: string;
    group: number;
    label: string;
    size: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: string | Node;
    target: string | Node;
    value: number;
}

interface GraphData {
    nodes: Node[];
    links: Link[];
}

export default function KnowledgeGraph() {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 600, height: 450 });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width } = containerRef.current.getBoundingClientRect();
                setDimensions({ width: width, height: 450 });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!svgRef.current || dimensions.width === 0) return;

        // Clear previous content
        d3.select(svgRef.current).selectAll("*").remove();

        const { width, height } = dimensions;
        const svg = d3.select(svgRef.current);

        // Create a deep copy of the data to avoid mutation issues
        const data: GraphData = {
            nodes: knowledgeGraphData.nodes.map((d) => ({ ...d })),
            links: knowledgeGraphData.links.map((d) => ({ ...d })),
        };

        // Create gradient definitions for links
        const defs = svg.append("defs");

        // Glow filter for nodes
        const filter = defs
            .append("filter")
            .attr("id", "glow")
            .attr("x", "-50%")
            .attr("y", "-50%")
            .attr("width", "200%")
            .attr("height", "200%");

        filter
            .append("feGaussianBlur")
            .attr("stdDeviation", "3")
            .attr("result", "coloredBlur");

        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Create the simulation
        const simulation = d3
            .forceSimulation<Node>(data.nodes)
            .force(
                "link",
                d3
                    .forceLink<Node, Link>(data.links)
                    .id((d) => d.id)
                    .distance((d) => 80 - d.value * 3)
            )
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius((d) => (d as Node).size + 10));

        // Create container group for zoom
        const g = svg.append("g");

        // Add zoom behavior
        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 3])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

        // Create links
        const link = g
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr("stroke", "#94a3b8")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", (d) => Math.sqrt(d.value) * 1.5);

        // Create node groups
        const node = g
            .append("g")
            .attr("class", "nodes")
            .selectAll<SVGGElement, Node>("g")
            .data(data.nodes)
            .join("g")
            .style("cursor", "pointer")
            .call(
                d3
                    .drag<SVGGElement, Node>()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            );

        // Add circles to nodes
        node
            .append("circle")
            .attr("r", (d) => d.size / 2)
            .attr("fill", (d) => groupColors[d.group])
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .style("filter", (d) => (d.id === "ESILV" ? "url(#glow)" : "none"))
            .on("mouseenter", function (event, d) {
                setHoveredNode(d.id);
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", d.size / 2 + 5)
                    .style("filter", "url(#glow)");
            })
            .on("mouseleave", function (event, d) {
                setHoveredNode(null);
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", d.size / 2)
                    .style("filter", d.id === "ESILV" ? "url(#glow)" : "none");
            });

        // Add labels to nodes
        node
            .append("text")
            .text((d) => d.label)
            .attr("x", 0)
            .attr("y", (d) => d.size / 2 + 14)
            .attr("text-anchor", "middle")
            .attr("font-size", (d) => (d.size > 25 ? "11px" : "9px"))
            .attr("font-weight", (d) => (d.size > 25 ? "600" : "400"))
            .attr("fill", "#475569")
            .style("pointer-events", "none");

        // Drag functions
        function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        // Update positions on each tick
        simulation.on("tick", () => {
            link
                .attr("x1", (d) => (d.source as Node).x!)
                .attr("y1", (d) => (d.source as Node).y!)
                .attr("x2", (d) => (d.target as Node).x!)
                .attr("y2", (d) => (d.target as Node).y!);

            node.attr("transform", (d) => `translate(${d.x},${d.y})`);
        });

        return () => {
            simulation.stop();
        };
    }, [dimensions]);

    return (
        <div ref={containerRef} className="relative w-full">
            <svg
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg"
            />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-2">Catégories</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {Object.entries(groupColors).map(([group, color]) => {
                        const labels: Record<string, string> = {
                            "1": "ESILV",
                            "2": "ImaginR",
                            "3": "Scolarité",
                            "4": "Stages",
                            "5": "IT",
                            "6": "Planning",
                        };
                        return (
                            <div key={group} className="flex items-center gap-1.5">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="text-[10px] text-slate-600">{labels[group]}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Hover tooltip */}
            {hoveredNode && (
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200">
                    <p className="text-sm font-semibold text-slate-800">{hoveredNode}</p>
                    <p className="text-xs text-slate-500 mt-1">
                        Cliquez et glissez pour déplacer
                    </p>
                </div>
            )}
        </div>
    );
}
