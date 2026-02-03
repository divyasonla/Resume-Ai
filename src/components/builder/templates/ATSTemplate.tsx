import { ResumeData, DEFAULT_SETTINGS } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

export default function ATSTemplate({ data, fontFamily }: TemplateProps) {
  const themeColor = data.settings?.themeColor || DEFAULT_SETTINGS.themeColor;
  const fontSize = data.settings?.fontSize || DEFAULT_SETTINGS.fontSize;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="p-8 h-full font-sans text-sm bg-white" style={{ fontSize: `${fontSize}pt`, fontFamily: fontFamily || 'IBM Plex Serif' }}>
      {/* Header - Plain text, no formatting that confuses ATS */}
      <header className="mb-6">
        <h1 
          className="text-2xl font-bold mb-1"
          style={{ color: `hsl(${themeColor})` }}
        >
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-gray-700">
          {[
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location,
          ].filter(Boolean).join(' | ')}
        </p>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <p className="text-gray-700">
            {[data.personalInfo.linkedin, data.personalInfo.website].filter(Boolean).join(' | ')}
          </p>
        )}
      </header>

      {/* Career Objective / Summary */}
      {data.careerObjective && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase border-b pb-1 mb-2"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-800">{data.careerObjective}</p>
        </section>
      )}

      {/* Skills - Keyword-rich section for ATS */}
      {data.skills.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase border-b pb-1 mb-2"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Skills
          </h2>
          <p className="text-gray-800">
            {data.skills.map(s => s.name).join(', ')}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase border-b pb-1 mb-2"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Work Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <p className="font-bold text-black">{exp.role}</p>
              <p className="text-gray-700">
                {exp.company}{exp.location && `, ${exp.location}`}
              </p>
              <p className="text-gray-600 text-xs mb-1">
                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
              </p>
              {exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside text-gray-800 space-y-0.5">
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
            className="text-sm font-bold uppercase border-b pb-1 mb-2"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <p className="font-bold text-black">
                {edu.degree} {edu.field && `in ${edu.field}`}
              </p>
              <p className="text-gray-700">{edu.institution}</p>
              <p className="text-gray-600 text-xs">
                {formatDate(edu.endDate)}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </p>
              {edu.description && <p className="text-gray-700 text-xs mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase border-b pb-1 mb-2"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <p className="font-bold text-black">{project.title}</p>
              <p className="text-gray-600 text-xs mb-1">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </p>
              <p className="text-gray-800">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-gray-600 text-xs mt-1">
                  Technologies: {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase border-b pb-1 mb-2"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Certifications
          </h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <p className="text-gray-800">
                <span className="font-bold">{cert.name}</span>
                {cert.issuer && ` - ${cert.issuer}`}
                {cert.date && ` (${formatDate(cert.date)})`}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase border-b pb-1 mb-2"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Languages
          </h2>
          <p className="text-gray-800">
            {data.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
          </p>
        </section>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <section className="mb-5">
          <h2 
            className="text-sm font-bold uppercase border-b pb-1 mb-2"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Achievements
          </h2>
          {data.achievements.map((ach) => (
            <div key={ach.id} className="mb-2">
              <p className="text-gray-800">
                <span className="font-bold">{ach.title}</span>
                {ach.date && ` (${formatDate(ach.date)})`}
              </p>
              {ach.description && <p className="text-gray-700 text-xs">{ach.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Interests */}
      {data.interests.length > 0 && (
        <section>
          <h2 
            className="text-sm font-bold uppercase border-b pb-1 mb-2"
            style={{ color: `hsl(${themeColor})`, borderColor: `hsl(${themeColor})` }}
          >
            Interests
          </h2>
          <p className="text-gray-800">
            {data.interests.map(i => i.name).join(', ')}
          </p>
        </section>
      )}
    </div>
  );
}
