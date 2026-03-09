'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContact } from '@/app/components/ContactProvider';

gsap.registerPlugin(ScrollTrigger);

const Screen = ({
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
      'min-h-screen relative flex flex-col items-center justify-center page-container pt-28 md:pt-24 pb-12 sm:pb-16 md:pb-20 overflow-hidden',
      className
    )}
  >
    {children}
  </section>
);

// ─────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openContact } = useContact();

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.screen-text').forEach((text: unknown) => {
        gsap.fromTo(
          text as gsap.TweenTarget,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: text as Element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left" style={{ scaleX }} />

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* ── Screen 1: Hero ── */}
        <Screen className="bg-grow-blue text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h1 className="h1-page max-w-5xl mx-auto">
              Building Skills, Leadership, and Enterprise for Samia&apos;s Future
            </h1>

            <p className="hero-tagline opacity-80 max-w-2xl mx-auto leading-relaxed">
              A community-rooted platform committed to developing human capital, strengthening enterprise,
              and nurturing leadership for long-term collective progress.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
              <a href="#calculator" className="btn-primary bg-white text-grow-blue shadow-lg">
                Explore Our Work
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); openContact(); }}
                className="btn-outline border-white text-white hover:bg-white hover:text-grow-blue"
              >
                Join the Community
              </a>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40"
          >
            <span className="section-label text-[10px]">Scroll Down</span>
            <ArrowDown size={20} />
          </motion.div>
        </Screen>

        {/* ── Screen 2: A Future That Is Built ── */}
        <Screen className="bg-white text-grow-blue">
          <div className="content-narrow mx-auto w-full space-y-8 sm:space-y-10">
            <h2 className="screen-text h2-section text-grow-blue">
              A Future That Is Built, Not Waited For
            </h2>
            <div className="screen-text space-y-6 sm:space-y-8 max-w-3xl mx-auto text-center md:text-left">
              <p className="body-text text-grow-blue/90">
                Samia&apos;s progress depends on more than good intentions. It depends on skills that translate
                into opportunity, leadership that is cultivated early, and enterprise that is supported from
                the ground up.
              </p>
              <p className="body-text text-grow-blue/90">
                Samia Future exists to anchor long-term transformation by bringing together professional
                education, leadership development, and grassroots economic advancement into one coordinated
                platform: built for today, and designed to last (in the next 100 years and beyond).
              </p>
            </div>
          </div>
        </Screen>

        {/* ── Screen 3: What We Focus On ── */}
        <Screen className="bg-grow-blue overflow-hidden">
          <div className="content-wide mx-auto w-full space-y-12 sm:space-y-16">
            <div className="screen-text text-center space-y-4">
              <p className="section-label text-white/60 mb-4">Our pillars</p>
              <h2 className="h2-section text-white">What We Focus On</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  accent: 'grow-cyan',
                  label: '01',
                  title: 'Leadership Development',
                  body: 'We nurture leadership consciousness among students, youth, and emerging community leaders through structured training and mentorship.',
                  span: false,
                },
                {
                  accent: 'grow-green',
                  label: '02',
                  title: 'Enterprise & Business Skills',
                  body: 'We strengthen micro and small enterprises through business clinics, expos, and opportunity-linkage forums that build confidence and capability.',
                  span: false,
                },
                {
                  accent: 'grow-yellow',
                  label: '03',
                  title: 'Community-Centred Consultancy',
                  body: 'We support grassroots groups, youth initiatives, and local development actors with practical guidance and strategic insight.',
                  span: true,
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  className={cn(
                    'screen-text group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.1] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)]',
                    card.span && 'sm:col-span-2'
                  )}
                  initial={false}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className="p-6 sm:p-8 md:p-10 flex flex-col min-h-[240px] sm:min-h-[260px] md:min-h-[280px]">
                    <span
                      className="text-2xl sm:text-3xl font-black tabular-nums opacity-40 group-hover:opacity-70 transition-opacity duration-300 mb-4"
                      style={{ color: `var(--color-${card.accent})` }}
                    >
                      {card.label}
                    </span>
                    <h3 className="h3-card text-white mb-4 leading-tight">{card.title}</h3>
                    <p className="body-text text-white/85 flex-1 max-w-[32ch] text-sm sm:text-base">
                      {card.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Screen>

        {/* ── Screen 4: Rooted in Community ── */}
        <Screen className="bg-white text-grow-blue" id="calculator">
          <div className="content-narrow mx-auto w-full space-y-10 sm:space-y-12">
            <h2 className="screen-text h2-section text-center text-grow-blue">
              Rooted in Community. Open to All.
            </h2>
            <div className="screen-text space-y-6 sm:space-y-8 max-w-3xl mx-auto">
              <p className="body-text text-grow-blue/90 text-center md:text-left">
                This platform serves students preparing for the future, entrepreneurs building livelihoods,
                educators shaping minds, and community leaders strengthening cohesion.
              </p>
              <p className="body-text text-grow-blue/90 text-center md:text-left">
                Our work is inclusive by design, grounded in local realities, and guided by the belief
                that progress is strongest when it is shared from the ground up (Bottom-up).
              </p>
            </div>
          </div>
        </Screen>

        {/* ── Screen 6: Call to Action ── */}
        <Screen className="bg-grow-yellow text-grow-blue text-center">
          <div className="content-narrow mx-auto w-full space-y-8 sm:space-y-10">
            <h2 className="screen-text h2-section text-grow-blue">Designed for Continuity</h2>
            <div className="screen-text space-y-6 max-w-3xl mx-auto text-left md:text-center">
              <p className="body-text text-grow-blue/90">
                Samia Future is not a short-term initiative. It is a continuity platform that is built to
                grow, adapt, and remain relevant across generations.
              </p>
              <p className="body-text text-grow-blue/90">
                By embedding a culture of learning, enterprise, and leadership, we aim to support a Samia
                Community that is informed, enterprising, and equipped for the future.
              </p>
            </div>
            <div className="screen-text pt-6 space-y-6">
              <h3 className="h2-section text-xl sm:text-2xl md:text-3xl text-grow-blue">
                There Is a Place for You Here
              </h3>
              <p className="body-text text-grow-blue/90 max-w-2xl mx-auto">
                Whether you are seeking skills, mentorship, collaboration, or partnership, Samia Future
                offers pathways to engage, contribute, and grow.
              </p>
              <button
                onClick={() => openContact()}
                className="btn-primary-lg mt-4 bg-grow-blue text-white shadow-2xl"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </Screen>
      </main>
    </div>
  );
}