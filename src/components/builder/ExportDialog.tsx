import { RefObject, useState } from 'react';
import { ResumeData } from '@/types/resume';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, FileDown, FileType, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeData: ResumeData;
  resumeRef?: RefObject<HTMLDivElement>;
}

export default function ExportDialog({ open, onOpenChange, resumeData, resumeRef }: ExportDialogProps) {
  const { toast } = useToast();
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExportPDF = async () => {
    if (!resumeRef?.current) {
      toast({
        title: 'Export failed',
        description: 'Unable to find resume preview. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    setExporting('pdf');
    toast({
      title: 'Generating PDF',
      description: 'Please wait while we create your resume...',
    });

    try {
      // Find the actual resume content (the white div inside the ref)
      const resumeElement = resumeRef.current.querySelector('.bg-white') as HTMLElement || resumeRef.current;
      
      // Use high scale for sharp output
      const canvas = await html2canvas(resumeElement, {
        scale: 3, // High resolution for sharpness
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      // A4 dimensions in mm
      const a4Width = 210;
      const a4Height = 297;

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Convert canvas to image with PNG format for quality
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Add image to PDF, fitting to A4
      pdf.addImage(imgData, 'PNG', 0, 0, a4Width, a4Height, undefined, 'MEDIUM');

      // Generate filename
      const filename = `${resumeData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_resume.pdf`;
      
      // Download
      pdf.save(filename);

      toast({
        title: 'PDF exported successfully',
        description: 'Your resume has been downloaded.',
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Export failed',
        description: error.message || 'An error occurred while exporting.',
        variant: 'destructive',
      });
    } finally {
      setExporting(null);
    }
  };

  const handleExportTxt = () => {
    setExporting('txt');
    
    try {
      const lines: string[] = [];
      
      // Personal Info
      lines.push(resumeData.personalInfo.fullName || 'Your Name');
      lines.push('='.repeat(50));
      if (resumeData.personalInfo.email) lines.push(`Email: ${resumeData.personalInfo.email}`);
      if (resumeData.personalInfo.phone) lines.push(`Phone: ${resumeData.personalInfo.phone}`);
      if (resumeData.personalInfo.location) lines.push(`Location: ${resumeData.personalInfo.location}`);
      if (resumeData.personalInfo.linkedin) lines.push(`LinkedIn: ${resumeData.personalInfo.linkedin}`);
      if (resumeData.personalInfo.website) lines.push(`Website: ${resumeData.personalInfo.website}`);
      lines.push('');

      // Career Objective
      if (resumeData.careerObjective) {
        lines.push('PROFESSIONAL SUMMARY');
        lines.push('-'.repeat(30));
        lines.push(resumeData.careerObjective);
        lines.push('');
      }

      // Skills
      if (resumeData.skills.length > 0) {
        lines.push('SKILLS');
        lines.push('-'.repeat(30));
        lines.push(resumeData.skills.map(s => s.name).join(', '));
        lines.push('');
      }

      // Experience
      if (resumeData.experience.length > 0) {
        lines.push('EXPERIENCE');
        lines.push('-'.repeat(30));
        resumeData.experience.forEach(exp => {
          lines.push(`${exp.role} at ${exp.company}`);
          lines.push(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`);
          exp.responsibilities.forEach(r => lines.push(`• ${r}`));
          lines.push('');
        });
      }

      // Education
      if (resumeData.education.length > 0) {
        lines.push('EDUCATION');
        lines.push('-'.repeat(30));
        resumeData.education.forEach(edu => {
          lines.push(`${edu.degree} in ${edu.field || 'N/A'}`);
          lines.push(edu.institution);
          lines.push(`${edu.startDate} - ${edu.endDate}`);
          lines.push('');
        });
      }

      // Projects
      if (resumeData.projects.length > 0) {
        lines.push('PROJECTS');
        lines.push('-'.repeat(30));
        resumeData.projects.forEach(proj => {
          lines.push(proj.title);
          lines.push(proj.description);
          if (proj.technologies.length > 0) {
            lines.push(`Technologies: ${proj.technologies.join(', ')}`);
          }
          lines.push('');
        });
      }

      // Certifications
      if (resumeData.certifications.length > 0) {
        lines.push('CERTIFICATIONS');
        lines.push('-'.repeat(30));
        resumeData.certifications.forEach(cert => {
          lines.push(`${cert.name} - ${cert.issuer}`);
        });
        lines.push('');
      }

      // Languages
      if (resumeData.languages.length > 0) {
        lines.push('LANGUAGES');
        lines.push('-'.repeat(30));
        lines.push(resumeData.languages.map(l => `${l.name} (${l.proficiency})`).join(', '));
        lines.push('');
      }

      // Achievements
      if (resumeData.achievements.length > 0) {
        lines.push('ACHIEVEMENTS');
        lines.push('-'.repeat(30));
        resumeData.achievements.forEach(ach => {
          lines.push(`${ach.title}${ach.description ? ` - ${ach.description}` : ''}`);
        });
        lines.push('');
      }

      // Interests
      if (resumeData.interests.length > 0) {
        lines.push('INTERESTS');
        lines.push('-'.repeat(30));
        lines.push(resumeData.interests.map(i => i.name).join(', '));
      }

      const content = lines.join('\n');
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_resume.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Text file exported',
        description: 'Your resume has been downloaded as plain text.',
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Export failed',
        description: error.message || 'An error occurred while exporting.',
        variant: 'destructive',
      });
    } finally {
      setExporting(null);
    }
  };

  const handleExportDocx = () => {
    toast({
      title: 'Coming soon',
      description: 'Word document export will be available soon. Use PDF or plain text for now.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Resume</DialogTitle>
          <DialogDescription>Choose your preferred download format</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 mt-4">
          <Button 
            variant="outline" 
            className="justify-start h-auto p-4" 
            onClick={handleExportPDF}
            disabled={!!exporting}
          >
            {exporting === 'pdf' ? (
              <Loader2 className="h-5 w-5 mr-3 animate-spin text-red-500" />
            ) : (
              <FileText className="h-5 w-5 mr-3 text-red-500" />
            )}
            <div className="text-left">
              <p className="font-medium">PDF Document</p>
              <p className="text-sm text-muted-foreground">High-quality, sharp PDF (1-3MB)</p>
            </div>
          </Button>

          {/* <Button 
            variant="outline" 
            className="justify-start h-auto p-4" 
            onClick={handleExportDocx}
            disabled={!!exporting}
          >
            <FileDown className="h-5 w-5 mr-3 text-blue-500" />
            <div className="text-left">
              <p className="font-medium">Word Document (DOCX)</p>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </Button> */}

          {/* <Button 
            variant="outline" 
            className="justify-start h-auto p-4" 
            onClick={handleExportTxt}
            disabled={!!exporting}
          >
            {exporting === 'txt' ? (
              <Loader2 className="h-5 w-5 mr-3 animate-spin text-gray-500" />
            ) : (
              <FileType className="h-5 w-5 mr-3 text-gray-500" />
            )}
            <div className="text-left">
              <p className="font-medium">Plain Text</p>
              <p className="text-sm text-muted-foreground">For copy-paste into job portals</p>
            </div>
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}