export interface User {
  userId: string;
  farcasterId: string;
  walletAddress: string;
  createdAt: string;
}

export interface Content {
  contentId: string;
  title: string;
  url: string;
  contentType: 'audio' | 'video';
  originalRightsHolder: string;
  duration: number;
  thumbnail?: string;
}

export interface Remix {
  remixId: string;
  userId: string;
  contentId: string;
  outputUrl: string;
  createdAt: string;
  royaltySplitConfig: RoyaltySplit[];
  revenueGenerated: number;
  title: string;
  thumbnail?: string;
}

export interface RoyaltySplit {
  recipientAddress: string;
  percentage: number;
  recipientName: string;
}

export interface RoyaltyDistribution {
  distributionId: string;
  remixId: string;
  recipientAddress: string;
  amount: number;
  timestamp: string;
}
