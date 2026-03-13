import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 lg:col-span-1">
            <a href="#home" className="mb-4 flex items-center justify-center gap-2 w-fit">
              <img src="/logo.svg" alt="DreamBox Media" className="h-8 w-auto block object-contain" />
              <span className="text-brand-red text-xl font-bold tracking-tighter">DreamBox</span>
            </a>
            <p className="text-gray-400 text-sm mb-6">Your Vision. Our Lens.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/dreamboxmarketing?igsh=MTV4NXhqM2tmcTE4NQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-gray rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all hover:scale-110" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-brand-gray rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-brand-gray rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all hover:scale-110">
                {/* Using Twitter icon as placeholder for TikTok if needed, or just Twitter */}
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-brand-red transition-colors text-sm">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-brand-red transition-colors text-sm">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-red transition-colors text-sm">Services</a></li>
              <li><a href="#work" className="text-gray-400 hover:text-brand-red transition-colors text-sm">Our Work</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-brand-red transition-colors text-sm">FAQ</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-brand-red transition-colors text-sm">Contact Us</a></li>
              <li>
                <a href="https://www.instagram.com/dreamboxmarketing?igsh=MTV4NXhqM2tmcTE4NQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-red transition-colors text-sm inline-flex items-center gap-2">
                  <Instagram size={16} /> Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Headquarters</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fort Worth, TX<br/>
              Available for travel worldwide.
            </p>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} DreamBox Media. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-sm text-center md:text-right">
            Designed for impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
