import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-20 relative">
      <div className="absolute top-5 left-0 w-full h-[1px] bg-primary/5 -z-10" />
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={step} className="flex flex-col items-center flex-1 relative">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-700 border",
                isActive ? "bg-primary text-primary-foreground border-primary scale-110 shadow-[0_0_20px_rgba(var(--primary),0.2)]" : 
                isCompleted ? "bg-primary/5 text-primary border-primary/20" : "bg-background text-primary/10 border-primary/10"
              )}
            >
              {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : <span className="translate-y-[0.5px]">{stepNumber}</span>}
            </div>
            
            <span className={cn(
              "text-[10px] uppercase tracking-[0.2em] mt-4 font-bold transition-colors duration-500",
              isActive ? "text-primary" : "text-primary/20"
            )}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
