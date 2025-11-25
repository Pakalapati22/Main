'use client';

import React, { useRef, useState } from 'react';
import { FiUpload, FiFile } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { ResumeData } from '../store/portfolioStore';

interface ResumeUploadProps {
  onResumeProcessed: (data: ResumeData) => void;
}

export default function ResumeUpload({ onResumeProcessed }: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);
    setFileName(file.name);
    setIsLoading(true);

    try {
      // Simulate resume parsing
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockData: ResumeData = {
        fullName: 'John Developer',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        headline: 'Full Stack Developer | React & Node.js Expert',
        summary: 'Passionate developer with 5+ years of experience building scalable web applications. Specialized in modern JavaScript frameworks and cloud technologies.',
        experience: [
          {
            company: 'Tech Innovations Inc',
            position: 'Senior Full Stack Developer',
            duration: '2022 - Present',
            description: 'Led development of microservices architecture serving 1M+ users. Improved performance by 40% through optimization.'
          },
          {
            company: 'Digital Solutions Ltd',
            position: 'Full Stack Developer',
            duration: '2020 - 2022',
            description: 'Developed and maintained multiple React and Node.js applications. Mentored junior developers.'
          }
        ],
        skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'MongoDB'],
        education: [
          {
            school: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            year: '2019'
          }
        ],
        projects: [
          {
            title: 'E-commerce Platform',
            description: 'Full-stack e-commerce solution with payment integration',
            link: 'https://github.com',
            image: 'https://via.placeholder.com/300x200?text=E-commerce'
          },
          {
            title: 'Task Management App',
            description: 'Real-time collaborative task management tool',
            link: 'https://github.com',
            image: 'https://via.placeholder.com/300x200?text=Tasks'
          }
        ],
        socialLinks: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          portfolio: 'https://portfolio.com'
        }
      };

      onResumeProcessed(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process resume');
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl font-bold mb-4"
          >
            Build Your <span className="text-gradient">Dream Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-400 mb-8"
          >
            Upload your resume and transform it into a stunning Netflix-style portfolio website
          </motion.p>
        </div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="glass-effect rounded-lg border-2 border-dashed border-netflix-red/50 hover:border-netflix-red cursor-pointer transition p-12 text-center hover:bg-opacity-5"
        >
          <motion.div
            animate={{ y: isLoading ? 0 : [0, -10, 0] }}
            transition={{ repeat: isLoading ? 0 : Infinity, duration: 2 }}
            className="mb-6"
          >
            <FiUpload className="mx-auto text-netflix-red text-5xl mb-4" />
          </motion.div>

          {!fileName ? (
            <>
              <h3 className="text-2xl font-semibold mb-2">Drop your resume here</h3>
              <p className="text-gray-400 mb-2">or click to browse</p>
              <p className="text-sm text-gray-500">Supported formats: PDF, DOCX, DOC, TXT</p>
            </>
          ) : (
            <>
              <FiFile className="mx-auto text-netflix-red text-5xl mb-4" />
              <p className="text-lg font-semibold mb-2">{fileName}</p>
              {isLoading && <p className="text-netflix-red animate-pulse">Processing your resume...</p>}
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            { icon: '✨', title: 'AI-Powered', desc: 'Intelligent resume parsing' },
            { icon: '🎨', title: 'Beautiful Design', desc: 'Netflix-style UI' },
            { icon: '🚀', title: 'Fast Deploy', desc: 'One-click publishing' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-lg p-6 text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
