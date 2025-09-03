'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WaveformVisualizerProps {
  isPlaying?: boolean;
  className?: string;
}

export function WaveformVisualizer({ isPlaying = false, className = '' }: WaveformVisualizerProps) {
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="waveform-bar w-1 bg-gradient-to-t from-primary to-accent rounded-full"
          animate={isPlaying ? {
            height: [10, 30, 15, 40, 20, 35, 10],
          } : {
            height: 10
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
