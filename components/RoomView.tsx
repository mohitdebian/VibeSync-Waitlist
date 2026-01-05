import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Play, Pause, SkipForward, SkipBack, Heart, Music2, Users, Flame, Zap } from 'lucide-react';
import { Song, User, ChatMessage } from '../types';
import { getVibeDescription } from '../services/geminiService';

interface RoomViewProps {
  currentSong: Song;
  participants: User[];
}

interface FloatingReaction {
  id: number;
  emoji: string;
  left: number; // percentage
  speed: number;
}

export const RoomView: React.FC<RoomViewProps> = ({ currentSong, participants }) => {
  const [vibeText, setVibeText] = useState<string>("Reading the room...");
  const [isPlaying, setIsPlaying] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', userId: '2', userName: 'Alex', text: 'This bass is insane!', timestamp: new Date() },
    { id: '2', userId: '3', userName: 'Sarah', text: 'Love this track 😍', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState("");
  
  // Reaction State
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);

  // AI Vibe Description
  useEffect(() => {
    let isMounted = true;
    getVibeDescription(currentSong.title, currentSong.artist).then(text => {
      if(isMounted) setVibeText(text);
    });
    return () => { isMounted = false; };
  }, [currentSong]);

  // Simulate incoming reactions from "friends" to make the demo feel alive
  useEffect(() => {
    const interval = setInterval(() => {
        if (Math.random() > 0.6) {
            const emojis = ['🔥', '❤️', '🎵', '⚡️', '🙌', '🕺'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            triggerReaction(randomEmoji, Math.random() * 80 + 10); // Random position
        }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerReaction = (emoji: string, leftPos: number = 85) => {
      const id = Date.now() + Math.random();
      const newReaction: FloatingReaction = {
          id,
          emoji,
          left: leftPos,
          speed: Math.random() * 0.5 + 0.5
      };
      
      setReactions(prev => [...prev, newReaction]);

      // Remove reaction after animation
      setTimeout(() => {
          setReactions(prev => prev.filter(r => r.id !== id));
      }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const msg: ChatMessage = {
      id: Date.now().toString(),
      userId: 'me',
      userName: 'You',
      text: newMessage,
      timestamp: new Date()
    };
    setMessages([...messages, msg]);
    setNewMessage("");
    // Trigger a heart when sending a message for fun
    triggerReaction('💬', 85);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-slate-900/40 relative">
      
      {/* LEFT: Music Stage (Focus) */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        {/* Header Info */}
        <div className="relative z-10 px-6 py-4 flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
                 <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
                    <Music2 size={18} className="text-violet-300" />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-white tracking-wide uppercase">Now Vibing</h3>
                    <p className="text-xs text-violet-300 animate-pulse">{participants.length + 1} Listeners</p>
                 </div>
            </div>
            <div className="flex -space-x-2">
                {participants.map(p => (
                   <img key={p.id} src={p.avatarUrl} className="w-8 h-8 rounded-full border-2 border-slate-900" />
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    +4
                </div>
            </div>
        </div>

        {/* Main Content Center */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 p-4 relative">
             
             {/* Album Art with Visualizer Ring */}
             <div className="relative group mb-8">
                {/* Visualizer Ring (Pseudo) */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 blur-xl opacity-40 transition-all duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`}></div>
                
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/20">
                    <img 
                    src={currentSong.coverUrl} 
                    alt={currentSong.title}
                    className={`w-full h-full object-cover transition duration-700 ${isPlaying ? 'scale-100' : 'scale-110 blur-sm grayscale-[50%]'}`}
                    />
                    
                     {/* Floating Controls */}
                    <div className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center gap-6 transition-all duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                        <button className="text-white/80 hover:text-white hover:scale-110 transition"><SkipBack size={32} /></button>
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        >
                            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                        </button>
                        <button className="text-white/80 hover:text-white hover:scale-110 transition"><SkipForward size={32} /></button>
                    </div>
                </div>
             </div>

             <div className="text-center space-y-2 max-w-md">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">{currentSong.title}</h2>
                <p className="text-xl text-slate-300 font-medium">{currentSong.artist}</p>
                <div className="pt-2">
                     <span className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-violet-300 font-mono tracking-widest uppercase">
                        {vibeText}
                     </span>
                </div>
             </div>
        </div>
      </div>

      {/* RIGHT: Chat & Reactions Overlay */}
      <div className="w-full md:w-96 bg-black/20 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/5 flex flex-col relative h-[40vh] md:h-auto z-20">
         
         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 relative scrollbar-hide">
             {/* Gradient fade at top */}
             <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-900/50 to-transparent pointer-events-none z-10"></div>
             
             <div className="mt-auto flex flex-col justify-end min-h-full space-y-4 pb-2">
                {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.userId === 'me' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                    <div className="flex items-end gap-2 max-w-[90%]">
                        {msg.userId !== 'me' && (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-[10px] font-bold border border-white/20">
                                {msg.userName[0]}
                            </div>
                        )}
                        <div className={`rounded-2xl px-4 py-2 text-sm shadow-sm backdrop-blur-sm ${
                            msg.userId === 'me' 
                            ? 'bg-violet-600/90 text-white rounded-br-sm border border-violet-500/50' 
                            : 'bg-white/10 text-slate-200 rounded-bl-sm border border-white/5'
                        }`}>
                            {msg.userId !== 'me' && <p className="text-[10px] font-bold text-violet-300 mb-0.5">{msg.userName}</p>}
                            {msg.text}
                        </div>
                    </div>
                </div>
                ))}
             </div>
         </div>

         {/* Floating Reactions Layer */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
             {reactions.map(r => (
                 <div 
                    key={r.id}
                    className="absolute bottom-20 text-4xl animate-float-up"
                    style={{ 
                        left: `${r.left}%`, 
                        animationDuration: `${r.speed * 2}s` 
                    }}
                 >
                     {r.emoji}
                 </div>
             ))}
         </div>

         {/* Input Area */}
         <div className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-xl relative z-40">
             
             {/* Quick Reactions Bar */}
             <div className="absolute -top-12 left-0 right-0 h-12 flex items-center justify-center gap-4 pointer-events-auto px-4 bg-gradient-to-t from-black/80 to-transparent">
                 {[
                     { emoji: '🔥', color: 'text-orange-500 hover:bg-orange-500/20' },
                     { emoji: '❤️', color: 'text-red-500 hover:bg-red-500/20' },
                     { emoji: '⚡️', color: 'text-yellow-400 hover:bg-yellow-400/20' },
                     { emoji: '🙌', color: 'text-blue-400 hover:bg-blue-400/20' }
                 ].map((reaction, i) => (
                     <button 
                        key={i}
                        onClick={() => triggerReaction(reaction.emoji)}
                        className={`w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-90 ${reaction.color}`}
                     >
                         {reaction.emoji}
                     </button>
                 ))}
             </div>

             <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                <div className="relative flex-1">
                    <input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Send a message..."
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-3 text-sm text-white focus:ring-2 focus:ring-violet-500/50 focus:border-transparent placeholder-slate-500 transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                        <MessageCircle size={16} />
                    </div>
                </div>
                <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-3 bg-violet-600 rounded-full text-white hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-violet-600 transition shadow-lg shadow-violet-600/20"
                >
                   <Send size={18} fill="currentColor" />
                </button>
             </form>
         </div>
      </div>
    </div>
  );
};