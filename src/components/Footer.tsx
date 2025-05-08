
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-harmony-600 flex items-center justify-center text-white font-display text-xl font-bold">
                H
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                Harmony <span className="text-harmony-400">Investment</span>
              </span>
            </Link>
            
            <p className="text-gray-400 text-sm">
              Providing trusted financial services and investment solutions since 1998. 
              We help our clients build wealth and secure their financial future.
            </p>
            
            <div className="flex space-x-4">
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/services">Our Services</FooterLink>
              <FooterLink href="/team">Our Team</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              <FooterLink href="/blog">Blog & News</FooterLink>
              <FooterLink href="/faq">FAQs</FooterLink>
              <FooterLink href="/resources">Investment Resources</FooterLink>
              <FooterLink href="/calculator">Financial Calculators</FooterLink>
              <FooterLink href="/glossary">Financial Glossary</FooterLink>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-harmony-400" />
                <span>Jaffna, Srilanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0 text-harmony-400" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0 text-harmony-400" />
                <span>info@harmonyinvestment.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {currentYear} Harmony Investment. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <a href="/privacy" className="hover:text-harmony-400 transition-colors duration-200">Privacy Policy</a>
              <a href="/terms" className="hover:text-harmony-400 transition-colors duration-200">Terms of Service</a>
              <a href="/cookies" className="hover:text-harmony-400 transition-colors duration-200">Cookie Policy</a>
              <a href="/sitemap" className="hover:text-harmony-400 transition-colors duration-200">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-harmony-600 hover:text-white transition-colors duration-200"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="hover:text-harmony-400 transition-colors duration-200"
    >
      {children}
    </a>
  </li>
);

export default Footer;
