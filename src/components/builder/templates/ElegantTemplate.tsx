import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export default function ElegantTemplate({ data }: TemplateProps) {
  const themeColor = data.settings?.themeColor || '217 91% 60%';
  const fontSize = data.settings?.fontSize || 11;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div 
      className="h-full bg-white"
      style={{ fontSize: `${fontSize}pt` }}
    >
      {/* Header with accent bar */}
      <div 
        className="h-2"
        style={{ backgroundColor: `hsl(${themeColor})` }}
      />
      
      <div className="p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-2">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div 
            className="h-0.5 w-16 mx-auto mb-3"
            style={{ backgroundColor: `hsl(${themeColor})` }}
          />
          <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-500">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
          {(data.personalInfo.linkedin || data.personalInfo.website) && (
            <div className="flex justify-center gap-4 text-sm text-gray-500 mt-1">
              {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
              {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
            </div>
          )}
        </header>

        {/* Career Objective */}
        {data.careerObjective && (
          <section className="mb-6 text-center">
            <p className="text-gray-600 text-sm italic max-w-2xl mx-auto leading-relaxed">
              "{data.careerObjective}"
            </p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h2 
                  className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center"
                  style={{ color: `hsl(${themeColor})` }}
                >
                  <span 
                    className="w-8 h-px mr-3"
                    style={{ backgroundColor: `hsl(${themeColor})` }}
                  />
                  Experience
                </h2>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-gray-900">{exp.role}</h3>
                      <span className="text-xs text-gray-400">
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: `hsl(${themeColor})` }}
                    >
                      {exp.company}
                    </p>
                    {exp.responsibilities.length > 0 && (
                      <ul className="text-sm text-gray-600 space-y-0.5">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start">
                            <span 
                              className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0"
                              style={{ backgroundColor: `hsl(${themeColor})` }}
                            />
                            {resp}
                          </li>
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
                  className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center"
                  style={{ color: `hsl(${themeColor})` }}
                >
                  <span 
                    className="w-8 h-px mr-3"
                    style={{ backgroundColor: `hsl(${themeColor})` }}
                  />
                  Projects
                </h2>
                {data.projects.map((project) => (
                  <div key={project.id} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-gray-900 text-sm">{project.title}</h3>
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

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            {data.education.length > 0 && (
              <section>
                <h2 
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `hsl(${themeColor})` }}
                >
                  Education
                </h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
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
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `hsl(${themeColor})` }}
                >
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1">
                  {data.skills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="text-xs px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: `hsl(${themeColor})` }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <section>
                <h2 
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `hsl(${themeColor})` }}
                >
                  Certifications
                </h2>
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p className="text-sm text-gray-700 font-medium">{cert.name}</p>
                    <p className="text-xs text-gray-400">{cert.issuer}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <section>
                <h2 
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `hsl(${themeColor})` }}
                >
                  Languages
                </h2>
                {data.languages.map((lang) => (
                  <p key={lang.id} className="text-sm text-gray-600">
                    {lang.name} <span className="text-gray-400">— {lang.proficiency}</span>
                  </p>
                ))}
              </section>
            )}

            {/* Achievements */}
            {data.achievements.length > 0 && (
              <section>
                <h2 
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `hsl(${themeColor})` }}
                >
                  Achievements
                </h2>
                {data.achievements.map((ach) => (
                  <div key={ach.id} className="mb-2">
                    <p className="text-sm text-gray-700 font-medium">{ach.title}</p>
                    {ach.description && <p className="text-xs text-gray-400">{ach.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {/* Interests */}
            {data.interests.length > 0 && (
              <section>
                <h2 
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `hsl(${themeColor})` }}
                >
                  Interests
                </h2>
                <p className="text-sm text-gray-600">
                  {data.interests.map(i => i.name).join(', ')}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
