import { useResume } from '@/contexts/ResumeContext';
import { WIZARD_STEPS, WizardStep } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Check, User, Target, GraduationCap, Wrench, FolderOpen, Briefcase, Award, Globe, Trophy, Heart } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  User,
  Target,
  GraduationCap,
  Wrench,
  FolderOpen,
  Briefcase,
  Award,
  Globe,
  Trophy,
  Heart,
};

interface WizardSidebarProps {
  onStepClick?: () => void;
}

export default function WizardSidebar({ onStepClick }: WizardSidebarProps) {
  const { currentStep, setCurrentStep, resumeData } = useResume();

  const isStepComplete = (step: WizardStep): boolean => {
    switch (step) {
      case 'personal':
        return !!(resumeData.personalInfo.fullName && resumeData.personalInfo.email);
      case 'objective':
        return !!resumeData.careerObjective;
      case 'education':
        return resumeData.education.length > 0;
      case 'skills':
        return resumeData.skills.length > 0;
      case 'projects':
        return resumeData.projects.length > 0;
      case 'experience':
        return resumeData.experience.length > 0;
      case 'certifications':
        return resumeData.certifications.length > 0;
      case 'languages':
        return resumeData.languages.length > 0;
      case 'achievements':
        return resumeData.achievements.length > 0;
      case 'interests':
        return resumeData.interests.length > 0;
      default:
        return false;
    }
  };

  const handleStepClick = (stepKey: WizardStep) => {
    setCurrentStep(stepKey);
    onStepClick?.();
  };

  return (
    <div className="w-64 border-r bg-card p-4 flex-shrink-0 hidden md:block overflow-y-auto">
      <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wide">
        Resume Sections
      </h3>
      <nav className="space-y-1">
        {WIZARD_STEPS.map((step) => {
          const Icon = iconMap[step.icon];
          const isActive = currentStep === step.key;
          const isComplete = isStepComplete(step.key);

          return (
            <button
              key={step.key}
              onClick={() => handleStepClick(step.key)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <div className={cn(
                'flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium',
                isActive
                  ? 'bg-primary-foreground/20'
                  : isComplete
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted'
              )}>
                {isComplete && !isActive ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium block truncate">
                  {step.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
