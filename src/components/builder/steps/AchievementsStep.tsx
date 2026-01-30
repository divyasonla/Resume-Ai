import { useResume } from '@/contexts/ResumeContext';
import { Achievement } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Trophy } from 'lucide-react';

export default function AchievementsStep() {
  const { resumeData, updateResumeData } = useResume();
  const { achievements } = resumeData;

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      date: '',
    };
    updateResumeData({ achievements: [...achievements, newAchievement] });
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    updateResumeData({
      achievements: achievements.map(ach =>
        ach.id === id ? { ...ach, [field]: value } : ach
      ),
    });
  };

  const removeAchievement = (id: string) => {
    updateResumeData({ achievements: achievements.filter(ach => ach.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          Achievements
        </h2>
        <p className="text-muted-foreground mt-1">
          Add your notable achievements, awards, and recognition
        </p>
      </div>

      {achievements.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No achievements added yet
            </p>
            <Button onClick={addAchievement}>
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {achievements.map((ach, index) => (
            <Card key={ach.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Achievement {index + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAchievement(ach.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ach-title-${ach.id}`}>Title</Label>
                    <Input
                      id={`ach-title-${ach.id}`}
                      value={ach.title}
                      onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
                      placeholder="e.g., First Place in Hackathon"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ach-date-${ach.id}`}>Date</Label>
                    <Input
                      id={`ach-date-${ach.id}`}
                      type="month"
                      value={ach.date}
                      onChange={(e) => updateAchievement(ach.id, 'date', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`ach-desc-${ach.id}`}>Description</Label>
                  <Textarea
                    id={`ach-desc-${ach.id}`}
                    value={ach.description}
                    onChange={(e) => updateAchievement(ach.id, 'description', e.target.value)}
                    placeholder="Brief description of the achievement..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addAchievement} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Achievement
          </Button>
        </div>
      )}
    </div>
  );
}
