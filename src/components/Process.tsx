import { motion } from 'motion/react';

export default function Process() {
  const steps = [
    {
      title: "Client Inquiry",
      description: "Clients reach out for help with content like listings, events, or branding."
    },
    {
      title: "Discovery Call",
      description: "We hop on a quick call to understand your goals, target audience, and platforms."
    },
    {
      title: "Planning",
      description: "We gather key info and send a tailored proposal with ideas, scripts, and shot plans."
    },
    {
      title: "Confirmation & Production",
      description: "Once approved, we film with professional cameras, drones, and a clear direction."
    },
    {
      title: "Delivery",
      description: "We deliver final content formatted, organized, and ready to post wherever you need it."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-gray relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-xs sm:text-sm font-bold text-brand-red tracking-widest uppercase mb-3 md:mb-4">Our Creative Step Process</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">How We Work</h3>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-[22px] sm:left-[27px] md:left-1/2 w-[2px] bg-white/5 -translate-x-1/2"></div>

          <div className="space-y-12 sm:space-y-16 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={`flex-1 w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} pl-14 sm:pl-16 md:pl-0`}>
                  <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">{step.title}</h4>
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed">{step.description}</p>
                </div>

                {/* Number Node */}
                <div className="absolute left-0 md:relative md:left-auto w-11 h-11 sm:w-14 sm:h-14 bg-brand-black border border-white/10 rounded-full flex items-center justify-center shrink-0 z-10 shadow-xl">
                  <span className="text-brand-red font-bold text-sm sm:text-lg">0{index + 1}</span>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1 w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
