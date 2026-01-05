import React from 'react';
import { Music, Menu, ArrowRight } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, toggleSidebar }) => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="glass-pill rounded-full pl-6 pr-2 py-2 flex items-center justify-between pointer-events-auto w-full max-w-4xl transition-all duration-300 hover:border-white/20 bg-black/50 backdrop-blur-xl border border-white/10">
        
        {/* Logo Area */}
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate(AppView.LANDING)}>
          <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center mr-3 font-bold">
            <Music size={16} fill="currentColor" />
          </div>
          <span className="text-lg font-black text-white tracking-tighter">
            VIBESYNC
          </span>
        </div>

        {/* Links (Desktop) */}
        {currentView === AppView.LANDING && (
          <div className="hidden md:flex items-center space-x-6">
             <a href="#preview" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition">Preview</a>
             <a href="#vision" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition">Vision</a>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {currentView === AppView.LANDING ? (
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-slate-200 transition flex items-center"
            >
              Get Access <ArrowRight size={12} className="ml-2" />
            </button>
          ) : (
            <button onClick={() => onNavigate(AppView.LANDING)} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white">
               Exit Demo
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};