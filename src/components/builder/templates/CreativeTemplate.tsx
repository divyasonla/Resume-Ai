import { ResumeData, DEFAULT_SETTINGS } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

export default function CreativeTemplate({ data, fontFamily }: TemplateProps) {
  const themeColor = data.settings?.themeColor || DEFAULT_SETTINGS.themeColor;
  const fontSize = data.settings?.fontSize || DEFAULT_SETTINGS.fontSize;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Parse HSL to get lighter/darker variants
  const [h, s, l] = themeColor.split(' ').map(v => parseFloat(v));

  return (
    <div className="h-full flex bg-white" style={{ fontSize: `${fontSize}pt`, fontFamily: fontFamily || 'IBM Plex Serif' }}>
      {/* Sidebar */}
      <div 
        className="w-1/3 text-white p-6"
        style={{ 
          background: `linear-gradient(to bottom, hsl(${h} ${s}% ${l}%), hsl(${h} ${s}% ${Math.max(l - 15, 20)}%))` 
        }}
      >
        <div className="mb-8">
          <div 
            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `hsl(${h} ${s}% ${Math.min(l + 20, 90)}% / 0.2)` }}
          >
            <span className="text-3xl font-bold">
              {data.personalInfo.fullName?.charAt(0) || '?'}
            </span>
          </div>
          <h1 className="text-xl font-bold text-center">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{ color: `hsl(${h} ${s}% ${Math.min(l + 30, 90)}%)` }}
          >
            Contact
          </h2>
          <div className="space-y-2 text-sm" style={{ color: `hsl(${h} ${s}% ${Math.min(l + 25, 85)}%)` }}>
            {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
            {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
            {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: `hsl(${h} ${s}% ${Math.min(l + 30, 90)}%)` }}
            >
              Skills
            </h2>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-sm mb-1" style={{ color: `hsl(${h} ${s}% ${Math.min(l + 25, 85)}%)` }}>
                    {skill.name}
                  </p>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: `hsl(${h} ${s}% ${Math.min(l + 30, 90)}%)` }}
            >
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <p className="text-sm font-medium text-white">{edu.degree}</p>
                <p className="text-xs" style={{ color: `hsl(${h} ${s}% ${Math.min(l + 30, 90)}%)` }}>
                  {edu.institution}
                </p>
                <p className="text-xs" style={{ color: `hsl(${h} ${s}% ${Math.min(l + 35, 95)}%)` }}>
                  {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: `hsl(${h} ${s}% ${Math.min(l + 30, 90)}%)` }}
            >
              Languages
            </h2>
            {data.languages.map((lang) => (
              <p key={lang.id} className="text-sm mb-1" style={{ color: `hsl(${h} ${s}% ${Math.min(l + 25, 85)}%)` }}>
                {lang.name} <span style={{ color: `hsl(${h} ${s}% ${Math.min(l + 35, 95)}%)` }}>({lang.proficiency})</span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {/* Career Objective */}
        {data.careerObjective && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-2 flex items-center"
              style={{ color: `hsl(${themeColor})` }}
            >
              <span 
                className="w-8 h-0.5 mr-3"
                style={{ backgroundColor: `hsl(${themeColor})` }}
              />
              About Me
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{data.careerObjective}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-4 flex items-center"
              style={{ color: `hsl(${themeColor})` }}
            >
              <span 
                className="w-8 h-0.5 mr-3"
                style={{ backgroundColor: `hsl(${themeColor})` }}
              />
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div 
                key={exp.id} 
                className="mb-4 relative pl-4 border-l-2"
                style={{ borderColor: `hsl(${themeColor} / 0.3)` }}
              >
                <div 
                  className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: `hsl(${themeColor})` }}
                />
                <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                <p className="text-sm" style={{ color: `hsl(${themeColor})` }}>{exp.company}</p>
                <p className="text-xs text-gray-400 mb-2">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
                {exp.responsibilities.length > 0 && (
                  <ul className="text-sm text-gray-600 space-y-1">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>• {resp}</li>
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
              className="text-lg font-bold mb-4 flex items-center"
              style={{ color: `hsl(${themeColor})` }}
            >
              <span 
                className="w-8 h-0.5 mr-3"
                style={{ backgroundColor: `hsl(${themeColor})` }}
              />
              Projects
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {data.projects.map((project) => (
                <div 
                  key={project.id} 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `hsl(${themeColor} / 0.05)` }}
                >
                  <h3 className="font-semibold text-gray-900 text-sm">{project.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{ 
                            backgroundColor: `hsl(${themeColor} / 0.15)`,
                            color: `hsl(${themeColor})`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-3 flex items-center"
              style={{ color: `hsl(${themeColor})` }}
            >
              <span 
                className="w-8 h-0.5 mr-3"
                style={{ backgroundColor: `hsl(${themeColor})` }}
              />
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert) => (
                <span 
                  key={cert.id} 
                  className="px-3 py-1.5 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `hsl(${themeColor} / 0.1)`,
                    color: `hsl(${themeColor})`
                  }}
                >
                  {cert.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-3 flex items-center"
              style={{ color: `hsl(${themeColor})` }}
            >
              <span 
                className="w-8 h-0.5 mr-3"
                style={{ backgroundColor: `hsl(${themeColor})` }}
              />
              Achievements
            </h2>
            {data.achievements.map((ach) => (
              <div 
                key={ach.id} 
                className="mb-2 pl-4 border-l-2"
                style={{ borderColor: `hsl(${themeColor} / 0.3)` }}
              >
                <h3 className="font-medium text-gray-900 text-sm">{ach.title}</h3>
                {ach.description && <p className="text-xs text-gray-500">{ach.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Interests */}
        {data.interests.length > 0 && (
          <section>
            <h2 
              className="text-lg font-bold mb-3 flex items-center"
              style={{ color: `hsl(${themeColor})` }}
            >
              <span 
                className="w-8 h-0.5 mr-3"
                style={{ backgroundColor: `hsl(${themeColor})` }}
              />
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((int) => (
                <span key={int.id} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {int.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
