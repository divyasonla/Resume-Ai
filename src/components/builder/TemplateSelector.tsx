import { TemplateType, THEME_COLORS } from '@/types/resume';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTemplate: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const templates: { id: TemplateType; name: string; description: string; img: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean, contemporary design with accent colors', img: '/templates/modern.png' },
  { id: 'classic', name: 'Classic', description: 'Traditional, timeless layout for formal industries', img: '/templates/classical.png' },
  { id: 'minimal', name: 'Minimal', description: 'Elegant simplicity with generous whitespace', img: '/templates/minimal.png' },
  { id: 'creative', name: 'Creative', description: 'Bold sidebar design for creative fields', img: '/templates/creativity.png' },
  { id: 'ats', name: 'ATS-Optimized', description: 'Plain text-friendly for applicant tracking systems', img: '/templates/ats.png' },
  { id: 'simple', name: 'Simple', description: 'Straightforward and easy to read', img: '/templates/simple.png' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated design with refined typography', img: '/templates/Elegent.png' },
];

const templateColors: Record<TemplateType, string> = {
  modern: 'bg-blue-500',
  classic: 'bg-gray-700',
  minimal: 'bg-slate-300',
  creative: 'bg-purple-500',
  ats: 'bg-green-600',
  simple: 'bg-orange-500',
  elegant: 'bg-indigo-500',
};

export default function TemplateSelector({ 
  open, 
  onOpenChange, 
  currentTemplate, 
  onSelect 
}: TemplateSelectorProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Select a template that matches your style and industry. All templates use your selected theme color.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={cn(
                'p-3 rounded-lg border-2 text-left transition-all hover:border-primary/50 hover:shadow-md',
                currentTemplate === template.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-border'
              )}
            >
              {/* Preview Card with Image if available */}
              <div className={cn('aspect-[3/4] rounded-md mb-3 flex flex-col overflow-hidden bg-white border', templateColors[template.id])}>
                <img
                  src={template.img}
                  alt={template.name + ' preview'}
                  className="object-cover w-full h-full"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              
              <h3 className="font-semibold text-sm">{template.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
