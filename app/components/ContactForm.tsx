'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const ContactForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('https://formsubmit.co/ajax/talktous@samiafuture.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          _subject: 'New contact from Samia Future',
          _captcha: 'false',
          _template: 'table',
        }),
      });
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-grow-blue/95 p-4"
        >
          <div className="relative w-full max-w-2xl bg-white text-grow-blue rounded-3xl p-8 md:p-12 shadow-2xl">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 hover:bg-grow-blue/5 rounded-full transition-colors"
            >
              <X size={32} />
            </button>

            {submitted ? (
              <div className="text-center space-y-6 py-8">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Thank You!</h2>
                <p className="text-lg text-grow-blue/80">We received your message and will get back to you soon.</p>
                <button
                  onClick={handleClose}
                  className="bg-grow-blue text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Contact Us</h2>
                  <div className="h-1 w-12 bg-grow-blue" />
                </div>

                <div className="space-y-6">
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="w-full text-xl md:text-2xl font-bold border-b-2 border-grow-blue/20 py-4 focus:outline-none focus:border-grow-blue transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Your email"
                    className="w-full text-xl md:text-2xl font-bold border-b-2 border-grow-blue/20 py-4 focus:outline-none focus:border-grow-blue transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    className="w-full text-xl md:text-2xl font-bold border-b-2 border-grow-blue/20 py-4 focus:outline-none focus:border-grow-blue transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-grow-blue text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {submitting ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
