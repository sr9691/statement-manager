import { FeeSchedule, FeeCalculationResult } from './types';

export class FeeCalculator {
    calculate(aum: number, schedule: FeeSchedule): FeeCalculationResult {
        if (schedule.type === 'FLAT') {
            const rate = (schedule.flatRateBps || 0) / 10000;
            const fee = aum * rate;
            return {
                totalFee: fee,
                breakdown: [{
                    description: `Flat Fee (${schedule.flatRateBps} bps on $${aum.toFixed(2)})`,
                    amount: fee
                }]
            };
        } else if (schedule.type === 'TIERED') {
            let remainingAum = aum;
            let totalFee = 0;
            const breakdown = [];

            // Sort tiers by minAum
            const sortedTiers = [...schedule.tiers].sort((a, b) => a.minAum - b.minAum);

            for (const tier of sortedTiers) {
                if (remainingAum <= 0) break;

                const tierMax = tier.maxAum === null ? Infinity : tier.maxAum;
                const tierSize = tierMax - tier.minAum;

                // Calculate amount in this tier
                // This logic assumes standard progressive tiers starting from 0
                // A more robust implementation would handle gaps/overlaps

                // Simplified logic:
                // We need to calculate how much of the AUM falls into this tier
                // But usually tiered fees are: First 1M @ X, Next 2M @ Y

                // Let's assume the tiers are defined as ranges:
                // 0 - 1,000,000
                // 1,000,000 - 5,000,000

                const amountInTier = Math.min(Math.max(0, aum - tier.minAum), tierSize);
                // Wait, the above logic is for "amount in tier" if we iterate.
                // Correct logic:
                // Overlap of [0, aum] and [tier.min, tier.max]

                const overlapStart = Math.max(0, tier.minAum);
                const overlapEnd = Math.min(aum, tierMax);
                const taxableAmount = Math.max(0, overlapEnd - overlapStart);

                if (taxableAmount > 0) {
                    const fee = taxableAmount * (tier.rateBps / 10000);
                    totalFee += fee;
                    breakdown.push({
                        description: `Tier ${tier.minAum}-${tier.maxAum || '+'} (${tier.rateBps} bps on $${taxableAmount.toFixed(2)})`,
                        amount: fee
                    });
                }
            }

            return { totalFee, breakdown };
        }

        return { totalFee: 0, breakdown: [] };
    }
}
