import { IncomingMessage, ServerResponse } from 'http';
import app, { setupApp } from '../server/index.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    // Ensure app is initialized
    await setupApp();

    // Forward request to Express app
    app(req, res);
}
