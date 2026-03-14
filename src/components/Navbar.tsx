import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-black/95 backdrop-blur-md py-4 shadow-lg shadow-brand-red/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center justify-center gap-2">
              <img src="/logo.svg" alt="DreamBox Media" className="h-8 md:h-10 w-auto block object-contain" />
              <span className="text-brand-red text-xl md:text-2xl font-bold tracking-tighter">DreamBox</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-brand-red hover:bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(185,28,28,0.5)] hover:scale-105">
              Book a Free Consultation
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-black border-t border-white/10 absolute w-full left-0 right-0">
          <div className="px-4 pt-4 pb-5 space-y-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="block mx-4 mt-4 text-center bg-brand-red text-white px-6 py-3.5 rounded-full font-semibold text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
