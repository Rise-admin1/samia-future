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
      <section className="min-h-[50vh] sm:min-h-[55vh] flex flex-col justify-center page-container pt-28 pb-12 sm:pb-16 bg-grow-blue relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative content-default mx-auto text-center w-full">
          <h1 className="h1-page mb-6 sm:mb-8 text-white">Activities</h1>
          <p className="hero-tagline text-white/80 max-w-2xl mx-auto mb-6">
            Practical work that builds leadership, enterprise, and community progress across Samia.
          </p>
          <p className="body-text text-white/90 max-w-3xl mx-auto">
            These activities are how the foundation shows up: training rooms, business clinics, youth forums,
            and grassroots support. Tap any card to contribute.
          </p>
        </div>
      </section>

      <Section className="bg-grow-blue pt-0">
        <ActivityCarousel />
      </Section>

      <Section className="bg-grow-yellow text-grow-blue text-center">
        <h2 className="h2-section mb-6">Support these activities</h2>
        <p className="body-text max-w-2xl mx-auto mb-8 text-grow-blue/90">
          Every contribution helps the Michael Trufosa Clarice Mugenya Foundation keep this work moving.
        </p>
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
