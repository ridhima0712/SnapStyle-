import { Category, CollectionId, PinDeliveryInfo, Product, StyleTag } from '../types';

export const BRAND_IMAGES = {
  heroEditorial: '/src/assets/images/hero_fashion_flash_1795023243041.jpg',
  partyPlans: '/src/assets/images/editorial_party_plans_1795023243318.jpg',
  coffeeDate: '/src/assets/images/editorial_coffee_date_1795023244448.jpg',
  wardrobeUpgrade: '/src/assets/images/editorial_wardrobe_upgrade_1795023244272.jpg',
  storyPackaging: '/src/assets/images/story_brand_packaging_1795023245604.jpg',
  storyFabrics: '/src/assets/images/story_fabric_details_1795023246058.jpg',
  cherryCorset: '/src/assets/images/prod_cherry_corset_1795023245759.jpg',
  blushDress: '/src/assets/images/prod_blush_dress_1795023246934.jpg',
  babyBlueShirt: '/src/assets/images/prod_babyblue_shirt_1795023248444.jpg',
  cargoDenim: '/src/assets/images/prod_cargo_denim_1795023247385.jpg',
  croppedTrench: '/src/assets/images/prod_cropped_trench_1795023248614.jpg',
  crescentBag: '/src/assets/images/prod_crescent_bag_1795023248478.jpg',
  platformLoafers: '/src/assets/images/prod_platform_loafers_1795023249334.jpg',
  silverJewellery: '/src/assets/images/prod_silver_jewellery_1795023249750.jpg',
};

export const CATEGORIES: Category[] = [
  'Tops',
  'Shirts',
  'Dresses',
  'Bottoms',
  'Denim',
  'Outerwear',
  'Bags',
  'Shoes',
  'Jewellery',
  'Accessories',
];

export const HOME_CATEGORY_STRIP: { label: string; category: Category }[] = [
  { label: 'TOPS', category: 'Tops' },
  { label: 'BOTTOMS', category: 'Bottoms' },
  { label: 'DRESSES', category: 'Dresses' },
  { label: 'OUTERWEAR', category: 'Outerwear' },
  { label: 'BAGS', category: 'Bags' },
  { label: 'SHOES', category: 'Shoes' },
  { label: 'ACCESSORIES', category: 'Accessories' },
];

export const COLLECTIONS: CollectionId[] = [
  'THE PARTY EDIT',
  'CAMPUS COOL',
  'DATE NIGHT',
  'OFF-DUTY',
  'LAST-MINUTE LUXE',
];

export const STYLES: StyleTag[] = ['Streetwear', 'Evening', 'Minimal', 'Y2K', 'Tailored'];

