import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@assets/generated_images/Modern_web_development_workspace_hero_a3d1ce02.png';

interface HeroSectionProps {
  onGetStartedClick: () => void;
  onViewServicesClick: () => void;
}

export default function HeroSection({ onGetStartedClick, onViewServicesClick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-ring/80" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-ring/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-ring/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium" data-testid="text-badge">
            Crafting Digital Excellence
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Transform Your Vision Into
          <br />
          <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Stunning Digital Reality
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Professional web development services delivering modern, futuristic websites that drive results. 
          From e-commerce to corporate solutions, we build digital experiences that captivate and convert.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onGetStartedClick}
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 group"
            data-testid="button-get-started"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={onViewServicesClick}
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-view-services"
          >
            View Services
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: '50+', label: 'Projects Completed' },
            { value: '40+', label: 'Happy Clients' },
            { value: '3+', label: 'Years Experience' },
            { value: '100%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <div key={index} className="text-white" data-testid={`stat-${index}`}>
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
