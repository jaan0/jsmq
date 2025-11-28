import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import { useCounterAnimation } from '@/hooks/useScrollAnimation';
import heroImage from '@assets/generated_images/Modern_web_development_workspace_hero_a3d1ce02.png';

interface HeroSectionProps {
  onGetStartedClick: () => void;
  onViewServicesClick: () => void;
}

const stats = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 40, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate' },
];

function StatCounter({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, count } = useCounterAnimation(stat.value, 2000, {
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      className="text-white"
      data-testid={`stat-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className="text-3xl md:text-4xl font-bold mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-white/80">{stat.label}</div>
    </motion.div>
  );
}

export default function HeroSection({ onGetStartedClick, onViewServicesClick }: HeroSectionProps) {
  // Multi-layer parallax effects
  const backgroundParallax = useParallax({ speed: 0.3 });
  const gradientParallax = useParallax({ speed: 0.2 });
  const contentParallax = useParallax({ speed: -0.1 });
  const floating1Parallax = useParallax({ speed: 0.4 });
  const floating2Parallax = useParallax({ speed: 0.5 });
  const floating3Parallax = useParallax({ speed: 0.35 });

  // Check if mobile for reduced parallax
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Layer */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: !isMobile ? `translateY(${backgroundParallax}px)` : 'none',
        }}
      >
        {/* Parallax Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-primary/60 will-change-transform"
          style={{
            transform: !isMobile ? `translateY(${gradientParallax}px)` : 'none',
          }}
        />
      </div>

      {/* Animated Floating Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
          style={{
            transform: !isMobile ? `translateY(${floating1Parallax}px)` : 'none',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
          style={{
            transform: !isMobile ? `translateY(${floating2Parallax}px)` : 'none',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
          style={{
            transform: !isMobile ? `translateY(${floating3Parallax}px)` : 'none',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Content with Parallax */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center will-change-transform"
        style={{
          transform: !isMobile ? `translateY(${contentParallax}px)` : 'none',
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium" data-testid="text-badge">
            Crafting Digital Excellence
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
        >
          Transform Your Vision Into
          <br />
          <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            Stunning Digital Reality
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Professional web development services delivering modern, futuristic websites that drive results. 
          From e-commerce to corporate solutions, we build digital experiences that captivate and convert.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={onGetStartedClick}
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg group"
            data-testid="button-get-started"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={onViewServicesClick}
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
            data-testid="button-view-services"
          >
            View Services
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <StatCounter key={index} stat={stat} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
