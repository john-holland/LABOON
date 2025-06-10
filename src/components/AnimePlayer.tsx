import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SubtitleAnimation {
  text: string;
  startTime: number;
  duration: number;
  animationType: 'color-flow' | 'slide-in' | 'fade-in' | 'custom';
  style: {
    color: string;
    fontSize: string;
    fontFamily: string;
    textShadow: string;
  };
}

interface AnimePlayerProps {
  videoUrl: string;
  subtitles: SubtitleAnimation[];
}

export const AnimePlayer: React.FC<AnimePlayerProps> = ({ videoUrl, subtitles }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to WebSocket server for real-time subtitle updates
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const renderSubtitle = (subtitle: SubtitleAnimation) => {
    const isActive = currentTime >= subtitle.startTime && 
                    currentTime <= subtitle.startTime + subtitle.duration;

    if (!isActive) return null;

    const progress = (currentTime - subtitle.startTime) / subtitle.duration;

    return (
      <div
        key={`${subtitle.text}-${subtitle.startTime}`}
        className={`absolute bottom-20 left-1/2 transform -translate-x-1/2
          ${subtitle.animationType === 'color-flow' ? 'animate-text-glow' : ''}
          ${subtitle.animationType === 'slide-in' ? 'animate-slide-in' : ''}
          ${subtitle.animationType === 'fade-in' ? 'animate-fade-in' : ''}`}
        style={{
          ...subtitle.style,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {subtitle.text}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        controls
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
      >
        {subtitles.map(renderSubtitle)}
      </div>
    </div>
  );
}; 