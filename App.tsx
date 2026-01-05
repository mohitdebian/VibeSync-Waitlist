import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FriendSidebar } from './components/FriendSidebar';
import { RoomView } from './components/RoomView';
import { AppView, Song, User } from './types';
import { ArrowRight, Zap, Users, Radio, Sparkles, PlayCircle, Mic2, Layers, Timer, Star, Check, Loader2, AlertCircle } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_SONGS: Song[] = [
  { id: '1', title: 'Starboy', artist: 'The Weeknd', duration: 243, coverUrl: 'https://picsum.photos/400/400?random=1' },
  { id: '2', title: 'Midnight City', artist: 'M83', duration: 200, coverUrl: 'https://picsum.photos/400/400?random=2' },
];

const MOCK_FRIENDS: User[] = [
  { id: '2', name: 'Alex', avatarUrl: 'https://picsum.photos/100/100?random=4', status: 'listening', currentSong: MOCK_SONGS[0] },
  { id: '3', name: 'Sarah', avatarUrl: 'https://picsum.photos/100/100?random=5', status: 'online' },
  { id: '4', name: 'Mike', avatarUrl: 'https://picsum.photos/100/100?random=6', status: 'offline' },
];

// --- COMPONENTS ---

const Marquee: React.FC = () => (
  <div className="relative w-full overflow-hidden py-10">
    <div className="absolute inset-0 bg-violet-600/20 skew-y-3 transform origin-left scale-110"></div>
    <div className="w-full bg-violet-600 overflow-hidden py-3 border-y border-violet-500/50 relative z-20 -rotate-1 transform origin-center scale-105 shadow-2xl">
      <div className="animate-marquee whitespace-nowrap flex gap-8 items-center text-sm font-black uppercase tracking-widest text-white/90">
        {[...Array(10)].map((_, i) => (
          <React.Fragment key={i}>
            <span>Real-Time Sync</span>
            <span className="text-violet-900">●</span>
            <span>Social Listening</span>
            <span className="text-violet-900">●</span>
            <span>Zero Latency</span>
            <span className="text-violet-900">●</span>
            <span>Join the Revolution</span>
            <span className="text-violet-900">●</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

const Countdown: React.FC = () => {
  return (
    <div className="flex flex-col items-center my-8">
      <p className="text-sm font-bold text-violet-400 tracking-widest uppercase mb-4 animate-pulse">
        THE FIRST DROP GOES LIVE IN:
      </p>
      <div className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
        14 days
      </div>
    </div>
  );
};

const AppDemoFrame: React.FC = () => {
  const currentSong = MOCK_SONGS[0];

  return (
    <div className="relative mx-auto transition-all duration-500 ease-out z-20
      w-[90%] max-w-[340px] h-[680px] /* Mobile: Phone Dimensions */
      md:w-full md:max-w-5xl md:h-[700px] /* Desktop: App Window Dimensions */
      bg-slate-950 rounded-[3rem] md:rounded-3xl 
      border-[8px] md:border-[10px] border-slate-900 
      shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] 
      ring-1 ring-white/10 group
    ">

      {/* Screen Reflection / Gloss (Mobile Only) */}
      <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-50 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] md:hidden"></div>
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none z-50 rounded-[2.5rem] md:hidden opacity-50"></div>

      {/* Dynamic Island / Notch / Toolbar */}
      <div className="absolute top-0 left-0 right-0 z-50 transition-all duration-300
         flex justify-center md:justify-between items-center
         pt-3 md:pt-0 md:px-6 md:h-10 md:bg-slate-900 md:border-b md:border-white/5 md:rounded-t-[1.3rem]
      ">
        {/* Mobile Dynamic Island */}
        <div className="md:hidden w-[100px] h-[28px] bg-black rounded-full flex items-center justify-center gap-3 px-1 ring-1 ring-white/5 shadow-lg relative overflow-hidden">
          <div className="absolute top-1/2 left-2 w-1.5 h-1.5 rounded-full bg-[#1a1a1a] shadow-[inset_0_0_2px_rgba(0,0,0,1)]"></div> {/* Camera Lens */}
          <div className="w-full h-full bg-gradient-to-tr from-white/5 to-transparent absolute pointer-events-none"></div>
        </div>

        {/* Desktop Toolbar Buttons (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 group-hover:bg-red-500/80 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/80 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 group-hover:bg-green-500/80 transition-colors"></div>
        </div>
        <div className="hidden md:block text-xs font-mono text-slate-500 group-hover:text-white transition-colors">vibe.sync</div>
      </div>

      <div className="flex h-full bg-slate-950 pt-10 md:pt-10 overflow-hidden rounded-[2.4rem] md:rounded-[1.4rem]">
        {/* Sidebar only on Desktop */}
        <div className="hidden md:block h-full relative z-20 border-r border-white/5 w-64 bg-slate-950/50">
          <FriendSidebar friends={MOCK_FRIENDS} isOpen={true} toggleSidebar={() => { }} />
        </div>

        <div className="flex-1 relative z-10 bg-slate-950 h-full">
          <RoomView currentSong={currentSong} participants={MOCK_FRIENDS} />
        </div>
      </div>
    </div>
  );
};

// --- LANDING PAGE ---
const LandingPage: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleJoinWaitlist = async () => {
    if (!email || !email.includes('@')) {
      // Basic validation
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('https://api.sheetbest.com/sheets/5a0849ec-7f11-4dca-a13c-08b19af3368b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Date: new Date().toLocaleString()
        })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        // Reset status after a delay to allow adding another email if needed
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden">

      {/* GRID BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950 pointer-events-none -z-10"></div>

      {/* ANNOUNCEMENT HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-24 pb-12 overflow-hidden">

        {/* Spotlight Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full -z-10"></div>

        <div className="container mx-auto max-w-5xl text-center z-10">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-bold uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            Public Beta Access Opening Soon
          </div>

          <h1 className="text-5xl md:text-[7rem] font-black tracking-tighter leading-[0.9] md:leading-[0.85] text-white mb-6 mix-blend-overlay">
            LISTENING ALONE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-transparent">IS DEAD.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light mb-8 px-4">
            The streaming era made music solitary. We’re making it shared. Stop syncing manually. Stop sending links. <span className="text-white font-medium">Start living in the music together.</span>
          </p>

          <Countdown />

          <div className="flex flex-col items-center gap-4 max-w-md mx-auto w-full px-2 mt-8">
            <div className={`w-full flex p-1.5 bg-white/5 border rounded-full backdrop-blur-xl items-center shadow-lg shadow-violet-900/10 transition-colors ${status === 'error' ? 'border-red-500/50' : 'border-white/10'}`}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                placeholder="your@email.com"
                className="bg-transparent flex-1 px-4 md:px-6 py-2 md:py-3 outline-none text-white placeholder-slate-500 min-w-0 text-sm md:text-base disabled:opacity-50"
                onKeyDown={(e) => e.key === 'Enter' && handleJoinWaitlist()}
              />
              <button
                onClick={handleJoinWaitlist}
                disabled={status === 'loading' || status === 'success'}
                className={`px-5 md:px-8 py-2.5 md:py-4 text-sm md:text-base font-bold rounded-full transition whitespace-nowrap shrink-0 flex items-center gap-2
                        ${status === 'success'
                    ? 'bg-green-500 text-white cursor-default'
                    : status === 'loading'
                      ? 'bg-slate-200 text-slate-500 cursor-wait'
                      : 'bg-white text-black hover:bg-slate-200'
                  }
                     `}
              >
                {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                {status === 'success' && <Check size={16} />}
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Waitlist'}
              </button>
            </div>

            {/* Status Feedback Text / Microcopy */}
            <div className="h-6 flex items-center justify-center mt-2">
              {status === 'success' ? (
                <p className="text-xs text-green-400 flex items-center animate-fade-in-up font-medium">
                  You're on the list! We'll be in touch soon. 🚀
                </p>
              ) : status === 'error' ? (
                <p className="text-xs text-red-400 flex items-center animate-fade-in-up font-medium">
                  <AlertCircle size={12} className="mr-1" /> Something went wrong. Please try again.
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-10 animate-bounce text-slate-500 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest">Sneak Peek</span>
          <ArrowRight className="rotate-90" size={16} />
        </div>
      </section>

      <Marquee />

      {/* SNEAK PEEK / DEMO */}
      <section id="preview" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          {/* Mobile: Stacked, Left Align. Desktop: Spread, Right Align for Version */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div className="text-left max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase">
                FEELS LIKE YOU'RE IN <br /> <span className="text-violet-500">THE SAME CAR.</span>
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl">(Even when you're 3,000 miles apart.)</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
              <p className="text-violet-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                Real chat. Real reactions. Real time.
              </p>
              <button onClick={onLaunch} className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition flex items-center gap-2 text-sm font-bold bg-black/40 backdrop-blur-sm whitespace-nowrap self-start md:self-auto">
                <PlayCircle size={18} /> Interact with Demo
              </button>
            </div>
          </div>

          <AppDemoFrame />
        </div>
      </section>

      {/* MANIFESTO / FEATURES */}
      <section id="vision" className="py-24 md:py-32 border-t border-white/5 bg-gradient-to-b from-slate-950 to-indigo-950/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500 mb-2">The Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* HERO FEATURE: SPOTIFY JAM BUT BETTER */}
            <div className="md:col-span-2 relative rounded-3xl p-8 md:p-12 overflow-hidden group cursor-default border border-violet-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/30 hover:border-violet-500/40 transition-all duration-500">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Noise Texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left flex-1">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-black uppercase tracking-widest mb-6 group-hover:bg-violet-500/20 transition-colors duration-300">
                    <Users size={14} />
                    <span>Like Spotify Jam</span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none uppercase">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-purple-200">
                      But Better
                    </span>
                    <span className="block text-2xl md:text-3xl text-violet-400 mt-2 font-bold">🎧</span>
                  </h3>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-6">
                    Same vibe, unlimited rooms. Drop in, mute up, or take the aux. <span className="text-white font-bold">You control the vibe.</span>
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                      ∞ Unlimited Rooms
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                      🎵 Real-time Sync
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                      👥 Social First
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Radio size={64} className="text-white md:w-20 md:h-20" />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            {/* VERTICAL ROADMAP */}
            <div className="relative max-w-5xl mx-auto px-4 md:px-0">

              {/* Central Glowing Line (Desktop) / Left Line (Mobile) */}
              <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-600 via-fuchsia-600 to-transparent -translate-x-1/2 shadow-[0_0_20px_rgba(124,58,237,0.5)]"></div>

              <div className="flex flex-col gap-16 md:gap-32 relative z-10 py-10">

                {/* STEP 1: See Friends Play */}
                <div className="relative flex flex-col md:flex-row items-center md:justify-between group w-full">
                  <div className="w-full md:w-[45%] pl-16 md:pl-0 text-left md:text-right">
                    <div className="inline-block p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-violet-500/40 transition-all duration-500 hover:bg-slate-900/60 shadow-2xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.3)]">
                      <div className="text-5xl md:text-6xl mb-4 opacity-90">👀</div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">See Friends Play</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">See who's online and what they're listening to right now.</p>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-10 h-10 md:w-16 md:h-16 -translate-x-1/2 md:-translate-y-1/2 rounded-full bg-slate-950 border-4 border-violet-600 shadow-[0_0_30px_rgba(124,58,237,0.6)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-white animate-pulse"></div>
                  </div>

                  <div className="hidden md:block w-[45%] text-left pl-12">
                    <div className="text-violet-500/10 font-black text-[8rem] leading-none select-none group-hover:text-violet-500/20 transition-colors duration-500">01</div>
                  </div>
                </div>

                {/* STEP 2: Live Status (Right Side Desktop) */}
                <div className="relative flex flex-col md:flex-row items-center md:justify-between group w-full">
                  <div className="hidden md:block w-[45%] text-right pr-12">
                    <div className="text-green-500/10 font-black text-[8rem] leading-none select-none group-hover:text-green-500/20 transition-colors duration-500">02</div>
                  </div>

                  <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-10 h-10 md:w-16 md:h-16 -translate-x-1/2 md:-translate-y-1/2 rounded-full bg-slate-950 border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.6)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-white animate-pulse"></div>
                  </div>

                  <div className="w-full md:w-[45%] pl-16 md:pl-12 text-left">
                    <div className="inline-block p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-green-500/40 transition-all duration-500 hover:bg-slate-900/60 shadow-2xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.3)]">
                      <div className="text-5xl md:text-6xl mb-4 opacity-90">🟢</div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">Live Status</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">See who's online and join instantly.</p>
                    </div>
                  </div>
                </div>

                {/* STEP 3: Zero Latency */}
                <div className="relative flex flex-col md:flex-row items-center md:justify-between group w-full">
                  <div className="w-full md:w-[45%] pl-16 md:pl-0 text-left md:text-right">
                    <div className="inline-block p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-yellow-500/40 transition-all duration-500 hover:bg-slate-900/60 shadow-2xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.3)]">
                      <div className="text-5xl md:text-6xl mb-4 opacity-90">⚡️</div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">Zero Latency</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">Perfect sync. Same millisecond.</p>
                    </div>
                  </div>

                  <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-10 h-10 md:w-16 md:h-16 -translate-x-1/2 md:-translate-y-1/2 rounded-full bg-slate-950 border-4 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.6)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-white animate-pulse"></div>
                  </div>

                  <div className="hidden md:block w-[45%] text-left pl-12">
                    <div className="text-yellow-500/10 font-black text-[8rem] leading-none select-none group-hover:text-yellow-500/20 transition-colors duration-500">03</div>
                  </div>
                </div>

                {/* STEP 4: No Ads Ever */}
                <div className="relative flex flex-col md:flex-row items-center md:justify-between group w-full">
                  <div className="hidden md:block w-[45%] text-right pr-12">
                    <div className="text-red-500/10 font-black text-[8rem] leading-none select-none group-hover:text-red-500/20 transition-colors duration-500">04</div>
                  </div>

                  <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-10 h-10 md:w-16 md:h-16 -translate-x-1/2 md:-translate-y-1/2 rounded-full bg-slate-950 border-4 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-white animate-pulse"></div>
                  </div>

                  <div className="w-full md:w-[45%] pl-16 md:pl-12 text-left">
                    <div className="inline-block p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-red-500/40 transition-all duration-500 hover:bg-slate-900/60 shadow-2xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.3)]">
                      <div className="text-5xl md:text-6xl mb-4 opacity-90">🚫</div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">No Ads Ever</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">Pure music. No interruptions.</p>
                    </div>
                  </div>
                </div>

                {/* STEP 5: Spotify Import */}
                <div className="relative flex flex-col md:flex-row items-center md:justify-between group w-full">
                  <div className="w-full md:w-[45%] pl-16 md:pl-0 text-left md:text-right">
                    <div className="inline-block p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-blue-500/40 transition-all duration-500 hover:bg-slate-900/60 shadow-2xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)]">
                      <div className="text-5xl md:text-6xl mb-4 opacity-90">📥</div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">Spotify Import</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">One click, all your playlists.</p>
                    </div>
                  </div>

                  <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-10 h-10 md:w-16 md:h-16 -translate-x-1/2 md:-translate-y-1/2 rounded-full bg-slate-950 border-4 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-white animate-pulse"></div>
                  </div>

                  <div className="hidden md:block w-[45%] text-left pl-12">
                    <div className="text-blue-500/10 font-black text-[8rem] leading-none select-none group-hover:text-blue-500/20 transition-colors duration-500">05</div>
                  </div>
                </div>

                {/* STEP 6: Live Reactions */}
                <div className="relative flex flex-col md:flex-row items-center md:justify-between group w-full">
                  <div className="hidden md:block w-[45%] text-right pr-12">
                    <div className="text-purple-500/10 font-black text-[8rem] leading-none select-none group-hover:text-purple-500/20 transition-colors duration-500">06</div>
                  </div>

                  <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-10 h-10 md:w-16 md:h-16 -translate-x-1/2 md:-translate-y-1/2 rounded-full bg-slate-950 border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.6)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-white animate-pulse"></div>
                  </div>

                  <div className="w-full md:w-[45%] pl-16 md:pl-12 text-left">
                    <div className="inline-block p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-purple-500/40 transition-all duration-500 hover:bg-slate-900/60 shadow-2xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)]">
                      <div className="text-5xl md:text-6xl mb-4 opacity-90">🔥</div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">Live Reactions</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">React instantly in the Vibe Room.</p>
                    </div>
                  </div>
                </div>

                {/* STEP 7: Everywhere */}
                <div className="relative flex flex-col md:flex-row items-center md:justify-between group w-full">
                  <div className="w-full md:w-[45%] pl-16 md:pl-0 text-left md:text-right">
                    <div className="inline-block p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-pink-500/40 transition-all duration-500 hover:bg-slate-900/60 shadow-2xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.3)]">
                      <div className="text-5xl md:text-6xl mb-4 opacity-90">📱</div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">Everywhere</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">Web, iOS, Android, Desktop.</p>
                    </div>
                  </div>

                  <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-10 h-10 md:w-16 md:h-16 -translate-x-1/2 md:-translate-y-1/2 rounded-full bg-slate-950 border-4 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.6)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-white animate-pulse"></div>
                  </div>

                  <div className="hidden md:block w-[45%] text-left pl-12">
                    <div className="text-pink-500/10 font-black text-[8rem] leading-none select-none group-hover:text-pink-500/20 transition-colors duration-500">07</div>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA (FOOTER) */}
      <section className="py-24 md:py-40 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 mix-blend-difference leading-none uppercase">
            DON'T BE LISTENER #1,000,000. <br /> <span className="text-violet-500">BE LISTENER #1.</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
            Usernames are unique. Once <span className="text-white font-bold">@MusicGod</span> is gone, it's gone forever. Secure your handle before the public launch wipes the good ones.
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-5 bg-white text-black text-xl font-bold rounded-full hover:scale-105 transition shadow-[0_0_50px_rgba(255,255,255,0.3)] uppercase">
            CLAIM MY HANDLE NOW
          </button>
        </div>
      </section >

      <footer className="py-8 border-t border-white/10 bg-black text-center text-xs text-slate-600 uppercase tracking-widest">
        &copy; 2025 VibeSync. The Revolution Will Be Streamed.
      </footer>
    </div >
  );
};

// --- MAIN APP ---
export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentSong = MOCK_SONGS[0];

  return (
    <div className="min-h-screen text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {currentView === AppView.LANDING ? (
        <LandingPage onLaunch={() => setCurrentView(AppView.APP_DASHBOARD)} />
      ) : (
        <div className="flex-1 flex overflow-hidden relative h-screen pt-20">
          <div className="hidden lg:block h-full border-r border-white/5">
            <FriendSidebar friends={MOCK_FRIENDS} isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          </div>
          <RoomView
            currentSong={currentSong}
            participants={MOCK_FRIENDS}
          />
        </div>
      )}
    </div>
  );
}
