import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useVideoConfig } from '../VideoConfig';
import type { VideoKey } from '../VideoConfig';

const servicesData: Record<string, Array<{
  title: string;
  desc: string;
  img: string;
  videoKey?: VideoKey;
  slideshow?: string[];
}>> = {
  "Content Production": [
    {
      title: "Videography",
      desc: "High-quality video production tailored to your brand's unique voice and goals. We handle everything from pre-production planning to the final polished edit.",
      img: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop",
      videoKey: "videography"
    },
    {
      title: "Photography",
      desc: "Professional photography services for products, portraits, and lifestyle. Capture the essence of your brand with stunning, high-resolution imagery.",
      img: "/photography-bg.png",
      slideshow: ["/photography-bg.png", "/photography-2.png", "/photography-3.png", "/photography-4.png", "/photography-5.png", "/photography-6.png", "/photography-7.png", "/photography-8.png", "/photography-9.png", "/photography-10.png", "/photography-11.png"]
    },
    {
      title: "Drone Services",
      desc: "Stunning aerial footage and photography to elevate your visual storytelling. Perfect for real estate, events, and cinematic brand videos.",
      img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2000&auto=format&fit=crop",
      videoKey: "droneLoop"
    },
    {
      title: "Brand Video Production",
      desc: "Compelling brand stories and engaging content optimized for your website. We create anthems that define who you are and what you stand for.",
      img: "/brand-video-bg.png",
      videoKey: "brandVideo"
    },
    {
      title: "Documentary Storytelling",
      desc: "Authentic, narrative-driven videos that connect deeply with your audience. We dig into the real stories behind your people and mission.",
      img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop",
      videoKey: "documentary"
    },
    {
      title: "Commercials & High-End",
      desc: "Premium commercial production for broadcast, web, and social media campaigns. High production value designed to maximize ROI.",
      img: "/commercials-bg.png",
      videoKey: "commercials"
    },
    {
      title: "Cinematography",
      desc: "Professional photos, video tours, and drone footage to showcase properties. Help buyers visualize their future home with immersive media.",
      img: "/real-estate-1.png",
      videoKey: "cinematography"
    }
  ],
  "Event & Campaign Coverage": [
    {
      title: "Hype Videos & Recaps",
      desc: "Energetic, fast-paced recaps that capture the excitement of your events. Perfect for social media sharing and promoting future ticket sales.",
      img: "/recap-bg.png",
      videoKey: "hypeRecap"
    },
    {
      title: "Corporate Events",
      desc: "Professional documentation of conferences, meetings, and corporate gatherings. We blend in seamlessly to capture authentic networking and presentations.",
      img: "/strategic-video-marketing-bg.png",
      videoKey: "corporateEvents"
    }
  ],
  "Marketing & Ongoing Content": [
    {
      title: "Strategic Video Marketing",
      desc: "Data-driven video campaigns designed to achieve specific marketing objectives. We don't just make videos; we build funnels that convert.",
      img: "/strategic-video-marketing-bg.png"
    },
    {
      title: "Social Media Management",
      desc: "Consistent, engaging content creation and management for your social channels. Stay top-of-mind with high-quality, trend-aware vertical video.",
      img: "/social-media-bg.png"
    }
  ]
};

type CategoryKey = keyof typeof servicesData;

const categoryKeys: CategoryKey[] = ["Content Production", "Event & Campaign Coverage", "Marketing & Ongoing Content"];

const SLIDESHOW_INTERVAL_MS = 3000;


