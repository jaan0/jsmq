import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection
      onGetStartedClick={() => console.log('Get started clicked')}
      onViewServicesClick={() => console.log('View services clicked')}
    />
  );
}
