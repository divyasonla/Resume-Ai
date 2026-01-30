import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Loader2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface AIFeedbackPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AIFeedbackPanel({ open, onOpenChange }: AIFeedbackPanelProps) {
  const { resumeData, updateResumeData } = useResume();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateFeedback = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('resume-ai', {
        body: { type: 'feedback', resumeData },
      });

      if (error) throw error;

      if (data?.feedback) {
        updateResumeData({ aiFeedback: { ...data.feedback, generatedAt: new Date().toISOString() } });
        toast({ title: 'Feedback generated', description: 'AI has analyzed your resume.' });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to generate feedback', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const feedback = resumeData.aiFeedback;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Feedback
          </SheetTitle>
          <SheetDescription>Get AI-powered insights on your resume</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Button onClick={generateFeedback} disabled={loading} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            {feedback ? 'Regenerate Feedback' : 'Generate Feedback'}
          </Button>

          {feedback && (
            <>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-sm font-bold text-primary">{feedback.overallScore}/100</span>
                  </div>
                  <Progress value={feedback.overallScore} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Grammar', score: feedback.grammarScore },
                    { label: 'Professional', score: feedback.professionalScore },
                    { label: 'Complete', score: feedback.completenessScore },
                  ].map((item) => (
                    <div key={item.label} className="p-2 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-bold text-primary">{item.score}%</p>
                    </div>
                  ))}
                </div>
              </div>

              {feedback.strengths?.length > 0 && (
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" /> Strengths
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {feedback.strengths.map((s, i) => <li key={i}>• {s.replace(/^\*+\s*/, '').trim()}</li>)}
                  </ul>
                </div>
              )}

              {feedback.suggestions?.length > 0 && (
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" /> Suggestions
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {feedback.suggestions.map((s, i) => <li key={i}>• {s.replace(/^\*+\s*/, '').trim()}</li>)}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
