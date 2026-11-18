import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { PageId } from '../types';
import { LightningBolt } from './Graphics';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  bagCount: number;
  wishlistCount: number;
  onOpenBag: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'shop', label: 'Shop' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  bagCount,
  wishlistCount,
  onOpenBag,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-[#F6F3E8]">
      {/* Announcement Bar */}
      {bannerVisible && (
        <div className="bg-[#8B1E2D] text-[#F6F3E8] px-4 h-8 flex items-center justify-center relative text-[11px] sm:text-xs font-medium tracking-wider">
          <div className="flex items-center gap-2 truncate pr-6">
            <LightningBolt className="w-3.5 h-3.5 shrink-0 text-[#F7D6DB]" />
            <span className="uppercase tracking-[0.12em] truncate">
              YOUR NEXT OUTFIT IS CLOSER THAN YOU THINK.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setBannerVisible(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 p-1 text-[#F6F3E8]/80 hover:text-[#F6F3E8] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Header */}
      <header className="border-b border-[#1A1415]/15 bg-[#F6F3E8]/95 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Left: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="inline-flex items-center gap-1.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1A1415] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E2D]"
          >
            <span>SNAP STYLE</span>
            <LightningBolt className="w-4 h-4 text-[#8B1E2D]" />
          </button>

          {/* Center: 4 Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E2D] ${
                    isActive
                      ? 'text-[#8B1E2D] font-semibold'
                      : 'text-[#1A1415]/80 hover:text-[#1A1415]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#8B1E2D]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search, Wishlist, Shopping Bag */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search outfits"
              className="w-10 h-10 flex items-center justify-center text-[#1A1415] hover:text-[#8B1E2D] hover:bg-[#ECE6D4]/70 transition-colors focus-visible:outline-2 focus-visible:outline-[#8B1E2D]"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Open wishlist (${wishlistCount} saved)`}
              className="relative w-10 h-10 flex items-center justify-center text-[#1A1415] hover:text-[#8B1E2D] hover:bg-[#ECE6D4]/70 transition-colors focus-visible:outline-2 focus-visible:outline-[#8B1E2D]"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-[#F7D6DB] text-[#8B1E2D] text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenBag}
              aria-label={`Open shopping bag (${bagCount} items)`}
              className="relative h-10 px-2.5 sm:px-3.5 inline-flex items-center gap-2 bg-[#8B1E2D] text-[#F6F3E8] hover:bg-[#6D1521] transition-colors text-xs font-semibold tracking-wide whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1A1415]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="tabular-nums font-bold">({bagCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#1A1415] hover:text-[#8B1E2D]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#1A1415]/15 bg-[#F6F3E8] px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full text-left px-3 py-3 text-base font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#F7D6DB]/60 text-[#8B1E2D] font-semibold'
                      : 'text-[#1A1415] hover:bg-[#ECE6D4]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <LightningBolt className="w-4 h-4 text-[#8B1E2D]" />}
                </button>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
};
