import { Card } from '@/components/ui/card';
import { Award, Users, Target, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AboutSection() {
  const { ref: sectionRef, isInView } = useScrollAnimation({ threshold: 0.2 });

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality First',
      description: 'We never compromise on quality. Every project is crafted with attention to detail and excellence.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Client-Focused',
      description: 'Your success is our success. We work closely with you to understand and exceed your expectations.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable results that drive your business forward and achieve your goals.',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We stay ahead of trends and technologies to provide cutting-edge solutions for modern challenges.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-ring rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={sectionRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight"
            >
              About JSMQ
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="space-y-6 text-xl text-foreground/80 leading-relaxed"
            >
              <p>
                JSMQ is a leading web development agency based in Pakistan, specializing in creating 
                modern, futuristic digital experiences that drive results for businesses worldwide.
              </p>
              <p>
                With over 3 years of experience and 50+ successful projects, we've helped businesses 
                of all sizes transform their digital presence. From startups to established enterprises, 
                our team delivers innovative solutions tailored to your unique needs.
              </p>
              <p>
                We combine cutting-edge technology with creative design to build websites and applications 
                that not only look stunning but also perform exceptionally. Our commitment to quality and 
                client satisfaction has earned us a 100% satisfaction rate.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 hover-elevate transition-all duration-300 h-full will-change-transform" data-testid={`value-${index}`}>
                  <div className="text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
