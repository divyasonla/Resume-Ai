import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResumeProvider, useResume } from '@/contexts/ResumeContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  ResumeData,
  INITIAL_RESUME_DATA,
  TemplateType,
  DEFAULT_SETTINGS,
  ResumeSettings,
  Education,
  Skill,
  Project,
  Experience,
  Certification,
  Language,
  Achievement,
  Interest,
} from '@/types/resume';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, Save, Loader2, Menu, Settings } from 'lucide-react';

import WizardSidebar from '@/components/builder/WizardSidebar';
import WizardContent from '@/components/builder/WizardContent';
import ResumePreview from '@/components/builder/ResumePreview';
import TemplateSelector from '@/components/builder/TemplateSelector';
import ExportDialog from '@/components/builder/ExportDialog';
import AIFeedbackPanel from '@/components/builder/AIFeedbackPanel';
import SettingsPanel from '@/components/builder/SettingsPanel';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

/* ================= MAIN CONTENT ================= */

function BuilderContent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { resumeData, loadResume, updateResumeData } = useResume();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const resumeRef = useRef<HTMLDivElement>(null);

  /* ---------- STATES ---------- */
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [showTemplates, setShowTemplates] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [openSectionDialog, setOpenSectionDialog] = useState(false);

  /* ---------- FETCH RESUME ---------- */
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        const formatted: ResumeData = {
          ...INITIAL_RESUME_DATA,
          ...data,
          template: (data.template as TemplateType) || INITIAL_RESUME_DATA.template,
          settings: ((data as any).settings as unknown as ResumeSettings) || DEFAULT_SETTINGS,
          education: (data.education as unknown as Education[]) || [],
          skills: (data.skills as unknown as Skill[]) || [],
          projects: (data.projects as unknown as Project[]) || [],
          experience: (data.experience as unknown as Experience[]) || [],
          certifications: (data.certifications as unknown as Certification[]) || [],
          languages: (data.languages as unknown as Language[]) || [],
          achievements: (data.achievements as unknown as Achievement[]) || [],
          interests: (data.interests as unknown as Interest[]) || [],
        };

        loadResume(formatted);
      } catch (err: any) {
        toast({ title: 'Error', description: err.message, variant: 'destructive' });
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Handle template selection
  const handleTemplateSelect = (template: TemplateType) => {
    updateResumeData({ template });
    setShowTemplates(false);
  };

  /* ---------- AUTO SAVE ---------- */
  const saveResume = useCallback(async () => {
    if (!id || !user) return;
    setSaving(true);

    try {
      await supabase.from('resumes').update(resumeData as any).eq('id', id);
      toast({ title: 'Saved', description: 'Resume auto-saved' });
    } catch (err: any) {
      toast({ title: 'Save failed', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }, [id, user, resumeData]);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(saveResume, 1500);
      return () => clearTimeout(t);
    }
  }, [resumeData, loading]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  /* ================= MOBILE / TABLET ================= */
  if (isMobile) {
    return (
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="h-14 flex items-center gap-2 px-3 border-b">
          <Button size="icon" variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft />
          </Button>

          <input
            value={resumeData.title}
            onChange={(e) => updateResumeData({ title: e.target.value })}
            className="flex-1 bg-transparent outline-none font-semibold"
          />

          <Button size="icon" variant="outline" onClick={() => setShowTemplates(true)} title="Templates">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout h-5 w-5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </Button>
          <Button size="icon" variant="outline" onClick={() => setShowAIFeedback(true)} title="AI Feedback">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain h-5 w-5"><path d="M15.5 8A5.5 5.5 0 0 0 10 2.5V2a2 2 0 0 0-2 2v1.5"/><path d="M8.5 15.5A5.5 5.5 0 0 1 2.5 10V10a2 2 0 0 1 2-2h1.5"/><path d="M15.5 15.5A5.5 5.5 0 0 0 21.5 10V10a2 2 0 0 0-2-2h-1.5"/><path d="M8.5 8A5.5 5.5 0 0 1 14 2.5V2a2 2 0 0 1 2 2v1.5"/><path d="M15.5 15.5A5.5 5.5 0 0 1 10 21.5V22a2 2 0 0 1-2-2v-1.5"/><path d="M8.5 8A5.5 5.5 0 0 0 2.5 14V14a2 2 0 0 0 2 2h1.5"/><path d="M15.5 8A5.5 5.5 0 0 1 21.5 14V14a2 2 0 0 1-2 2h-1.5"/><path d="M8.5 15.5A5.5 5.5 0 0 0 14 21.5V22a2 2 0 0 0 2-2v-1.5"/></svg>
          </Button>
          <Button size="icon" variant="outline" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </Button>
          <Button size="icon" variant="outline" onClick={() => setSettingsOpen(true)}>
            <Settings />
          </Button>
          <Button size="icon" variant="outline" onClick={() => setShowExport(true)} title="Export">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text h-5 w-5"><path d="M14 2v6a2 2 0 0 0 2 2h6"/><path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8z"/><line x1="9" x2="15" y1="15" y2="15"/><line x1="9" x2="15" y1="19" y2="19"/></svg>
          </Button>
          <Button size="icon" onClick={saveResume}>
            {saving ? <Loader2 className="animate-spin" /> : <Save />}
          </Button>
        </header>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-2 ${mobileTab === 'edit' && 'border-b-2 border-primary'}`}
            onClick={() => setMobileTab('edit')}
          >
            Edit
          </button>
          <button
            className={`flex-1 py-2 ${mobileTab === 'preview' && 'border-b-2 border-primary'}`}
            onClick={() => setMobileTab('preview')}
          >
            Preview
          </button>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-2">
          {mobileTab === 'edit' ? (
            <WizardContent />
          ) : (
            <div ref={resumeRef}>
              <ResumePreview />
            </div>
          )}
        </main>

        {/* Drawers */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Sections</SheetTitle>
            </SheetHeader>
            <WizardSidebar onStepClick={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
          <SheetContent side="right">
            <SettingsPanel />
          </SheetContent>
        </Sheet>

        <TemplateSelector open={showTemplates} onOpenChange={setShowTemplates} currentTemplate={resumeData.template} onSelect={handleTemplateSelect} />
        <ExportDialog open={showExport} onOpenChange={setShowExport} resumeData={resumeData} resumeRef={resumeRef} />
        <AIFeedbackPanel open={showAIFeedback} onOpenChange={setShowAIFeedback} />
      </div>
    );
  }

  /* ================= DESKTOP ================= */
  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 flex items-center px-4 border-b gap-4">
        <Button size="icon" variant="ghost" onClick={() => navigate('/dashboard')}>
          <ArrowLeft />
        </Button>

        <input
          value={resumeData.title}
          onChange={(e) => updateResumeData({ title: e.target.value })}
          className="flex-1 bg-transparent outline-none font-semibold text-lg"
        />

        <Button variant="outline" onClick={() => setShowTemplates(true)}>
          Templates
        </Button>
        <Button className='bg-blue' variant="outline" onClick={() => setShowAIFeedback(true)}>
          AI Feedback
        </Button>
        <Button variant="outline" onClick={() => setShowExport(true)}>
          Export
        </Button>
        <Button onClick={saveResume}>
          {saving ? <Loader2 className="animate-spin" /> : <Save />}
          <span className="ml-2">Save</span>
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r hidden lg:block">
          <WizardSidebar onStepClick={() => setOpenSectionDialog(true)} />
        </aside>

        <main className="flex-1 overflow-auto bg-muted/30 flex justify-center p-4">
          <div ref={resumeRef} className="max-w-3xl w-full">
            <ResumePreview />
          </div>
        </main>

        <aside className="w-96 border-l hidden xl:block">
          <SettingsPanel />
        </aside>
      </div>

      <Dialog open={openSectionDialog} onOpenChange={setOpenSectionDialog}>
        <DialogContent>
          <WizardContent />
        </DialogContent>
      </Dialog>

      <TemplateSelector open={showTemplates} onOpenChange={setShowTemplates} currentTemplate={resumeData.template} onSelect={handleTemplateSelect} />
      <ExportDialog open={showExport} onOpenChange={setShowExport} resumeData={resumeData} resumeRef={resumeRef} />
      <AIFeedbackPanel open={showAIFeedback} onOpenChange={setShowAIFeedback} />
    </div>
  );
}

/* ================= PROVIDER ================= */

export default function Builder() {
  return (
    <ResumeProvider>
      <BuilderContent />
    </ResumeProvider>
  );
}
