import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Experience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Briefcase, X } from 'lucide-react';

export default function ExperienceStep() {
  const { resumeData, updateResumeData } = useResume();
  const [newResponsibility, setNewResponsibility] = useState<Record<string, string>>({});

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [],
    };
    updateResumeData({ experience: [...resumeData.experience, newExp] });
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    updateResumeData({
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    updateResumeData({
      experience: resumeData.experience.filter(exp => exp.id !== id),
    });
  };

  const addResponsibility = (expId: string) => {
    const resp = newResponsibility[expId]?.trim();
    if (!resp) return;

    const exp = resumeData.experience.find(e => e.id === expId);
    if (exp) {
      updateExperience(expId, {
        responsibilities: [...exp.responsibilities, resp],
      });
      setNewResponsibility(prev => ({ ...prev, [expId]: '' }));
    }
  };

  const removeResponsibility = (expId: string, index: number) => {
    const exp = resumeData.experience.find(e => e.id === expId);
    if (exp) {
      updateExperience(expId, {
        responsibilities: exp.responsibilities.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Experience & Internships</h2>
        <p className="text-muted-foreground mt-1">
          Add your work experience and internships
        </p>
      </div>

      <div className="space-y-4">
        {resumeData.experience.map((exp) => (
          <Card key={exp.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  {exp.company || 'New Experience'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    placeholder="Google, Inc."
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role / Title *</Label>
                  <Input
                    placeholder="Software Engineering Intern"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Mountain View, CA"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => 
                    updateExperience(exp.id, { current: checked as boolean })
                  }
                />
                <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                  I currently work here
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Responsibilities & Achievements</Label>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Describe what you accomplished..."
                    rows={2}
                    value={newResponsibility[exp.id] || ''}
                    onChange={(e) => setNewResponsibility(prev => ({ 
                      ...prev, 
                      [exp.id]: e.target.value 
                    }))}
                  />
                  <Button
                    variant="outline"
                    className="flex-shrink-0"
                    onClick={() => addResponsibility(exp.id)}
                  >
                    Add
                  </Button>
                </div>
                {exp.responsibilities.length > 0 && (
                  <ul className="space-y-2 mt-3">
                    {exp.responsibilities.map((resp, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-2 text-sm bg-muted/50 p-2 rounded-md"
                      >
                        <span className="flex-1">{resp}</span>
                        <button
                          onClick={() => removeResponsibility(exp.id, index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={addExperience}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>
    </div>
  );
}
