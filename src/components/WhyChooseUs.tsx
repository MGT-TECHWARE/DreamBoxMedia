import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const features = [
    {
      title: "Creative Storytelling Experts",
      description: "We craft visuals that go beyond aesthetics — capturing emotion and purpose to tell stories that truly represent your brand."
    },
    {
      title: "Tailored Visual Solutions",
      description: "Every project is customized to reflect your unique goals, audience, and identity — ensuring visuals that connect and convert."
    },
    {
      title: "Full-Service Production",
      description: "From concept to completion, we handle everything in-house for consistent quality, faster delivery, and seamless brand storytelling."
    },
    {
      title: "Driven by Impact",
      description: "Our passion meets purpose — we create content that strengthens brand presence, engages audiences, and drives measurable results."
    }
  ];

  return (
    <section className="py-24 bg-brand-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h2 className="text-sm font-bold text-brand-red tracking-widest uppercase mb-4">Why Choose Us</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Crafted with Clarity,<br/>Delivered with Heart</h3>
              <p className="text-xl text-gray-400">
                We combine creativity, strategy, and technical expertise to bring your brand's vision to life.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="py-10 border-b border-white/10 first:pt-0 last:border-0 group"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                    <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent group-hover:from-brand-red/50 transition-all duration-500">
                      0{index + 1}
                    </span>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-brand-red transition-colors duration-300">{feature.title}</h4>
                      <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
