import { describe, it, expect } from 'vitest';
import { calculateBlindPrice, formatKZT } from '../src/lib/calculator';

describe('Calculator Pricing Logic', () => {
  it('calculates price correctly for standard Day-Night blinds', () => {
    // Day-Night rate: 7000 KZT/m2
    // Width: 100cm (1.0m), Height: 150cm (1.5m) => Area: 1.5m2
    // Price = 1.5 * 7000 * 1.0 (standard) = 10500 KZT
    const res = calculateBlindPrice('day-night', 100, 150, 1, 'standard');
    expect(res.areaPerItem).toBe(1.5);
    expect(res.pricePerItem).toBe(10500);
    expect(res.totalPrice).toBe(10500);
    expect(res.minPriceApplied).toBe(false);
  });

  it('enforces minimum billable area (1.0 m2) for small windows with 4500 KZT base rate', () => {
    // Width: 50cm (0.5m), Height: 80cm (0.8m) => raw area: 0.4m2
    // But minimum billable area is 1.0 m2!
    // Vertical blinds rate: 4500 KZT/m2
    // Price = 1.0 * 4500 = 4500 KZT
    const res = calculateBlindPrice('vertical', 50, 80, 1, 'standard');
    expect(res.areaPerItem).toBe(0.4);
    expect(res.pricePerItem).toBe(4500);
    expect(res.totalPrice).toBe(4500);
  });

  it('applies fabric multipliers (Blackout 100% = +30%)', () => {
    // Day-Night rate: 7000 KZT/m2
    // Area: 2.0m2 (200 x 100)
    // Base = 2.0 * 7000 = 14000 KZT
    // Blackout multiplier = 1.3 => 14000 * 1.3 = 18200 KZT
    const res = calculateBlindPrice('day-night', 200, 100, 1, 'blackout');
    expect(res.pricePerItem).toBe(18200);
  });

  it('multiplies price by quantity accurately', () => {
    const res = calculateBlindPrice('roller', 100, 100, 3, 'standard');
    // Roller rate = 6500 KZT/m2, Area = 1.0m2, Single = 6500 KZT
    // Qty = 3 => Total = 19500 KZT
    expect(res.pricePerItem).toBe(6500);
    expect(res.totalPrice).toBe(19500);
  });

  it('formats KZT correctly with ₸ symbol', () => {
    const formatted = formatKZT(12500);
    expect(formatted).toContain('12');
    expect(formatted).toContain('500');
    expect(formatted).toContain('₸');
  });
});
