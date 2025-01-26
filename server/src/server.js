import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Enable CORS
app.use(cors());

// Serve static files from the Vite build output
const distPath = join(__dirname, '../../dist');
app.use(express.static(distPath));

// API route to serve extracted_data.json
app.get('/api/agenda', (req, res) => {
  res.sendFile(join(__dirname, '../data/extracted_data.json'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Fallback route for React Router
app.get('*', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});