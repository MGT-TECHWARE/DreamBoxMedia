import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-brand-black relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-brand-red tracking-widest uppercase mb-3 md:mb-4">Connect With Us</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 leading-none tracking-tight">
                Let's build <br/>
                <span className="text-gray-500">something</span> <br/>
                great.
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-md leading-relaxed">
                Ready to take your brand's visual storytelling to the next level? Reach out and let's start the conversation.
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <div>
                <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5 sm:mb-2">Email</h4>
                <a href="mailto:dreamboxmediallc@gmail.com" className="text-lg sm:text-xl md:text-2xl text-gray-400 hover:text-brand-red transition-colors break-all">dreamboxmediallc@gmail.com</a>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5 sm:mb-2">Phone</h4>
                <a href="tel:+18177393714" className="text-lg sm:text-xl md:text-2xl text-gray-400 hover:text-brand-red transition-colors">817-739-3714</a>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5 sm:mb-2">Location</h4>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-400">Fort Worth, TX</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-brand-gray/50 p-5 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/5"
          >
            <form className="space-y-6 sm:space-y-8 md:space-y-10" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 py-3 sm:py-4 text-base sm:text-lg md:text-xl text-white focus:outline-none focus:border-brand-red transition-colors peer placeholder-transparent"
                  placeholder="Full Name"
                />
                <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-red">Full Name</label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 py-3 sm:py-4 text-base sm:text-lg md:text-xl text-white focus:outline-none focus:border-brand-red transition-colors peer placeholder-transparent"
                  placeholder="Email Address"
                />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-red">Email Address</label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 py-3 sm:py-4 text-base sm:text-lg md:text-xl text-white focus:outline-none focus:border-brand-red transition-colors peer placeholder-transparent resize-none"
                  placeholder="Project Details"
                ></textarea>
                <label htmlFor="message" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-red">Project Details</label>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group w-full bg-white hover:bg-brand-red text-brand-black hover:text-white font-bold py-4 sm:py-5 rounded-full transition-all text-base sm:text-lg flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {status === 'sending' && <><Loader2 size={20} className="animate-spin" /> Sending...</>}
                {status === 'sent' && <><Check size={20} /> Message Sent!</>}
                {status === 'error' && <>Failed to send. Try again.</>}
                {status === 'idle' && <>Send Message <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
