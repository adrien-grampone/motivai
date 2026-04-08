"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CreditCard, 
  Loader2,
  FileText,
  User,
  Briefcase,
  Info,
  Lightbulb
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StepIndicator from "@/components/StepIndicator";
import A4ResultBlock from "@/components/A4ResultBlock";
import { cn } from "@/lib/utils";

const STEPS = ["L'Offre", "Votre Profil", "Rédaction"];

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] font-serif italic text-primary/40">Préparation de votre séance...</div>}>
      <GenerateContent />
    </Suspense>
  );
}

function GenerateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [hasUsedFree, setHasUsedFree] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [formData, setFormData] = useState({
    jobDescription: "",
    userExperience: "",
    userName: "",
    targetCompany: "",
  });

  useEffect(() => {
    // Check local storage for free use
    const used = localStorage.getItem("motivai_free_used");
    if (used === "true") {
      setHasUsedFree(true);
    }

    // Check if paid via query param
    if (searchParams.get("paid") === "true") {
      setIsPaid(true);
    }
  }, [searchParams]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayment = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
      });
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Erreur lors de la redirection vers Stripe.");
      setIsCheckingOut(false);
    }
  };

  const handleGenerate = async () => {
    if (hasUsedFree && !isPaid) return;

    setIsGenerating(true);
    setGeneratedContent("");
    setStep(3);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Generation failed");
      
      const reader = response.body?.getReader();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        setGeneratedContent((prev) => prev + chunk);
      }

      if (!hasUsedFree) {
        localStorage.setItem("motivai_free_used", "true");
        setHasUsedFree(true);
      }

    } catch (error) {
      console.error("Generation error:", error);
      alert("Erreur lors de la génération. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = !hasUsedFree || isPaid;

  return (
    <div className="container mx-auto px-6 py-24 max-w-6xl transition-all duration-700">
      <div className={cn("text-center space-y-4 transition-all duration-700", step === 3 ? "mb-10" : "mb-20")}>
        <h1 className="text-4xl lg:text-5xl font-serif">Processus de Création</h1>
        <p className="text-muted-foreground/60 text-sm uppercase tracking-widest font-bold">L&apos;expertise au service de votre avenir</p>
      </div>

      <StepIndicator currentStep={step} steps={STEPS} />

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          {step === 1 && (
            <Card className="premium-card animate-in fade-in slide-in-from-right-8 duration-700">
              <CardHeader className="pb-8 border-b border-black/[0.03]">
                <CardTitle className="text-2xl font-serif italic text-primary">Le Poste Visé</CardTitle>
                <CardDescription className="text-sm font-sans opacity-70">
                  Décrivez l&apos;opportunité pour que nous puissions aligner votre discours.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="targetCompany" className="text-[10px] uppercase tracking-widest font-bold text-primary/40">Entreprise Cible</Label>
                  <Input 
                    id="targetCompany" 
                    placeholder="Ex: Ateliers d'Architecture de Paris" 
                    className="bg-transparent border-t-0 border-x-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg"
                    value={formData.targetCompany}
                    onChange={(e) => setFormData({...formData, targetCompany: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="jobDesc" className="text-[10px] uppercase tracking-widest font-bold text-primary/40">Description de l&apos;offre</Label>
                  <Textarea 
                    id="jobDesc" 
                    placeholder="Collez ici l'annonce ou les points clés..." 
                    className="min-h-[300px] bg-secondary/20 border-none rounded-2xl p-6 focus-visible:ring-1 focus-visible:ring-primary/20 transition-all font-serif italic leading-relaxed"
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-8 border-t border-black/[0.03]">
                <Button 
                  onClick={handleNext} 
                  disabled={!formData.jobDescription}
                  className="rounded-full px-12 h-12 text-[10px] uppercase tracking-[0.2em] font-bold"
                >
                  Suivant
                  <ArrowRight className="ml-3 w-3 h-3" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="premium-card animate-in fade-in slide-in-from-right-8 duration-700">
              <CardHeader className="pb-8 border-b border-black/[0.03]">
                <CardTitle className="text-2xl font-serif italic text-primary">Votre Parcours</CardTitle>
                <CardDescription className="text-sm font-sans opacity-70">
                  Régalez-nous de vos succès et de vos ambitions.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="userName" className="text-[10px] uppercase tracking-widest font-bold text-primary/40">Identité Professionnelle</Label>
                  <Input 
                    id="userName" 
                    placeholder="Ex: Claire Valois" 
                    className="bg-transparent border-t-0 border-x-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg"
                    value={formData.userName}
                    onChange={(e) => setFormData({...formData, userName: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="userExp" className="text-[10px] uppercase tracking-widest font-bold text-primary/40">Expérience & Valeur Ajoutée</Label>
                  <Textarea 
                    id="userExp" 
                    placeholder="Quels sont les moments forts de votre carrière en lien avec ce poste ?" 
                    className="min-h-[300px] bg-secondary/20 border-none rounded-2xl p-6 focus-visible:ring-1 focus-visible:ring-primary/20 transition-all font-serif italic leading-relaxed"
                    value={formData.userExperience}
                    onChange={(e) => setFormData({...formData, userExperience: e.target.value})}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-8 border-t border-black/[0.03]">
                <Button variant="ghost" onClick={handleBack} className="text-[10px] uppercase tracking-widest font-bold opacity-40">
                  <ArrowLeft className="mr-3 w-3 h-3" />
                  Précédent
                </Button>
                
                {!canGenerate ? (
                  <Button 
                    onClick={handlePayment} 
                    disabled={!formData.userExperience || isCheckingOut}
                    className="rounded-full px-10 h-12 text-[10px] uppercase tracking-[0.2em] font-bold bg-primary hover:bg-primary/90"
                  >
                    {isCheckingOut ? <Loader2 className="w-3 h-3 animate-spin mr-3" /> : <CreditCard className="w-3 h-3 mr-3" />}
                    Débloquer l&apos;Expertise (1.99€)
                  </Button>
                ) : (
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!formData.userExperience}
                    className="rounded-full px-12 h-12 text-[10px] uppercase tracking-[0.2em] font-bold"
                  >
                    Lancer la Rédaction {!hasUsedFree && "(Libre)"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-1000 max-w-[210mm] mx-auto">
              <div className="flex items-center justify-between px-4">
                <Button variant="ghost" onClick={handleBack} disabled={isGenerating} className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity">
                  <ArrowLeft className="mr-3 w-3 h-3" />
                  Modifier le profil
                </Button>
                
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-primary/60 bg-secondary px-4 py-2 rounded-full border border-black/[0.03]">
                  <PenTool className="w-3 h-3" />
                  {isGenerating ? "En cours de rédaction..." : "Plume déliée"}
                </div>
              </div>

              <A4ResultBlock 
                content={generatedContent} 
                isGenerating={isGenerating} 
              />
              
              {!isGenerating && (
                <div className="flex justify-center pt-12">
                  <Button variant="outline" className="rounded-full h-14 px-10 text-[10px] uppercase tracking-widest font-bold border-primary/10" onClick={() => setStep(1)}>
                    Nouveau Projet d&apos;Écriture
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Consultation Tips Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <div className="p-8 premium-card space-y-6">
            <div className="flex items-center gap-3 text-primary/40">
              <Lightbulb className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Conseil d&apos;Expert</span>
            </div>
            
            {step === 1 && (
              <p className="font-serif italic text-sm leading-relaxed text-primary/70">
                « Ne vous contentez pas des mots-clés. Cherchez les défis cachés derrière l&apos;offre. Demandez-vous : quel problème cette entreprise essaie-t-elle vraiment de résoudre ? »
              </p>
            )}
            {step === 2 && (
              <p className="font-serif italic text-sm leading-relaxed text-primary/70">
                « Parlez de vos échecs formateurs autant que de vos victoires. Cela montre une maturité et une humanité que les templates génériques ignorent souvent. »
              </p>
            )}
            {step === 3 && (
              <p className="font-serif italic text-sm leading-relaxed text-primary/70">
                « La lettre parfaite n&apos;est que la porte d&apos;entrée. Soyez prêt à incarner chaque mot lors de votre futur entretien. Votre sincérité est votre meilleur atout. »
              </p>
            )}
          </div>

          <div className="p-8 bg-primary/5 rounded-3xl space-y-6 border border-primary/5">
             <div className="flex items-center gap-3 text-primary/20">
                <Info className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Note Technique</span>
             </div>
             <p className="text-[11px] text-primary/40 leading-relaxed font-sans uppercase tracking-tight">
               Notre IA utilise le modèle Gemini 2.5 Flash pour garantir une analyse textuelle profonde sans compromis sur la confidentialité de vos données.
             </p>
          </div>
        </div>
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
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z"/><path d="m2 2 5 2.25"/><path d="m11 11-1 4"/><path d="m11 11 4-1"/>
    </svg>
  );
}
