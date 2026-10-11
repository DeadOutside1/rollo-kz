export type BlindTypeId = 
  | 'day-night' 
  | 'vertical' 
  | 'horizontal' 
  | 'roller' 
  | 'double-roll' 
  | 'photo-blinds';

export interface BlindTypeConfig {
  id: BlindTypeId;
  name: string;
  shortName: string;
  pricePerSquareMeter: number;
  minPricePerItem: number;
  optionsCount: number;
  image: string;
  description: string;
  fullDescription: string;
  popular?: boolean;
  tags: string[]; // e.g. ['Для дома', 'Для офиса', 'Для кухни']
}

export type FabricType = 'standard' | 'blackout' | 'jacquard' | 'textured';

export interface FabricOption {
  id: FabricType;
  name: string;
  description: string;
  multiplier: number; // price coefficient
}

export type MountType = 'sash' | 'opening' | 'wall-ceiling';

export interface MountOption {
  id: MountType;
  name: string;
  description: string;
}

export interface CalculatorState {
  blindType: BlindTypeId;
  width: number; // in cm
  height: number; // in cm
  quantity: number;
  fabricType: FabricType;
  color: string;
  mountType: MountType;
  wishes: string;
}

export interface CalculatorResult {
  areaPerItem: number; // in m2
  pricePerItem: number; // in KZT
  totalPrice: number; // in KZT
  baseRate: number;
  minPriceApplied: boolean;
}

export interface LeadFormData {
  name: string;
  phone: string;
  city: string;
  blindType?: string;
  width?: number;
  height?: number;
  quantity?: number;
  estimatedPrice?: number | null;
  comment?: string;
  preferredContact: 'whatsapp' | 'call' | 'telegram';
  source: string;
  honeypot?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  text: string;
  product: string;
  isDemo?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  room: 'living' | 'bedroom' | 'kitchen' | 'office' | 'modern';
  roomLabel: string;
  image: string;
  type: string;
}
