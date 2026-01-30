import { useResume } from '@/contexts/ResumeContext';
import { Interest } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Heart } from 'lucide-react';

export default function InterestsStep() {
  const { resumeData, updateResumeData } = useResume();
  const { interests } = resumeData;

  const addInterest = () => {
    const newInterest: Interest = {
      id: crypto.randomUUID(),
      name: '',
      category: 'other',
    };
    updateResumeData({ interests: [...interests, newInterest] });
  };

  const updateInterest = (id: string, field: keyof Interest, value: string) => {
    updateResumeData({
      interests: interests.map(int =>
        int.id === id ? { ...int, [field]: value } : int
      ),
    });
  };

  const removeInterest = (id: string) => {
    updateResumeData({ interests: interests.filter(int => int.id !== id) });
  };

  const categoryLabels = {
    hobby: 'Hobby',
    sport: 'Sport',
    art: 'Art & Creative',
    technology: 'Technology',
    other: 'Other',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          Interests & Hobbies
        </h2>
        <p className="text-muted-foreground mt-1">
          Add your interests and hobbies to showcase your personality
        </p>
      </div>

      {interests.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No interests added yet
            </p>
            <Button onClick={addInterest}>
              <Plus className="h-4 w-4 mr-2" />
              Add Interest
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {interests.map((int, index) => (
            <Card key={int.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Interest {index + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInterest(int.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`int-name-${int.id}`}>Interest Name</Label>
                    <Input
                      id={`int-name-${int.id}`}
                      value={int.name}
                      onChange={(e) => updateInterest(int.id, 'name', e.target.value)}
                      placeholder="e.g., Photography, Reading, Chess"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`int-cat-${int.id}`}>Category</Label>
                    <Select
                      value={int.category}
                      onValueChange={(value) => updateInterest(int.id, 'category', value)}
                    >
                      <SelectTrigger id={`int-cat-${int.id}`}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([value, label]) => (
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
          <Button onClick={addInterest} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Interest
          </Button>
        </div>
      )}
    </div>
  );
}
