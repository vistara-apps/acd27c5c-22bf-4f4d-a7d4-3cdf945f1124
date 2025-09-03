'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant?: 'default' | 'compact';
  onClick?: () => void;
  badge?: string;
}

export function ActionCard({ 
  title, 
  description, 
  icon: Icon, 
  variant = 'default',
  onClick,
  badge
}: ActionCardProps) {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-lg bg-surface border border-white/10 
        cursor-pointer transition-all duration-250 hover:border-white/20
        ${isCompact ? 'p-4' : 'p-6'}
      `}
    >
      <div className="gradient-overlay absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-250" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className={`
            rounded-lg bg-primary/20 flex items-center justify-center
            ${isCompact ? 'w-10 h-10' : 'w-12 h-12'}
          `}>
            <Icon className={`text-primary ${isCompact ? 'w-5 h-5' : 'w-6 h-6'}`} />
          </div>
          
          {badge && (
            <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">
              {badge}
            </span>
          )}
        </div>
        
        <h3 className={`font-semibold mb-2 ${isCompact ? 'text-lg' : 'text-xl'}`}>
          {title}
        </h3>
        
        <p className={`text-secondary-text leading-relaxed ${isCompact ? 'text-sm' : 'text-base'}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
