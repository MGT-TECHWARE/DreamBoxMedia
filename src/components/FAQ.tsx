import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "What services does DreamBox Media offer?",
      answer: "We offer a wide range of creative production services including videography, photography, drone services, brand video production, documentary-style storytelling, commercials, event coverage, and strategic video marketing."
    },
    {
      question: "How do I start a project with you?",
      answer: "Starting is easy! Simply reach out via our contact form or book a free consultation. We'll schedule a discovery call to discuss your goals, target audience, and project scope before providing a tailored proposal."
    },
    {
      question: "Do you help with creative direction and concepts?",
      answer: "Absolutely. We are a full-service production company, meaning we can handle everything from initial concept development and scriptwriting to filming, editing, and final delivery."
    },
    {
      question: "Can you collaborate with our internal team or agency?",
      answer: "Yes! We frequently partner with internal marketing teams and external agencies to bring their creative visions to life. We adapt to your workflow to ensure a seamless collaboration."
    },
    {
      question: "What is your typical turnaround time?",
      answer: "Turnaround times vary depending on the scope and complexity of the project. A standard promotional video might take 2-4 weeks from filming to final delivery, while larger campaigns may take longer. We'll provide a clear timeline during the planning phase."
    },
    {
      question: "Do you travel for shoots?",
      answer: "Yes, while we are based in Fort Worth, TX, we are available for travel nationwide and internationally for the right projects. Travel expenses will be included in your custom proposal."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-brand-gray relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-red tracking-widest uppercase mb-4">Frequently Asked Questions</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Got Questions? We've Got Answers</h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions about our process, services, or how we work? Here are the answers to the most common things clients ask us.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-black rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors focus:outline-none"
              >
                <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-brand-red' : 'text-white'}`}>
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-red' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
