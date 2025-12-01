import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Debug: List files to verify structure
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Current directory:', __dirname);
try {
    const rootDir = path.resolve(__dirname, '..');
    console.log('Root directory listing:', fs.readdirSync(rootDir));
    if (fs.existsSync(path.join(rootDir, 'dist'))) {
        console.log('Dist directory listing:', fs.readdirSync(path.join(rootDir, 'dist')));
    } else {
        console.log('Dist directory not found!');
    }
} catch (e) {
    console.error('Error listing files:', e);
}

// Import from the pre-built bundle
import app, { setupApp } from '../dist/index.js';

export default async function handler(req, res) {
    try {
        // Ensure app is initialized
        await setupApp();

        // Forward request to Express app
        app(req, res);
    } catch (error) {
        console.error('Handler error:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
}
