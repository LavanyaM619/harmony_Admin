
import { useState, useEffect } from 'react';
import { Building, Shield, Users, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const aboutElement = document.getElementById('about-us');
    if (aboutElement) {
      observer.observe(aboutElement);
    }

    return () => {
      if (aboutElement) {
        observer.unobserve(aboutElement);
      }
    };
  }, []);
  
  return (
    <section 
      id="about-us" 
      className="section bg-gray-50 relative overflow-hidden"
    >
      {/* Background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-harmony-50 filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-50 filter blur-3xl opacity-70"></div>
      
      <div className="container-custom relative">
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 transform ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}`}
        >
          {/* Left column: Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-harmony-600/20 to-harmony-800/20 mix-blend-multiply z-10"></div>
              {/* The 'fill' class is added for a dummy image, replace with your actual image */}
              <div className="w-full h-full bg-gray-300 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-harmony-100 to-harmony-300 flex items-center justify-center">
                  <Building size={64} className="text-harmony-600" />
                </div>
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -right-6 -bottom-6 glass-card rounded-xl p-4 shadow-lg max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-harmony-200 flex items-center justify-center border-2 border-white">
                    <span className="text-harmony-600 text-xs font-bold">CB</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-harmony-300 flex items-center justify-center border-2 border-white">
                    <span className="text-harmony-700 text-xs font-bold">TM</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-harmony-400 flex items-center justify-center border-2 border-white">
                    <span className="text-white text-xs font-bold">JD</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Leadership Team</p>
                  <p className="text-xs text-gray-500">25+ years of combined experience</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column: Content */}
          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-harmony-100 text-harmony-800 inline-block">
                About Harmony Investment
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-gray-900 mt-4">
                Your Trusted Partner in Financial Growth
              </h2>
            </div>
            
            <p className="text-gray-600">
              At Harmony Investment, we believe that financial success comes from a balanced approach to wealth management. 
              Since our founding in 1998, we've been helping individuals and businesses make informed investment decisions
              that align with their goals and values.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <FeatureCard 
                icon={<Shield size={20} />}
                title="Secure Investments"
                description="Your investments are protected by industry-leading security protocols and insurance."
              />
              <FeatureCard 
                icon={<Users size={20} />}
                title="Expert Advisors"
                description="Our team of certified financial advisors bring decades of experience to your portfolio."
              />
              <FeatureCard 
                icon={<TrendingUp size={20} />}
                title="Growth Strategies"
                description="Custom-tailored investment strategies designed for sustainable, long-term growth."
              />
              <FeatureCard 
                icon={<Building size={20} />}
                title="Global Presence"
                description="With offices in major financial centers, we provide truly global investment opportunities."
              />
            </div>
            
            <div className="pt-4">
              <a 
                href="/about" 
                className="inline-flex items-center text-harmony-600 font-medium hover:text-harmony-800 transition-colors duration-200"
              >
                Learn more about our story
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex space-x-4">
    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-harmony-100 flex items-center justify-center text-harmony-600">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default AboutUs;
