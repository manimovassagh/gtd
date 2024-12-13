import express from 'express';
import { testDBConnection } from './db/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function startServer() {
  // Test the database connection before starting the server
  await testDBConnection();

  app.get('/', (_req, res) => {
    res.send({
      name: 'GTD Task Manager Backend',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});