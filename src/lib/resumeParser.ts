'use client';

import type { ResumeData } from '../store/portfolioStore';


export async function extractResumeData(file: File): Promise<Partial<ResumeData>> {
  const fileType = file.type;

  if (fileType === 'application/pdf') {
    return extractFromPDF(file);
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileType === 'application/msword'
  ) {
    return extractFromDOC(file);
  } else if (fileType === 'text/plain') {
    return extractFromText(file);
  }

  throw new Error('Unsupported file format');
}

async function extractFromPDF(file: File): Promise<Partial<ResumeData>> {
  // In production, use pdf-parse or pdfjs library
  const text = await file.text();
  return parseResumeText(text);
}

async function extractFromDOC(file: File): Promise<Partial<ResumeData>> {
  // In production, use mammoth or similar library
  const text = await file.text();
  return parseResumeText(text);
}

async function extractFromText(file: File): Promise<Partial<ResumeData>> {
  const text = await file.text();
  return parseResumeText(text);
}

function parseResumeText(text: string): Partial<ResumeData> {
  // Basic parsing logic - can be enhanced with AI
  const lines = text.split('\n').filter(line => line.trim());
  
  const data: Partial<ResumeData> = {
    fullName: extractName(lines),
    email: extractEmail(text),
    phone: extractPhone(text),
    headline: extractHeadline(lines),
    summary: extractSection(text, ['summary', 'objective', 'professional summary']),
    experience: extractExperience(text),
    skills: extractSkills(text),
    education: extractEducation(text),
  };

  return data;
}

function extractName(lines: string[]): string {
  // Typically the first non-empty line is the name
  return lines[0]?.trim() || 'Your Name';
}

function extractEmail(text: string): string {
  const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/;
  const match = text.match(emailRegex);
  return match ? match[0] : '';
}

function extractPhone(text: string): string {
  const phoneRegex = /(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/;
  const match = text.match(phoneRegex);
  return match ? match[0] : '';
}

function extractHeadline(lines: string[]): string {
  // Look for job title patterns in first few lines
  return lines[1]?.trim() || 'Professional';
}

function extractSection(text: string, keywords: string[]): string {
  const lowerText = text.toLowerCase();
  for (const keyword of keywords) {
    const index = lowerText.indexOf(keyword);
    if (index !== -1) {
      const start = index + keyword.length;
      const nextKeywordIndex = lowerText.indexOf('\n\n', start);
      return text.substring(start, nextKeywordIndex || start + 500).trim();
    }
  }
  return '';
}

function extractExperience(text: string): Array<{
  company: string;
  position: string;
  duration: string;
  description: string;
}> {
  // Basic extraction - can be enhanced
  return [
    {
      company: 'Company Name',
      position: 'Job Title',
      duration: '2022 - Present',
      description: 'Extract from resume',
    },
  ];
}

function extractSkills(text: string): string[] {
  const skillsKeywords = ['skills', 'technical skills', 'core competencies'];
  const lowerText = text.toLowerCase();
  
  for (const keyword of skillsKeywords) {
    const index = lowerText.indexOf(keyword);
    if (index !== -1) {
      const section = text.substring(index, index + 500);
      // Extract comma-separated or bullet-point skills
      const matches = section.match(/[\w\s\+\#\-\.]+/g) || [];
      return matches.slice(1, 11).map(s => s.trim()).filter(s => s.length > 0);
    }
  }

  return ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Full Stack Development'];
}

function extractEducation(text: string): Array<{
  school: string;
  degree: string;
  field: string;
  year: string;
}> {
  return [
    {
      school: 'University Name',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      year: '2020',
    },
  ];
}
