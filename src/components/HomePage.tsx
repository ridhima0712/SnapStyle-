import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { Category, CollectionId, PageId, PinDeliveryInfo, Product } from '../types';
import {
  BRAND_IMAGES,
  HOME_CATEGORY_STRIP,
  PRODUCTS,
  checkPinCodeDelivery,
} from '../data/catalog';
import {
  CurvedSwoop,
  EditorialStar,
  HandDrawnArrow,
  LightningBolt,
  SafeImage,
} from './Graphics';
import { ProductCard } from './ProductCard';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectCategory: (category: Category) => void;
  onSelectCollection: (collection: CollectionId) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToBag: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
  pinInfo: PinDeliveryInfo | null;
  onUpdatePin: (info: PinDeliveryInfo) => void;
}

const SCENARIO_CARDS: {
  title: string;
  caption: string;
  collection: CollectionId;
  image: string;
  accentBg: string;
  index: string;
}[] = [
  {
    title: 'Last-minute party plans.',
    caption: 'Satin minis, boned corsets, and flash-ready clutches packed before your cab arrives.',
    collection: 'THE PARTY EDIT',
    image: BRAND_IMAGES.partyPlans,
    accentBg: 'bg-[#F7D6DB]',
    index: '01',
  },
  {
    title: 'Unexpected coffee dates.',
    caption: 'Relaxed denim, cloud knits, and sunlit layers that look effortless in ten minutes flat.',
    collection: 'DATE NIGHT',
    image: BRAND_IMAGES.coffeeDate,
    accentBg: 'bg-[#C8E0F4]',
    index: '02',
  },
  {
    title: 'Emergency wardrobe upgrades.',
    caption: 'Architectural blazers, crisp poplin, and silver hardware when your plans suddenly level up.',
    collection: 'LAST-MINUTE LUXE',
    image: BRAND_IMAGES.wardrobeUpgrade,
    accentBg: 'bg-[#ECE6D4]',
    index: '03',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCategory,
  onSelectCollection,
  wishlistIds,
  onToggleWishlist,
  onAddToBag,
  onQuickView,
  pinInfo,
  onUpdatePin,
}) => {
  const [pinInput, setPinInput] = useState(pinInfo?.pin || '');
  const [dispatchSeconds, setDispatchSeconds] = useState(14 * 60 + 28);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDispatchSeconds((prev) => (prev <= 60 ? 15 * 60 : prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const mins = String(Math.floor(dispatchSeconds / 60)).padStart(2, '0');
  const secs = String(dispatchSeconds % 60).padStart(2, '0');

  const trendingProducts = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePin(checkPinCodeDelivery(pinInput));
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F6F3E8] text-[#1A1415]">
      {/* HERO SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 pb-12 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#8B1E2D] mb-5">
                <EditorialStar className="w-3.5 h-3.5" />
                <span>FIT IN A BIT · INSTANT FASHION</span>
              </div>

              <h1 className="font-display text-[clamp(2.75rem,5.4vw,4.9rem)] leading-[0.98] tracking-tight text-[#1A1415] editorial-balance max-w-xl">
                FASHION IN A{' '}
                <span className="italic font-normal text-[#8B1E2D] relative inline-block">
                  FLASH.
                  <CurvedSwoop className="w-28 sm:w-36 h-4 text-[#8B1E2D] -mt-1" />
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#5C4D50] max-w-lg leading-relaxed">
                Your plans can’t wait. Neither should your outfit. Get the looks you love delivered
                to your doorstep in minutes.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="px-7 py-3.5 bg-[#8B1E2D] text-[#F6F3E8] text-xs font-bold tracking-[0.14em] uppercase hover:bg-[#6D1521] transition-colors inline-flex items-center gap-2.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#1A1415]"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={scrollToHowItWorks}
                  className="px-6 py-3.5 border border-[#1A1415] text-[#1A1415] text-xs font-bold tracking-[0.14em] uppercase hover:bg-[#1A1415] hover:text-[#F6F3E8] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#8B1E2D]"
                >
                  HOW IT WORKS
                </button>
              </div>
            </div>

            {/* Instant-Delivery Countdown Dispatch Module */}
            <div className="mt-10 lg:mt-12 border border-[#1A1415]/15 bg-[#ECE6D4]/65 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 bg-[#8B1E2D] text-[#F6F3E8] flex items-center justify-center shrink-0">
                    <LightningBolt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8B1E2D]">
                      YOUR NEXT LOOK IS JUST MINUTES AWAY.
                    </p>
                    <p className="text-xs text-[#5C4D50] mt-1">
                      Next studio dispatch batch closes in:
                    </p>
                  </div>
                </div>

                <div
                  className="bg-[#1A1415] text-[#F6F3E8] px-4 py-2 font-mono text-lg sm:text-xl font-bold tracking-wider tabular-nums shrink-0 self-start sm:self-center"
                  aria-label="Next dispatch window countdown"
                >
                  00:{mins}:{secs}
                </div>
              </div>

              {/* Quick PIN check right inside hero dispatch module */}
              <form
                onSubmit={handlePinSubmit}
                className="mt-4 pt-4 border-t border-[#1A1415]/10 flex flex-col sm:flex-row gap-2.5"
              >
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-[#8B1E2D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Check delivery PIN (e.g. 400050, 110016)"
                    aria-label="Delivery PIN code"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F6F3E8] border border-[#1A1415]/20 text-xs text-[#1A1415] placeholder:text-[#5C4D50]/70 focus:outline-none focus:border-[#8B1E2D]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#1A1415] text-[#F6F3E8] text-xs font-semibold tracking-wider uppercase hover:bg-[#8B1E2D] transition-colors whitespace-nowrap shrink-0"
                >
                  Check Availability
                </button>
              </form>

              {pinInfo && (
                <div className="mt-3 flex items-start gap-2 text-xs">
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      pinInfo.serviceable ? 'text-[#8B1E2D]' : 'text-[#5C4D50]'
                    }`}
                  />
                  <div>
                    <span className="font-semibold text-[#1A1415]">{pinInfo.zoneName}</span>
                    <span className="text-[#5C4D50]"> — {pinInfo.estimateLabel}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Oversized Campaign Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[460px] sm:h-[580px] lg:h-full lg:min-h-[640px] w-full overflow-hidden bg-[#ECE6D4]">
              <SafeImage
                src={BRAND_IMAGES.heroEditorial}
                alt="Editorial Gen-Z model wearing a cherry-red asymmetrical draped top and cream tailored trousers"
                className="w-full h-full object-cover object-top"
              />
              {/* Measured gradient scrim for bottom editorial caption */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#1A1415]/80 via-[#1A1415]/35 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-[#F6F3E8]">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#F7D6DB] font-semibold">
                    Campaign Look 01
                  </p>
                  <p className="font-display text-lg sm:text-xl mt-0.5">
                    Asymmetric Draped Scarf Top & Ivory Trousers
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCollection('LAST-MINUTE LUXE')}
                  className="px-3.5 py-2 bg-[#F6F3E8] text-[#1A1415] text-[11px] font-bold uppercase tracking-wider hover:bg-[#F7D6DB] transition-colors whitespace-nowrap shrink-0"
                >
                  Shop Look
                </button>
              </div>
            </div>

            {/* Subtle editorial star accent */}
            <div className="hidden lg:flex absolute -top-4 -right-4 w-12 h-12 bg-[#C8E0F4] text-[#8B1E2D] items-center justify-center border border-[#1A1415]/15">
              <EditorialStar className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="border-y border-[#1A1415]/20 bg-[#F7D6DB]/45">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            {HOME_CATEGORY_STRIP.map((item, idx) => (
              <React.Fragment key={item.label}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(item.category)}
                  className="text-xs sm:text-sm font-bold tracking-[0.14em] text-[#1A1415] hover:text-[#8B1E2D] transition-colors py-1 whitespace-nowrap"
                >
                  {item.label}
                </button>
                {idx < HOME_CATEGORY_STRIP.length - 1 && (
                  <LightningBolt className="w-3.5 h-3.5 text-[#8B1E2D] hidden sm:inline-block shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: THE PLAN CHANGED. YOUR OUTFIT DIDN'T. */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B1E2D] mb-2">
              Spontaneous Moments
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1A1415] editorial-balance max-w-2xl leading-[1.06]">
              THE PLAN CHANGED. YOUR OUTFIT{' '}
              <span className="italic text-[#8B1E2D]">DIDN’T.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-[#8B1E2D]">
            <HandDrawnArrow className="w-16 h-8 hidden sm:block" />
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="text-xs font-bold uppercase tracking-[0.14em] text-[#1A1415] border-b border-[#1A1415] pb-1 hover:text-[#8B1E2D] hover:border-[#8B1E2D] transition-colors whitespace-nowrap"
            >
              Explore All Edits
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SCENARIO_CARDS.map((card, i) => (
            <div
              key={card.title}
              onClick={() => onSelectCollection(card.collection)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCollection(card.collection);
                }
              }}
              className={`group cursor-pointer flex flex-col border border-[#1A1415]/15 ${card.accentBg} transition-transform duration-200 hover:-translate-y-1 ${
                i === 1 ? 'md:mt-6' : ''
              }`}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#ECE6D4]">
                <SafeImage
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#8B1E2D] mb-2">
                    <span>{card.collection}</span>
                    <span className="font-mono tabular-nums">{card.index}</span>
                  </div>
                  <h3 className="font-display text-2xl text-[#1A1415] leading-snug">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5C4D50] leading-relaxed">{card.caption}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1A1415]/12 flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#1A1415] group-hover:text-[#8B1E2D] transition-colors">
                  <span>Shop This Edit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: HOT RIGHT NOW */}
      <section className="border-t border-[#1A1415]/15 bg-[#F6F3E8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B1E2D] mb-2">
                <LightningBolt className="w-3.5 h-3.5" />
                <span>Trending Across Studios</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1A1415]">
                HOT RIGHT NOW
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] px-5 py-3 border border-[#1A1415] hover:bg-[#1A1415] hover:text-[#F6F3E8] transition-colors self-start sm:self-auto whitespace-nowrap"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToBag={onAddToBag}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY PROCESS SECTION */}
      <section id="how-it-works" className="bg-[#C8E0F4] border-y border-[#1A1415]/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8B1E2D]">
                How It Works
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1A1415] leading-tight editorial-balance">
                Zero wardrobe panic in three quick steps.
              </h2>
              <p className="text-sm text-[#1A1415]/80 leading-relaxed">
                Every Snap Style piece is pre-steamed, size-checked, and stocked in hyperlocal city
                hubs—ready for rapid dispatch when your calendar catches you off guard.
              </p>

              {/* Quick preset PIN tester */}
              <div className="pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1A1415] mb-2.5">
                  Try a Hub PIN Code
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: '400050', city: 'Mumbai' },
                    { code: '110016', city: 'Delhi' },
                    { code: '560038', city: 'Bengaluru' },
                  ].map((preset) => (
                    <button
                      key={preset.code}
                      type="button"
                      onClick={() => {
                        setPinInput(preset.code);
                        onUpdatePin(checkPinCodeDelivery(preset.code));
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${
                        pinInfo?.pin === preset.code
                          ? 'bg-[#8B1E2D] text-[#F6F3E8] border-[#8B1E2D]'
                          : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/20 hover:border-[#8B1E2D]'
                      }`}
                    >
                      {preset.city} ({preset.code})
                    </button>
                  ))}
                </div>
                {pinInfo && (
                  <div className="mt-3 p-3.5 bg-[#F6F3E8] border border-[#1A1415]/15 text-xs space-y-1">
                    <p className="font-bold text-[#8B1E2D]">{pinInfo.zoneName}</p>
                    <p className="font-semibold text-[#1A1415]">{pinInfo.estimateLabel}</p>
                    <p className="text-[#5C4D50]">{pinInfo.detailNote}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  num: '1.',
                  title: 'PICK YOUR LOOK.',
                  copy: 'Filter by mood, size, or emergency edit. Check live local hub stock for your PIN code.',
                },
                {
                  num: '2.',
                  title: 'WE PACK IT.',
                  copy: 'Your outfit is pulled from our nearest neighbourhood studio, steamed, and sealed in our keepsake box.',
                },
                {
                  num: '3.',
                  title: 'IT’S AT YOUR DOOR.',
                  copy: 'Track your dedicated rider from studio hand-off to doorstep arrival within your quoted window.',
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="bg-[#F6F3E8] border border-[#1A1415]/15 p-6 sm:p-7 flex flex-col justify-between min-h-[240px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl italic text-[#8B1E2D]">{step.num}</span>
                    <LightningBolt className="w-4 h-4 text-[#1A1415]/40" />
                  </div>

                  <div className="mt-8">
                    <h3 className="font-display text-xl sm:text-2xl text-[#1A1415] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#5C4D50] leading-relaxed">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOLD PROMOTIONAL BANNER */}
      <section className="bg-[#8B1E2D] text-[#F6F3E8] relative overflow-hidden">
        <div className="checker-strip-cream h-3 w-full opacity-90" aria-hidden="true" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-3 text-[#F7D6DB] mb-4">
            <EditorialStar className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              SNAP STYLE · FIT IN A BIT
            </span>
            <EditorialStar className="w-5 h-5" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none editorial-balance">
            LOOK GOOD. <span className="italic text-[#F7D6DB]">GO NOW.</span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#F6F3E8]/85 max-w-md leading-relaxed">
            Spontaneous nights, surprise invites, and last-minute coffee dates deserve outfits that
            show up on time.
          </p>

          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="mt-8 px-9 py-4 bg-[#F6F3E8] text-[#8B1E2D] text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#F7D6DB] hover:text-[#1A1415] transition-colors inline-flex items-center gap-2.5"
          >
            <span>GET YOUR FIT.</span>
            <LightningBolt className="w-4 h-4" />
          </button>
        </div>
        <div className="checker-strip-cream h-3 w-full opacity-90" aria-hidden="true" />
      </section>
    </div>
  );
};
