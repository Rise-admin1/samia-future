'use client';

import React from 'react';
import Link from 'next/link';
import { useContact } from '@/app/components/ContactProvider';
import { cn } from '@/lib/utils';

const Section = ({
  children,
  className,
  id,
  narrow,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  narrow?: boolean;
}) => (
  <section
    id={id}
    className={cn(
      'section-padding page-container',
      narrow ? 'content-narrow mx-auto' : '',
      className
    )}
  >
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
  <p className={cn('section-label mb-4 sm:mb-6', className)}>
    {children}
  </p>
);

export default function AboutPage() {
  const { openContact } = useContact();

  const navLinks = [
    { href: '#who-we-are', label: 'Who We Are' },
    { href: '#vision-mission', label: 'Vision & Mission' },
    { href: '#philosophy', label: 'Philosophy' },
    { href: '#leadership', label: 'Leadership' },
  ];

  return (
    <main className="relative pt-24 md:pt-28" style={{ zIndex: 10 }}>
      {/* Hero */}
      <section className="min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh] flex flex-col justify-center page-container pt-28 pb-16 sm:pb-20 bg-grow-blue relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative content-default mx-auto text-center w-full">
          <h1 className="h1-page mb-6 sm:mb-8 text-white">About Samia Future</h1>
          <p className="hero-tagline text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12">
            A long-term platform for leadership, learning, and community advancement.
          </p>
          <div className="space-y-4 sm:space-y-5 body-text text-white/90 max-w-3xl mx-auto text-left md:text-center">
            <p>
              Samia Future is a forward-looking professional education and community consultancy platform
              committed to the long-term empowerment of the Samia Community.
            </p>
            <p>
              The platform brings together leadership development, enterprise support, and community-centred
              consultancy into a coordinated effort focused on strengthening human capital and advancing
              inclusive socio-economic participation.
            </p>
            <p>
              Samia Future operates at the intersection of professional business education, youth leadership
              formation, and grassroots economic advancement—translating knowledge into action and ideas into
              structured, community-driven initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky jump nav — desktop only */}
      <nav className="hidden lg:block sticky top-24 z-20 py-4 bg-grow-blue/95 backdrop-blur-md border-b border-white/10">
        <div className="content-default mx-auto page-container flex justify-center gap-6 sm:gap-8 flex-wrap">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 hover:text-grow-yellow transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Who We Are — two columns with visual balance */}
      <Section className="bg-white text-grow-blue" id="who-we-are">
        <div className="content-wide mx-auto grid md:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-start">
          <div className="md:col-span-4">
            <SectionLabel className="text-grow-blue/50">Who we are</SectionLabel>
            <h2 className="h2-section text-grow-blue">
              Who We Are
            </h2>
            <div
              className="hidden md:block mt-8 h-1 w-16 rounded-full"
              style={{ backgroundColor: 'var(--color-grow-yellow)' }}
            />
          </div>
          <div className="md:col-span-8 space-y-4 sm:space-y-6">
            <p className="body-text text-grow-blue/90">
              We serve as both a professional services outfit and a community transformation engine. Our work
              is grounded in practical skills development, mentorship, and enterprise-focused outreach designed
              to address real needs while preparing individuals and institutions for the future.
            </p>
            <p className="body-text text-grow-blue/90">
              Our approach emphasizes clarity, relevance, and long-term value that ensure community development
              efforts are coordinated, purposeful, and sustainable.
            </p>
          </div>
        </div>
      </Section>

      {/* Vision & Mission — card layout */}
      <Section className="bg-grow-blue" id="vision-mission">
        <div className="content-wide mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <SectionLabel className="text-white/50">Vision & Mission</SectionLabel>
            <h2 className="h2-section text-white">
              Vision & Mission
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-sm p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]">
              <div>
                <h3 className="h3-card text-grow-yellow mb-4 sm:mb-6">
                  Our Vision
                </h3>
                <p className="body-text text-white/90">
                  To anchor the long-term transformation of the Samia Community by developing human capital,
                  nurturing enterprise, and embedding a culture of leadership, innovation, and collective progress.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-sm p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]">
              <div>
                <h3 className="h3-card text-grow-cyan mb-4 sm:mb-6">
                  Our Mission
                </h3>
                <p className="body-text text-white/90">
                  To champion leadership development, economic upliftment, and social transformation through
                  structured training, mentorship, and enterprise-driven outreach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Philosophy — quote-style emphasis */}
      <Section className="bg-white text-grow-blue" id="philosophy">
        <div className="content-narrow mx-auto">
          <SectionLabel className="text-grow-blue/50">Our philosophy</SectionLabel>
          <h2 className="h2-section mb-8 sm:mb-12 text-grow-blue">
            Our Philosophy
          </h2>
          <div className="relative pl-4 sm:pl-6 md:pl-10 border-l-4 border-grow-yellow">
            <blockquote className="space-y-4 sm:space-y-6 body-text text-grow-blue/90 italic">
              <p>
                We believe that sustainable progress is built through pragmatic skills, future-ready mindsets,
                and inclusive participation. Leadership is cultivated, enterprise is a pathway to dignity, and
                development is most effective when it is collective.
              </p>
              <p className="not-italic font-bold text-grow-blue">
                Our work prioritizes practicality over rhetoric, learning over spectacle, and long-term impact
                over short-term outcomes.
              </p>
            </blockquote>
          </div>
          <Link
            href="/our-work"
            className="btn-primary mt-8 sm:mt-12 bg-grow-blue text-white shadow-lg"
          >
            Explore Our Work
          </Link>
        </div>
      </Section>

      {/* Leadership — card treatment for founders */}
      <Section className="bg-grow-blue" id="leadership">
        <div className="content-wide mx-auto">
          <div className="grid md:grid-cols-12 gap-8 sm:gap-12 md:gap-16">
            <div className="md:col-span-4">
              <SectionLabel className="text-white/50">Leadership & Founders</SectionLabel>
              <h2 className="h2-section text-white">
                Leadership & Founders
              </h2>
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl border border-white/20 bg-white/[0.04]">
                <h3 className="h3-card text-grow-yellow mb-3 sm:mb-4">
                  Mugenya Triad
                </h3>
                <p className="body-text text-sm text-white/80">
                  A collective of strategists and civic entrepreneurs united by a shared commitment to the
                  long-term empowerment of the Samia Community.
                </p>
              </div>
            </div>
            <div className="md:col-span-8 space-y-4 sm:space-y-6">
              <p className="body-text text-white/90">
                We, the founders, are committed to stewardship in service of long-term community progress.
              </p>
              <p className="body-text text-white/90">
                The founders serve as stewards of the platform&apos;s vision, values, and strategic direction. Their
                role is to ensure that the work remains community-centred, purposeful, and aligned with the
                platform&apos;s long-term objectives.
              </p>
              <p className="body-text text-white/90">
                Leadership within Samia Future is understood as service exercised through guidance, mentorship,
                and the creation of systems that enable individuals, groups, and initiatives to thrive.
              </p>
              <p className="body-text text-white/90">
                As the platform grows, leadership is expected to expand through collaboration, partnership, and
                shared responsibility in shaping Samia&apos;s future.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                <Link href="/our-work" className="btn-primary bg-white text-grow-blue shadow-lg">
                  Explore Community Initiatives
                </Link>
                <Link
                  href="/our-work#programs"
                  className="btn-outline border-white text-white hover:bg-white hover:text-grow-blue"
                >
                  View Our Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA — full-width impact */}
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
        <div className="relative content-narrow mx-auto text-center w-full">
          <h2 className="h2-section mb-4 sm:mb-6 text-grow-blue">
            There Is a Place for You Here
          </h2>
          <p className="body-text text-grow-blue/90 max-w-2xl mx-auto mb-8 sm:mb-10">
            Whether you are seeking skills, mentorship, collaboration, or partnership, Samia Future offers
            pathways to engage, contribute, and grow.
          </p>
          <button
            onClick={() => openContact()}
            className="btn-primary-lg bg-grow-blue text-white shadow-2xl"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
