'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ACTIVITIES } from '@/lib/activities';
import { useCheckout } from '@/app/components/CheckoutProvider';

export function ActivityCarousel() {
  const { openCheckout } = useCheckout();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

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
    <div className="content-wide mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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
            className="group flex h-full flex-col cursor-pointer rounded-2xl sm:rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
          >
            <div className="relative w-full aspect-[4/5] md:hidden bg-white/10">
              <Image
                src={activity.imageMobile}
                alt={activity.imageAlt}
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            <div className="relative hidden md:block w-full aspect-[16/10] lg:aspect-[2/1] bg-white/10">
              <Image
                src={activity.image}
                alt={activity.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 50vw, 640px"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8">
              <p className="section-label text-white/50 mb-2 sm:mb-3">{activity.label}</p>
              <h3 className="h3-card text-white mb-2 sm:mb-3">{activity.title}</h3>
              <p className="body-text text-white/90 mb-4 sm:mb-6 flex-1">{activity.body}</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-grow-yellow">
                Tap to support
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
