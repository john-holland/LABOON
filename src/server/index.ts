import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
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
app.use(express.static(path.join(__dirname, '../../public')));

// Endpoint to start video analysis
app.post('/api/analyze', async (req, res) => {
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
io.on('connection', (socket) => {
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
videoAnalyzer.on('frameProcessed', (frame) => {
  io.emit('frameUpdate', frame);
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 