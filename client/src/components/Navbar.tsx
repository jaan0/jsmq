import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-lg'
            : 'bg-background/60 backdrop-blur-md'
        }`}
        animate={{
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(8px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <motion.button
                onClick={() => scrollToSection('hero')}
                className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                data-testid="link-logo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                JSMQ
              </motion.button>
            </div>

          <div className="hidden md:flex items-center space-x-8">
            <motion.button
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors relative"
              data-testid="link-services"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Services
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('portfolio')}
              className="text-foreground hover:text-primary transition-colors relative"
              data-testid="link-portfolio"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Portfolio
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors relative"
              data-testid="link-about"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              About
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onContactClick}
                variant="default"
                data-testid="button-contact"
                className="transition-all duration-300"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          </div>
        </div>
      </motion.div>

      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-2 pb-4 space-y-3">
            <motion.button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              data-testid="link-services-mobile"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Services
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              data-testid="link-portfolio-mobile"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Portfolio
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              data-testid="link-about-mobile"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              About
            </motion.button>
            <Button
              onClick={onContactClick}
              variant="default"
              className="w-full"
              data-testid="button-contact-mobile"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
