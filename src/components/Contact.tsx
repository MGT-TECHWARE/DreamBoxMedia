import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-brand-black relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-sm font-bold text-brand-red tracking-widest uppercase mb-4">Connect With Us</h2>
              <h3 className="text-5xl md:text-7xl font-bold mb-8 leading-none tracking-tight">
                Let's build <br/>
                <span className="text-gray-500">something</span> <br/>
                great.
              </h3>
              <p className="text-xl text-gray-400 mb-12 max-w-md leading-relaxed">
                Ready to take your brand's visual storytelling to the next level? Reach out and let's start the conversation.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Email</h4>
                <a href="mailto:dreamboxmediallc@gmail.com" className="text-2xl text-gray-400 hover:text-brand-red transition-colors">dreamboxmediallc@gmail.com</a>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Phone</h4>
                <a href="tel:+18177393714" className="text-2xl text-gray-400 hover:text-brand-red transition-colors">817-739-3714</a>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Location</h4>
                <p className="text-2xl text-gray-400">Fort Worth, TX</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-brand-gray/50 p-8 md:p-12 rounded-3xl border border-white/5"
          >
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-brand-red transition-colors peer placeholder-transparent"
                  placeholder="Full Name"
                />
                <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-red">Full Name</label>
              </div>

              <div className="relative">
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-brand-red transition-colors peer placeholder-transparent"
                  placeholder="Email Address"
                />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-red">Email Address</label>
              </div>

              <div className="relative">
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-brand-red transition-colors peer placeholder-transparent resize-none"
                  placeholder="Project Details"
                ></textarea>
                <label htmlFor="message" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-red">Project Details</label>
              </div>

              <button 
                type="submit" 
                className="group w-full bg-white hover:bg-brand-red text-brand-black hover:text-white font-bold py-5 rounded-full transition-all text-lg flex items-center justify-center gap-3"
              >
                Send Message
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
