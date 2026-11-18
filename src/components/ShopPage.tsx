import React, { useMemo, useState } from 'react';
import {
  ArrowDownUp,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  Category,
  CollectionId,
  PinDeliveryInfo,
  Product,
  StyleTag,
} from '../types';
import {
  CATEGORIES,
  COLLECTIONS,
  COLOUR_FILTERS,
  PRODUCTS,
  STYLES,
  checkPinCodeDelivery,
  formatINR,
} from '../data/catalog';
import { EditorialStar, LightningBolt } from './Graphics';
import { ProductCard } from './ProductCard';

interface ShopPageProps {
  selectedCategory: Category | 'All';
  onCategoryChange: (cat: Category | 'All') => void;
  selectedCollection: CollectionId | 'All';
  onCollectionChange: (col: CollectionId | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToBag: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
  pinInfo: PinDeliveryInfo | null;
  onUpdatePin: (info: PinDeliveryInfo) => void;
}

type SortOption = 'trending' | 'newest' | 'price-asc' | 'price-desc';
type PriceRange = 'all' | 'under-2000' | '2000-3000' | 'above-3000';

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'One Size', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'];

export const ShopPage: React.FC<ShopPageProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedCollection,
  onCollectionChange,
  searchQuery,
  onSearchChange,
  wishlistIds,
  onToggleWishlist,
  onAddToBag,
  onQuickView,
  pinInfo,
  onUpdatePin,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColour, setSelectedColour] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<StyleTag | 'All'>('All');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [filtersOpen, setFiltersOpen] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>(pinInfo?.pin || '');

  const emergencyEditProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isEmergencyEdit),
    []
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
      if (selectedCollection !== 'All' && product.collection !== selectedCollection) return false;
      if (selectedSize !== 'All' && !product.sizes.includes(selectedSize)) return false;
      if (selectedColour !== 'All' && product.colour !== selectedColour) return false;
      if (selectedStyle !== 'All' && product.style !== selectedStyle) return false;

      if (priceRange === 'under-2000' && product.price >= 2000) return false;
      if (priceRange === '2000-3000' && (product.price < 2000 || product.price > 3000)) return false;
      if (priceRange === 'above-3000' && product.price <= 3000) return false;

      if (query) {
        const haystack = `${product.name} ${product.category} ${product.collection} ${product.colour} ${product.style} ${product.description}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return Number(Boolean(b.isNewest)) - Number(Boolean(a.isNewest));
      return Number(Boolean(b.isTrending)) - Number(Boolean(a.isTrending));
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedCollection,
    selectedSize,
    selectedColour,
    selectedStyle,
    priceRange,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedCollection !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (selectedColour !== 'All' ? 1 : 0) +
    (selectedStyle !== 'All' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    onCategoryChange('All');
    onCollectionChange('All');
    onSearchChange('');
    setSelectedSize('All');
    setSelectedColour('All');
    setSelectedStyle('All');
    setPriceRange('all');
  };

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePin(checkPinCodeDelivery(pinInput));
  };

  return (
    <div className="bg-[#F6F3E8] text-[#1A1415]">
      {/* Shop Page Header */}
      <section className="border-b border-[#1A1415]/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8B1E2D] mb-3">
                <EditorialStar className="w-3.5 h-3.5" />
                <span>CURATED CATALOG · READY FOR DISPATCH</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-[#1A1415] editorial-balance">
                FIND YOUR NEXT{' '}
                <span className="italic text-[#8B1E2D]">FAVOURITE.</span>
              </h1>
            </div>

            {/* PIN Delivery Check + Search Bar */}
            <div className="lg:col-span-5 space-y-3">
              <form onSubmit={handlePinCheck} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-[#8B1E2D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter PIN code for hub estimate (e.g. 400050)"
                    aria-label="Check delivery PIN code"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#ECE6D4]/70 border border-[#1A1415]/20 text-xs text-[#1A1415] placeholder:text-[#5C4D50]/75 focus:outline-none focus:border-[#8B1E2D]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#1A1415] text-[#F6F3E8] text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E2D] transition-colors whitespace-nowrap shrink-0"
                >
                  Verify PIN
                </button>
              </form>

              {pinInfo && (
                <p className="text-xs text-[#5C4D50]">
                  <span className="font-semibold text-[#8B1E2D]">{pinInfo.zoneName}:</span>{' '}
                  {pinInfo.estimateLabel}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL SECTION: THE EMERGENCY EDIT ⚡ */}
      <section className="bg-[#F7D6DB]/55 border-b border-[#1A1415]/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8B1E2D] mb-2">
                <LightningBolt className="w-4 h-4" />
                <span>Spontaneous Plans · Fast-Track Picks</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1A1415] inline-flex items-center gap-2.5">
                <span>THE EMERGENCY EDIT</span>
                <LightningBolt className="w-6 h-6 text-[#8B1E2D]" />
              </h2>
            </div>

            <p className="text-sm text-[#5C4D50] max-w-md">
              Zero-overthinking pieces stocked across every active micro-hub for sudden invites,
              last-minute dinners, and outfit rescues.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {emergencyEditProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => onQuickView(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onQuickView(item);
                  }
                }}
                className="group cursor-pointer bg-[#F6F3E8] border border-[#1A1415]/15 p-3 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#8B1E2D]"
              >
                <div>
                  <div className="aspect-[3/4] overflow-hidden bg-[#ECE6D4] mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04] ${
                        item.imageFocus || 'object-center'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] font-medium text-[#8B1E2D]">{item.category}</p>
                  <h3 className="text-xs font-semibold text-[#1A1415] mt-0.5 line-clamp-1">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-2 pt-2 border-t border-[#1A1415]/10 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tabular-nums text-[#1A1415]">
                    {formatINR(item.price)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToBag(item, item.sizes[0] || 'One Size');
                    }}
                    className="text-[11px] font-bold uppercase tracking-wider text-[#8B1E2D] hover:underline whitespace-nowrap"
                  >
                    + Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS BAR */}
      <section className="border-b border-[#1A1415]/15 bg-[#C8E0F4]/35">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5C4D50] mr-2 whitespace-nowrap shrink-0">
              Edits:
            </span>
            <button
              type="button"
              onClick={() => onCollectionChange('All')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                selectedCollection === 'All'
                  ? 'bg-[#8B1E2D] text-[#F6F3E8]'
                  : 'bg-[#F6F3E8] text-[#1A1415] border border-[#1A1415]/15 hover:border-[#8B1E2D]'
              }`}
            >
              All Collections
            </button>
            {COLLECTIONS.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => onCollectionChange(col)}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                  selectedCollection === col
                    ? 'bg-[#8B1E2D] text-[#F6F3E8]'
                    : 'bg-[#F6F3E8] text-[#1A1415] border border-[#1A1415]/15 hover:border-[#8B1E2D]'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN SHOPPING WORKSPACE */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 lg:py-12">
        {/* Search, Category Strip & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1A1415]/15">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#5C4D50] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tops, satin dresses, loafers, cherry red..."
              aria-label="Search products"
              className="w-full pl-10 pr-9 py-2.5 bg-[#F6F3E8] border border-[#1A1415]/25 text-sm text-[#1A1415] placeholder:text-[#5C4D50]/70 focus:outline-none focus:border-[#8B1E2D]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C4D50] hover:text-[#1A1415]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle, Sort & Count */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen((prev) => !prev)}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border inline-flex items-center gap-2 transition-colors whitespace-nowrap ${
                filtersOpen
                  ? 'bg-[#1A1415] text-[#F6F3E8] border-[#1A1415]'
                  : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/25 hover:border-[#1A1415]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{filtersOpen ? 'Hide Filters' : 'Show Filters'}</span>
              {activeFilterCount > 0 && (
                <span className="tabular-nums text-[#F7D6DB]">({activeFilterCount})</span>
              )}
            </button>

            <div className="inline-flex items-center gap-2 border border-[#1A1415]/25 px-3 py-2 bg-[#F6F3E8]">
              <ArrowDownUp className="w-3.5 h-3.5 text-[#5C4D50]" />
              <label htmlFor="sort-select" className="sr-only">
                Sort products
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-xs font-semibold text-[#1A1415] focus:outline-none cursor-pointer"
              >
                <option value="trending">Sort: Trending</option>
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="px-3 py-2 text-xs font-semibold text-[#8B1E2D] hover:underline inline-flex items-center gap-1 whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Row (Interactive filter buttons) */}
        <div className="py-4 flex items-center gap-2 overflow-x-auto border-b border-[#1A1415]/10">
          <button
            type="button"
            onClick={() => onCategoryChange('All')}
            className={`px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-[#1A1415] text-[#F6F3E8]'
                : 'text-[#5C4D50] hover:text-[#1A1415] hover:bg-[#ECE6D4]'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#1A1415] text-[#F6F3E8]'
                  : 'text-[#5C4D50] hover:text-[#1A1415] hover:bg-[#ECE6D4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid + Filter Sidebar */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {filtersOpen && (
            <aside className="lg:col-span-3 space-y-6 bg-[#ECE6D4]/55 border border-[#1A1415]/15 p-5">
              {/* Size Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#1A1415] mb-3">
                  Size
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('All')}
                    className={`px-2.5 py-1.5 text-xs font-medium border transition-colors ${
                      selectedSize === 'All'
                        ? 'bg-[#8B1E2D] text-[#F6F3E8] border-[#8B1E2D]'
                        : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/20 hover:border-[#1A1415]'
                    }`}
                  >
                    All
                  </button>
                  {SIZE_OPTIONS.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-2.5 py-1.5 text-xs font-medium border transition-colors ${
                        selectedSize === sz
                          ? 'bg-[#8B1E2D] text-[#F6F3E8] border-[#8B1E2D]'
                          : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/20 hover:border-[#1A1415]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colour Filter */}
              <div className="pt-4 border-t border-[#1A1415]/12">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#1A1415] mb-3">
                  Colour
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedColour('All')}
                    className={`col-span-2 text-left px-3 py-1.5 text-xs font-medium border transition-colors ${
                      selectedColour === 'All'
                        ? 'bg-[#1A1415] text-[#F6F3E8] border-[#1A1415]'
                        : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/20'
                    }`}
                  >
                    All Colours
                  </button>
                  {COLOUR_FILTERS.map((c) => {
                    const active = selectedColour === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColour(c.name)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium border transition-colors text-left ${
                          active
                            ? 'bg-[#1A1415] text-[#F6F3E8] border-[#1A1415]'
                            : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/20 hover:border-[#8B1E2D]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#1A1415]/25 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="truncate">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-[#1A1415]/12">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#1A1415] mb-3">
                  Price
                </h3>
                <div className="space-y-1.5">
                  {[
                    { id: 'all' as PriceRange, label: 'All Prices' },
                    { id: 'under-2000' as PriceRange, label: 'Under ₹2,000' },
                    { id: '2000-3000' as PriceRange, label: '₹2,000 – ₹3,000' },
                    { id: 'above-3000' as PriceRange, label: 'Above ₹3,000' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPriceRange(opt.id)}
                      className={`w-full text-left px-3 py-2 text-xs font-medium border transition-colors ${
                        priceRange === opt.id
                          ? 'bg-[#8B1E2D] text-[#F6F3E8] border-[#8B1E2D]'
                          : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/15 hover:border-[#1A1415]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Filter */}
              <div className="pt-4 border-t border-[#1A1415]/12">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#1A1415] mb-3">
                  Style
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedStyle('All')}
                    className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                      selectedStyle === 'All'
                        ? 'bg-[#1A1415] text-[#F6F3E8] border-[#1A1415]'
                        : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/20'
                    }`}
                  >
                    All
                  </button>
                  {STYLES.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStyle(st)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                        selectedStyle === st
                          ? 'bg-[#1A1415] text-[#F6F3E8] border-[#1A1415]'
                          : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/20 hover:border-[#8B1E2D]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Product Grid */}
          <div className={filtersOpen ? 'lg:col-span-9' : 'lg:col-span-12'}>
            <div className="flex items-center justify-between mb-5 text-xs text-[#5C4D50]">
              <span className="tabular-nums font-medium">
                Showing {filteredProducts.length} of {PRODUCTS.length} pieces
              </span>
              {selectedCollection !== 'All' && (
                <span className="font-semibold text-[#8B1E2D]">{selectedCollection}</span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="border border-[#1A1415]/15 bg-[#ECE6D4]/50 p-12 text-center space-y-4">
                <p className="font-display text-2xl text-[#1A1415]">
                  No pieces match your current filters.
                </p>
                <p className="text-sm text-[#5C4D50] max-w-md mx-auto">
                  Try clearing one or two filters to explore more looks ready for instant dispatch.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-3 bg-[#8B1E2D] text-[#F6F3E8] text-xs font-bold uppercase tracking-wider hover:bg-[#6D1521] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  filtersOpen ? 'xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'
                } gap-6`}
              >
                {filteredProducts.map((product) => (
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
