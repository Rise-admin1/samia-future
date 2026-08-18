'use client';

import React, { createContext, useContext, useState } from 'react';
import { CheckoutDialog } from '@/app/components/CheckoutDialog';

interface CheckoutContextValue {
  openCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue>({
  openCheckout: () => {},
});

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CheckoutContext.Provider value={{ openCheckout: () => setIsOpen(true) }}>
      {children}
      <CheckoutDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </CheckoutContext.Provider>
  );
}
