import express from 'express';
import { getDBConnection } from './db/db';


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

getDBConnection().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} and connected to DB`);
  });
}).catch(err => {
  console.error("Failed to connect to the database:", err);
  process.exit(1);
});


app.get('/', (_req, res) => {
  res.send('Hello from GTD Task Manager Backend! it is running');
});

