import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Brain, Activity, ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import healthJourney from '@/assets/health-journey.jpg';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms help detect early signs of breast cancer, PCOS, and endometriosis."
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Tailored health insights and recommendations based on your unique health profile."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your health data is encrypted and secure. Complete privacy and confidentiality guaranteed."
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track symptoms, cycles, and health metrics with intelligent pattern recognition."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-2xl font-display font-bold text-gradient">FEMA</span>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="font-medium"
              >
                Login
              </Button>
              <Button 
                className="fema-button-primary"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 fema-gradient opacity-70"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight">
                  Your AI Partner in{' '}
                  <span className="text-gradient">Women's Health</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Empowering women with AI-driven early detection and personalized care for breast cancer, PCOS, and endometriosis.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="fema-button-primary text-lg px-8 py-4"
                  onClick={() => navigate('/signup')}
                >
                  Start Your Health Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="fema-button-secondary text-lg px-8 py-4"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Trusted by 50K+ Women</span>
                </div>
              </div>
            </div>

            <div className={`relative ${isVisible ? 'animate-float' : ''}`}>
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Woman using FEMA health app" 
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -inset-4 fema-gradient rounded-3xl opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Comprehensive <span className="text-gradient">Women's Health</span> Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology combined with compassionate care to support your health journey at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="fema-card border-0 hover:scale-105 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="inline-flex p-4 rounded-2xl bg-primary/10">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={healthJourney} 
                alt="Women's health journey illustration" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold">
                Empowering Women Through <span className="text-gradient">Early Detection</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                FEMA leverages cutting-edge AI to help women take control of their health. Our platform provides early detection capabilities for critical conditions like breast cancer, PCOS, and endometriosis, enabling timely intervention and better outcomes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Early Detection</h4>
                    <p className="text-muted-foreground">AI-powered screening for breast cancer and other conditions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Personalized Insights</h4>
                    <p className="text-muted-foreground">Tailored health recommendations based on your unique profile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Continuous Support</h4>
                    <p className="text-muted-foreground">24/7 AI assistant for health guidance and support</p>
                  </div>
                </div>
              </div>

              <Button 
                size="lg"
                className="fema-button-primary"
                onClick={() => navigate('/signup')}
              >
                Join FEMA Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 fema-gradient">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-display font-bold text-white">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of women who trust FEMA for their health monitoring and early detection needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg"
                onClick={() => navigate('/signup')}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-display font-bold text-gradient">FEMA</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2024 FEMA Health. Empowering women's health through AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;