import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Education } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export default function EducationStep() {
  const { resumeData, updateResumeData } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);

  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    };
    updateResumeData({ education: [...resumeData.education, newEducation] });
    setEditingId(newEducation.id);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    updateResumeData({
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    updateResumeData({
      education: resumeData.education.filter(edu => edu.id !== id),
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Education</h2>
        <p className="text-muted-foreground mt-1">
          Add your educational background
        </p>
      </div>

      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  {edu.institution || 'New Education'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    placeholder="University of Example"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    placeholder="Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    placeholder="Computer Science"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA</Label>
                  <Input
                    placeholder="3.8/4.0"
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Textarea
                  placeholder="Relevant coursework, achievements, honors..."
                  rows={3}
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={addEducation}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>
    </div>
  );
}
