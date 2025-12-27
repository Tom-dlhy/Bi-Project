"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { recentQuestionsLog } from "@/lib/data";

const ITEMS_PER_PAGE = 10;

export default function RecentLogs() {
    const [currentPage, setCurrentPage] = useState(1);

    // Calcul de la pagination
    const totalPages = Math.ceil(recentQuestionsLog.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentLogs = recentQuestionsLog.slice(startIndex, endIndex);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <HelpCircle className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <CardTitle>Liste des Questions Disponibles</CardTitle>
                        <CardDescription>
                            Questions fréquemment posées par les étudiants auxquelles le chatbot peut répondre.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-700">Question</TableHead>
                                <TableHead className="w-[220px] font-semibold text-slate-700">Catégorie</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentLogs.map((log, index) => (
                                <TableRow
                                    key={log.id}
                                    className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                                >
                                    <TableCell className="py-4">
                                        <span className="text-slate-800">{log.question}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className="bg-indigo-50 text-indigo-700 border-indigo-200 border whitespace-nowrap"
                                        >
                                            {log.topic}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500">
                        {startIndex + 1} - {Math.min(endIndex, recentQuestionsLog.length)} sur {recentQuestionsLog.length} questions
                    </p>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="h-8 w-8 p-0 cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4 cursor-pointer" />
                        </Button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className={`cursor-pointer h-8 w-8 p-0 ${page === currentPage
                                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                        : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="h-8 w-8 p-0 cursor-pointer"
                        >
                            <ChevronRight className="h-4 w-4 cursor-pointer" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}