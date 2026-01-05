import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2 } from 'lucide-react';
import { Song } from '../types';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  currentSong, 
  isPlaying, 
  onPlayPause,
  onNext,
  onPrev
}) => {
  const [progress, setProgress] = useState(0);

  // Fake progress simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 glass-panel border-t border-white/10 px-4 md:px-8 flex items-center justify-between z-50">
      
      {/* Song Info */}
      <div className="flex items-center w-1/3 min-w-[200px]">
        <img 
          src={currentSong.coverUrl} 
          alt="Album Art" 
          className="h-16 w-16 rounded-lg shadow-lg object-cover mr-4"
        />
        <div>
          <h4 className="text-white font-semibold text-sm md:text-base truncate">{currentSong.title}</h4>
          <p className="text-slate-400 text-xs md:text-sm">{currentSong.artist}</p>
        </div>
        <button className="ml-4 text-slate-400 hover:text-pink-500 transition">
          <Heart size={20} />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center space-x-6 mb-2">
          <button onClick={onPrev} className="text-slate-400 hover:text-white transition"><SkipBack size={24} /></button>
          <button 
            onClick={onPlayPause}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-105 transition shadow-lg shadow-white/20"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          <button onClick={onNext} className="text-slate-400 hover:text-white transition"><SkipForward size={24} /></button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-md flex items-center space-x-2 text-xs text-slate-400">
          <span>1:23</span>
          <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden cursor-pointer group">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full relative" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span>3:45</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center justify-end w-1/3 space-x-4">
        <button className="text-slate-400 hover:text-white hidden md:block">
          <Share2 size={20} />
        </button>
        <div className="flex items-center space-x-2 group">
          <Volume2 size={20} className="text-slate-400" />
          <div className="w-24 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-slate-400 group-hover:bg-white transition-colors"></div>
          </div>
        </div>
      </div>
    </div>
  );
};