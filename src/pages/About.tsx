
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-semibold text-center">About Us</h1>
          <p className="text-center text-gray-600 mt-4">Complete About Us page coming soon.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
