import { Decimal } from '@prisma/client/runtime/library';

export interface FeeTier {
    minAum: number;
    maxAum: number | null; // null means infinity
    rateBps: number;
}

export interface FeeSchedule {
    id: string;
    type: 'TIERED' | 'FLAT' | 'HYBRID';
    tiers: FeeTier[];
    flatRateBps?: number;
}

export interface FeeCalculationResult {
    totalFee: number;
    breakdown: {
        description: string;
        amount: number;
    }[];
}
