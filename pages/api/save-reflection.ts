
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface ScrollEntry {
  id: string;
  input: string;
  reflection: string;
  timestamp: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { input } = req.body;

    if (!input || typeof input !== 'string') {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Create the entry
    const entry: ScrollEntry = {
      id: Date.now().toString(),
      input: input.trim(),
      reflection: input.trim(), // Mirror the input as reflection
      timestamp: new Date().toISOString(),
    };

    // Read existing scrolls
    const scrollsPath = path.join(process.cwd(), 'data', 'scrolls.json');
    let scrolls: ScrollEntry[] = [];

    try {
      const fileContents = fs.readFileSync(scrollsPath, 'utf8');
      scrolls = JSON.parse(fileContents);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      scrolls = [];
    }

    // Add new entry
    scrolls.push(entry);

    // Save back to file
    fs.writeFileSync(scrollsPath, JSON.stringify(scrolls, null, 2));

    res.status(200).json({ 
      message: 'Reflection saved successfully',
      entry 
    });

  } catch (error) {
    console.error('Error saving reflection:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