export const COLOUR_FILTERS: { name: string; hex: string }[] = [
  { name: 'Cherry Red', hex: '#8B1E2D' },
  { name: 'Blush Pink', hex: '#F7D6DB' },
  { name: 'Baby Blue', hex: '#C8E0F4' },
  { name: 'Warm Cream', hex: '#F6F3E8' },
  { name: 'Indigo', hex: '#233A5E' },
  { name: 'Espresso', hex: '#3B2820' },
  { name: 'Jet Black', hex: '#1A1415' },
  { name: 'Silver', hex: '#C4C7CE' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'snp-01',
    name: 'Rouge Satin Boned Corset',
    price: 2190,
    category: 'Tops',
    collection: 'THE PARTY EDIT',
    style: 'Evening',
    colour: 'Cherry Red',
    colourHex: '#8B1E2D',
    sizes: ['XS', 'S', 'M', 'L'],
    image: BRAND_IMAGES.cherryCorset,
    description:
      'Structured sweetheart-neckline corset cut from luminous cherry-red duchesse satin with flexible interior boning and a concealed back zip.',
    fabricNote: '96% Recycled Polyester Satin, 4% Elastane · Dry clean or gentle cold hand wash',
    isTrending: true,
    isNewest: true,
    isEmergencyEdit: true,
  },
  {
    id: 'snp-02',
    name: 'Blush Bias-Cut Slip Dress',
    price: 2890,
    category: 'Dresses',
    collection: 'DATE NIGHT',
    style: 'Evening',
    colour: 'Blush Pink',
    colourHex: '#F7D6DB',
    sizes: ['XS', 'S', 'M', 'L'],
    image: BRAND_IMAGES.blushDress,
    description:
      'Fluid cowl-neck mini dress cut on the bias for effortless drape. Adjustable spaghetti straps take you from late dinner to rooftop drinks.',
    fabricNote: '100% Matte Viscose Satin · Anti-static lining included',
    isTrending: true,
    isEmergencyEdit: true,
  },
  {
    id: 'snp-03',
    name: 'Skyline Oversized Poplin Shirt',
    price: 1890,
    category: 'Shirts',
    collection: 'CAMPUS COOL',
    style: 'Minimal',
    colour: 'Baby Blue',
    colourHex: '#C8E0F4',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: BRAND_IMAGES.babyBlueShirt,
    description:
      'Crisp heavyweight cotton poplin with dropped shoulders and elongated French cuffs. Wear buttoned up, open over a tank, or half-tucked.',
    fabricNote: '100% Combed Organic Cotton Poplin · Pre-steamed before dispatch',
    isTrending: true,
    isNewest: true,
  },
  {
    id: 'snp-04',
    name: 'Crescent Buckle Mini Shoulder Bag',
    price: 2490,
    category: 'Bags',
    collection: 'LAST-MINUTE LUXE',
    style: 'Y2K',
    colour: 'Cherry Red',
    colourHex: '#8B1E2D',
    sizes: ['One Size'],
    image: BRAND_IMAGES.crescentBag,
    description:
      'Sculpted glossy cherry-red crescent shoulder bag finished with brushed silver buckle hardware and room for your phone, gloss, and cards.',
    fabricNote: 'Pebble-free Vegan Gloss Leather · Brushed zinc-alloy clasp',
    isTrending: true,
    isEmergencyEdit: true,
  },
  {
    id: 'snp-05',
    name: '90s Relaxed Wide-Leg Denim',
    price: 2690,
    category: 'Denim',
    collection: 'OFF-DUTY',
    style: 'Streetwear',
    colour: 'Indigo',
    colourHex: '#233A5E',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: BRAND_IMAGES.cargoDenim,
    imageFocus: 'object-[55%_55%] scale-[1.08]',
    description:
      'Mid-rise puddle-hem denim with a clean turn-up cuff and authentic vintage enzyme wash. Built for spontaneous coffee runs and late studio nights.',
    fabricNote: '12.5 oz Non-Stretch Cotton Denim · Reinforced twin-needle seams',
    isNewest: true,
  },
  {
    id: 'snp-06',
    name: 'Espresso Cropped Belted Trench',
    price: 3890,
    category: 'Outerwear',
    collection: 'LAST-MINUTE LUXE',
    style: 'Tailored',
    colour: 'Espresso',
    colourHex: '#3B2820',
    sizes: ['XS', 'S', 'M', 'L'],
    image: BRAND_IMAGES.croppedTrench,
    description:
      'Double-breasted cropped trench coat with tortoiseshell buttons, storm flaps, and a cinched waist belt for instant polish over anything.',
    fabricNote: 'Water-repellent Cotton-Twill Blend · Fully lined interior',
    isNewest: true,
  },
  {
    id: 'snp-07',
    name: 'Lug-Sole Platform Penny Loafers',
    price: 3490,
    category: 'Shoes',
    collection: 'CAMPUS COOL',
    style: 'Streetwear',
    colour: 'Jet Black',
    colourHex: '#1A1415',
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    image: BRAND_IMAGES.platformLoafers,
    description:
      'Chunky lug-sole leather loafers with cushioned memory-foam footbeds so you can walk straight out of the box and dance until 2 AM.',
    fabricNote: 'Smooth Full-Grain Vegan Leather · 4.5 cm lightweight EVA lug sole',
    isEmergencyEdit: true,
  },
  {
    id: 'snp-08',
    name: 'Molten Silver Hoop & Link Duo',
    price: 1290,
    category: 'Jewellery',
    collection: 'THE PARTY EDIT',
    style: 'Minimal',
    colour: 'Silver',
    colourHex: '#C4C7CE',
    sizes: ['One Size'],
    image: BRAND_IMAGES.silverJewellery,
    description:
      'Weightless hollow chunky hoops paired with a heavy-look oval link chain necklace. The fastest shortcut when your outfit needs presence.',
    fabricNote: 'Hypoallergenic 925 Silver Plated Brass · Anti-tarnish coat',
    isEmergencyEdit: true,
  },
  {
    id: 'snp-09',
    name: 'Asymmetric Draped Scarf Top',
    price: 2290,
    category: 'Tops',
    collection: 'LAST-MINUTE LUXE',
    style: 'Evening',
    colour: 'Cherry Red',
    colourHex: '#8B1E2D',
    sizes: ['XS', 'S', 'M', 'L'],
    image: BRAND_IMAGES.heroEditorial,
    imageFocus: 'object-top',
    description:
      'Editorial wrap-draped sleeveless top featuring an elongated cascading shoulder scarf. Instantly turns tailored trousers into a headline look.',
    fabricNote: 'Heavyweight Fluid Crepe · Concealed side-seam zip',
    isNewest: true,
  },
  {
    id: 'snp-10',
    name: 'Crimson Flash Satin Mini Dress',
    price: 3190,
    category: 'Dresses',
    collection: 'THE PARTY EDIT',
    style: 'Evening',
    colour: 'Cherry Red',
    colourHex: '#8B1E2D',
    sizes: ['XS', 'S', 'M', 'L'],
    image: BRAND_IMAGES.partyPlans,
    imageFocus: 'object-[50%_28%]',
    description:
      'High-impact body-skimming crimson satin mini dress with subtle ruching and adjustable cowl straps. Made for last-minute guest-list invites.',
    fabricNote: 'Lustrous Stretch Satin · Double-layered bust for support',
    isEmergencyEdit: true,
  },
  {
    id: 'snp-11',
    name: 'Cloud-Knit Cropped Cardigan',
    price: 1990,
    category: 'Tops',
    collection: 'DATE NIGHT',
    style: 'Minimal',
    colour: 'Baby Blue',
    colourHex: '#C8E0F4',
    sizes: ['XS', 'S', 'M', 'L'],
    image: BRAND_IMAGES.coffeeDate,
    imageFocus: 'object-[50%_22%]',
    description:
      'Soft fine-ribbed baby blue cardigan with pearl-sheen buttons and a flattering cropped hem. Effortless for iced coffee catch-ups.',
    fabricNote: '60% Combed Cotton, 40% Modal Blend · Breathable all-day knit',
  },
  {
    id: 'snp-12',
    name: 'Studio Tailored Wool-Blend Blazer',
    price: 4290,
    category: 'Outerwear',
    collection: 'OFF-DUTY',
    style: 'Tailored',
    colour: 'Espresso',
    colourHex: '#3B2820',
    sizes: ['S', 'M', 'L', 'XL'],
    image: BRAND_IMAGES.wardrobeUpgrade,
    imageFocus: 'object-[50%_24%]',
    description:
      'Relaxed single-breasted blazer with soft architectural shoulder pads and deep welt pockets. Throw it over denim or slip dresses alike.',
    fabricNote: '55% Recycled Wool Blend, 45% Tencel · Silky cupro lining',
  },
  {
    id: 'snp-13',
    name: 'Ivory Pleated Tailored Trousers',
    price: 2590,
    category: 'Bottoms',
    collection: 'LAST-MINUTE LUXE',
    style: 'Tailored',
    colour: 'Warm Cream',
    colourHex: '#F6F3E8',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: BRAND_IMAGES.heroEditorial,
    imageFocus: 'object-[50%_82%]',
    description:
      'High-waisted straight-leg trousers in warm cream suiting fabric with crisp front pleats and an invisible extended waistband tab.',
    fabricNote: '68% Tencel Lyocell, 32% Linen-Twill · Wrinkle-resistant finish',
  },
  {
    id: 'snp-14',
    name: 'Tortoise Oval Frames & Buckle Belt',
    price: 1490,
    category: 'Accessories',
    collection: 'CAMPUS COOL',
    style: 'Y2K',
    colour: 'Silver',
    colourHex: '#C4C7CE',
    sizes: ['One Size'],
    image: BRAND_IMAGES.storyFabrics,
    description:
      'Everyday emergency upgrade kit: sculpted brushed-silver buckle detail paired with clean archival hardware accents for instant styling polish.',
    fabricNote: 'Polished Zinc Hardware & Full-Grain Strap · Protective dust pouch',
    isEmergencyEdit: true,
  },
  {
    id: 'snp-15',
    name: 'Espresso Pleated Wide Trousers',
    price: 2490,
    category: 'Bottoms',
    collection: 'OFF-DUTY',
    style: 'Tailored',
    colour: 'Espresso',
    colourHex: '#3B2820',
    sizes: ['XS', 'S', 'M', 'L'],
    image: BRAND_IMAGES.wardrobeUpgrade,
    imageFocus: 'object-[50%_80%]',
    description:
      'Draped charcoal-espresso tailored trousers built to pair seamlessly with oversized poplin shirts or sleek evening tops.',
    fabricNote: '72% Viscose Suiting, 28% Recycled Poly · Machine washable gentle cycle',
  },
  {
    id: 'snp-16',
    name: 'Studio Gift-Ready Top-Handle Bag',
    price: 3290,
    category: 'Bags',
    collection: 'DATE NIGHT',
    style: 'Minimal',
    colour: 'Cherry Red',
    colourHex: '#8B1E2D',
    sizes: ['One Size'],
    image: BRAND_IMAGES.storyPackaging,
    description:
      'Structured mini top-handle handbag in deep cherry grained leather-look finish with detachable crossbody strap and turn-lock closure.',
    fabricNote: 'Pebbled Vegan Leather · Delivered in Snap Style signature keepsake box',
    isNewest: true,
  },
];

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function checkPinCodeDelivery(rawPin: string): PinDeliveryInfo {
  const pin = rawPin.replace(/\D/g, '').slice(0, 6);

  if (pin.length !== 6) {
    return {
      pin,
      zoneName: 'Invalid PIN Code',
      serviceable: false,
      tier: 'standard',
      estimateLabel: 'Enter a valid 6-digit Indian PIN code',
      detailNote: 'We verify local dark-store stock before dispatching your order.',
    };
  }

  // Metro hyperlocal express hubs
  const prefix3 = pin.slice(0, 3);
  const metroZones: Record<string, { name: string; window: string }> = {
    '400': { name: 'Mumbai Metro Hub', window: 'Estimated 25–45 mins' },
    '110': { name: 'New Delhi Central Hub', window: 'Estimated 30–50 mins' },
    '560': { name: 'Bengaluru Urban Hub', window: 'Estimated 25–45 mins' },
    '122': { name: 'Gurugram Cyber Hub', window: 'Estimated 30–50 mins' },
    '411': { name: 'Pune Koregaon Hub', window: 'Estimated 35–55 mins' },
    '500': { name: 'Hyderabad Jubilee Hub', window: 'Estimated 35–55 mins' },
    '600': { name: 'Chennai Express Hub', window: 'Estimated 35–60 mins' },
    '700': { name: 'Kolkata Park St Hub', window: 'Estimated 35–60 mins' },
  };

  if (metroZones[prefix3]) {
    const zone = metroZones[prefix3];
    return {
      pin,
      zoneName: zone.name,
      serviceable: true,
      tier: 'instant',
      estimateLabel: zone.window,
      detailNote:
        'Live dispatch window depends on local rider availability and item sizing at your nearest micro-hub.',
    };
  }

  // Tier-1 / Tier-2 same-day express cities
  const prefix2 = pin.slice(0, 2);
  const expressPrefixes = ['20', '30', '38', '39', '40', '44', '45', '46', '68', '80'];
  if (expressPrefixes.includes(prefix2)) {
    return {
      pin,
      zoneName: `Express City Zone (${pin})`,
      serviceable: true,
      tier: 'express',
      estimateLabel: 'Estimated 60–90 mins express slot',
      detailNote:
        'Dispatched via our regional rapid-fashion partner network with real-time rider tracking.',
    };
  }

  return {
    pin,
    zoneName: `PIN ${pin} · Standard Courier Zone`,
    serviceable: true,
    tier: 'standard',
    estimateLabel: 'Same-day evening / Next-day scheduled window',
    detailNote:
      'Instant minute-dispatch hubs are expanding rapidly. Your area currently qualifies for priority scheduled delivery.',
  };
}
