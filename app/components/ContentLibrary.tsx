'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, User, Search } from 'lucide-react';
import { Content } from '../types';
import { mockContent } from '../data/mockData';

interface ContentLibraryProps {
  onContentSelect?: (content: Content) => void;
}

export function ContentLibrary({ onContentSelect }: ContentLibraryProps) {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = mockContent.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.originalRightsHolder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContentSelect = (content: Content) => {
    setSelectedContent(content);
    onContentSelect?.(content);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-text" />
        <input
          type="text"
          placeholder="Search licensed content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface border border-white/10 rounded-lg focus:border-primary focus:outline-none"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredContent.map((content) => (
          <motion.div
            key={content.contentId}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleContentSelect(content)}
            className={`
              relative overflow-hidden rounded-lg cursor-pointer transition-all duration-250
              ${selectedContent?.contentId === content.contentId
                ? 'ring-2 ring-primary bg-primary/5'
                : 'bg-surface border border-white/10 hover:border-white/20'
              }
            `}
          >
            <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-accent/20">
              {content.thumbnail ? (
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="w-12 h-12 text-white/50" />
                </div>
              )}
              
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>

              {/* Type indicator */}
              <div className="absolute top-2 right-2">
                <span className={`
                  px-2 py-1 text-xs rounded-full font-medium
                  ${content.contentType === 'audio' 
                    ? 'bg-purple-500/80 text-white' 
                    : 'bg-blue-500/80 text-white'
                  }
                `}>
                  {content.contentType}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1">{content.title}</h3>
              
              <div className="flex items-center gap-4 text-sm text-secondary-text">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{content.originalRightsHolder}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(content.duration / 60)}:{(content.duration % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            {selectedContent?.contentId === content.contentId && (
              <motion.div
                layoutId="selectedBorder"
                className="absolute inset-0 ring-2 ring-primary rounded-lg pointer-events-none"
              />
            )}
          </motion.div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary-text">No content found matching your search.</p>
        </div>
      )}
    </div>
  );
}
