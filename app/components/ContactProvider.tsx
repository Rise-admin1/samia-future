'use client';

import React, { createContext, useContext, useState } from 'react';
import { ContactForm } from '@/app/components/ContactForm';

interface ContactContextValue {
  openContact: () => void;
}

const ContactContext = createContext<ContactContextValue>({
  openContact: () => {},
});

export function useContact() {
  return useContext(ContactContext);
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <ContactContext.Provider value={{ openContact: () => setIsContactOpen(true) }}>
      {children}
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </ContactContext.Provider>
  );
}
