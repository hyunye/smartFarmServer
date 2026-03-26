import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const DEFAULT_PORT = 443;
const PORT = Number(process.env.PORT) || Number(process.argv[2]) || DEFAULT_PORT;

const certsDir = path.join(__dirname, '..', 'certs');
const keyPath = path.join(certsDir, 'key.pem');
const certPath = path.join(certsDir, 'cert.pem');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error('Error: SSL certificate (cert.pem) or key (key.pem) not found in ./certs folder.');
  process.exit(1);
}

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

app.get('/', (req, res) => {
  res.json({ message: 'Hello from HTTPS Express ESM Server!', port: PORT });
});

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
  console.log(`Access at: https://localhost:${PORT}`);
});
