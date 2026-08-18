'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ACTIVITIES, type ActivityCard } from '@/lib/activities';
import { useCheckout } from '@/app/components/CheckoutProvider';

const accentClass: Record<ActivityCard['accent'], string> = {
  yellow: 'bg-grow-yellow',
  green: 'bg-grow-green',
  cyan: 'bg-grow-cyan',
  white: 'bg-white',
};

export function ActivityCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { openCheckout } = useCheckout();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>('[data-activity-card]');
    const delta = (card?.offsetWidth ?? 320) + 16;
    node.scrollBy({ left: direction * delta, behavior: 'smooth' });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleActivate = (e: React.PointerEvent | React.KeyboardEvent) => {
    if ('clientX' in e && pointerStart.current) {
      const dx = Math.abs(e.clientX - pointerStart.current.x);
      const dy = Math.abs(e.clientY - pointerStart.current.y);
      pointerStart.current = null;
      if (dx > 8 || dy > 8) return;
    }
    openCheckout();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white text-grow-blue shadow-lg"
        aria-label="Previous activity"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white text-grow-blue shadow-lg"
        aria-label="Next activity"
      >
        <ChevronRight size={24} />
      </button>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 md:px-14 pb-4"
      >
        {ACTIVITIES.map((activity) => (
          <article
            key={activity.id}
            data-activity-card
            role="button"
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerUp={handleActivate}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCheckout();
              }
            }}
            className="snap-center shrink-0 w-[80vw] sm:w-[360px] cursor-pointer rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
          >
            <div className={`h-40 sm:h-48 ${accentClass[activity.accent]}`} aria-hidden />
            <div className="p-6 sm:p-8">
              <p className="section-label text-white/50 mb-3">{activity.label}</p>
              <h3 className="h3-card text-white mb-3">{activity.title}</h3>
              <p className="body-text text-white/90 mb-6">{activity.body}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-grow-yellow">
                Tap to support
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
