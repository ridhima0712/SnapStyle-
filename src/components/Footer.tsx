import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CollectionId, PageId } from '../types';
import { COLLECTIONS } from '../data/catalog';
import { EditorialStar, LightningBolt } from './Graphics';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onSelectCollection: (collection: CollectionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCollection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  const go = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1415] text-[#F6F3E8] border-t border-[#1A1415]">
      <div className="checker-strip h-2.5 w-full opacity-90" aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#F6F3E8]/15">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => go('home')}
              className="inline-flex items-center gap-2 font-display text-3xl font-bold tracking-tight text-[#F6F3E8]"
            >
              <span>SNAP STYLE</span>
              <LightningBolt className="w-5 h-5 text-[#F7D6DB]" />
            </button>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#C8E0F4]">
              FIT IN A BIT.
            </p>
            <p className="text-sm text-[#F6F3E8]/75 max-w-sm leading-relaxed">
              Fashion emergencies, solved fast. Curated clothing, bags, shoes, and accessories
              dispatched from hyperlocal hubs so you never stress over last-minute plans.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F7D6DB]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F6F3E8]/80">
              <li>
                <button
                  type="button"
                  onClick={() => go('home')}
                  className="hover:text-[#F6F3E8] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('story')}
                  className="hover:text-[#F6F3E8] transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('shop')}
                  className="hover:text-[#F6F3E8] transition-colors"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('contact')}
                  className="hover:text-[#F6F3E8] transition-colors"
                >
                  Contact & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Curated Edits */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F7D6DB]">
              Curated Edits
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F6F3E8]/80">
              {COLLECTIONS.map((col) => (
                <li key={col}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCollection(col);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#C8E0F4] transition-colors text-left"
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <EditorialStar className="w-4 h-4 text-[#F7D6DB]" />
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F7D6DB]">
                First Dibs on Drops
              </h4>
            </div>
            <p className="text-xs text-[#F6F3E8]/70 leading-relaxed">
              Get early access to Emergency Edit restocks and Friday night capsules.
            </p>

            {subscribed ? (
              <div className="bg-[#8B1E2D] text-[#F6F3E8] px-4 py-3 text-xs font-medium flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>You are on the Snap Style drop list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    aria-label="Email address for newsletter"
                    className="w-full px-3 py-2.5 bg-[#F6F3E8]/10 border border-[#F6F3E8]/25 text-xs text-[#F6F3E8] placeholder:text-[#F6F3E8]/45 focus:outline-none focus:border-[#C8E0F4]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="px-4 bg-[#8B1E2D] hover:bg-[#6D1521] text-[#F6F3E8] transition-colors flex items-center justify-center shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-[#F7D6DB]">{error}</p>}
              </form>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-[#F6F3E8]/75">
              <a href="#instagram" onClick={(e) => { e.preventDefault(); go('contact'); }} className="hover:text-[#F7D6DB] transition-colors">
                Instagram
              </a>
              <span aria-hidden="true">·</span>
              <a href="#pinterest" onClick={(e) => { e.preventDefault(); go('contact'); }} className="hover:text-[#F7D6DB] transition-colors">
                Pinterest
              </a>
              <span aria-hidden="true">·</span>
              <a href="#tiktok" onClick={(e) => { e.preventDefault(); go('contact'); }} className="hover:text-[#F7D6DB] transition-colors">
                TikTok
              </a>
              <span aria-hidden="true">·</span>
              <a href="#youtube" onClick={(e) => { e.preventDefault(); go('contact'); }} className="hover:text-[#F7D6DB] transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#F6F3E8]/55">
          <p>© {new Date().getFullYear()} SNAP STYLE. All rights reserved.</p>
          <p>Fashion emergencies, solved fast.</p>
        </div>
      </div>
    </footer>
  );
};
