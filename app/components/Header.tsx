'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useContact } from '@/app/components/ContactProvider';

interface NavItem {
  label: string;
  href?: string;
  action?: 'contact';
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Who We Are', href: '/about#who-we-are' },
      { label: 'Vision & Mission', href: '/about#vision-mission' },
      { label: 'Our Philosophy', href: '/about#philosophy' },
      { label: 'Leadership & Founders', href: '/about#leadership' },
    ],
  },
  {
    label: 'Our Work',
    href: '/our-work',
    children: [
      { label: 'Programs', href: '/our-work#programs' },
      { label: 'Focus Areas', href: '/our-work#focus-areas' },
      { label: 'Community Impact', href: '/our-work#community-impact' },
    ],
  },
  { label: 'Community', href: '/community' },
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { openContact } = useContact();

  const handleNavClick = (item: NavItem) => {
    if (item.action === 'contact') {
      setIsMenuOpen(false);
      openContact();
    } else if (item.href) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 page-container py-4 flex justify-between items-center bg-gradient-to-b from-grow-blue/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-4 flex-nowrap min-w-0">
          <a href="/" className="flex-shrink-0">
            {/* Text logo - replaced with image
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black uppercase tracking-tighter leading-[0.9] whitespace-nowrap">
              <span className="text-grow-yellow">SAMIA</span> FUTURE
            </h1>
            */}
            {/* Logo image: place your file at public/logo.png (or .svg, .webp) */}
            <Image
              src="/logo-Photoroom.png"
              alt="Samia Future"
              width={360}
              height={96}
              className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 w-auto object-contain"
              priority
            />
          </a>
          <h1 className="hidden lg:block text-[10px] uppercase font-bold tracking-[0.3em] opacity-60 max-w-[150px] leading-tight">
            A Future That Is Built, Not Waited For
          </h1>
        </div>

        {/* Hamburger menu - all screen sizes */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-grow-blue overflow-y-auto pt-28 pb-12 px-8"
          >
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                        }
                        className="w-full flex items-center gap-2 text-3xl font-black uppercase tracking-tighter hover:text-grow-yellow transition-colors py-3 text-left"
                      >
                        {item.label}
                        <ChevronDown
                          size={24}
                          className={`flex-shrink-0 transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 border-l-2 border-grow-yellow/30 ml-2"
                          >
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="block py-3 text-lg font-bold text-white/70 hover:text-grow-yellow transition-colors"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.href ?? '#'}
                      onClick={(e) => {
                        if (item.action === 'contact') e.preventDefault();
                        handleNavClick(item);
                      }}
                      className="block text-3xl font-black uppercase tracking-tighter hover:text-grow-yellow transition-colors py-3"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
