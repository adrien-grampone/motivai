import Link from "next/link";
import { 
  ArrowRight,
  ChevronRight,
  PenTool,
  Target,
  Sparkles
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Asymmetrical & Elegant */}
      <section className="relative pt-8 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-8 lg:space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary/70 text-[11px] uppercase tracking-[0.2em] font-bold animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Disponibilité Limitée • Bêta Privée
              </div>
              
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif leading-[0.95] text-primary animate-in fade-in slide-in-from-bottom-6 duration-1000 tracking-tight">
                  L&apos;art de convaincre <br />
                  <span className="italic text-primary/40 font-normal">en une page.</span>
                </h1>
                
                <p className="text-base lg:text-lg text-muted-foreground/80 max-w-xl font-sans leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  Oubliez les templates froids. MotivAI analyse votre parcours et l&apos;âme de l&apos;entreprise pour rédiger une lettre de motivation qui sonne juste. Humaine, précise, inoubliable.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <Link 
                  href="/generate" 
                  className={cn(
                    buttonVariants({ size: "lg" }), 
                    "w-full sm:w-auto rounded-full px-10 h-14 md:h-16 text-xs uppercase tracking-[0.2em] font-bold shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  Rédiger ma lettre
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
                <Link 
                  href="#examples" 
                  className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group p-2"
                >
                  Voir les modèles
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
              <div className="relative z-10 rotate-3 transition-transform hover:rotate-0 duration-700">
                <div className="a4-container scale-75 opacity-90 shadow-[0_50px_100px_rgba(0,0,0,0.1)] p-12">
                  <div className="space-y-8">
                    <div className="space-y-2">
                       <TypewriterText text="À l'attention du responsable," className="text-[12px] font-serif italic text-primary/40" delay={1} />
                       <TypewriterText text="Objet : Candidature au poste de Designer" className="text-[10px] font-bold text-primary/60" delay={2} />
                    </div>
                    
                    <div className="pt-6 space-y-4">
                      <TypewriterText 
                        text="Ayant toujours admiré votre approche de l'esthétique et de l'innovation, je souhaite vous présenter ma candidature. Mon parcours m'a permis de développer une vision précise du produit..." 
                        className="text-[11px] font-serif leading-relaxed text-primary/50" 
                        delay={3} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section (Mission) */}
      <section id="features" className="py-12 lg:py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-10 lg:mb-16">
            <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-primary/40 mb-3 lg:mb-4">Notre Philosophie</h2>
            <p className="text-3xl lg:text-4xl font-serif leading-tight text-primary">
              Nous croyons que chaque candidature est une conversation. Pas un scan de mots-clés.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            <div className="space-y-4 lg:space-y-6">
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center">
                <PenTool className="w-5 h-5 text-primary/60" />
              </div>
              <h3 className="text-xl font-serif italic text-primary">Plume Organique</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                L&apos;IA ne doit pas remplacer votre voix, mais la sublimer. Nos nuances sont travaillées pour éviter les répétitions robotiques.
              </p>
            </div>
            <div className="space-y-4 lg:space-y-6">
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary/60" />
              </div>
              <h3 className="text-xl font-serif italic text-primary">Alignement Culturel</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Une start-up n&apos;est pas une banque. MotivAI détecte le ton de l&apos;entreprise pour s&apos;y adapter parfaitement.
              </p>
            </div>
            <div className="space-y-4 lg:space-y-6">
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary/60" />
              </div>
              <h3 className="text-xl font-serif italic text-primary">Optimisation Invisible</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Les filtres ATS sont intégrés naturellement dans le récit, sans jamais sacrifier la fluidité de lecture du recruteur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section - The Human Proof */}
      <section id="examples" className="py-12 lg:py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto mb-10 lg:mb-16 space-y-3 lg:space-y-4">
            <h2 className="text-3xl lg:text-5xl font-serif text-primary">Des modèles qui inspirent.</h2>
            <p className="text-muted-foreground text-sm lg:text-base">Découvrez comment MotivAI adapte son style selon les secteurs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
            <ExampleCard 
              role="Chef de Produit"
              company="Fintech Innovative"
              excerpt="« Ma passion pour l'intersection entre l'UX et la finance m'a conduit à... »"
              tone="Direct & Orienté Data"
            />
            <ExampleCard 
              role="Architecte Junior"
              company="Atelier de Design"
              excerpt="« L'équilibre entre durabilité et esthétique est le fil conducteur de mon travail... »"
              tone="Créatif & Conceptuel"
            />
            <ExampleCard 
              role="Chargée de Com"
              company="LVMH (Luxury)"
              excerpt="« Porter une vision d'excellence tout en restant ancré dans le digital... »"
              tone="Élégant & Précis"
            />
          </div>
        </div>
      </section>

      {/* Call to Action - Final Note */}
      <section className="py-16 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8 lg:space-y-12">
            <h2 className="text-4xl lg:text-7xl font-serif leading-tight text-primary-foreground">Prêt à écrire votre prochain chapitre ?</h2>
            <p className="text-lg lg:text-xl font-sans opacity-70">
              Chaque grande carrière a commencé par une première ligne. Laissez-nous vous aider à trouver la vôtre.
            </p>
            <Link 
              href="/generate" 
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }), 
                "w-full sm:w-auto rounded-full px-12 h-16 md:h-20 text-xs uppercase tracking-[0.2em] font-bold bg-transparent text-white border-white/20 hover:bg-white hover:text-primary transition-all duration-500"
              )}
            >
              Lancer la rédaction
            </Link>
            
            <div className="pt-8 lg:pt-12 flex flex-wrap items-center justify-center gap-6 lg:gap-12 text-[10px] uppercase tracking-widest font-bold opacity-30">
              <div className="flex items-center gap-2">Gemini 1.5 Ultra Powered</div>
              <div className="flex items-center gap-2">Stripe Secure</div>
              <div className="flex items-center gap-2">No Subscription</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-black/[0.03] text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">
        <p>© {new Date().getFullYear()} MotivAI — Tous droits réservés.</p>
      </footer>
    </div>
  );
}

function ExampleCard({ role, company, excerpt, tone }: { role: string, company: string, excerpt: string, tone: string }) {
  return (
    <Card className="premium-card p-8 space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="font-serif text-lg text-primary">{role}</h4>
          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">{company}</p>
        </div>
        <div className="px-2 py-1 bg-secondary text-[9px] uppercase tracking-tighter font-bold rounded">
          {tone}
        </div>
      </div>
      <p className="font-serif italic text-sm text-primary/70 leading-relaxed">
        {excerpt}
      </p>
      <div className="pt-4 flex items-center gap-2 text-[10px] font-bold text-primary/30 uppercase tracking-widest">
        <span className="w-4 h-[1px] bg-primary/20" />
        Modèle de réussite
      </div>
    </Card>
  );
}
