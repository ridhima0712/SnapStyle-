export type PageId = 'home' | 'story' | 'shop' | 'contact';

export type Category =
  | 'Tops'
  | 'Shirts'
  | 'Dresses'
  | 'Bottoms'
  | 'Denim'
  | 'Outerwear'
  | 'Bags'
  | 'Shoes'
  | 'Jewellery'
  | 'Accessories';

export type CollectionId =
  | 'THE PARTY EDIT'
  | 'CAMPUS COOL'
  | 'DATE NIGHT'
  | 'OFF-DUTY'
  | 'LAST-MINUTE LUXE';

export type StyleTag = 'Streetwear' | 'Evening' | 'Minimal' | 'Y2K' | 'Tailored';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  collection: CollectionId;
  style: StyleTag;
  colour: string;
  colourHex: string;
  sizes: string[];
  image: string;
  imageFocus?: string;
  description: string;
  fabricNote: string;
  isTrending?: boolean;
  isNewest?: boolean;
  isEmergencyEdit?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface PinDeliveryInfo {
  pin: string;
  zoneName: string;
  serviceable: boolean;
  tier: 'instant' | 'express' | 'standard';
  estimateLabel: string;
  detailNote: string;
}

export interface OrderRecord {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  pin: string;
  paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimateLabel: string;
  placedAt: string;
}
