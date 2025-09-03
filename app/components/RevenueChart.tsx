'use client';

import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface RevenueData {
  date: string;
  revenue: number;
  remixes: number;
}

interface RevenueChartProps {
  variant?: 'line' | 'bar';
  data: RevenueData[];
}

export function RevenueChart({ variant = 'line', data }: RevenueChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-white/20 rounded-lg p-3 shadow-overlay">
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-accent text-sm">
            Revenue: ${payload[0].value.toFixed(2)}
          </p>
          {payload[1] && (
            <p className="text-primary text-sm">
              Remixes: {payload[1].value}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-64 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        {variant === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 30%)" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(0, 0%, 70%)" 
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(0, 0%, 70%)" 
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(40, 100%, 50%)" 
              strokeWidth={3}
              dot={{ fill: 'hsl(40, 100%, 50%)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 30%)" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(0, 0%, 70%)" 
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(0, 0%, 70%)" 
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="revenue" 
              fill="hsl(40, 100%, 50%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
}
