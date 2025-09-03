'use client';

import React from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Home, Music, DollarSign, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function AppShell({ children, activeTab = 'home', onTabChange }: AppShellProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'remix', icon: Music, label: 'Remix' },
    { id: 'royalty', icon: DollarSign, label: 'Royalty' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-accent to-primary flex items-center justify-center">
              <Music className="w-5 h-5 text-bg" />
            </div>
            <h1 className="text-xl font-bold">RemixFiesta</h1>
          </div>
          
          <ConnectWallet />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-around py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-accent' : 'text-secondary-text hover:text-text'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
