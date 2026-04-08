"use client";

import { useState } from "react";
import { 
  Copy, 
  Download, 
  FileCheck, 
  CheckCircle2,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface A4ResultBlockProps {
  content: string;
  isGenerating?: boolean;
}

export default function A4ResultBlock({ content, isGenerating = false }: A4ResultBlockProps) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "ma-lettre-motivai.txt";
    document.body.appendChild(element);
    element.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="w-full flex flex-col items-center gap-12 py-12">
      {/* Premium Controls */}
      {!isGenerating && content && (
        <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-6 duration-1000">
          <div className="flex items-center gap-px bg-white/40 backdrop-blur-xl p-1 rounded-full border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
              className="rounded-full h-10 px-6 gap-3 hover:bg-white transition-all text-[10px] uppercase font-bold tracking-widest text-primary/60 hover:text-primary"
            >
              {copied ? <FileCheck className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "En mémoire" : "Copier"}
            </Button>
            <div className="w-[1px] h-4 bg-black/[0.05]" />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDownload}
              className="rounded-full h-10 px-6 gap-3 hover:bg-white transition-all text-[10px] uppercase font-bold tracking-widest text-primary/60 hover:text-primary"
            >
              <Download className="w-3 h-3" />
              Document .txt
            </Button>
          </div>
          
          {(copied || downloaded) && (
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-emerald-600 animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-3 h-3" />
              {copied ? "Succès de la copie" : "Document archivé"}
            </div>
          )}
        </div>
      )}

      {/* The Paper Block */}
      <div className="a4-container scale-95 lg:scale-100 origin-top transition-transform duration-1000">
        {/* Decorative Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="space-y-1">
            <div className="h-1.5 w-12 bg-primary/10 rounded-full" />
            <div className="h-1 w-8 bg-primary/5 rounded-full" />
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/20">
            Document Personnel • MotivAI
          </div>
        </div>

        {/* The Content */}
        <div className="whitespace-pre-wrap font-serif text-[15px] leading-[1.8] text-primary/90 flex-grow selection:bg-primary/5">
          {content}
          {isGenerating && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-primary/30 animate-pulse align-middle" />
          )}
        </div>

        {/* Human Touch - Signature Block */}
        {!isGenerating && content && (
          <div className="mt-20 pt-10 border-t border-black/[0.03] flex justify-between items-end">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-primary/30">
                 <Bookmark className="w-3 h-3" />
                 Prêt pour l'envoi
               </div>
            </div>
            <div className="text-right space-y-2 opacity-20">
               <div className="font-serif italic text-lg leading-none">Votre Signature</div>
               <div className="h-[1px] w-32 bg-primary/40 mx-auto ml-auto" />
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isGenerating && !content && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
             <div className="flex flex-col items-center gap-6 text-center animate-in fade-in zoom-in-95">
                <PenTool className="w-12 h-12 text-primary/20 animate-bounce" />
                <div className="space-y-1">
                   <p className="font-serif italic text-lg text-primary/60">Analyse de l'âme du poste...</p>
                   <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/30">La plume est en mouvement</p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PenTool({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z"/><path d="m2 2 5 2.25"/><path d="m11 11-1 4"/><path d="m11 11 4-1"/>
    </svg>
  );
}
