import { IncomingMessage, ServerResponse } from 'http';
// @ts-ignore - Importing from build output
import app, { setupApp } from '../dist/index.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    // Ensure app is initialized
    await setupApp();

    // Forward request to Express app
    app(req, res);
}
