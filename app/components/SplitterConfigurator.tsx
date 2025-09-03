'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, DollarSign, User } from 'lucide-react';
import { RoyaltySplit } from '../types';

interface SplitterConfiguratorProps {
  variant?: 'modal' | 'inline';
  initialSplits?: RoyaltySplit[];
  onSplitsChange?: (splits: RoyaltySplit[]) => void;
}

export function SplitterConfigurator({ 
  variant = 'inline',
  initialSplits = [],
  onSplitsChange 
}: SplitterConfiguratorProps) {
  const [splits, setSplits] = useState<RoyaltySplit[]>(
    initialSplits.length > 0 ? initialSplits : [
      { recipientAddress: '', recipientName: 'Original Creator', percentage: 70 },
      { recipientAddress: '', recipientName: 'You', percentage: 30 }
    ]
  );

  const totalPercentage = splits.reduce((sum, split) => sum + split.percentage, 0);

  const updateSplit = (index: number, field: keyof RoyaltySplit, value: string | number) => {
    const newSplits = [...splits];
    newSplits[index] = { ...newSplits[index], [field]: value };
    setSplits(newSplits);
    onSplitsChange?.(newSplits);
  };

  const addSplit = () => {
    const newSplit: RoyaltySplit = {
      recipientAddress: '',
      recipientName: 'Collaborator',
      percentage: 0
    };
    const newSplits = [...splits, newSplit];
    setSplits(newSplits);
    onSplitsChange?.(newSplits);
  };

  const removeSplit = (index: number) => {
    if (splits.length > 1) {
      const newSplits = splits.filter((_, i) => i !== index);
      setSplits(newSplits);
      onSplitsChange?.(newSplits);
    }
  };

  return (
    <div className={`
      ${variant === 'modal' ? 'bg-surface rounded-lg p-6 border border-white/10' : ''}
    `}>
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold">Royalty Distribution</h3>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {splits.map((split, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center gap-4 p-4 bg-bg rounded-lg border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>

              <div className="flex-1 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Recipient name"
                  value={split.recipientName}
                  onChange={(e) => updateSplit(index, 'recipientName', e.target.value)}
                  className="bg-surface border border-white/10 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
                
                <input
                  type="text"
                  placeholder="Wallet address (0x...)"
                  value={split.recipientAddress}
                  onChange={(e) => updateSplit(index, 'recipientAddress', e.target.value)}
                  className="bg-surface border border-white/10 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={split.percentage}
                  onChange={(e) => updateSplit(index, 'percentage', parseInt(e.target.value) || 0)}
                  className="w-16 bg-surface border border-white/10 rounded-md px-2 py-2 text-sm text-center focus:border-primary focus:outline-none"
                />
                <span className="text-secondary-text text-sm">%</span>
              </div>

              {splits.length > 1 && (
                <button
                  onClick={() => removeSplit(index)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={addSplit}
          className="w-full p-3 border-2 border-dashed border-white/20 rounded-lg text-secondary-text hover:border-white/30 hover:text-text transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Collaborator
        </button>
      </div>

      {/* Total Percentage Indicator */}
      <div className={`
        mt-6 p-3 rounded-lg flex items-center justify-between
        ${totalPercentage === 100 
          ? 'bg-green-500/10 border border-green-500/20' 
          : 'bg-yellow-500/10 border border-yellow-500/20'
        }
      `}>
        <span className="text-sm font-medium">Total Distribution</span>
        <span className={`text-sm font-bold ${
          totalPercentage === 100 ? 'text-green-400' : 'text-yellow-400'
        }`}>
          {totalPercentage}%
        </span>
      </div>

      {totalPercentage !== 100 && (
        <p className="text-xs text-yellow-400 mt-2">
          Distribution must equal 100% to proceed
        </p>
      )}
    </div>
  );
}
