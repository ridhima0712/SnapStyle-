import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import { BRAND_IMAGES } from '../data/catalog';
import {
  CurvedSwoop,
  EditorialStar,
  HandDrawnArrow,
  LightningBolt,
  SafeImage,
} from './Graphics';

interface StoryPageProps {
  onNavigate: (page: PageId) => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F6F3E8] text-[#1A1415]">
      {/* Editorial Opener */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-10 pb-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8B1E2D] mb-4">
              <EditorialStar className="w-3.5 h-3.5" />
              <span>OUR STORY · ISSUE 01</span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[0.98] tracking-tight text-[#1A1415] editorial-balance">
              WE GET THE{' '}
              <span className="italic text-[#8B1E2D]">WHAT-DO-I-WEAR</span>{' '}
              PANIC.
            </h1>
          </div>

          <div className="lg:col-span-4 pb-1">
            <CurvedSwoop className="w-28 h-5 text-[#8B1E2D] mb-3" />
            <p className="text-sm text-[#5C4D50] leading-relaxed">
              Born in the chaotic ten minutes between a “ready in 20?” text and staring at a closet
              full of nothing.
            </p>
          </div>
        </div>
      </section>

      {/* Magazine Narrative & Asymmetric Collage */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Narrative Copy */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <p className="font-display text-2xl sm:text-3xl leading-snug text-[#1A1415]">
              Snap Style was created for those moments when plans come out of nowhere and your
              wardrobe suddenly feels empty.
            </p>
            <p className="text-base text-[#5C4D50] leading-relaxed">
              A last-minute party, an unexpected date or simply the urge to try something new — Snap
              Style makes getting dressed exciting and effortless.
            </p>
            <p className="text-base text-[#5C4D50] leading-relaxed">
              We believe fashion should be spontaneous, accessible and available when you need it
              most. Instead of waiting days for a parcel after the moment has passed, we bring the
              boutique straight to your neighbourhood.
            </p>

            <div className="pt-4 border-t border-[#1A1415]/15 flex items-center gap-4">
              <HandDrawnArrow className="w-14 h-7 text-[#8B1E2D]" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8B1E2D]">
                CURATED BY STYLISTS · DISPATCHED LOCAL
              </span>
            </div>
          </div>

          {/* Editorial Collage Spread */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 sm:gap-6">
            <div className="col-span-7 space-y-4">
              <div className="aspect-[4/3] overflow-hidden border border-[#1A1415]/15 bg-[#ECE6D4]">
                <SafeImage
                  src={BRAND_IMAGES.storyPackaging}
                  alt="Snap Style keepsake express garment box and handbag"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-[#5C4D50]">
                <span>Fig 01 · Pre-steamed keepsake dispatch box</span>
                <span className="text-[#8B1E2D] font-semibold">Studio Pack</span>
              </div>
            </div>

            <div className="col-span-5 pt-8 sm:pt-12 space-y-3">
              <div className="aspect-[3/4] overflow-hidden border border-[#1A1415]/15 bg-[#F7D6DB]">
                <SafeImage
                  src={BRAND_IMAGES.partyPlans}
                  alt="Editorial night out street fashion look"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-[11px] font-medium text-[#5C4D50]">
                Fig 02 · After-hours satin capsule
              </p>
            </div>

            <div className="col-span-5 -mt-4 sm:-mt-8 space-y-3">
              <div className="aspect-[3/4] overflow-hidden border border-[#1A1415]/15 bg-[#C8E0F4]">
                <SafeImage
                  src={BRAND_IMAGES.coffeeDate}
                  alt="Street style daytime denim and cropped cardigan look"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-[11px] font-medium text-[#5C4D50]">
                Fig 03 · Daylight street-style staples
              </p>
            </div>

            <div className="col-span-7 space-y-3">
              <div className="aspect-[4/3] overflow-hidden border border-[#1A1415]/15 bg-[#ECE6D4]">
                <SafeImage
                  src={BRAND_IMAGES.storyFabrics}
                  alt="Close-up garment details: silk satin, crisp cotton poplin, raw denim, and silver buckle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-[#5C4D50]">
                <span>Fig 04 · Tactile garment curation & hardware</span>
                <span className="text-[#8B1E2D] font-semibold">Quality Edit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Brand Pillars */}
      <section className="border-y border-[#1A1415]/20 bg-[#1A1415] text-[#F6F3E8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="flex items-center justify-between mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F7D6DB]">
              The Snap Style Pillars
            </p>
            <LightningBolt className="w-5 h-5 text-[#C8E0F4]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#F6F3E8]/15">
            {[
              {
                pillar: 'SPEED',
                tagline: 'Fashion delivered in minutes.',
                detail:
                  'Hyperlocal city micro-hubs keep trending pieces minutes away instead of days in transit.',
                accent: 'text-[#F7D6DB]',
              },
              {
                pillar: 'STYLE',
                tagline: 'Trend-led, carefully curated fashion.',
                detail:
                  'No endless clutter. Every top, trouser, bag, and heel is edited for right-now relevance.',
                accent: 'text-[#C8E0F4]',
              },
              {
                pillar: 'CONVENIENCE',
                tagline: 'Your wardrobe, just a few taps away.',
                detail:
                  'Check your PIN code, select your fit, and receive steamed, ready-to-wear looks at your door.',
                accent: 'text-[#F7D6DB]',
              },
            ].map((item, idx) => (
              <div
                key={item.pillar}
                className={`py-8 md:py-2 ${
                  idx === 0 ? 'md:pr-8' : idx === 1 ? 'md:px-8' : 'md:pl-8'
                }`}
              >
                <span className={`font-display text-4xl sm:text-5xl block ${item.accent}`}>
                  {item.pillar}
                </span>
                <p className="mt-3 text-base font-semibold text-[#F6F3E8]">{item.tagline}</p>
                <p className="mt-2 text-sm text-[#F6F3E8]/70 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Vision & Mission */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-[#F7D6DB] border border-[#1A1415]/15 p-8 sm:p-12 flex flex-col justify-between min-h-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8B1E2D]">
                Our Vision
              </span>
              <EditorialStar className="w-5 h-5 text-[#8B1E2D]" />
            </div>
            <p className="font-display text-2xl sm:text-3xl text-[#1A1415] leading-snug mt-8">
              To create a future where fashion is instantly accessible, so no one has to stress
              about what to wear when plans happen unexpectedly.
            </p>
          </div>

          <div className="bg-[#C8E0F4] border border-[#1A1415]/15 p-8 sm:p-12 flex flex-col justify-between min-h-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1A1415]">
                Our Mission
              </span>
              <LightningBolt className="w-5 h-5 text-[#8B1E2D]" />
            </div>
            <p className="font-display text-2xl sm:text-3xl text-[#1A1415] leading-snug mt-8">
              Snap Style helps young, spontaneous people solve fashion emergencies by making trendy,
              curated outfits available quickly, easily and exactly when they need them.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Editorial Statement */}
      <section className="border-t border-[#1A1415]/15 bg-[#ECE6D4]/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-20 text-center flex flex-col items-center">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#1A1415] editorial-balance max-w-3xl leading-tight">
            YOUR PLANS. YOUR STYLE.{' '}
            <span className="italic text-[#8B1E2D]">OUR DELIVERY.</span>
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="mt-8 px-8 py-3.5 bg-[#8B1E2D] text-[#F6F3E8] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#6D1521] transition-colors inline-flex items-center gap-2.5"
          >
            <span>Browse the Shop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
