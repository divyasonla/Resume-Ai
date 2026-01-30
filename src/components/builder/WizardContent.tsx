import { useResume } from '@/contexts/ResumeContext';
import { WIZARD_STEPS } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ObjectiveStep from './steps/ObjectiveStep';
import EducationStep from './steps/EducationStep';
import SkillsStep from './steps/SkillsStep';
import ProjectsStep from './steps/ProjectsStep';
import ExperienceStep from './steps/ExperienceStep';
import CertificationsStep from './steps/CertificationsStep';
import LanguagesStep from './steps/LanguagesStep';
import AchievementsStep from './steps/AchievementsStep';
import InterestsStep from './steps/InterestsStep';

export default function WizardContent() {
  const { currentStep, setCurrentStep } = useResume();

  const currentIndex = WIZARD_STEPS.findIndex(s => s.key === currentStep);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < WIZARD_STEPS.length - 1;

  const goToPrev = () => {
    if (canGoPrev) {
      setCurrentStep(WIZARD_STEPS[currentIndex - 1].key);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setCurrentStep(WIZARD_STEPS[currentIndex + 1].key);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalInfoStep />;
      case 'objective':
        return <ObjectiveStep />;
      case 'education':
        return <EducationStep />;
      case 'skills':
        return <SkillsStep />;
      case 'projects':
        return <ProjectsStep />;
      case 'experience':
        return <ExperienceStep />;
      case 'certifications':
        return <CertificationsStep />;
      case 'languages':
        return <LanguagesStep />;
      case 'achievements':
        return <AchievementsStep />;
      case 'interests':
        return <InterestsStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  const currentStepInfo = WIZARD_STEPS[currentIndex];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Mobile Step Indicator */}
      <div className="md:hidden border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Step {currentIndex + 1} of {WIZARD_STEPS.length}
          </span>
          <span className="font-medium">{currentStepInfo.label}</span>
        </div>
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all" 
            style={{ width: `${((currentIndex + 1) / WIZARD_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="border-t bg-card p-4 flex items-center justify-between flex-shrink-0">
        <Button
          variant="outline"
          onClick={goToPrev}
          disabled={!canGoPrev}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={goToNext}
          disabled={!canGoNext}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
