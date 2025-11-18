import Navbar from '../Navbar';

export default function NavbarExample() {
  return (
    <Navbar onContactClick={() => console.log('Contact clicked')} />
  );
}