export default function Services() {
  const { urls: videoUrls, posters: videoPosterUrls } = useVideoConfig();
  const [activeTab, setActiveTab] = useState<CategoryKey>("Content Production");
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [mobilePlayingKey, setMobilePlayingKey] = useState<string | null>(null);
  const [mobileVisibleKey, setMobileVisibleKey] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const mobileCardEls = useRef<Record<string, HTMLDivElement | null>>({});

  const getVideoSrc = (service: (typeof servicesData)[CategoryKey][number]) => {
    if (!service.videoKey) return '';
    return videoUrls[service.videoKey];
  };

  const getVideoPoster = (service: (typeof servicesData)[CategoryKey][number]) => {
    if (!service.videoKey) return service.img;
    return videoPosterUrls[service.videoKey] || service.img;
  };

  // On scroll, find the video card closest to viewport center and play only that one
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const viewportCenter = window.innerHeight / 2;
        let bestKey: string | null = null;
        let bestDist = Infinity;

        (Object.entries(mobileCardEls.current) as [string, HTMLDivElement | null][]).forEach(([key, el]) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          // Card must be at least partially visible
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const cardCenter = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < bestDist) {
            bestDist = dist;
            bestKey = key;
          }
        });

        // Only play if the closest card's center is within a reasonable range
        if (bestKey && bestDist > window.innerHeight * 0.4) {
          bestKey = null;
        }

        setMobilePlayingKey((prev) => {
          if (prev === bestKey) return prev;
          // Pause previous
          if (prev) {
            const prevVideo = videoRefs.current[prev];
            if (prevVideo) prevVideo.pause();
          }
          // Play new
          if (bestKey) {
            const nextVideo = videoRefs.current[bestKey];
            if (nextVideo) nextVideo.play().catch(() => {});
          }
          return bestKey;
        });
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount to catch already-visible cards
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Callback ref to register each mobile video card element
  const mobileCardRef = useCallback((playKey: string) => (el: HTMLDivElement | null) => {
    mobileCardEls.current[playKey] = el;
  }, []);

  const handleTabChange = (tab: CategoryKey) => {
    setActiveTab(tab);
    setActiveIndex(0);
  };

  const currentServices = servicesData[activeTab];
  const activeService = currentServices[activeIndex];
  const activeSlides = 'slideshow' in activeService && activeService.slideshow ? activeService.slideshow : [];
  const hasSlideshow = activeSlides.length > 0;

  useEffect(() => {
    if (!hasSlideshow) return;
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % activeSlides.length);
    }, SLIDESHOW_INTERVAL_MS);
    return () => clearInterval(id);
  }, [hasSlideshow, activeSlides.length]);

  useEffect(() => {
    if (!hasSlideshow) setSlideIndex(0);
  }, [hasSlideshow]);

  return (
    <section id="services" className="py-16 md:py-24 bg-brand-gray relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-xs sm:text-sm font-bold text-brand-red tracking-widest uppercase mb-3 md:mb-4">Our Professional Services</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">A creative partner for all things visual</h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-0 sm:px-2">
            Offering photo, video, and content production built for clarity and connection.
          </p>
        </div>

        {/* Tabs (desktop only; mobile shows all sections in order) */}
        <div className="hidden md:flex flex-wrap justify-center gap-4 mb-16 border-b border-white/10 pb-4">
          {(Object.keys(servicesData) as CategoryKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative ${
                activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-brand-red"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Desktop Split Layout */}
        <div className="hidden md:grid grid-cols-12 gap-12 min-h-[600px]">
          {/* Left Column: Service List */}
          <div className="col-span-5 flex flex-col justify-center space-y-1 pr-8 border-r border-white/10">
            {currentServices.map((service, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`text-left text-2xl lg:text-3xl font-bold py-5 transition-all duration-300 flex items-center justify-between group ${
                  activeIndex === idx ? 'text-white pl-4 border-l-2 border-brand-red' : 'text-gray-600 hover:text-gray-300 pl-4 border-l-2 border-transparent'
                }`}
              >
                <span>{service.title}</span>
                {activeIndex === idx && (
                  <motion.div layoutId="arrow" className="text-brand-red">
                    <ArrowRight size={28} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* Right Column: Service Details & Image */}
          <div className="col-span-7 relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-red/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {activeService.videoKey ? (
                  <video
                    src={getVideoSrc(activeService)}
                    poster={getVideoPoster(activeService)}
                    autoPlay
                    muted
                    loop
                    playsInline

                    className="w-full h-full object-cover"
                  />
                ) : hasSlideshow ? (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={slideIndex}
                      src={activeSlides[slideIndex]}
                      alt={activeService.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`w-full h-full object-cover absolute inset-0 ${activeService.title === 'Photography' ? 'object-[40%_50%]' : ''}`}
                    />
                  </AnimatePresence>
                ) : (
                  <img 
                    src={activeService.img} 
                    alt={activeService.title} 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-10 md:p-12">
                  <div className="inline-block px-4 py-1.5 bg-brand-red/20 text-brand-red text-sm font-bold tracking-wider uppercase rounded-full mb-6 border border-brand-red/30 backdrop-blur-sm">
                    0{activeIndex + 1}
                  </div>
                  <h4 className="text-4xl font-bold text-white mb-4 leading-tight">{activeService.title}</h4>
                  <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">{activeService.desc}</p>
                  
                  <a href="#contact" className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(185,28,28,0.4)] hover:scale-105">
                    Book a Consultation <ArrowRight size={18} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Three sections, all backgrounds visible with titles */}
        <div className="md:hidden space-y-12 sm:space-y-16">
          {categoryKeys.map((category) => {
            const services = servicesData[category];
            return (
            <div key={category} className="space-y-5">
              <div className="border-b-2 border-brand-red pb-2.5">
                <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">{category}</h4>
              </div>
              <div className="space-y-6 sm:space-y-8">
                {services.map((service, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 bg-brand-black shadow-lg">
                    <div className="relative aspect-[4/3] w-full">
                      {service.videoKey ? (
                        (() => {
                          const playKey = `${category}-${idx}`;
                          return (
                            <div
                              ref={mobileCardRef(playKey)}
                              data-play-key={playKey}
                              className="absolute inset-0"
                            >
                              <video
                                ref={(el) => { videoRefs.current[playKey] = el; }}
                                src={getVideoSrc(service)}
                                poster={getVideoPoster(service)}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                onPlaying={() => setMobileVisibleKey(playKey)}
                                onPause={() => setMobileVisibleKey((prev) => prev === playKey ? null : prev)}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              {/* Poster overlay: hide only after video is actually rendering frames */}
                              <div
                                className={`absolute inset-0 z-10 transition-opacity duration-500 ${
                                  mobileVisibleKey === playKey ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                }`}
                              >
                                <img src={getVideoPoster(service)} alt="" className="absolute inset-0 w-full h-full object-cover" />
                              </div>
                            </div>
                          );
                        })()
                      ) : 'slideshow' in service && service.slideshow?.length ? (
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.img
                            key={slideIndex}
                            src={service.slideshow[slideIndex]}
                            alt={service.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute inset-0 w-full h-full object-cover ${service.title === 'Photography' ? 'object-[40%_50%]' : ''}`}
                          />
                        </AnimatePresence>
                      ) : (
                        <img
                          src={service.img}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <h5 className="text-base sm:text-lg font-bold text-white drop-shadow-sm">{service.title}</h5>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                      <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-brand-red font-semibold text-sm hover:text-red-400 transition-colors">
                        Book a Consultation <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
          })}
        </div>

      </div>
    </section>
  );
}
