'use client';

import React, { useRef, useState } from 'react';
import { Upload, Music, Video, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaFile {
  file: File;
  url: string;
  type: 'audio' | 'video';
}

interface MediaUploaderProps {
  variant?: 'video' | 'audio';
  onFileSelect?: (file: MediaFile) => void;
  maxSize?: number; // in MB
}

export function MediaUploader({ 
  variant = 'video', 
  onFileSelect,
  maxSize = 50 
}: MediaUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = variant === 'audio' 
    ? 'audio/mp3,audio/wav,audio/m4a,audio/aac'
    : 'video/mp4,video/mov,video/avi,video/webm';

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    const url = URL.createObjectURL(file);
    const mediaFile: MediaFile = {
      file,
      url,
      type: file.type.startsWith('audio/') ? 'audio' : 'video'
    };

    setSelectedFile(mediaFile);
    onFileSelect?.(mediaFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile.url);
      setSelectedFile(null);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {selectedFile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-lg bg-surface border border-white/10 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  {selectedFile.type === 'audio' ? (
                    <Music className="w-5 h-5 text-primary" />
                  ) : (
                    <Video className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{selectedFile.file.name}</p>
                  <p className="text-xs text-secondary-text">
                    {(selectedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <button
                onClick={removeFile}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedFile.type === 'audio' ? (
              <audio controls className="w-full" src={selectedFile.url} />
            ) : (
              <video controls className="w-full rounded-lg" src={selectedFile.url} />
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-all duration-250
              ${isDragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-white/20 hover:border-white/30 hover:bg-white/5'
              }
            `}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center">
                <Upload className="w-8 h-8 text-secondary-text" />
              </div>
              
              <div>
                <p className="text-lg font-medium mb-1">
                  Drop your {variant} file here
                </p>
                <p className="text-secondary-text text-sm">
                  or click to browse • Max {maxSize}MB
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes}
              onChange={handleFileInputChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
