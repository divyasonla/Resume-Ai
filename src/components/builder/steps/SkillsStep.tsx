import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Skill } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';



export default function SkillsStep() {
  const { resumeData, updateResumeData } = useResume();
  const [newSkill, setNewSkill] = useState('');
  // Removed level state
  const [newCategory, setNewCategory] = useState<Skill['category']>('technical');
  const [suggesting, setSuggesting] = useState(false);
  const { toast } = useToast();

  const addSkill = () => {
    if (!newSkill.trim()) return;


    const skill: Skill = {
      id: crypto.randomUUID(),
      name: newSkill.trim(),
      category: newCategory,
    };

    updateResumeData({ skills: [...resumeData.skills, skill] });
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    updateResumeData({
      skills: resumeData.skills.filter(s => s.id !== id),
    });
  };

  const handleSuggestSkills = async () => {
    setSuggesting(true);
    try {
      const { data, error } = await supabase.functions.invoke('resume-ai', {
        body: {
          type: 'suggest-skills',
          resumeData: resumeData,
        },
      });

      if (error) throw error;

      if (data?.skills && Array.isArray(data.skills)) {
        const newSkills: Skill[] = data.skills.map((name: string) => ({
          id: crypto.randomUUID(),
          name,
          category: 'technical' as const,
        }));
        updateResumeData({ skills: [...resumeData.skills, ...newSkills] });
        toast({
          title: 'Skills suggested',
          description: `Added ${newSkills.length} suggested skills based on your profile.`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error suggesting skills',
        description: error.message || 'Failed to suggest skills',
        variant: 'destructive',
      });
    } finally {
      setSuggesting(false);
    }
  };

  const technicalSkills = resumeData.skills.filter(s => s.category === 'technical');
  const softSkills = resumeData.skills.filter(s => s.category === 'soft');

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-muted-foreground mt-1">
          Add your technical and soft skills
        </p>
      </div>

      <div className="space-y-6">
        {/* Add Skill Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Add New Skill</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSuggestSkills}
                disabled={suggesting}
              >
                {suggesting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                Suggest Skills
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="sm:col-span-2 space-y-2">
                <Label>Skill Name</Label>
                <Input
                  placeholder="e.g., JavaScript, Leadership"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newCategory} onValueChange={(v) => setNewCategory(v as Skill['category'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="soft">Soft Skill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </CardContent>
        </Card>

        {/* Technical Skills */}
        {technicalSkills.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base">Technical Skills</Label>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map(skill => (
                <Badge key={skill.id} variant="secondary" className="pl-3 pr-1 py-1.5">
                  {skill.name}

                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {softSkills.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base">Soft Skills</Label>
            <div className="flex flex-wrap gap-2">
              {softSkills.map(skill => (
                <Badge key={skill.id} variant="outline" className="pl-3 pr-1 py-1.5">
                  {skill.name}

                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {resumeData.skills.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No skills added yet. Start typing above or use AI suggestions!
          </p>
        )}
      </div>
    </div>
  );
}
