import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Project } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, FolderOpen, X } from 'lucide-react';

export default function ProjectsStep() {
  const { resumeData, updateResumeData } = useResume();
  const [newTech, setNewTech] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: '',
    };
    updateResumeData({ projects: [...resumeData.projects, newProject] });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    updateResumeData({
      projects: resumeData.projects.map(proj =>
        proj.id === id ? { ...proj, ...updates } : proj
      ),
    });
  };

  const removeProject = (id: string) => {
    updateResumeData({
      projects: resumeData.projects.filter(proj => proj.id !== id),
    });
  };

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (!tech) return;

    const project = resumeData.projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, {
        technologies: [...project.technologies, tech],
      });
      setNewTech(prev => ({ ...prev, [projectId]: '' }));
    }
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    const project = resumeData.projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, {
        technologies: project.technologies.filter((_, i) => i !== techIndex),
      });
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-muted-foreground mt-1">
          Showcase your personal or academic projects
        </p>
      </div>

      <div className="space-y-4">
        {resumeData.projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  {project.title || 'New Project'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Project Title *</Label>
                  <Input
                    placeholder="E-commerce Website"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Project Link</Label>
                  <Input
                    type="url"
                    placeholder="github.com/username/project"
                    value={project.link}
                    onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="Describe what you built, your role, and the impact..."
                  rows={3}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => updateProject(project.id, { endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add technology..."
                    value={newTech[project.id] || ''}
                    onChange={(e) => setNewTech(prev => ({ ...prev, [project.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && addTechnology(project.id)}
                  />
                  <Button
                    variant="outline"
                    onClick={() => addTechnology(project.id)}
                  >
                    Add
                  </Button>
                </div>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="pr-1">
                        {tech}
                        <button
                          onClick={() => removeTechnology(project.id, index)}
                          className="ml-1 hover:bg-muted rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={addProject}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>
    </div>
  );
}
