'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

interface CreateRemixButtonProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function CreateRemixButton({ 
  variant = 'primary', 
  disabled = false,
  loading = false,
  onClick,
  children
}: CreateRemixButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-lg px-6 py-3 font-semibold
        transition-all duration-250 flex items-center justify-center gap-2
        ${isPrimary 
          ? 'bg-gradient-to-r from-accent to-primary text-bg shadow-lg hover:shadow-xl' 
          : 'bg-surface border border-white/20 text-text hover:bg-white/5'
        }
        ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isPrimary && !disabled && !loading ? 'animate-pulse-glow' : ''}
      `}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Sparkles className="w-5 h-5" />
      )}
      
      <span>{children || 'Create Remix'}</span>

      {isPrimary && !disabled && !loading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: 'linear',
            repeatDelay: 3
          }}
        />
      )}
    </motion.button>
  );
}
