import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Sparkles, 
  Layout, 
  Download, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: Layout,
    title: 'Beautiful Templates',
    description: 'Choose from 5+ professionally designed templates optimized for ATS systems.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Suggestions',
    description: 'Get real-time feedback and improvements for your resume content.',
  },
  {
    icon: Download,
    title: 'Multiple Export Formats',
    description: 'Download your resume as PDF, DOCX, or plain text for any application.',
  },
];

const benefits = [
  'Live preview as you type',
  'Grammar and spelling check',
  'Professional language enhancement',
  'ATS-optimized formatting',
  'Smart skill suggestions',
  'Career objective generator',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">ResumeAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Resume Builder
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Build Your Perfect Resume
            <br />
            <span className="text-primary">In Minutes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Create professional, ATS-optimized resumes with AI-powered suggestions. 
            Perfect for students and freshers starting their career journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Building Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Powerful features to help you create a standout resume that gets noticed
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                AI That Works <span className="text-primary">For You</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Our intelligent system analyzes your resume in real-time, providing 
                actionable feedback to help you present your best self to employers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border">
              <div className="bg-card rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">AI Feedback</h4>
                    <p className="text-sm text-muted-foreground">Real-time analysis</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Score</span>
                    <span className="font-semibold text-primary">92/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[92%] bg-primary rounded-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Great use of action verbs! Consider adding more quantifiable achievements."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join thousands of students and freshers who have created professional 
            resumes with ResumeAI.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="h-5 w-5" />
            <span className="font-semibold">ResumeAI</span>
          </div>
          <p className="text-sm">© 2024 ResumeAI. Built for students & freshers.</p>
        </div>
      </footer>
    </div>
  );
}
