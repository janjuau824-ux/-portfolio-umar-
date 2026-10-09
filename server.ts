import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  details: string;
  createdAt: string;
  ip?: string;
}

const inquiries: Inquiry[] = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      app: 'Rizwan Ahmad Portfolio',
      timestamp: new Date().toISOString(),
    });
  });

  // Contact form submission endpoint with validation
  app.post('/api/contact', (req: Request, res: Response) => {
    try {
      const { name, email, projectType, budgetRange, details } = req.body;

      // Validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid name (at least 2 characters).',
        });
      }

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.',
        });
      }

      if (!details || typeof details !== 'string' || details.trim().length < 15) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a project description of at least 15 characters.',
        });
      }

      const inquiryId = `INQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      const newInquiry: Inquiry = {
        id: inquiryId,
        name: name.trim(),
        email: email.trim(),
        projectType: projectType || 'website-development',
        budgetRange: budgetRange || 'flexible',
        details: details.trim(),
        createdAt: new Date().toISOString(),
        ip: req.ip,
      };

      inquiries.unshift(newInquiry);
      console.log(`[Contact Form] New inquiry received: ${inquiryId} from ${email}`);

      return res.status(200).json({
        success: true,
        inquiryId,
        message: 'Your inquiry has been successfully received. Umer will review your requirements and follow up within 24–48 hours.',
      });
    } catch (error) {
      console.error('[Contact Form Error]:', error);
      return res.status(500).json({
        success: false,
        error: 'An internal error occurred while processing your request. Please email directly.',
      });
    }
  });

  // Vite integration
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
