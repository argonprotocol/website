import { describe, expect, it } from "vitest";
import {
  calculateVaultReturns,
  MAX_VAULT_PROFIT_RATE,
} from "@/lib/vaultCalculator";

const baseInput = {
  auctionRevenue: 100_000,
  argonSecuritization: 1_000_000,
  argonotSecuritizationValue: 2_000_000,
  bitcoinLockedValue: 1_000_000,
  bondCapital: 1_000_000,
  minedArgons: 2_000_000,
  bitcoinArgons: 500_000,
};

describe("vault calculator", () => {
  it("uses the maximum profit rate only when BTC, Bonds, and ARGNOT securitization are fully utilized", () => {
    const result = calculateVaultReturns(baseInput);

    expect(result.bitcoinUtilization).toBe(1);
    expect(result.bondUtilization).toBe(1);
    expect(result.argonotUtilization).toBe(1);
    expect(result.vaultProfitRate).toBeCloseTo(MAX_VAULT_PROFIT_RATE);
  });

  it("falls back to minimum core profitability when no BTC is locked", () => {
    const emptyVault = calculateVaultReturns({
      ...baseInput,
      auctionRevenue: 10_000,
      bitcoinLockedValue: 0,
    });

    expect(emptyVault.bitcoinUtilization).toBe(0);
    expect(emptyVault.coreUtilization).toBe(0);
    expect(emptyVault.vaultProfitRate).toBeCloseTo(0.03);
    expect(emptyVault.tenDayReturn).toBeLessThanOrEqual(0.01);
    expect(emptyVault.apy).toBeLessThan(1);
  });

  it("weights BTC utilization more heavily than Bond utilization", () => {
    const withoutBonds = calculateVaultReturns({ ...baseInput, bondCapital: 0 });
    const withoutBitcoin = calculateVaultReturns({ ...baseInput, bitcoinLockedValue: 0 });

    expect(withoutBonds.coreUtilization).toBeCloseTo(0.9);
    expect(withoutBitcoin.coreUtilization).toBe(0);
    expect(withoutBonds.vaultProfitRate).toBeGreaterThan(withoutBitcoin.vaultProfitRate);
  });

  it("reduces the maximum Vault share when optional downstream revenue shares increase", () => {
    const result = calculateVaultReturns({
      ...baseInput,
      bondRevenueShare: 0.07,
      liquidRevenueShare: 0.05,
    });

    expect(result.adjustedMaxProfitRate).toBeCloseTo(0.53);
    expect(result.vaultProfitRate).toBeCloseTo(0.53);
  });

  it("returns finite zero values for an empty Vault", () => {
    const result = calculateVaultReturns({
      ...baseInput,
      auctionRevenue: Number.NaN,
      argonSecuritization: 0,
      argonotSecuritizationValue: 0,
    });

    expect(result.tenDayReturn).toBe(0);
    expect(result.apy).toBe(0);
    expect(Number.isFinite(result.apy)).toBe(true);
  });
});
