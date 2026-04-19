import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { VideoAnalyzer } from '../analysis/videoAnalyzer';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const videoAnalyzer = new VideoAnalyzer();

// Store analysis results
const analysisResults = new Map<string, any>();

app.use(express.json());
// Serve static files from public directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    status: 'running', 
    message: 'Anime Subtitle Enhancement Server',
    endpoints: {
      analyze: 'POST /api/analyze',
      health: 'GET /'
    }
  });
});

// Endpoint to start video analysis
app.post('/api/analyze', async (req: Request, res: Response) => {
  const { videoPath } = req.body;
  
  if (!videoPath) {
    return res.status(400).json({ error: 'Video path is required' });
  }

  try {
    const results = await videoAnalyzer.analyzeVideo(videoPath);
    analysisResults.set(videoPath, results);
    res.json({ success: true, message: 'Analysis started' });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze video' });
  }
});

// WebSocket connection handling
io.on('connection', (socket: Socket) => {
  console.log('Client connected');

  socket.on('requestAnalysis', (videoPath: string) => {
    const results = analysisResults.get(videoPath);
    if (results) {
      socket.emit('analysisResults', results);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Handle video analyzer events
videoAnalyzer.on('frameProcessed', (frame: any) => {
  io.emit('frameUpdate', frame);
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
