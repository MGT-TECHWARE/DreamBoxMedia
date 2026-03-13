import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      location: "Dallas, TX",
      quote: "DreamBox Media completely transformed our brand's visual identity. The commercial they produced for us exceeded all expectations and drove a 40% increase in engagement.",
      role: "Marketing Director"
    },
    {
      name: "Michael Rodriguez",
      location: "Fort Worth, TX",
      quote: "Professional, creative, and incredibly easy to work with. Their event coverage captured the energy of our conference perfectly. Highly recommend their team!",
      role: "Event Coordinator"
    },
    {
      name: "Emily Chen",
      location: "Plano, TX",
      quote: "The documentary-style video they created for our non-profit was deeply moving. They truly understood our mission and brought it to life on screen.",
      role: "Executive Director"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center mb-12">
          <Quote size={64} className="text-brand-red/20" />
        </div>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="text-center absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="text-2xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-10">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div>
                <h4 className="text-xl font-bold text-white mb-1">{testimonials[currentIndex].name}</h4>
                <p className="text-brand-red text-sm uppercase tracking-widest font-semibold">
                  {testimonials[currentIndex].role} &bull; {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-16">
          <button onClick={prev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-black transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-brand-red w-8' : 'bg-white/20'}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-black transition-all">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
