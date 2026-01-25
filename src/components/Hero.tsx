import { ArrowRight, TrendingUp, Users, Briefcase, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Compass className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/90 text-sm font-medium">Your Career Compass</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Choose Your Future with{" "}
            <span className="relative inline-block">
              <span className="text-gradient-hope">Confidence</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 2 150 2 198 10" stroke="hsl(38, 92%, 55%)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Stop guessing, start knowing. Scope Hope provides real data on job demand, 
            competition levels, and future predictions to help students make smart career choices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" variant="hero" className="group">
              Explore Fields
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="heroOutline">
              How It Works
            </Button>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <StatItem icon={<Users className="w-5 h-5" />} value="50+" label="Fields Analyzed" />
            <StatItem icon={<Briefcase className="w-5 h-5" />} value="10M+" label="Jobs Tracked" />
            <StatItem icon={<TrendingUp className="w-5 h-5" />} value="5yr" label="Predictions" />
            <StatItem icon={<Compass className="w-5 h-5" />} value="100%" label="Data Driven" />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.5C672 45.7 768 56.3 864 58.8C960 61.3 1056 55.7 1152 50C1248 44.3 1344 38.7 1392 35.8L1440 33V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

const StatItem = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 text-accent mb-2">
      {icon}
    </div>
    <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">{value}</div>
    <div className="text-sm text-primary-foreground/60">{label}</div>
  </div>
);

export default Hero;
