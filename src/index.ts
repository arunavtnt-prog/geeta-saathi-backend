/**
 * Geeta Saathi Backend API
 * Main Express Server Entry Point
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// TRUSTED PROXIES (Vercel, Railway)
// ============================================
app.set('trust proxy', 1);

// ============================================
// MIDDLEWARE
// ============================================

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:', 'http:'],
      connectSrc: ["'self'"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging (skip in test)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api', rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/auth', (await import('./routes/auth.routes.js')).default);
app.use('/api/users', (await import('./routes/user.routes.js')).default);
app.use('/api/audio', (await import('./routes/audio.routes.js')).default);
app.use('/api/verses', (await import('./routes/verse.routes.js')).default);
app.use('/api/lessons', (await import('./routes/lesson.routes.js')).default);
app.use('/api/journal', (await import('./routes/journal.routes.js')).default);
app.use('/api/ai', (await import('./routes/ai.routes.js')).default);
app.use('/api/notifications', (await import('./routes/notification.routes.js')).default);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🙏 Geeta Saathi Backend API                              ║
║                                                            ║
║   Version: 1.0.0                                           ║
║   Environment: ${process.env.NODE_ENV || 'development'}          ║
║   Port: ${PORT}                                               ║
║   Time: ${new Date().toLocaleString()}                     ║
║                                                            ║
║   ⚡ Server ready!                                         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
