import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Branch {
  id: string;
  district: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/branches`);
        const data = await response.json();

        const uniqueBranches = data.filter(
          (value: Branch, index: number, self: Branch[]) =>
            index === self.findIndex((t) => t.district === value.district)
        );

        setBranches(uniqueBranches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    fetchBranches();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-8',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group" aria-label="Harmony Investment Home">
          <div className="w-10 h-10 rounded-full bg-harmony-600 flex items-center justify-center text-white font-display text-xl font-bold transition-transform duration-300 group-hover:scale-110">
            H
          </div>
          <span className="font-display text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-harmony-600">
            Harmony <span className="text-harmony-600">Investment</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 mx-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>

          <div className="relative group">
            <button className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-700 hover:text-harmony-600 hover:bg-gray-50 transition-all duration-300">
              <span>Branch Details</span>
              <ChevronDown size={16} className="mt-0.5 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
              {branches.map((branch) => (
                <Link
                  key={branch.id}
                  to={`/branches/${branch.district.toLowerCase()}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-harmony-600 transition-colors duration-200"
                >
                  {branch.district}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none transition-transform duration-300 hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white/95 backdrop-blur-sm z-40 transform transition-all duration-500 ease-in-out md:hidden pt-20',
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        )}
      >
        <div className="flex flex-col space-y-2 p-4">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About Us</MobileNavLink>
          <div className="border-b border-gray-200 py-2">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium transition-colors duration-300 hover:text-harmony-600">
                <span>Branch Details</span>
                <ChevronDown size={16} className="transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-2 space-y-1 px-4">
                {branches.map((branch) => (
                  <MobileNavLink
                    key={branch.id}
                    to={`/branches/${branch.district.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {branch.district}
                  </MobileNavLink>
                ))}
              </div>
            </details>
          </div>
          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="px-4 py-2 text-gray-700 hover:text-harmony-600 hover:bg-gray-50 rounded-md transition-all duration-300 hover:scale-105"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => (
  <Link
    to={to}
    className="block py-2 px-3 text-gray-700 hover:text-harmony-600 hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-2"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
