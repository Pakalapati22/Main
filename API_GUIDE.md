# API Integration & Backend Guide

## Overview
This guide helps you integrate backend services with the Portfolio Builder.

## Available API Hooks

### Resume Parsing API

Create `src/api/resumeParser.ts`:

```typescript
export async function parseResumeWithAI(file: File): Promise<ResumeData> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/parse-resume', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Parse failed');
  return response.json();
}
```

### Portfolio Storage API

```typescript
export async function savePortfolio(data: ResumeData): Promise<string> {
  const response = await fetch('/api/portfolios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Save failed');
  const { id } = await response.json();
  return id;
}

export async function getPortfolio(id: string): Promise<ResumeData> {
  const response = await fetch(`/api/portfolios/${id}`);
  if (!response.ok) throw new Error('Portfolio not found');
  return response.json();
}

export async function updatePortfolio(
  id: string,
  data: Partial<ResumeData>
): Promise<void> {
  const response = await fetch(`/api/portfolios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Update failed');
}
```

## Backend Implementation Examples

### Node.js + Express + MongoDB

Create `server/index.js`:

```javascript
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import pdfParse from 'pdf-parse';

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Schema
const portfolioSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  headline: String,
  summary: String,
  experience: [Object],
  skills: [String],
  education: [Object],
  projects: [Object],
  socialLinks: Object,
  createdAt: { type: Date, default: Date.now },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Parse Resume
app.post('/api/parse-resume', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const data = await pdfParse(fileBuffer);
    const text = data.text;

    // Parse text and extract data
    const parsed = parseResumeText(text);

    res.json(parsed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save Portfolio
app.post('/api/portfolios', async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.json({ id: portfolio._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Portfolio
app.get('/api/portfolios/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ error: 'Not found' });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Portfolio
app.put('/api/portfolios/:id', async (req, res) => {
  try {
    await Portfolio.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Portfolio
app.delete('/api/portfolios/:id', async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on :${PORT}`));

function parseResumeText(text) {
  // Your parsing logic
  return {
    fullName: extractName(text),
    email: extractEmail(text),
    // ... other fields
  };
}
```

### Python + FastAPI

Create `server/main.py`:

```python
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PyPDF2 import PdfReader
import re
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeData(BaseModel):
    fullName: str
    email: str
    phone: str
    headline: str
    summary: str
    experience: list
    skills: list
    education: list
    projects: list
    socialLinks: dict

@app.post("/api/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    """Parse resume from PDF"""
    content = await file.read()
    pdf = PdfReader(file_stream=content)
    text = "".join(page.extract_text() for page in pdf.pages)
    
    data = extract_resume_data(text)
    return data

def extract_resume_data(text: str) -> dict:
    """Extract structured data from resume text"""
    
    email_pattern = r'[\w\.-]+@[\w\.-]+\.\w+'
    phone_pattern = r'(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}'
    
    return {
        "fullName": extract_name(text),
        "email": re.search(email_pattern, text).group() if re.search(email_pattern, text) else "",
        "phone": re.search(phone_pattern, text).group() if re.search(phone_pattern, text) else "",
        "headline": "Professional",
        "summary": extract_section(text, ["summary", "objective"]),
        "experience": extract_experience(text),
        "skills": extract_skills(text),
        "education": extract_education(text),
        "projects": [],
        "socialLinks": {}
    }

def extract_name(text: str) -> str:
    lines = text.split('\n')
    return lines[0].strip() if lines else "Your Name"

def extract_section(text: str, keywords: list) -> str:
    for keyword in keywords:
        if keyword.lower() in text.lower():
            idx = text.lower().index(keyword.lower())
            return text[idx + len(keyword):idx + len(keyword) + 300].strip()
    return ""

def extract_experience(text: str) -> list:
    return [{"company": "Company", "position": "Position", "duration": "2022-Present", "description": ""}]

def extract_skills(text: str) -> list:
    return ["Python", "JavaScript", "React", "PostgreSQL"]

def extract_education(text: str) -> list:
    return [{"school": "University", "degree": "Bachelor", "field": "CS", "year": "2020"}]
```

### Google Cloud Function

Create `functions/index.js`:

```javascript
const functions = require('@google-cloud/functions-framework');
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post('/parse-resume', upload.single('file'), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    const resumeData = parseText(data.text);
    res.json(resumeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

functions.http('parseResume', app);
```

### AWS Lambda

Create `lambda/handler.js`:

```javascript
import AWS from 'aws-sdk';
import pdfParse from 'pdf-parse';

const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB();

export const parseResume = async (event) => {
  try {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    const file = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    const data = await pdfParse(file.Body);

    const resumeData = parseResumeText(data.text);

    // Save to DynamoDB
    await dynamodb.putItem({
      TableName: 'Resumes',
      Item: { id: { S: key }, data: { S: JSON.stringify(resumeData) } }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(resumeData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

## Third-Party APIs

### Resend (Email Notifications)

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPortfolioNotification(email: string, portfolioUrl: string) {
  await resend.emails.send({
    from: 'noreply@portfoliobuilder.com',
    to: email,
    subject: 'Your Portfolio is Ready!',
    html: `<p>Your portfolio is ready at <a href="${portfolioUrl}">${portfolioUrl}</a></p>`,
  });
}
```

### Auth0 (Authentication)

```typescript
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const session = await getSession(req, res);
  console.log(session.user);
});
```

### Stripe (Premium Features)

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(userId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Premium Portfolio' },
        unit_amount: 9900,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  return session;
}
```

## Environment Variables

Create `.env.local`:

```env
# Database
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/portfolios
POSTGRES_URL=postgresql://user:pass@host:5432/portfolios

# APIs
RESEND_API_KEY=re_xxx
AUTH0_SECRET=xxx
STRIPE_SECRET_KEY=sk_xxx

# Cloud
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
GOOGLE_CLOUD_KEY=xxx
```

## Testing APIs Locally

```bash
# Using curl
curl -X POST http://localhost:3000/api/parse-resume \
  -F "file=@resume.pdf"

# Using Thunder Client or Postman
# 1. Set method to POST
# 2. URL: http://localhost:3000/api/parse-resume
# 3. Body: form-data with file
```

## Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Error Handling

```typescript
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    return {
      code: 'ERROR',
      message: error.message,
    };
  }
  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  };
}
```

---

Choose the backend solution that best fits your requirements!
