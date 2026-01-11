import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', hp: '' });
  const maxChars = 500;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Turnstile: load/execute only on submit (no page gating)
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);
  const tokenResolverRef = useRef(null);

  const ensureTurnstileScript = () => {
    if (!siteKey) return Promise.resolve(false);
    if (window.turnstile) return Promise.resolve(true);

    return new Promise((resolve) => {
      // Avoid adding the script multiple times
      const existing = document.querySelector('script[data-turnstile="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(true));
        return;
      }

      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      s.defer = true;
      s.setAttribute('data-turnstile', 'true');
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  };

  const getTurnstileToken = async () => {
    // If no site key is configured, skip Turnstile entirely
    if (!siteKey) return '';

    const ok = await ensureTurnstileScript();
    if (!ok || !window.turnstile) return '';

    // Render an invisible widget once
    if (!turnstileWidgetIdRef.current && turnstileContainerRef.current) {
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: siteKey,
        size: 'invisible',
        callback: (token) => {
          if (tokenResolverRef.current) {
            tokenResolverRef.current(token);
            tokenResolverRef.current = null;
          }
        },
        'error-callback': () => {
          if (tokenResolverRef.current) {
            tokenResolverRef.current('');
            tokenResolverRef.current = null;
          }
        },
        'expired-callback': () => {
          if (tokenResolverRef.current) {
            tokenResolverRef.current('');
            tokenResolverRef.current = null;
          }
        },
      });
    }

    if (!turnstileWidgetIdRef.current) return '';

    // Execute at submit time and resolve via callback
    return await new Promise((resolve) => {
      tokenResolverRef.current = resolve;
      try {
        window.turnstile.execute(turnstileWidgetIdRef.current, { action: 'contact' });
      } catch (e) {
        tokenResolverRef.current = null;
        resolve('');
      }
    });
  };

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

    try {
      // Honeypot: silently reject bots
      if (formData.hp) {
        throw new Error('Bot detected');
      }

      const turnstileToken = await getTurnstileToken();

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          hp: formData.hp,
          turnstileToken,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', hp: '' });

      // Reset Turnstile after success
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
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
            <h2 className="text-3xl md:text-5xl font-semibold inline-block relative">
              <span className="relative z-10">Let's Connect!</span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="absolute bottom-0 left-5 h-4 bg-blue-600 dark:bg-orange-600 rounded z-0"
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
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-orange-500/40 placeholder-gray-400"
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
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-orange-500/40 placeholder-gray-400"
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
                className="w-full pr-12 px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-orange-500/40 placeholder-gray-400 resize-none"
                placeholder="Message"
              />
              <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-gray-400 dark:text-zinc-400">{formData.message.length}/{maxChars}</span>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full border border-gray-300 dark:border-zinc-600 hover:bg-blue-600 dark:hover:bg-orange-600 hover:border-blue-600 dark:hover:border-orange-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

            {/* Invisible Turnstile container (token is fetched on submit) */}
            <div ref={turnstileContainerRef} className="hidden" />

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
                  {submitStatus === 'success'
                    ? "Message sent successfully! I'll get back to you soon."
                    : 'Something went wrong. Please try again or email me directly.'}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
