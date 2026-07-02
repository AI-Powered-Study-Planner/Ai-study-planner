import { createRequire } from 'module';
import fs from 'fs';

// Create a custom require function to load non-ESM packages safely
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const extractTextFromPDF = async (filePath) => {
  try {
    // Check if the file actually exists before reading it
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }

    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    
    return data.text; // Returns the clean extracted plain text string
  } catch (error) {
    throw new Error('Failed to read PDF: ' + error.message);
  }
};