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
  <section
    id={id}
    className={cn(
      'section-padding page-container min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center',
      className
    )}
  >
    <div className="content-narrow mx-auto w-full">{children}</div>
  </section>
);

export default function OurWorkPage() {
  const { openContact } = useContact();

  return (
    <main className="relative pt-24 md:pt-28" style={{ zIndex: 10 }}>
      {/* Hero */}
      <Section className="bg-grow-blue text-center">
        <h1 className="h1-page mb-4 sm:mb-6 text-white">Our Work</h1>
        <p className="hero-tagline text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8">
          Practical initiatives that develop leadership, strengthen enterprise, and advance community progress.
        </p>
        <p className="body-text text-white/90 max-w-3xl mx-auto">
          Samia Future operates as a catalytic hub for community empowerment. Our work integrates education,
          mentorship, enterprise support, and consultancy to address real grassroots needs while preparing
          individuals and institutions for the future.
        </p>
      </Section>

      {/* Programs */}
      <Section className="bg-white text-grow-blue" id="programs">
        <p className="section-label text-grow-blue/60 mb-4">Programs</p>
        <h2 className="h2-section text-grow-blue mb-8 sm:mb-12">
          Programs
        </h2>

        <div className="space-y-10 sm:space-y-12">
          <div>
            <h3 className="h3-card text-grow-blue mb-4">
              Leadership Education & Training
            </h3>
            <p className="body-text text-grow-blue/90 mb-6">
              We deliver practical, high-impact leadership education for students, youth groups, and emerging
              leaders. Our sessions deepen leadership consciousness, build confidence, and nurture a
              future-ready mindset.
            </p>
            <p className="text-sm font-bold uppercase tracking-wider text-grow-blue/70 mb-2">Formats include:</p>
            <ul className="space-y-1 text-grow-blue/90">
              <li>• School-focused motivational seminars</li>
              <li>• Youth leadership workshops</li>
              <li>• Mentorship-driven learning sessions</li>
            </ul>
          </div>

          <div>
            <h3 className="h3-card text-grow-blue mb-4">
              Business Skills & Entrepreneurship Support
            </h3>
            <p className="body-text text-grow-blue/90 mb-6">
              We strengthen micro and small enterprises through community business expos, microenterprise
              clinics, and opportunity-linkage forums.
            </p>
            <p className="section-label text-sm text-grow-blue/70 mb-2">Formats include:</p>
            <ul className="space-y-1 body-text text-grow-blue/90">
              <li>• Microenterprise clinics</li>
              <li>• Business expos</li>
              <li>• Opportunity-linkage forums</li>
            </ul>
          </div>

          <div>
            <h3 className="h3-card text-grow-blue mb-4">
              Strategic Community Consultancy
            </h3>
            <p className="body-text text-grow-blue/90">
              We provide advisory and consultancy support to grassroots groups, youth initiatives, and local
              development actors to help community-driven ideas mature into structured, impactful initiatives.
            </p>
          </div>
        </div>
      </Section>

      {/* Strategic Focus Areas */}
      <Section className="bg-grow-blue" id="focus-areas">
        <p className="section-label text-white/60 mb-4">Strategic Focus Areas</p>
        <h2 className="h2-section text-white mb-6 sm:mb-8">
          Strategic Focus Areas
        </h2>
        <p className="body-text text-white/90 mb-6 sm:mb-8">Our work is anchored in:</p>
        <ul className="space-y-3 sm:space-y-4 body-text text-white/90">
          <li>• Pragmatic skills development</li>
          <li>• Future-ready mindset cultivation</li>
          <li>• Inclusive socio-economic participation</li>
          <li>• Professional business education</li>
          <li>• Youth leadership formation</li>
          <li>• Grassroots economic advancement</li>
        </ul>
      </Section>

      {/* Why This Work Matters */}
      <Section className="bg-white text-grow-blue" id="community-impact">
        <p className="section-label text-grow-blue/60 mb-4">Why This Work Matters</p>
        <h2 className="h2-section text-grow-blue mb-6 sm:mb-8">
          Why This Work Matters
        </h2>
        <p className="body-text text-grow-blue/90">
          By anchoring our work in skills development, leadership formation, and enterprise support, Samia
          Future contributes to stronger human capital, entrepreneurial confidence, and a culture of
          self-reliance and innovation.
        </p>
      </Section>

      {/* Call to Action */}
      <Section className="bg-grow-yellow text-grow-blue text-center">
        <h2 className="h2-section text-grow-blue mb-6 sm:mb-8">
          Get Involved
        </h2>
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Link
            href="/#calculator"
            className="btn-primary bg-grow-blue text-white shadow-lg w-full sm:w-auto"
          >
            Explore Opportunities to Participate
          </Link>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto sm:justify-center">
            <button
              onClick={() => openContact()}
              className="btn-outline border-grow-blue text-grow-blue hover:bg-grow-blue hover:text-white w-full sm:w-auto"
            >
              Partner With Us
            </button>
            <Link
              href="/#calculator"
              className="btn-outline border-grow-blue text-grow-blue hover:bg-grow-blue hover:text-white w-full sm:w-auto"
            >
              Join a Community Program
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
