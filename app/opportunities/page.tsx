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

const OpportunityCard = ({
  id,
  label,
  title,
  body,
  body2,
  ctaLabel,
  ctaHref,
  ctaAction,
}: {
  id: string;
  label: string;
  title: string;
  body: string;
  body2?: string;
  ctaLabel: string;
  ctaHref?: string;
  ctaAction?: () => void;
}) => (
  <div
    id={id}
    className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-sm p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
  >
    <div>
      <SectionLabel className="text-white/50">{label}</SectionLabel>
      <h3 className="h3-card text-white mb-4">
        {title}
      </h3>
      <p className="body-text text-white/90 mb-4">{body}</p>
      {body2 && (
        <p className="body-text text-white/90 mb-6">{body2}</p>
      )}
      {ctaAction ? (
        <button onClick={ctaAction} className="btn-primary bg-white text-grow-blue shadow-lg">
          {ctaLabel}
        </button>
      ) : (
        <Link href={ctaHref ?? '#'} className="btn-primary bg-white text-grow-blue shadow-lg">
          {ctaLabel}
        </Link>
      )}
    </div>
  </div>
);

export default function OpportunitiesPage() {
  const { openContact } = useContact();

  const navLinks = [
    { href: '#learn', label: 'Learn & Participate' },
    { href: '#mentorship', label: 'Mentorship & Volunteering' },
    { href: '#partnerships', label: 'Partnerships' },
    { href: '#events', label: 'Events & Forums' },
  ];

  return (
    <main className="relative pt-24 md:pt-28" style={{ zIndex: 10 }}>
      {/* Hero */}
      <section className="min-h-[75vh] sm:min-h-[80vh] flex flex-col justify-center page-container pt-28 pb-16 sm:pb-20 bg-grow-blue relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative content-default mx-auto text-center w-full">
          <h1 className="h1-page mb-6 sm:mb-8 text-white">
            Opportunities
          </h1>
          <p className="hero-tagline text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12">
            Ways to learn, participate, and contribute to Samia&apos;s shared progress.
          </p>
          <div className="space-y-4 sm:space-y-5 body-text text-white/90 max-w-3xl mx-auto text-left md:text-center">
            <p>
              Samia Future offers multiple pathways for individuals, groups, and institutions to engage
              meaningfully with our work. Participation may take the form of learning, mentorship,
              collaboration, or partnership, with each playing a role in strengthening the community.
            </p>
            <p>
              Engagement is guided by purpose, mutual respect, and a shared commitment to long-term development.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky jump nav */}
      <nav className="hidden lg:block sticky top-24 z-20 py-4 bg-grow-blue/95 backdrop-blur-md border-b border-white/10">
        <div className="content-default mx-auto page-container flex justify-center gap-6 flex-wrap">
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

      {/* Opportunity cards */}
      <Section className="bg-grow-blue">
        <div className="content-wide mx-auto space-y-6 sm:space-y-8">
          <OpportunityCard
            id="learn"
            label="Learn & Participate"
            title="Learn, Grow, and Build Capacity"
            body="Our programs provide opportunities for students, youth, entrepreneurs, and community members to develop leadership skills, strengthen enterprise knowledge, and engage with practical learning experiences."
            body2="Participation is open and inclusive, with an emphasis on relevance, application, and growth."
            ctaLabel="View Programs & Learning Opportunities"
            ctaHref="/our-work#programs"
          />
          <OpportunityCard
            id="mentorship"
            label="Mentorship & Volunteering"
            title="Share Experience. Shape Futures."
            body="Mentorship and volunteering are central to sustaining community growth. Professionals, educators, and experienced practitioners are encouraged to share skills, guidance, and insight with emerging leaders and entrepreneurs."
            body2="This exchange strengthens both individuals and the broader community."
            ctaLabel="Become a Mentor or Volunteer"
            ctaAction={() => openContact()}
          />
          <OpportunityCard
            id="partnerships"
            label="Partnerships"
            title="Collaborate for Greater Impact"
            body="We welcome partnerships with institutions, organizations, and development actors aligned with our vision. Collaboration allows us to expand reach, strengthen programs, and deliver greater impact through shared expertise and resources."
            body2="Partnerships are built on clarity, trust, and long-term alignment."
            ctaLabel="Explore Partnership Opportunities"
            ctaAction={() => openContact()}
          />
          <OpportunityCard
            id="events"
            label="Events & Forums"
            title="Connect, Learn, and Exchange Ideas"
            body="Our events, forums, and expos create spaces for dialogue, learning, and opportunity-linkage across sectors and generations. These gatherings foster networks, surface ideas, and strengthen community cohesion."
            ctaLabel="View Upcoming Events"
            ctaHref="/our-work"
          />
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
        <div className="relative content-narrow mx-auto text-center w-full">
          <h2 className="h2-section mb-4 sm:mb-6 text-grow-blue">
            Every Contribution Matters
          </h2>
          <p className="body-text text-grow-blue/90 max-w-2xl mx-auto mb-8 sm:mb-10">
            There is no single way to participate. Whether through learning, mentoring, partnering, or
            supporting initiatives, every contribution strengthens the collective effort toward a thriving
            Samia Community.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/#calculator" className="btn-primary-lg bg-grow-blue text-white shadow-2xl">
              Get Involved
            </Link>
            <button
              onClick={() => openContact()}
              className="btn-outline-lg border-grow-blue text-grow-blue hover:bg-grow-blue hover:text-white"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
