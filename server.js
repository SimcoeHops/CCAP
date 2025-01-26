import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Enable CORS
app.use(cors());

// Serve the React app (assuming you've run `npm run build` in your React project)
const reactBuildPath = join(__dirname, 'dist'); // Adjust 'dist' if your build folder has a different name
app.use(express.static(reactBuildPath));

// API route to serve `extracted_data.json`
app.get('/extracted_data.json', (req, res) => {
  res.sendFile(join(__dirname, 'extracted_data.json'));
});

// Fallback route for React (to handle React Router paths)
app.get('*', (req, res) => {
  res.sendFile(join(reactBuildPath, 'index.html'));
});

// Start the server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
