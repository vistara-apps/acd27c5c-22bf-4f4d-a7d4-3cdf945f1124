'use client';

import React, { useState } from 'react';
import { AppShell } from './components/AppShell';
import { ActionCard } from './components/ActionCard';
import { ContentLibrary } from './components/ContentLibrary';
import { MediaUploader } from './components/MediaUploader';
import { CreateRemixButton } from './components/CreateRemixButton';
import { SplitterConfigurator } from './components/SplitterConfigurator';
import { RevenueChart } from './components/RevenueChart';
import { WaveformVisualizer } from './components/WaveformVisualizer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Video, 
  Sparkles, 
  DollarSign, 
  TrendingUp,
  Play,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { Content, RoyaltySplit } from './types';
import { mockRemixes, mockRevenueData } from './data/mockData';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [royaltySplits, setRoyaltySplits] = useState<RoyaltySplit[]>([]);
  const [isRemixing, setIsRemixing] = useState(false);

  const handleCreateRemix = async () => {
    if (!selectedContent) return;
    
    setIsRemixing(true);
    
    // Simulate remix creation
    setTimeout(() => {
      setIsRemixing(false);
      // Reset state
      setSelectedContent(null);
      setRoyaltySplits([]);
      setActiveTab('profile');
    }, 3000);
  };

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 py-12"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <WaveformVisualizer isPlaying={true} className="h-16" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">
          New Content Creators
          <br />
          <span className="text-primary">for Content Creators</span>
        </h1>
        
        <p className="text-xl text-secondary-text max-w-2xl mx-auto">
          Easily remix audio & video, automatically share royalties with original creators.
        </p>
      </motion.div>

      {/* Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Core Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[
              'Black is AI-powered tools',
              'Automatic audio separation, for audio seection',  
              'Video editing suft suggestions',
              'Real-time royalty calculations'
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-secondary-text">{feature}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <ActionCard
              title="AI-powered videos"
              description="Automatic audio separation video per acety"
              icon={Music}
              badge="Remix"
              onClick={() => setActiveTab('remix')}
            />
            
            <ActionCard
              title="Roalty Tracker"
              description="Real-time royalt calculation frme royaltisications"
              icon={DollarSign}
              badge="Integration"
              onClick={() => setActiveTab('royalty')}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderRemix = () => (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center gap-4 mb-6">
        {selectedContent && (
          <button
            onClick={() => setSelectedContent(null)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-accent" />
          {selectedContent ? 'Configure Remix' : 'Create Remix'}
        </h1>
      </div>

      <AnimatePresence mode="wait">
        {!selectedContent ? (
          <motion.div
            key="content-selection"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold">Choose Content to Remix</h2>
            <ContentLibrary onContentSelect={setSelectedContent} />
          </motion.div>
        ) : (
          <motion.div
            key="remix-config"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Selected Content Preview */}
            <div className="bg-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Selected Content</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                  {selectedContent.contentType === 'audio' ? (
                    <Music className="w-8 h-8 text-primary" />
                  ) : (
                    <Video className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold">{selectedContent.title}</h4>
                  <p className="text-secondary-text text-sm">
                    by {selectedContent.originalRightsHolder}
                  </p>
                  <p className="text-secondary-text text-sm">
                    {Math.floor(selectedContent.duration / 60)}:
                    {(selectedContent.duration % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>

            {/* Remix Tools */}
            <div className="bg-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">AI Remix Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                  <Music className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-medium">Audio Clip</p>
                </button>
                
                <button className="p-4 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 transition-colors">
                  <Sparkles className="w-6 h-6 text-accent mb-2" />
                  <p className="text-sm font-medium">AI Transform</p>
                </button>
              </div>
            </div>

            {/* Royalty Configuration */}
            <SplitterConfigurator 
              onSplitsChange={setRoyaltySplits}
              initialSplits={[
                { recipientAddress: '', recipientName: selectedContent.originalRightsHolder, percentage: 70 },
                { recipientAddress: '', recipientName: 'You', percentage: 30 }
              ]}
            />

            {/* Create Button */}
            <div className="flex justify-center pt-4">
              <CreateRemixButton
                loading={isRemixing}
                onClick={handleCreateRemix}
                disabled={royaltySplits.reduce((sum, split) => sum + split.percentage, 0) !== 100}
              >
                {isRemixing ? 'Creating Remix...' : 'Create Remix'}
              </CreateRemixButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderRoyalty = () => (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <DollarSign className="w-8 h-8 text-accent" />
        Royalty Tracker
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl font-bold text-accent">$68.25</p>
          <p className="text-sm text-secondary-text">+15% from last week</p>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Remixes</h3>
            <Play className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-primary">12</p>
          <p className="text-sm text-secondary-text">2 created this week</p>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Avg. Split Rate</h3>
            <DollarSign className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl font-bold">35%</p>
          <p className="text-sm text-secondary-text">Your average share</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-surface rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-6">Revenue Over Time</h3>
        <RevenueChart data={mockRevenueData} />
      </div>

      {/* Recent Remixes */}
      <div className="bg-surface rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-6">Your Remixes</h3>
        
        <div className="space-y-4">
          {mockRemixes.map((remix) => (
            <div key={remix.remixId} className="flex items-center justify-between p-4 bg-bg rounded-lg border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Music className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{remix.title}</h4>
                  <p className="text-sm text-secondary-text">
                    Created {new Date(remix.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-accent">${remix.revenueGenerated}</p>
                <p className="text-sm text-secondary-text">
                  Your share: ${(remix.revenueGenerated * remix.royaltySplitConfig.find(split => split.recipientName === 'You')?.percentage! / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <User className="w-8 h-8 text-primary" />
        Profile
      </h1>

      <div className="bg-surface rounded-lg p-6 border border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
            <User className="w-8 h-8 text-bg" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Creator</h3>
            <p className="text-secondary-text">@creator.eth</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-secondary-text text-sm">Total Remixes</p>
            <p className="text-2xl font-bold">{mockRemixes.length}</p>
          </div>
          <div>
            <p className="text-secondary-text text-sm">Earnings</p>
            <p className="text-2xl font-bold text-accent">$68.25</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && renderHome()}
      {activeTab === 'remix' && renderRemix()}
      {activeTab === 'royalty' && renderRoyalty()}
      {activeTab === 'profile' && renderProfile()}
    </AppShell>
  );
}
