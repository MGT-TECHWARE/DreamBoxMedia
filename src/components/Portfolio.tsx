import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PORTFOLIO_IMAGES = [
  '/photography-bg.png',
  '/photography-2.png',
  '/photography-3.png',
  '/photography-4.png',
  '/photography-5.png',
  '/photography-6.png',
  '/photography-7.png',
  '/photography-8.png',
  '/photography-9.png',
  '/photography-10.png',
  '/photography-11.png',
  '/brand-video-bg.png',
  '/commercials-bg.png',
  '/real-estate-1.png',
  '/real-estate-2.png',
  '/recap-bg.png',
  '/strategic-video-marketing-bg.png',
  '/strategic-video-marketing-2.png',
  '/social-media-bg.png',
].filter(Boolean);

const SLIDESHOW_INTERVAL_MS = 3000;

export default function Portfolio() {
  const [index, setIndex] = useState(0);
  const slides = PORTFOLIO_IMAGES;

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDESHOW_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section id="work" className="relative py-16 md:py-24 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <h2 className="text-xs sm:text-sm font-bold text-brand-red tracking-widest uppercase mb-3 md:mb-4">Portfolio</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">Our Reel</h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-3 md:mt-4 max-w-2xl">
          A selection of our work across photography, brand video, commercials, and more.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-brand-gray">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={index}
              src={slides[index]}
              alt={`Portfolio ${index + 1} of ${slides.length}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>
        {slides.length > 1 && (
          <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3">
            <div className="flex justify-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full py-1 px-2 scrollbar-hide">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all shrink-0 ${
                    i === index ? 'w-6 sm:w-8 bg-brand-red' : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <p className="text-center text-gray-500 text-xs sm:text-sm">
              {index + 1} / {slides.length}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
