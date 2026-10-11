import { BLIND_TYPES, FABRIC_OPTIONS } from '../config/site';
import { BlindTypeId, FabricType, CalculatorResult } from '../types';

export const MIN_BILLABLE_AREA = 1.0; // Minimum billable area in m2 (industry standard)

/**
 * Calculates blind price based on type, dimensions, quantity and options.
 */
export function calculateBlindPrice(
  blindTypeId: BlindTypeId,
  widthCm: number,
  heightCm: number,
  quantity: number = 1,
  fabricType: FabricType = 'standard'
): CalculatorResult {
  const config = BLIND_TYPES.find((t) => t.id === blindTypeId) || BLIND_TYPES[0];
  const fabric = FABRIC_OPTIONS.find((f) => f.id === fabricType) || FABRIC_OPTIONS[0];

  // Validate inputs
  const safeWidth = Math.max(20, Math.min(500, widthCm || 100));
  const safeHeight = Math.max(20, Math.min(500, heightCm || 150));
  const safeQty = Math.max(1, Math.min(100, quantity || 1));

  // Area calculation
  const widthM = safeWidth / 100;
  const heightM = safeHeight / 100;
  const rawArea = Number((widthM * heightM).toFixed(2));
  const billableArea = Math.max(rawArea, MIN_BILLABLE_AREA);

  // Price calculation
  const baseRate = config.pricePerSquareMeter;
  const multiplier = fabric.multiplier;
  const calculatedSingle = Math.round(billableArea * baseRate * multiplier);

  // Apply minimum price per item
  const minPrice = config.minPricePerItem;
  const pricePerItem = Math.max(minPrice, calculatedSingle);
  const minPriceApplied = pricePerItem > calculatedSingle;

  const totalPrice = pricePerItem * safeQty;

  return {
    areaPerItem: rawArea,
    pricePerItem,
    totalPrice,
    baseRate,
    minPriceApplied,
  };
}

/**
 * Format number into Kazakhstani Tenge string (e.g. 14 500 ₸)
 */
export function formatKZT(amount: number): string {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
  }).format(amount).replace('KZT', '₸');
}
