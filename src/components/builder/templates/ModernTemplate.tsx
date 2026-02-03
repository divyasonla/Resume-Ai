import { ResumeData, DEFAULT_SETTINGS } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

export default function ModernTemplate({ data, fontFamily }: TemplateProps) {
  const themeColor = data.settings?.themeColor || DEFAULT_SETTINGS.themeColor;
  const fontSize = data.settings?.fontSize || DEFAULT_SETTINGS.fontSize;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-8 h-full bg-white" style={{ fontSize: `${fontSize}pt`, fontFamily: fontFamily || 'IBM Plex Serif' }}>
      {/* Header */}
      <header 
        className="border-b-2 pb-4 mb-6"
        style={{ borderColor: `hsl(${themeColor})` }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {data.personalInfo.location}
            </span>
          )}
          {data.personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              {data.personalInfo.linkedin}
            </span>
          )}
          {data.personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {data.personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Career Objective */}
      {data.careerObjective && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold uppercase tracking-wide mb-2"
            style={{ color: `hsl(${themeColor})` }}
          >
            Career Objective
          </h2>
          <p className="text-gray-700 text-sm">{data.careerObjective}</p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold uppercase tracking-wide mb-3"
            style={{ color: `hsl(${themeColor})` }}
          >
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold uppercase tracking-wide mb-3"
            style={{ color: `hsl(${themeColor})` }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-2 py-1 rounded text-sm"
                style={{ 
                  backgroundColor: `hsl(${themeColor} / 0.1)`,
                  color: `hsl(${themeColor})`
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold uppercase tracking-wide mb-3"
            style={{ color: `hsl(${themeColor})` }}
          >
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-600 text-sm">{exp.company}{exp.location && `, ${exp.location}`}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
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
            className="text-lg font-bold uppercase tracking-wide mb-3"
            style={{ color: `hsl(${themeColor})` }}
          >
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <span className="text-sm text-gray-500">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Technologies: {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold uppercase tracking-wide mb-3"
            style={{ color: `hsl(${themeColor})` }}
          >
            Certifications
          </h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                  <p className="text-gray-600 text-xs">{cert.issuer}</p>
                </div>
                <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold uppercase tracking-wide mb-3"
            style={{ color: `hsl(${themeColor})` }}
          >
            Languages
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.languages.map((lang) => (
              <span key={lang.id} className="text-sm text-gray-700">
                {lang.name} <span className="text-gray-400">({lang.proficiency})</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold uppercase tracking-wide mb-3"
            style={{ color: `hsl(${themeColor})` }}
          >
            Achievements
          </h2>
          {data.achievements.map((ach) => (
            <div key={ach.id} className="mb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 text-sm">{ach.title}</h3>
                <span className="text-xs text-gray-500">{formatDate(ach.date)}</span>
              </div>
              {ach.description && <p className="text-gray-600 text-xs">{ach.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Interests */}
      {data.interests.length > 0 && (
        <section>
          <h2 
            className="text-lg font-bold uppercase tracking-wide mb-3"
            style={{ color: `hsl(${themeColor})` }}
          >
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((int) => (
              <span key={int.id} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {int.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
