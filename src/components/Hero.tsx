import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useVideoConfig } from '../VideoConfig';

export default function Hero() {
  const { droneLoop } = useVideoConfig();
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 sm:pt-20 sm:pb-0 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 min-h-[100vh] min-w-full">
        <video
          src={droneLoop}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 min-w-full min-h-full w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-black/70 z-10"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-brand-red"></div>
            <span className="text-brand-red text-sm font-bold tracking-widest uppercase">
              Fort Worth, TX
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-6 md:mb-8 leading-[0.95]">
            Visuals that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">inspire action.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-2xl leading-relaxed font-light">
            We are a full-service creative production partner turning ideas into captivating visuals for brands that want to stand out.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <a href="#contact" className="group w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-brand-red text-white rounded-full text-base sm:text-lg font-semibold transition-all hover:bg-white hover:text-brand-black flex items-center justify-center gap-3">
              Start a Project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#work" className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-transparent border border-white/30 text-white rounded-full text-base sm:text-lg font-semibold transition-all hover:text-brand-red hover:border-brand-red flex items-center justify-center gap-2">
              View Our Reel
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
