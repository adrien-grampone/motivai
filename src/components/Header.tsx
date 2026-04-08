import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-black/[0.03] bg-background backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-semibold tracking-tight text-primary">
            Motiv<span className="italic text-accent-foreground opacity-60">AI</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/#features" className="text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-primary transition-colors">
            Mission
          </Link>
          <Link href="/#examples" className="text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-primary transition-colors">
            Exemples
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link 
            href="/generate" 
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }), 
              "rounded-full px-8 h-10 text-[11px] uppercase tracking-[0.15em] font-bold shadow-sm"
            )}
          >
            Commencer l&apos;écriture
          </Link>
        </div>
      </div>
    </header>
  );
}
