import ServicesSection from '../ServicesSection';

export default function ServicesSectionExample() {
  return (
    <ServicesSection
      onPurchaseClick={(service) => console.log('Purchase clicked:', service.title)}
    />
  );
}
