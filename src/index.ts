import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// HTTP 개발용 기본 포트를 3000으로 설정합니다.
const DEFAULT_PORT = 3000;
const PORT = Number(process.env.PORT) || Number(process.argv[2]) || DEFAULT_PORT;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from HTTP Express Server (Optimized for ngrok)!', 
    port: PORT,
    note: 'Use ngrok for secure HTTPS access: npx ngrok http ' + PORT
  });
});

// HTTPS 대신 HTTP 서버를 생성합니다.
http.createServer(app).listen(PORT, () => {
  console.log(`HTTP Server is running locally on port ${PORT}`);
  console.log(`Local Access: http://localhost:${PORT}`);
  console.log(`\n--- ngrok 실행 방법 ---`);
  console.log(`터미널에서 다음 명령어를 입력하세요:`);
  console.log(`npx ngrok http ${PORT}`);
});
