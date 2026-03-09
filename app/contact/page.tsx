'use client';

import React from 'react';
import Link from 'next/link';
import { useContact } from '@/app/components/ContactProvider';
import { cn } from '@/lib/utils';

const Section = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={cn('section-padding page-container', className)}>
    {children}
  </section>
);

const SectionLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={cn('section-label mb-4 sm:mb-6', className)}>{children}</p>
);

const InquiryCard = ({
  id,
  label,
  title,
  body,
  ctaLabel,
  onCtaClick,
  span,
}: {
  id: string;
  label: string;
  title: string;
  body: string;
  ctaLabel: string;
  onCtaClick: () => void;
  span?: boolean;
}) => (
  <div
    id={id}
    className={cn(
      'group relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-sm p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]',
      span && 'sm:col-span-2'
    )}
  >
    <SectionLabel className="text-white/50">{label}</SectionLabel>
    <h3 className="h3-card text-white mb-4">{title}</h3>
    <p className="body-text text-white/90 mb-6">{body}</p>
    <button
      onClick={onCtaClick}
      className="btn-primary bg-white text-grow-blue shadow-lg"
    >
      {ctaLabel}
    </button>
  </div>
);

export default function ContactPage() {
  const { openContact } = useContact();

  return (
    <main className="relative pt-24 md:pt-28" style={{ zIndex: 10 }}>
      {/* Hero */}
      <section className="min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center page-container pt-28 pb-16 sm:pb-20 bg-grow-blue relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative content-narrow mx-auto w-full text-center">
          <h1 className="h1-page text-white mb-6 sm:mb-8">Contact</h1>
          <p className="hero-tagline text-white/80 mb-8 sm:mb-10">
            Let&apos;s connect, collaborate, and build together.
          </p>
          <p className="body-text text-white/90 max-w-2xl mx-auto">
            Samia Future values open communication and meaningful engagement. Whether you are seeking
            information, exploring collaboration, or looking to participate in our programs, we welcome
            your inquiry.
          </p>
        </div>
      </section>

      {/* Inquiry type cards */}
      <Section className="bg-grow-blue">
        <div className="content-wide mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <InquiryCard
              id="general"
              label="General Inquiries"
              title="General Inquiries"
              body="For questions about our work, programs, or community initiatives, please reach out. We aim to respond clearly, thoughtfully, and in a timely manner."
              ctaLabel="Send a General Inquiry"
              onCtaClick={openContact}
              span
            />
            <InquiryCard
              id="programs"
              label="Program Participation"
              title="Program Participation"
              body="If you are interested in participating in leadership programs, business clinics, or community initiatives, let us know how you would like to engage."
              ctaLabel="Express Interest in a Program"
              onCtaClick={openContact}
            />
            <InquiryCard
              id="partnerships"
              label="Partnerships & Collaboration"
              title="Partnerships & Collaboration"
              body="Institutions, organizations, and development actors interested in partnering with Samia Future are encouraged to get in touch. We value partnerships built on clarity, shared purpose, and long-term alignment."
              ctaLabel="Discuss a Partnership"
              onCtaClick={openContact}
            />
          </div>
        </div>
      </Section>

      {/* Commitment to accessibility */}
      <Section className="bg-white text-grow-blue">
        <div className="content-wide mx-auto">
          <h2 className="h2-section text-grow-blue text-center mb-10 sm:mb-12">
            Our Commitment to Accessibility
          </h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 text-center md:text-left">
            <p className="body-text text-grow-blue/90">
              Samia Future is committed to remaining accessible and responsive to the community it serves.
              Communication is treated as a foundation for trust and accountability.
            </p>
            <p className="body-text text-grow-blue/90">
              We look forward to hearing from you and exploring ways to work together toward a stronger,
              more enterprising Samia Community.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button onClick={openContact} className="btn-primary-lg bg-grow-blue text-white shadow-2xl">
              Contact Us
            </button>
            <Link
              href="/opportunities"
              className="btn-outline-lg border-grow-blue text-grow-blue hover:bg-grow-blue hover:text-white"
            >
              Explore Opportunities
            </Link>
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <section
        className="section-padding page-container bg-grow-yellow text-grow-blue relative overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative content-narrow mx-auto w-full text-center">
          <h2 className="h2-section text-grow-blue mb-6 sm:mb-8">
            We Look Forward to Hearing From You
          </h2>
          <p className="body-text text-grow-blue/90 max-w-2xl mx-auto mb-8 sm:mb-10">
            Reach out to learn more, get involved, or explore how we can work together.
          </p>
          <button onClick={openContact} className="btn-primary-lg bg-grow-blue text-white shadow-2xl">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
