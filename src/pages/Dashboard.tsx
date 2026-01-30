import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  FileText,
  Plus,
  LogOut,
  Loader2,
  MoreVertical,
  Trash2,
  Edit,
  Clock,
  Palette,
  Pencil
} from 'lucide-react';
import { Dialog as RenameDialog, DialogContent as RenameDialogContent, DialogHeader as RenameDialogHeader, DialogTitle as RenameDialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TemplateType } from '@/types/resume';

interface Resume {
  id: string;
  title: string;
  template: string;
  updated_at: string;
  created_at: string;
}

const templateColors: Record<string, string> = {
  modern: 'bg-blue-500',
  classic: 'bg-gray-700',
  minimal: 'bg-slate-300',
  creative: 'bg-purple-500',
  ats: 'bg-green-600',
  simple: 'bg-orange-500',
  elegant: 'bg-indigo-500',
};

export default function Dashboard() {
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [renaming, setRenaming] = useState(false);
    const handleRename = (resume: Resume) => {
      setRenameId(resume.id);
      setRenameValue(resume.title);
    };

    const submitRename = async () => {
      if (!renameId || !renameValue.trim()) return;
      setRenaming(true);
      try {
        const { error } = await supabase
          .from('resumes')
          .update({ title: renameValue.trim() })
          .eq('id', renameId);
        if (error) throw error;
        setResumes(resumes.map(r => r.id === renameId ? { ...r, title: renameValue.trim() } : r));
        toast({ title: 'Renamed', description: 'Document name updated.' });
        setRenameId(null);
      } catch (error: any) {
        toast({ title: 'Rename failed', description: error.message, variant: 'destructive' });
      } finally {
        setRenaming(false);
      }
    };
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('id, title, template, updated_at, created_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching resumes',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: user?.id,
          title: 'Untitled Resume',
          template: 'modern',
          personal_info: {},
          education: [],
          skills: [],
          projects: [],
          experience: [],
          certifications: [],
        })
        .select('id')
        .single();

      if (error) throw error;
      navigate(`/builder/${data.id}`);
    } catch (error: any) {
      toast({
        title: 'Error creating resume',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteResume = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setResumes(resumes.filter(r => r.id !== deleteId));
      toast({
        title: 'Resume deleted',
        description: 'Your resume has been deleted.',
      });
    } catch (error: any) {
      toast({
        title: 'Error deleting resume',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="text-lg sm:text-xl font-bold">ResumeAI</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block truncate max-w-[150px]">
              {user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8 max-w-8xl">
        {/* How to Use Section */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 shadow-lg">
          <CardContent className="py-4 sm:py-6">
            <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              How to Build Your Resume
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <div>
                  <p className="font-medium">Create New</p>
                  <p className="text-muted-foreground text-xs hidden sm:block">Click "New Resume"</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <div>
                  <p className="font-medium">Fill Details</p>
                  <p className="text-muted-foreground text-xs hidden sm:block">Use the wizard</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <div>
                  <p className="font-medium">Choose Style</p>
                  <p className="text-muted-foreground text-xs hidden sm:block">Pick template & color</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <div>
                  <p className="font-medium">Export</p>
                  <p className="text-muted-foreground text-xs hidden sm:block">Download PDF</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Templates Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h2 className="text-base sm:text-xl font-semibold">Available Templates</h2>
          </div>
          <div
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 px-1 sm:px-2"
            style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
          >
            {[
              { id: 'modern', name: 'Modern', img: '/templates/modern.png' },
              { id: 'classic', name: 'Classic', img: '/templates/classical.png' },
              { id: 'minimal', name: 'Minimal', img: '/templates/minimal.png' },
              { id: 'creative', name: 'Creative', img: '/templates/creativity.png' },
              { id: 'ats', name: 'ATS', img: '/templates/ats.png' },
              { id: 'simple', name: 'Simple', img: '/templates/simple.png' },
              { id: 'elegant', name: 'Elegant', img: '/templates/Elegent.png' },
            ].map((template) => (
              <Card
                key={template.id}
                className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col items-center border-2 border-primary/30 bg-white min-w-[130px] max-w-[140px] sm:min-w-[170px] sm:max-w-[170px] md:min-w-[180px] md:max-w-[180px] snap-center"
              >
                <div
                  className="w-full flex items-center justify-center bg-white"
                  style={{ height: '110px' }}
                >
                  <img
                    src={template.img}
                    alt={template.name + ' preview'}
                    className="object-contain"
                    style={{ width: '90px', height: '100px' }}
                  />
                </div>
                <CardContent className="p-1 sm:p-2 text-center">
                  <p className="font-semibold text-xs sm:text-base md:text-lg truncate">{template.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Resumes Section */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold">My Resumes</h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 sm:mt-1">
              Create and manage your resumes
            </p>
          </div>
          <Button onClick={handleCreateResume} size="sm" className="sm:size-default">
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">New Resume</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : resumes.length === 0 ? (
          <Card className="border-dashed shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">No resumes yet</h3>
              <p className="text-muted-foreground text-center text-sm mb-4">
                Create your first resume to get started
              </p>
              <Button onClick={handleCreateResume}>
                <Plus className="h-4 w-4 mr-2" />
                Create Resume
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {resumes.map((resume) => (
              <Card 
                key={resume.id} 
                className="group hover:shadow-lg transition-all cursor-pointer rounded-xl overflow-hidden"
                onClick={() => navigate(`/builder/${resume.id}`)}
              >
                {/* Template Color Bar */}
                <div className={`h-2 ${templateColors[resume.template] || 'bg-gray-500'}`} />
                
                <CardHeader className="flex flex-row items-start justify-between space-y-0 p-3 sm:p-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg truncate">{resume.title}</CardTitle>
                    <CardDescription className="capitalize text-xs sm:text-sm">
                      {resume.template} template
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/builder/${resume.id}`);
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleRename(resume);
                      }}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(resume.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                          {/* Rename Dialog */}
                          <RenameDialog open={!!renameId} onOpenChange={() => setRenameId(null)}>
                            <RenameDialogContent>
                              <RenameDialogHeader>
                                <RenameDialogTitle>Rename Document</RenameDialogTitle>
                              </RenameDialogHeader>
                              <form onSubmit={e => { e.preventDefault(); submitRename(); }}>
                                <Input
                                  value={renameValue}
                                  onChange={e => setRenameValue(e.target.value)}
                                  placeholder="Enter new document name"
                                  autoFocus
                                  disabled={renaming}
                                  className="mb-4"
                                />
                                <div className="flex justify-end gap-2">
                                  <Button type="button" variant="outline" onClick={() => setRenameId(null)} disabled={renaming}>Cancel</Button>
                                  <Button type="submit" disabled={renaming || !renameValue.trim()}>{renaming ? <Loader2 className="animate-spin h-4 w-4" /> : 'Save'}</Button>
                                </div>
                              </form>
                            </RenameDialogContent>
                          </RenameDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Updated {formatDate(resume.updated_at)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteResume} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
