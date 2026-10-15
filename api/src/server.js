import express from 'express';
import contactRouter from './routes/contact.js';
import { ensureSchema } from './schema.js';

const port = Number(process.env.PORT || 8000);

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

// Service index — the API's root resource.
app.get('/', (req, res) => {
  res.json({ service: 'atelier-api', status: 'ok', endpoints: ['POST /api/contact'] });
});

app.use('/api/contact', contactRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((error, req, res, next) => {
  console.error('[api] unhandled error', error);
  res.status(500).json({ error: 'Unexpected server error' });
});

await ensureSchema();

app.listen(port, '0.0.0.0', () => {
  console.log(`[api] atelier-api listening on http://0.0.0.0:${port}`);
});
