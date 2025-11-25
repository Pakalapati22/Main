'use client';

import React, { useState } from 'react';
import { FiUpload, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ResumeUpload from '../components/ResumeUpload';
import PortfolioPreview from '../components/PortfolioPreview';
import type { ResumeData } from '../store/portfolioStore';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<ResumeData | null>(null);
  const [step, setStep] = useState<'upload' | 'build' | 'preview'>('upload');

  const handleResumeProcessed = (data: ResumeData) => {
    setPortfolioData(data);
    setStep('build');
  };

  const handlePortfolioComplete = (data: ResumeData) => {
    setPortfolioData(data);
    setStep('preview');
  };

  return (
    <main className="min-h-screen bg-netflix-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-netflix-black/80 backdrop-blur-md border-b border-netflix-lighter">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">PB</span>
            </div>
            <h1 className="text-2xl font-bold text-gradient">Portfolio Builder</h1>
          </motion.div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className={step === 'upload' ? 'text-netflix-red font-bold' : ''}>Upload</span>
            <span>→</span>
            <span className={step === 'build' ? 'text-netflix-red font-bold' : ''}>Build</span>
            <span>→</span>
            <span className={step === 'preview' ? 'text-netflix-red font-bold' : ''}>Preview</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-netflix-red/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          {step === 'upload' && (
            <ResumeUpload onResumeProcessed={handleResumeProcessed} />
          )}
          {step === 'build' && portfolioData && (
            <div className="max-w-6xl mx-auto px-4 py-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('upload')}
                className="mb-8 px-4 py-2 bg-netflix-lighter hover:bg-netflix-lighter/80 rounded text-sm transition"
              >
                ← Back to Upload
              </motion.button>
              <PortfolioPreview 
                initialData={portfolioData} 
                onComplete={handlePortfolioComplete}
              />
            </div>
          )}
          {step === 'preview' && portfolioData && (
            <div className="max-w-7xl mx-auto px-4 py-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('upload')}
                className="mb-8 px-4 py-2 bg-netflix-red hover:bg-netflix-red/90 rounded text-sm transition"
              >
                ← Create Another Portfolio
              </motion.button>
              <PortfolioPreview 
                initialData={portfolioData}
                isPreviewMode={true}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
