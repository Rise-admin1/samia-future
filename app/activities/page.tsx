'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ActivityCarousel } from '@/app/components/ActivityCarousel';
import { useCheckout } from '@/app/components/CheckoutProvider';

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={cn('section-padding page-container', className)}>
    {children}
  </section>
);

export default function ActivitiesPage() {
  const { openCheckout } = useCheckout();

  return (
    <main className="relative pt-24 md:pt-28" style={{ zIndex: 10 }}>
      <Section className="bg-grow-blue">
        <h1 className="sr-only">Activities</h1>
        <ActivityCarousel />
      </Section>

      <Section className="bg-grow-yellow text-grow-blue text-center">
        <h2 className="h2-section mb-6">Support these activities</h2>
        <p className="body-text max-w-3xl mx-auto mb-6 text-grow-blue/90">
          None of this happens on goodwill alone. Every Expo seated, every women&apos;s group
          organized, every artist given the materials to finish a commissioned piece: all of it is
          funded, tracked, and delivered because Samia Future backs MTCM Foundation to do it.
          That&apos;s the arrangement. We provide the resourcing, MTCM Foundation puts it to work
          where it&apos;s needed, on the ground, in the communities these activities serve.
        </p>
        <p className="body-text max-w-3xl mx-auto mb-8 text-grow-blue/90">
          Your contribution doesn&apos;t sit in a general fund. It goes toward whichever activity
          you tap to support, and it goes there through a partner we&apos;ve chosen precisely
          because they deliver.
        </p>
        <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tighter mb-6">
          Support Your Way
        </h3>
        <button
          type="button"
          onClick={openCheckout}
          className="btn-primary bg-grow-blue text-white shadow-lg"
        >
          Contribute
        </button>
      </Section>
    </main>
  );
}
