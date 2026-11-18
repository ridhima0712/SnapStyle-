import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { CartItem, OrderRecord, PinDeliveryInfo, Product } from '../types';
import { PRODUCTS, checkPinCodeDelivery, formatINR } from '../data/catalog';
import { EditorialStar, LightningBolt, SafeImage } from './Graphics';

/* -------------------------------------------------------------------------- */
/* Quick View Modal                                                           */
/* -------------------------------------------------------------------------- */

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToBag: (product: Product, size: string) => void;
  pinInfo: PinDeliveryInfo | null;
  onUpdatePin: (info: PinDeliveryInfo) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToBag,
  pinInfo,
  onUpdatePin,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [pinInput, setPinInput] = useState<string>(pinInfo?.pin || '');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'One Size');
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!product) return null;

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePin(checkPinCodeDelivery(pinInput));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1415]/60 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
    >
      <div
        className="bg-[#F6F3E8] border border-[#1A1415]/25 max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-3 right-3 z-10 w-10 h-10 bg-[#F6F3E8] border border-[#1A1415]/15 flex items-center justify-center text-[#1A1415] hover:bg-[#8B1E2D] hover:text-[#F6F3E8] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Studio Photo */}
        <div className="md:col-span-6 bg-[#ECE6D4] aspect-[3/4] md:aspect-auto md:min-h-[480px]">
          <SafeImage
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover ${product.imageFocus || 'object-center'}`}
          />
        </div>

        {/* Right Purchase Module */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-[#5C4D50]">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#8B1E2D] font-semibold">{product.collection}</span>
              <span aria-hidden="true">·</span>
              <span>{product.style}</span>
            </div>

            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-[#1A1415] leading-tight">
                {product.name}
              </h2>
              <p className="mt-2 text-xl font-bold text-[#1A1415] tabular-nums">
                {formatINR(product.price)}
              </p>
            </div>

            <p className="text-sm text-[#5C4D50] leading-relaxed">{product.description}</p>

            <div className="text-xs text-[#5C4D50] bg-[#ECE6D4]/70 p-3 border border-[#1A1415]/10">
              <span className="font-semibold text-[#1A1415]">Fabric & Care: </span>
              {product.fabricNote}
            </div>

            {/* Colour */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#1A1415]">Colour:</span>
              <span
                className="w-4 h-4 rounded-full border border-[#1A1415]/25"
                style={{ backgroundColor: product.colourHex }}
              />
              <span className="text-[#5C4D50]">{product.colour}</span>
            </div>

            {/* Size Selector */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#1A1415] mb-2">
                Select Size
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[44px] h-10 px-3 text-xs font-semibold border transition-colors ${
                      selectedSize === sz
                        ? 'bg-[#1A1415] text-[#F6F3E8] border-[#1A1415]'
                        : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/25 hover:border-[#8B1E2D]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* PIN Checker inside Quick View */}
            <form onSubmit={handlePinCheck} className="pt-2 flex gap-2">
              <div className="relative flex-1">
                <MapPin className="w-3.5 h-3.5 text-[#8B1E2D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="PIN code for delivery estimate"
                  className="w-full pl-8 pr-2.5 py-2 bg-[#ECE6D4]/55 border border-[#1A1415]/20 text-xs text-[#1A1415] focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[#ECE6D4] border border-[#1A1415]/25 text-xs font-semibold hover:bg-[#1A1415] hover:text-[#F6F3E8] transition-colors"
              >
                Check
              </button>
            </form>
            {pinInfo && (
              <p className="text-xs text-[#5C4D50]">
                <span className="font-semibold text-[#8B1E2D]">{pinInfo.zoneName}:</span>{' '}
                {pinInfo.estimateLabel}
              </p>
            )}
          </div>

          {/* Primary Actions */}
          <div className="flex gap-3 pt-4 border-t border-[#1A1415]/15">
            <button
              type="button"
              onClick={() => {
                onAddToBag(product, selectedSize || product.sizes[0]);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1200);
              }}
              className={`flex-1 py-3.5 px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                added
                  ? 'bg-[#1A1415] text-[#F6F3E8]'
                  : 'bg-[#8B1E2D] text-[#F6F3E8] hover:bg-[#6D1521]'
              }`}
            >
              {added ? 'Added to Bag' : 'Add to Bag'}
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className={`w-12 flex items-center justify-center border transition-colors ${
                isWishlisted
                  ? 'bg-[#F7D6DB] text-[#8B1E2D] border-[#8B1E2D]'
                  : 'border-[#1A1415]/25 text-[#1A1415] hover:border-[#8B1E2D]'
              }`}
            >
              <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Shopping Bag & Express Checkout + Order Confirmation Drawer                */
/* -------------------------------------------------------------------------- */

interface BagDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearBag: () => void;
  pinInfo: PinDeliveryInfo | null;
  onUpdatePin: (info: PinDeliveryInfo) => void;
  onGoShop: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearBag,
  pinInfo,
  onUpdatePin,
  onGoShop,
}) => {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [pinInput, setPinInput] = useState(pinInfo?.pin || '400050');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash on Delivery'>('UPI');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (pinInfo?.pin) setPinInput(pinInfo.pin);
  }, [pinInfo]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = items.length === 0 ? 0 : subtotal >= 2499 ? 0 : 79;
  const total = subtotal + deliveryFee;

  const handlePinVerify = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePin(checkPinCodeDelivery(pinInput));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.replace(/\D/g, '');
    if (!customerName.trim() || phone.trim().length < 10 || !address.trim() || cleanPin.length !== 6) {
      setFormError('Please enter your full name, 10-digit phone, street address, and 6-digit PIN code.');
      return;
    }

    const deliveryCheck = checkPinCodeDelivery(cleanPin);
    onUpdatePin(deliveryCheck);
    setFormError('');

    const orderNum = `SNP-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: OrderRecord = {
      orderId: orderNum,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      pin: cleanPin,
      paymentMethod,
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      estimateLabel: deliveryCheck.estimateLabel,
      placedAt: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setConfirmedOrder(record);
    onClearBag();
    setStep('confirmed');
  };

  const resetAndClose = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setConfirmedOrder(null);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1A1415]/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={resetAndClose}
    >
      <div
        className="w-full max-w-md bg-[#F6F3E8] h-full flex flex-col border-l border-[#1A1415]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#1A1415]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to bag"
                className="p-1 mr-1 text-[#1A1415] hover:text-[#8B1E2D]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <ShoppingBag className="w-4 h-4 text-[#8B1E2D]" />
            <h2 className="font-display text-xl text-[#1A1415]">
              {step === 'bag' && 'Your Snap Bag'}
              {step === 'checkout' && 'Express Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close bag"
            className="w-9 h-9 flex items-center justify-center text-[#1A1415] hover:bg-[#ECE6D4]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {step === 'confirmed' && confirmedOrder ? (
            <div className="space-y-6">
              <div className="bg-[#8B1E2D] text-[#F6F3E8] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F7D6DB]">
                    Order #{confirmedOrder.orderId}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-[#F7D6DB]" />
                </div>
                <h3 className="font-display text-2xl leading-snug">
                  Your fit is queued for studio packing.
                </h3>
                <p className="text-xs text-[#F6F3E8]/85">
                  Placed at {confirmedOrder.placedAt} · {confirmedOrder.estimateLabel}
                </p>
              </div>

              {/* 3-Step Live Progress */}
              <div className="bg-[#C8E0F4]/55 border border-[#1A1415]/15 p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1A1415]">
                  Dispatch Progress
                </p>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-2.5 font-semibold text-[#8B1E2D]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>1. Order Confirmed — Assigned to local hub ({confirmedOrder.pin})</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#1A1415]">
                    <LightningBolt className="w-4 h-4 shrink-0 text-[#8B1E2D]" />
                    <span>2. Steaming & packing in Snap Style keepsake box</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#5C4D50]">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>3. Rider hand-off to {confirmedOrder.address}</span>
                  </div>
                </div>
              </div>

              {/* Receipt Summary */}
              <div className="border border-[#1A1415]/15 bg-[#ECE6D4]/45 p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1A1415]">
                  Receipt Summary
                </p>
                <div className="divide-y divide-[#1A1415]/10">
                  {confirmedOrder.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="py-2 flex items-center justify-between text-xs"
                    >
                      <span className="text-[#1A1415]">
                        {item.product.name} ({item.size}) × {item.quantity}
                      </span>
                      <span className="font-semibold tabular-nums">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[#1A1415]/15 space-y-1 text-xs">
                  <div className="flex justify-between text-[#5C4D50]">
                    <span>Payment</span>
                    <span className="font-medium text-[#1A1415]">
                      {confirmedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5C4D50]">
                    <span>Delivery</span>
                    <span className="tabular-nums">
                      {confirmedOrder.deliveryFee === 0
                        ? 'Complimentary'
                        : formatINR(confirmedOrder.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#1A1415] pt-1">
                    <span>Total Paid</span>
                    <span className="tabular-nums">{formatINR(confirmedOrder.total)}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep('bag');
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#1A1415] text-[#F6F3E8] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#8B1E2D] transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <EditorialStar className="w-8 h-8 text-[#8B1E2D] mx-auto" />
              <h3 className="font-display text-2xl text-[#1A1415]">Your bag is empty.</h3>
              <p className="text-sm text-[#5C4D50] max-w-xs mx-auto">
                Got sudden plans? Grab something from The Emergency Edit and check out in seconds.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoShop();
                }}
                className="px-6 py-3 bg-[#8B1E2D] text-[#F6F3E8] text-xs font-bold uppercase tracking-wider hover:bg-[#6D1521] transition-colors"
              >
                Shop New Arrivals
              </button>
            </div>
          ) : step === 'bag' ? (
            <>
              {/* PIN Delivery Checker */}
              <div className="bg-[#ECE6D4]/70 border border-[#1A1415]/15 p-4 space-y-2.5">
                <form onSubmit={handlePinVerify} className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="PIN Code"
                    aria-label="Delivery PIN code"
                    className="flex-1 px-3 py-2 bg-[#F6F3E8] border border-[#1A1415]/20 text-xs focus:outline-none focus:border-[#8B1E2D]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#1A1415] text-[#F6F3E8] text-xs font-semibold uppercase tracking-wider"
                  >
                    Check PIN
                  </button>
                </form>
                {pinInfo && (
                  <p className="text-xs text-[#5C4D50]">
                    <span className="font-semibold text-[#8B1E2D]">{pinInfo.zoneName}</span> ·{' '}
                    {pinInfo.estimateLabel}
                  </p>
                )}
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-[#1A1415]/12">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="py-4 flex gap-4 items-start"
                  >
                    <div className="w-20 aspect-[3/4] bg-[#ECE6D4] shrink-0 overflow-hidden">
                      <SafeImage
                        src={item.product.image}
                        alt={item.product.name}
                        className={`w-full h-full object-cover ${
                          item.product.imageFocus || 'object-center'
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#1A1415] leading-snug">
                          {item.product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#5C4D50] hover:text-[#8B1E2D] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#5C4D50] mt-0.5">
                        Size: <span className="font-semibold text-[#1A1415]">{item.size}</span>
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[#1A1415]/20 bg-[#F6F3E8]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.size, -1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#ECE6D4]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.size, 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#ECE6D4]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold tabular-nums text-[#1A1415]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Express Checkout Step */
            <form id="express-checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="bg-[#F7D6DB]/65 border border-[#1A1415]/12 p-3.5 text-xs">
                <span className="font-bold text-[#8B1E2D]">Express Order Summary: </span>
                <span className="tabular-nums font-semibold">
                  {items.reduce((a, b) => a + b.quantity, 0)} items · Total {formatINR(total)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Riya Kapoor"
                  className="w-full px-3.5 py-2.5 bg-[#ECE6D4]/55 border border-[#1A1415]/25 text-sm focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-[#ECE6D4]/55 border border-[#1A1415]/25 text-sm tabular-nums focus:outline-none focus:border-[#8B1E2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="400050"
                    className="w-full px-3.5 py-2.5 bg-[#ECE6D4]/55 border border-[#1A1415]/25 text-sm tabular-nums focus:outline-none focus:border-[#8B1E2D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Delivery Address
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat / Building, Street, Landmark"
                  className="w-full px-3.5 py-2.5 bg-[#ECE6D4]/55 border border-[#1A1415]/25 text-sm focus:outline-none focus:border-[#8B1E2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['UPI', 'Card', 'Cash on Delivery'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2.5 px-2 text-xs font-semibold border transition-colors ${
                        paymentMethod === method
                          ? 'bg-[#1A1415] text-[#F6F3E8] border-[#1A1415]'
                          : 'bg-[#F6F3E8] text-[#1A1415] border-[#1A1415]/20'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {formError && <p className="text-xs font-medium text-[#8B1E2D]">{formError}</p>}
            </form>
          )}
        </div>

        {/* Drawer Footer Totals & Checkout CTA */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="p-6 border-t border-[#1A1415]/15 bg-[#ECE6D4]/55 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5C4D50]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#1A1415]">
                  {formatINR(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#5C4D50]">
                <span>Express Delivery (Free above ₹2,499)</span>
                <span className="tabular-nums font-medium text-[#1A1415]">
                  {deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1A1415] pt-2 border-t border-[#1A1415]/12">
                <span>Total</span>
                <span className="tabular-nums">{formatINR(total)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 bg-[#8B1E2D] text-[#F6F3E8] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#6D1521] transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <LightningBolt className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="express-checkout-form"
                className="w-full py-3.5 bg-[#8B1E2D] text-[#F6F3E8] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#6D1521] transition-colors"
              >
                Place Instant Order · {formatINR(total)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Wishlist Drawer                                                            */
/* -------------------------------------------------------------------------- */

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToBag: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  open,
  onClose,
  wishlistIds,
  onToggleWishlist,
  onAddToBag,
  onQuickView,
}) => {
  if (!open) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1A1415]/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#F6F3E8] h-full flex flex-col border-l border-[#1A1415]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#1A1415]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#8B1E2D]" fill="currentColor" />
            <h2 className="font-display text-xl text-[#1A1415]">
              Saved Looks ({savedProducts.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist"
            className="w-9 h-9 flex items-center justify-center hover:bg-[#ECE6D4]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {savedProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-8 h-8 text-[#8B1E2D]/50 mx-auto" />
              <h3 className="font-display text-2xl text-[#1A1415]">Nothing saved yet.</h3>
              <p className="text-sm text-[#5C4D50]">
                Tap the heart icon on any piece to keep your emergency outfit shortlist ready.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#1A1415]/12">
              {savedProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4">
                  <div
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                    className="w-20 aspect-[3/4] bg-[#ECE6D4] shrink-0 overflow-hidden cursor-pointer"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover ${
                        product.imageFocus || 'object-center'
                      }`}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#1A1415]">{product.name}</h3>
                        <button
                          type="button"
                          onClick={() => onToggleWishlist(product.id)}
                          aria-label={`Remove ${product.name} from saved`}
                          className="text-[#5C4D50] hover:text-[#8B1E2D]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-bold tabular-nums text-[#8B1E2D] mt-1">
                        {formatINR(product.price)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToBag(product, product.sizes[0] || 'One Size')}
                      className="mt-3 py-2 px-3 bg-[#1A1415] text-[#F6F3E8] text-[11px] font-bold uppercase tracking-wider hover:bg-[#8B1E2D] transition-colors self-start"
                    >
                      Move to Bag ({product.sizes[0]})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Global Search Overlay                                                      */
/* -------------------------------------------------------------------------- */

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSearchInShop: (query: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  open,
  onClose,
  onSelectProduct,
  onSearchInShop,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const trimmed = query.trim().toLowerCase();
  const matches = trimmed
    ? PRODUCTS.filter((p) =>
        `${p.name} ${p.category} ${p.collection} ${p.colour} ${p.style}`
          .toLowerCase()
          .includes(trimmed)
      )
    : PRODUCTS.slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1A1415]/60 backdrop-blur-[2px] flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search Snap Style"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#F6F3E8] border border-[#1A1415]/25 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#1A1415]/20 pb-3">
          <Search className="w-5 h-5 text-[#8B1E2D] shrink-0" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onSearchInShop(query.trim());
                onClose();
              }
            }}
            placeholder="Search corsets, slip dresses, loafers, cherry red..."
            className="w-full bg-transparent text-base text-[#1A1415] placeholder:text-[#5C4D50]/65 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-[#5C4D50] hover:text-[#1A1415]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C4D50]">
              {trimmed ? `Results (${matches.length})` : 'Quick Suggestions'}
            </span>
            {trimmed && (
              <button
                type="button"
                onClick={() => {
                  onSearchInShop(query.trim());
                  onClose();
                }}
                className="text-xs font-bold text-[#8B1E2D] hover:underline"
              >
                View all in Shop →
              </button>
            )}
          </div>

          {matches.length === 0 ? (
            <p className="text-sm text-[#5C4D50] py-6 text-center">
              No outfits matched “{query}”. Try “satin”, “bag”, “denim”, or “loafers”.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[52vh] overflow-y-auto">
              {matches.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                  className="flex items-center gap-3 p-2.5 border border-[#1A1415]/12 bg-[#ECE6D4]/45 hover:border-[#8B1E2D] text-left transition-colors"
                >
                  <div className="w-14 aspect-[3/4] bg-[#ECE6D4] shrink-0 overflow-hidden">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover ${item.imageFocus || 'object-center'}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-[#8B1E2D]">{item.category}</p>
                    <p className="text-xs font-semibold text-[#1A1415] truncate">{item.name}</p>
                    <p className="text-xs font-bold tabular-nums text-[#1A1415] mt-1">
                      {formatINR(item.price)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
