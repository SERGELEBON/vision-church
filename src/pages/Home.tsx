import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Events from '@/components/sections/Events';
import About from '@/components/sections/About';
import QuickLinks from '@/components/sections/QuickLinks';
import Locations from '@/components/sections/Locations';
import Newsletter from '@/components/sections/Newsletter';

const Home = () => {
  return (
    <div className="min-h-screen bg-darkblue">
      <Navigation />
      <main>
        <Hero />
        <Events />
        <About />
        <QuickLinks />
        <Locations />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
