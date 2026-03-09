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

const CommunityCard = ({
  id,
  label,
  title,
  body,
  body2,
  ctaLabel,
  ctaHref,
  comingSoon,
}: {
  id: string;
  label: string;
  title: string;
  body: string;
  body2?: string;
  ctaLabel: string;
  ctaHref: string;
  comingSoon?: boolean;
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
      {comingSoon ? (
        <span className="inline-block px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/10 text-white/70">
          {ctaLabel}
        </span>
      ) : (
        <Link
          href={ctaHref}
          className="btn-primary bg-white text-grow-blue shadow-lg"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  </div>
);

export default function CommunityPage() {
  const { openContact } = useContact();

  const navLinks = [
    { href: '#youth-leadership', label: 'Youth & Leadership' },
    { href: '#enterprise-support', label: 'Enterprise Support' },
    { href: '#cohesion', label: 'Community Cohesion' },
    { href: '#stories', label: 'Stories & Reflections' },
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
            Community
          </h1>
          <p className="hero-tagline text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12">
            People, ideas, and initiatives shaping Samia&apos;s shared future.
          </p>
          <div className="space-y-4 sm:space-y-5 body-text text-white/90 max-w-3xl mx-auto text-left md:text-center">
            <p>
              Samia Future is rooted in the belief that lasting progress is built together. Our community work
              brings individuals, groups, and institutions into a shared space where learning, enterprise,
              leadership, and collaboration can thrive.
            </p>
            <p>
              This is a space where participation meets purpose, and where collective effort becomes collective
              progress.
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

      {/* Community focus areas — cards */}
      <Section className="bg-grow-blue">
        <div className="content-wide mx-auto space-y-6 sm:space-y-8">
          <CommunityCard
            id="youth-leadership"
            label="Youth & Leadership Development"
            title="Nurturing the Next Generation of Leaders"
            body="We work closely with students and young people to cultivate leadership consciousness early. Through mentorship, training, and exposure, we help young leaders build confidence, develop practical skills, and adopt a future-ready mindset grounded in responsibility and service."
            body2="Our approach emphasizes growth, self-belief, and the understanding that leadership is a skill that can be learned and strengthened over time."
            ctaLabel="Explore Youth Leadership Programs"
            ctaHref="/our-work#programs"
          />
          <CommunityCard
            id="enterprise-support"
            label="Enterprise & Business Support"
            title="Strengthening Enterprise at the Grassroots"
            body="Entrepreneurs are at the heart of community resilience. We support small and emerging enterprises by creating spaces for learning, networking, and opportunity-linkage."
            body2="Through clinics, expos, and forums, business owners gain practical knowledge, peer support, and access to tools that help transform ideas into sustainable livelihoods."
            ctaLabel="See Business & Enterprise Support"
            ctaHref="/our-work#programs"
          />
          <CommunityCard
            id="cohesion"
            label="Community Cohesion & Initiatives"
            title="Building Stronger Community Bonds"
            body="Beyond skills and enterprise, we are committed to strengthening community cohesion. Our initiatives bring together diverse voices: youth, elders, professionals, and grassroots actors to foster shared understanding, collaboration, and collective responsibility."
            body2="A connected community is better positioned to solve its own challenges and shape its future."
            ctaLabel="Discover Community Initiatives"
            ctaHref="/our-work"
          />
          <CommunityCard
            id="stories"
            label="Stories & Reflections"
            title="Learning From Experience"
            body="As our work grows, this space will document stories, reflections, and lessons from across the community highlighting journeys of growth, innovation, and shared effort."
            body2="These stories serve as both inspiration and learning, helping the community see itself in motion."
            ctaLabel="Read Community Stories (Coming Soon)"
            ctaHref="#"
            comingSoon
          />
        </div>
      </Section>

      {/* Invitation to Belong — CTA */}
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
            A Community You Can Be Part Of
          </h2>
          <p className="body-text text-grow-blue/90 max-w-2xl mx-auto mb-8 sm:mb-10">
            Whether you are a student, entrepreneur, educator, community leader, or partner, there is a place for
            you within this platform. Participation takes many forms: learning, mentoring, collaborating, or
            supporting initiatives that matter.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/#calculator" className="btn-primary-lg bg-grow-blue text-white shadow-2xl">
              Explore Opportunities
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
