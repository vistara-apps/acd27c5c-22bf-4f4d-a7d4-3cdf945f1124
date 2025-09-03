import { Content, Remix, RevenueData } from '../types';

export const mockContent: Content[] = [
  {
    contentId: '1',
    title: 'Solana Wallet',
    url: '/audio/solana-wallet.mp3',
    contentType: 'audio',
    originalRightsHolder: 'Akira ♫',
    duration: 180,
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    contentId: '2',
    title: 'Digital Dreams',
    url: '/video/digital-dreams.mp4',
    contentType: 'video',
    originalRightsHolder: 'CryptoVisuals',
    duration: 120,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop'
  },
  {
    contentId: '3',
    title: 'Blockchain Beat',
    url: '/audio/blockchain-beat.mp3',
    contentType: 'audio',
    originalRightsHolder: 'DefiMusic',
    duration: 200,
    thumbnail: 'https://images.unsplash.com/photo-1571974599782-87624638275d?w=300&h=300&fit=crop'
  },
  {
    contentId: '4',
    title: 'NFT Journey',
    url: '/video/nft-journey.mp4',
    contentType: 'video',
    originalRightsHolder: 'Web3Creator',
    duration: 90,
    thumbnail: 'https://images.unsplash.com/photo-1635512207096-7b5ac6b2cf4a?w=300&h=300&fit=crop'
  }
];

export const mockRemixes: Remix[] = [
  {
    remixId: '1',
    userId: 'user1',
    contentId: '1',
    outputUrl: '/remixes/solana-wallet-remix.mp3',
    createdAt: '2024-01-15T10:30:00Z',
    royaltySplitConfig: [
      { recipientAddress: '0x1234...', recipientName: 'Akira ♫', percentage: 70 },
      { recipientAddress: '0x5678...', recipientName: 'You', percentage: 30 }
    ],
    revenueGenerated: 25.50,
    title: 'Solana Wallet Remix',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    remixId: '2',
    userId: 'user1',
    contentId: '3',
    outputUrl: '/remixes/blockchain-beat-remix.mp3',
    createdAt: '2024-01-10T14:20:00Z',
    royaltySplitConfig: [
      { recipientAddress: '0xabcd...', recipientName: 'DefiMusic', percentage: 60 },
      { recipientAddress: '0x5678...', recipientName: 'You', percentage: 40 }
    ],
    revenueGenerated: 42.75,
    title: 'Blockchain Beat Remix',
    thumbnail: 'https://images.unsplash.com/photo-1571974599782-87624638275d?w=300&h=300&fit=crop'
  }
];

export const mockRevenueData: RevenueData[] = [
  { date: 'Jan 1', revenue: 12.50, remixes: 2 },
  { date: 'Jan 8', revenue: 25.30, remixes: 4 },
  { date: 'Jan 15', revenue: 42.75, remixes: 6 },
  { date: 'Jan 22', revenue: 38.20, remixes: 5 },
  { date: 'Jan 29', revenue: 55.80, remixes: 8 },
  { date: 'Feb 5', revenue: 68.25, remixes: 10 },
];
