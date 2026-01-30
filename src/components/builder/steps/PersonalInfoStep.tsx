import { useResume } from '@/contexts/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Github, Code2, Image as ImageIcon } from 'lucide-react';

export default function PersonalInfoStep() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground mt-1">
          Start with your basic contact information
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="profile-image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Profile Image
          </Label>
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                updatePersonalInfo('image', ev.target?.result as string);
              };
              reader.readAsDataURL(file);
            }}
          />
          {personalInfo.image && (
            <img src={personalInfo.image} alt="Profile" className="h-16 w-16 rounded-full object-cover mt-2 border" />
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="San Francisco, CA"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn URL
            </Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="linkedin.com/in/johndoe"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Portfolio/Website
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="johndoe.com"
              value={personalInfo.website}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub Profile
            </Label>
            <Input
              id="github"
              type="url"
              placeholder="github.com/username"
              value={personalInfo.github || ''}
              onChange={(e) => updatePersonalInfo('github', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Code Portfolio URL
            </Label>
            <Input
              id="code"
              type="url"
              placeholder="codesandbox.io/u/username"
              value={personalInfo.code || ''}
              onChange={(e) => updatePersonalInfo('code', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
