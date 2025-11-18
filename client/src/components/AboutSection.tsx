import { Card } from '@/components/ui/card';
import { Award, Users, Target, Lightbulb } from 'lucide-react';

export default function AboutSection() {
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

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
              About JSMQ
            </h2>
            <div className="space-y-5 text-xl text-foreground/80 leading-relaxed">
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
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover-elevate transition-all duration-300" data-testid={`value-${index}`}>
                <div className="text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
