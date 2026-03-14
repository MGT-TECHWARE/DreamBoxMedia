import { motion } from 'motion/react';
import { ArrowRight, Instagram } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-brand-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-red/20 border border-white/10 aspect-[4/3]">
              <img 
                src="/about-us.svg" 
                alt="About DreamBox Media" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-sm font-bold text-brand-red tracking-widest uppercase mb-4">About Us</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 md:mb-6 leading-tight">
              Your End-to-End <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Production Partner</span>
            </h3>
            
            <p className="text-base sm:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed">
              We help brands create powerful video content that captures attention, drives engagement, and delivers real results. From concept to final cut, we handle every detail so you can focus on what you do best.
            </p>
            
            <p className="text-base sm:text-lg text-gray-400 mb-8 md:mb-10 leading-relaxed">
              Whether you need a high-end commercial, ongoing social media content, or comprehensive event coverage, our team of creative professionals is dedicated to telling your story with clarity and impact.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a 
                href="#services" 
                className="inline-flex items-center gap-2 text-brand-red font-semibold hover:text-red-400 transition-colors group"
              >
                Explore Our Services
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://www.instagram.com/dreamboxmarketing?igsh=MTV4NXhqM2tmcTE4NQ%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-brand-red font-semibold hover:text-red-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} /> Instagram
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
