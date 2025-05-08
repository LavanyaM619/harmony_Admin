
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-56 -right-56 w-96 h-96 rounded-full bg-harmony-100 filter blur-3xl opacity-60"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-50 filter blur-3xl opacity-60"></div>
      
      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-harmony-100 text-harmony-800 inline-block mb-2">
                Financial Excellence
              </span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-gray-900 transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
              Building Your <span className="text-harmony-600 relative">
                Future
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-harmony-200" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q25,0 50,10 Q75,20 100,10" fill="currentColor"/>
                </svg>
              </span> Through Smart Investments
            </h1>
            
            <p 
              className={`text-lg md:text-xl text-gray-600 mt-6 transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
              Harmony Investment provides personalized financial solutions to help you achieve your goals with confidence and peace of mind.
            </p>
          </div>
          
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 transition-all duration-700 delay-400 transform ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
          >
            <a 
              href="#loan-calculator" 
              className="px-6 py-3 bg-harmony-600 text-white font-medium rounded-lg shadow-lg hover:bg-harmony-700 transition-colors duration-200 w-full sm:w-auto text-center"
            >
              Calculate Your Loan
            </a>
            <a 
              href="#about-us" 
              className="px-6 py-3 bg-white text-harmony-600 font-medium rounded-lg shadow border border-harmony-200 hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto text-center"
            >
              Learn More About Us
            </a>
          </div>
        </div>
        
        {/* Animated card with stats */}
        <div 
          className={`mt-16 relative max-w-4xl mx-auto transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}`}
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard title="Assets Under Management" value="$2.5B+" />
            <StatCard title="Satisfied Clients" value="15,000+" />
            <StatCard title="Years of Excellence" value="5+" />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ title, value }: { title: string, value: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="text-3xl md:text-4xl font-display font-bold text-gray-900">{value}</div>
    <p className="text-sm text-gray-600 mt-2">{title}</p>
  </div>
);

export default Hero;
