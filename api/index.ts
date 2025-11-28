import app, { setupApp } from '../server/index';

export default async function handler(req, res) {
    // Ensure app is initialized
    await setupApp();

    // Forward request to Express app
    app(req, res);
}
