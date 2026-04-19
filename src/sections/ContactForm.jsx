import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', hp: '' });
  const maxChars = 500;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const contactWorkerUrl = import.meta.env.VITE_CONTACT_WORKER_URL;
  const contactSiteId = import.meta.env.VITE_CONTACT_SITE_ID || 'ian-portfolio';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message') {
      setFormData({ ...formData, message: value.slice(0, maxChars) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      // Honeypot: silently reject bots
      if (formData.hp) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', hp: '' });
        return;
      }

      if (!contactWorkerUrl) {
        throw new Error('Contact form is not configured yet.');
      }

      const res = await fetch(contactWorkerUrl, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId: contactSiteId,
          subject: `New message from ${formData.name} via portfolio`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          hp: formData.hp,
        }),
      });

      const result = await res.json().catch(() => null);
      if (!res.ok || result?.success === false) {
        throw new Error(result?.message || result?.body?.message || 'Request failed');
      }

      setSubmitStatus('success');
      setStatusMessage("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: '', email: '', message: '', hp: '' });
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(
        error?.message && error.message !== 'Request failed'
          ? error.message
          : 'Something went wrong. Please try again or email me directly.'
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setStatusMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-12 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6"
        >
          <div className="mb-6 text-center">
            <h2 className="font-pixelify text-3xl md:text-5xl inline-block relative">
              <span className="relative z-10">Contact Me</span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-1 left-1/2 h-4 -translate-x-1/2 bg-sage rounded z-0"
              />
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field for bots */}
            <input
              type="text"
              name="hp"
              value={formData.hp}
              onChange={handleInputChange}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="hidden"
            />
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                aria-label="Name"
                className="w-full px-4 py-3 font-jersey25 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/40 placeholder-gray-400"
                style={{ fontFamily: '"Jersey 25", system-ui, sans-serif' }}
                placeholder="Name"
              />
            </div>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-label="Email"
                className="w-full px-4 py-3 font-jersey25 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/40 placeholder-gray-400"
                style={{ fontFamily: '"Jersey 25", system-ui, sans-serif' }}
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                aria-label="Message"
                maxLength={maxChars}
                className="w-full pr-12 px-4 py-3 font-jersey25 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/40 placeholder-gray-400 resize-none"
                style={{ fontFamily: '"Jersey 25", system-ui, sans-serif' }}
                placeholder="Message"
              />
              <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-gray-400 dark:text-zinc-400">{formData.message.length}/{maxChars}</span>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full border border-gray-300 dark:border-zinc-600 hover:bg-sage hover:border-sage hover:text-white px-6 py-3 rounded-lg font-jersey10 text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: '"Jersey 10", system-ui, sans-serif' }}
              >
              {isSubmitting ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Sending...
                </>
              ) : (
                'Submit'
              )}
            </motion.button>

            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-3 rounded-lg text-center ${
                    submitStatus === 'success'
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-100'
                      : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-100'
                  }`}
                >
                  {statusMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
