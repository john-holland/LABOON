# Unofficial Adaptation of One Piece Kaizoku Fansubs Enhanced Anime Subtitle System

This project creates an enhanced anime subtitle system that analyzes anime episodes in real-time and overlays dynamic, animated subtitles. Inspired by the classic Kaizoku Fansubs style, it adds visual flair to character attacks and special moves through SVG animations and color transitions.

## Pending Review By World Government, and Various Pirates.

Haam!

## Features

- Real-time video analysis using TensorFlow.js
- Audio analysis for detecting attack moments
- Motion detection for identifying action sequences
- Dynamic SVG subtitle animations
- WebSocket-based real-time subtitle updates
- Support for multiple animation styles:
  - Color flow animations
  - Slide-in effects
  - Fade-in transitions
  - Custom SVG animations

## Wish List

- Server structured to contain subs and community episode edits, gradeable for accuracy and effect work
  - integration with imgur / reddit / mumble / discord for chat servers and / or group episode watching
  - episode number tracking
  - SAASy coverage for other animes
- (i think it already has but i haven't reviewed in a while) the ability to use keyboard shortcuts

## Prerequisites

- Node.js 16+
- FFmpeg
- Python 3.8+ (for TensorFlow model training)
- A modern web browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/onepiece_kaizoku_fansubs.git
cd onepiece_kaizoku_fansubs
```

2. Install dependencies:
```bash
npm install
```

3. Set up the TensorFlow model:
```bash
python scripts/setup_model.py
```

## Usage

1. Start the development server:
```bash
npm start
```

2. Start the analysis server:
```bash
npm run server
```

3. Open your browser to `http://localhost:3000`

4. Upload an anime episode or provide a video URL

5. The system will analyze the video and generate animated subtitles in real-time

## Configuration

You can customize the subtitle animations by editing the `config/subtitleStyles.json` file. Each animation type can be configured with:

- Color schemes
- Animation timing
- Text effects
- SVG path definitions

## Development

### Project Structure

```
src/
  ├── analysis/         # Video and audio analysis modules
  ├── components/       # React components
  ├── server/          # Express server and WebSocket handling
  ├── styles/          # CSS and animation definitions
  └── utils/           # Utility functions
```

### Adding New Animation Types

1. Define the animation in `src/styles/animations.ts`
2. Add the corresponding SVG template in `src/components/animations/`
3. Update the subtitle configuration in `config/subtitleStyles.json`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the original Kaizoku Fansubs team
- Built with React, TensorFlow.js, and WebSocket technology
- Special thanks to the anime community for their support

**Credits:**
This project benefited from AI code assistance by [Cursor](https://www.cursor.com/). 
