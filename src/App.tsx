import React, { useEffect, useState } from 'react';
import { Category, CollectionId, CartItem, PageId, PinDeliveryInfo, Product } from './types';
import { PRODUCTS, checkPinCodeDelivery } from './data/catalog';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { StoryPage } from './components/StoryPage';
import { ShopPage } from './components/ShopPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import {
  BagDrawer,
  QuickViewModal,
  SearchOverlay,
  WishlistDrawer,
} from './components/Overlays';

const PAGE_TO_PATH: Record<PageId, string> = {
  home: '/',
  story: '/our-story',
  shop: '/shop',
  contact: '/contact',
};

function getPageFromPath(pathname: string): PageId {
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (clean === '/our-story' || clean === '/story') return 'story';
  if (clean === '/shop' || clean === '/products') return 'shop';
  if (clean === '/contact') return 'contact';
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() =>
    getPageFromPath(window.location.pathname)
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedCollection, setSelectedCollection] = useState<CollectionId | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('snapstyle_bag');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage failure
    }
    return [
      {
        product: PRODUCTS[0],
        size: 'S',
        quantity: 1,
      },
    ];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('snapstyle_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage failure
    }
    return ['snp-02', 'snp-04'];
  });

  const [pinInfo, setPinInfo] = useState<PinDeliveryInfo | null>(() =>
    checkPinCodeDelivery('400050')
  );

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      setActivePage(getPageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const syncRoute = (page: PageId) => {
    const targetPath = PAGE_TO_PATH[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    setActivePage(page);
  };

  useEffect(() => {
    try {
      localStorage.setItem('snapstyle_bag', JSON.stringify(cart));
    } catch {
      // ignore storage failure
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('snapstyle_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore storage failure
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from saved looks' : 'Saved to your wishlist');
      return next;
    });
  };

  const handleAddToBag = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    showToast(`Added ${product.name} (${size}) to bag`);
  };

  const handleUpdateQty = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleNavigate = (page: PageId) => {
    syncRoute(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryAndShop = (category: Category) => {
    setSelectedCategory(category);
    setSelectedCollection('All');
    syncRoute('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollectionAndShop = (collection: CollectionId) => {
    setSelectedCollection(collection);
    setSelectedCategory('All');
    syncRoute('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchInShop = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('All');
    setSelectedCollection('All');
    syncRoute('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bagCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3E8] text-[#1A1415]">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        bagCount={bagCount}
        wishlistCount={wishlistIds.length}
        onOpenBag={() => setBagOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategoryAndShop}
            onSelectCollection={handleSelectCollectionAndShop}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToBag={handleAddToBag}
            onQuickView={setQuickViewProduct}
            pinInfo={pinInfo}
            onUpdatePin={setPinInfo}
          />
        )}

        {activePage === 'story' && <StoryPage onNavigate={handleNavigate} />}

        {activePage === 'shop' && (
          <ShopPage
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedCollection={selectedCollection}
            onCollectionChange={setSelectedCollection}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToBag={handleAddToBag}
            onQuickView={setQuickViewProduct}
            pinInfo={pinInfo}
            onUpdatePin={setPinInfo}
          />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onSelectCollection={handleSelectCollectionAndShop}
      />

      {/* Interactive Overlays */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToBag={handleAddToBag}
        pinInfo={pinInfo}
        onUpdatePin={setPinInfo}
      />

      <BagDrawer
        open={bagOpen}
        onClose={() => setBagOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearBag={() => setCart([])}
        pinInfo={pinInfo}
        onUpdatePin={setPinInfo}
        onGoShop={() => handleNavigate('shop')}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onAddToBag={handleAddToBag}
        onQuickView={setQuickViewProduct}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={setQuickViewProduct}
        onSearchInShop={handleSearchInShop}
      />

      {/* Subtle Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#1A1415] text-[#F6F3E8] px-4 py-3 text-xs font-semibold tracking-wide border border-[#F7D6DB]/30 shadow-lg"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
