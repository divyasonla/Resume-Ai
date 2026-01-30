import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export default function SimpleTemplate({ data }: TemplateProps) {
  const themeColor = data.settings?.themeColor || '217 91% 60%';
  const fontSize = data.settings?.fontSize || 11;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div 
      className="p-8 h-full bg-white"
      style={{ fontSize: `${fontSize}pt` }}
    >
      {/* Header */}
      <header className="mb-6">
        <h1 
          className="text-2xl font-bold mb-2"
          style={{ color: `hsl(${themeColor})` }}
        >
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="flex gap-3 text-sm text-gray-600 mt-1">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span>• {data.personalInfo.website}</span>}
          </div>
        )}
      </header>

      {/* Career Objective */}
      {data.careerObjective && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Summary
          </h2>
          <p className="text-gray-700 text-sm">{data.careerObjective}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-600 text-sm">{exp.company}{exp.location && `, ${exp.location}`}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              {exp.responsibilities.length > 0 && (
                <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-0.5">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500">{formatDate(edu.endDate)}</span>
              </div>
              {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Skills
          </h2>
          <p className="text-sm text-gray-700">{data.skills.map(s => s.name).join(', ')}</p>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-2">
              <h3 className="font-semibold text-gray-900 text-sm">{project.title}</h3>
              <p className="text-gray-700 text-xs">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-xs text-gray-500">Tech: {project.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Certifications
          </h2>
          {data.certifications.map((cert) => (
            <p key={cert.id} className="text-sm text-gray-700">
              {cert.name} - {cert.issuer} ({formatDate(cert.date)})
            </p>
          ))}
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Languages
          </h2>
          <p className="text-sm text-gray-700">
            {data.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
          </p>
        </section>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Achievements
          </h2>
          {data.achievements.map((ach) => (
            <div key={ach.id} className="mb-1">
              <span className="text-sm font-medium text-gray-900">{ach.title}</span>
              {ach.description && <span className="text-sm text-gray-600"> - {ach.description}</span>}
            </div>
          ))}
        </section>
      )}

      {/* Interests */}
      {data.interests.length > 0 && (
        <section>
          <h2 
            className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Interests
          </h2>
          <p className="text-sm text-gray-700">{data.interests.map(i => i.name).join(', ')}</p>
        </section>
      )}
    </div>
  );
}
