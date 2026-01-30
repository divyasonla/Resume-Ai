import { ResumeData, DEFAULT_SETTINGS } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: TemplateProps) {
  const themeColor = data.settings?.themeColor || DEFAULT_SETTINGS.themeColor;
  const fontSize = data.settings?.fontSize || DEFAULT_SETTINGS.fontSize;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-10 h-full bg-gray-50" style={{ fontSize: `${fontSize}pt` }}>
      {/* Header */}
      <header className="mb-8">
        <h1 
          className="text-4xl font-light mb-3"
          style={{ color: `hsl(${themeColor})` }}
        >
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </header>

      {/* Career Objective */}
      {data.careerObjective && (
        <section className="mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">{data.careerObjective}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: `hsl(${themeColor})` }}
              >
                Experience
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-gray-900">{exp.role}</h3>
                    <span className="text-xs text-gray-400">
                      {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{exp.company}</p>
                  {exp.responsibilities.length > 0 && (
                    <ul className="text-sm text-gray-600 space-y-1">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>— {resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: `hsl(${themeColor})` }}
              >
                Projects
              </h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-gray-900">{project.title}</h3>
                    <span className="text-xs text-gray-400">
                      {formatDate(project.startDate)} — {formatDate(project.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      {project.technologies.join(' · ')}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: `hsl(${themeColor})` }}
              >
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="font-medium text-gray-900 text-sm">{edu.degree}</h3>
                  <p className="text-sm text-gray-500">{edu.institution}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(edu.endDate)}
                    {edu.gpa && ` · ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: `hsl(${themeColor})` }}
              >
                Skills
              </h2>
              <div className="space-y-1">
                {data.skills.map((skill) => (
                  <p key={skill.id} className="text-sm text-gray-600">
                    {skill.name}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2 
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: `hsl(${themeColor})` }}
              >
                Certifications
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <p className="text-sm text-gray-600 font-medium">{cert.name}</p>
                  <p className="text-xs text-gray-400">{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: `hsl(${themeColor})` }}
              >
                Languages
              </h2>
              <div className="space-y-1">
                {data.languages.map((lang) => (
                  <p key={lang.id} className="text-sm text-gray-600">
                    {lang.name} <span className="text-gray-400">— {lang.proficiency}</span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {data.achievements.length > 0 && (
            <section>
              <h2 
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: `hsl(${themeColor})` }}
              >
                Achievements
              </h2>
              {data.achievements.map((ach) => (
                <div key={ach.id} className="mb-3">
                  <p className="text-sm text-gray-600 font-medium">{ach.title}</p>
                  {ach.description && <p className="text-xs text-gray-400">{ach.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Interests */}
          {data.interests.length > 0 && (
            <section>
              <h2 
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: `hsl(${themeColor})` }}
              >
                Interests
              </h2>
              <div className="space-y-1">
                {data.interests.map((int) => (
                  <p key={int.id} className="text-sm text-gray-600">{int.name}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
