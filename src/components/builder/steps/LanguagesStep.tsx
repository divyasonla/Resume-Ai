import { useResume } from '@/contexts/ResumeContext';
import { Language } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Globe } from 'lucide-react';

export default function LanguagesStep() {
  const { resumeData, updateResumeData } = useResume();
  const { languages } = resumeData;

  const addLanguage = () => {
    const newLanguage: Language = {
      id: crypto.randomUUID(),
      name: '',
      proficiency: 'conversational',
    };
    updateResumeData({ languages: [...languages, newLanguage] });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    updateResumeData({
      languages: languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id: string) => {
    updateResumeData({ languages: languages.filter(lang => lang.id !== id) });
  };

  const proficiencyLabels = {
    basic: 'Basic',
    conversational: 'Conversational',
    professional: 'Professional',
    native: 'Native/Fluent',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          Languages
        </h2>
        <p className="text-muted-foreground mt-1">
          Add languages you speak and your proficiency level
        </p>
      </div>

      {languages.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Globe className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No languages added yet
            </p>
            <Button onClick={addLanguage}>
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {languages.map((lang, index) => (
            <Card key={lang.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Language {index + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLanguage(lang.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`lang-name-${lang.id}`}>Language Name</Label>
                    <Input
                      id={`lang-name-${lang.id}`}
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                      placeholder="e.g., English, Hindi, Spanish"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`lang-prof-${lang.id}`}>Proficiency</Label>
                    <Select
                      value={lang.proficiency}
                      onValueChange={(value) => updateLanguage(lang.id, 'proficiency', value)}
                    >
                      <SelectTrigger id={`lang-prof-${lang.id}`}>
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(proficiencyLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addLanguage} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Language
          </Button>
        </div>
      )}
    </div>
  );
}
