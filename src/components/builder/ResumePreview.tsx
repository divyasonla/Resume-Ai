import { useResume } from '@/contexts/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ATSTemplate from './templates/ATSTemplate';
import SimpleTemplate from './templates/SimpleTemplate';
import ElegantTemplate from './templates/ElegantTemplate';

export default function ResumePreview() {
  const { resumeData } = useResume();

  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'ats':
        return <ATSTemplate data={resumeData} />;
      case 'simple':
        return <SimpleTemplate data={resumeData} />;
      case 'elegant':
        return <ElegantTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div 
      className="bg-white text-black shadow-lg resume-shadow w-full max-w-[210mm] min-h-[297mm]"
      style={{ 
        aspectRatio: '210 / 297',
        fontSize: '11pt',
        lineHeight: '1.4',
      }}
    >
      {renderTemplate()}
    </div>
  );
}
