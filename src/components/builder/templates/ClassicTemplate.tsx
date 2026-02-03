import { ResumeData, DEFAULT_SETTINGS } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

export default function ClassicTemplate({ data, fontFamily }: TemplateProps) {
  const themeColor = data.settings?.themeColor || DEFAULT_SETTINGS.themeColor;
  const fontSize = data.settings?.fontSize || DEFAULT_SETTINGS.fontSize;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-8 h-full font-serif bg-white" style={{ fontSize: `${fontSize}pt`, fontFamily: fontFamily || 'IBM Plex Serif' }}>
      {/* Header */}
      <header 
        className="text-center border-b-2 pb-4 mb-6"
        style={{ borderColor: `hsl(${themeColor})` }}
      >
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && (
            <>
              <span>•</span>
              <span>{data.personalInfo.phone}</span>
            </>
          )}
          {data.personalInfo.location && (
            <>
              <span>•</span>
              <span>{data.personalInfo.location}</span>
            </>
          )}
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="flex justify-center gap-3 text-sm text-gray-600 mt-1">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && (
              <>
                {data.personalInfo.linkedin && <span>•</span>}
                <span>{data.personalInfo.website}</span>
              </>
            )}
          </div>
        )}
      </header>

      {/* Career Objective */}
      {data.careerObjective && (
        <section className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor} / 0.3)` }}
          >
            Objective
          </h2>
          <p className="text-gray-700 text-sm italic">{data.careerObjective}</p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor} / 0.3)` }}
          >
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <strong className="text-gray-900">{edu.institution}</strong>
                <span className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {edu.degree} {edu.field && `in ${edu.field}`}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </p>
              {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor} / 0.3)` }}
          >
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <strong className="text-gray-900">{exp.company}</strong>
                <span className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-sm text-gray-700 italic">{exp.role}{exp.location && ` | ${exp.location}`}</p>
              {exp.responsibilities.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor} / 0.3)` }}
          >
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between">
                <strong className="text-gray-900">{project.title}</strong>
                <span className="text-sm text-gray-600">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-xs text-gray-500 mt-1 italic">
                  Technologies: {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor} / 0.3)` }}
          >
            Skills
          </h2>
          <p className="text-sm text-gray-700">
            {data.skills.map(s => s.name).join(' • ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor} / 0.3)` }}
          >
            Certifications
          </h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2 flex justify-between">
              <span className="text-sm text-gray-700">
                <strong>{cert.name}</strong> - {cert.issuer}
              </span>
              <span className="text-sm text-gray-500">{formatDate(cert.date)}</span>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor} / 0.3)` }}
          >
            Languages
          </h2>
          <p className="text-sm text-gray-700">
            {data.languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
          </p>
        </section>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor} / 0.3)` }}
          >
            Achievements
          </h2>
          {data.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 flex justify-between">
              <span className="text-sm text-gray-700">
                <strong>{ach.title}</strong>{ach.description && ` - ${ach.description}`}
              </span>
              <span className="text-sm text-gray-500">{formatDate(ach.date)}</span>
            </div>
          ))}
        </section>
      )}

      {/* Interests */}
      {data.interests.length > 0 && (
        <section>
          <h2 
            className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor} / 0.3)` }}
          >
            Interests & Hobbies
          </h2>
          <p className="text-sm text-gray-700">
            {data.interests.map(i => i.name).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
}
