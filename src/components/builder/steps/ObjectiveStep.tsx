import { useResume } from '@/contexts/ResumeContext';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function ObjectiveStep() {
  const { resumeData, updateResumeData } = useResume();
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('resume-ai', {
        body: {
          type: 'generate-objective',
          resumeData: resumeData,
        },
      });

      if (error) throw error;

      if (data?.objective) {
        updateResumeData({ careerObjective: data.objective });
        toast({
          title: 'Objective generated',
          description: 'AI has created a career objective based on your profile.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error generating objective',
        description: error.message || 'Failed to generate objective',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Career Objective</h2>
        <p className="text-muted-foreground mt-1">
          A brief statement about your career goals (optional)
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="objective">Career Objective / Summary</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Generate with AI
            </Button>
          </div>
          <Textarea
            id="objective"
            placeholder="Write a brief summary of your career goals and what you bring to the table..."
            rows={6}
            value={resumeData.careerObjective}
            onChange={(e) => updateResumeData({ careerObjective: e.target.value })}
          />
          <p className="text-sm text-muted-foreground">
            Tip: Keep it concise, 2-3 sentences focused on your value proposition.
          </p>
        </div>
      </div>
    </div>
  );
}
