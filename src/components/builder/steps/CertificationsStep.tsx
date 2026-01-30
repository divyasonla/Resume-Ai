import { useResume } from '@/contexts/ResumeContext';
import { Certification } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Award } from 'lucide-react';

export default function CertificationsStep() {
  const { resumeData, updateResumeData } = useResume();

  const addCertification = () => {
    const newCert: Certification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    updateResumeData({ certifications: [...resumeData.certifications, newCert] });
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    updateResumeData({
      certifications: resumeData.certifications.map(cert =>
        cert.id === id ? { ...cert, ...updates } : cert
      ),
    });
  };

  const removeCertification = (id: string) => {
    updateResumeData({
      certifications: resumeData.certifications.filter(cert => cert.id !== id),
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Certifications & Achievements</h2>
        <p className="text-muted-foreground mt-1">
          Add your certifications, courses, and awards
        </p>
      </div>

      <div className="space-y-4">
        {resumeData.certifications.map((cert) => (
          <Card key={cert.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  {cert.name || 'New Certification'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCertification(cert.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Certification / Award Name *</Label>
                  <Input
                    placeholder="AWS Solutions Architect"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuing Organization</Label>
                  <Input
                    placeholder="Amazon Web Services"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date Issued</Label>
                  <Input
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Credential URL (optional)</Label>
                  <Input
                    type="url"
                    placeholder="credential.net/abc123"
                    value={cert.link}
                    onChange={(e) => updateCertification(cert.id, { link: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={addCertification}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>
    </div>
  );
}
