import React from 'react';
import { User, Song } from '../types';
import { Headphones, Circle } from 'lucide-react';

interface FriendSidebarProps {
  friends: User[];
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const FriendSidebar: React.FC<FriendSidebarProps> = ({ friends, isOpen, toggleSidebar }) => {
  return (
    <div className={`
      fixed top-0 right-0 h-full w-72 glass-panel border-l border-white/10 transform transition-transform duration-300 z-40 pt-20
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      lg:translate-x-0 lg:static lg:block lg:pt-0 lg:w-64 lg:bg-slate-900/50
    `}>
      <div className="p-5">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Friends Activity</h3>
        
        <div className="space-y-4">
          {friends.map(friend => (
            <div key={friend.id} className="group flex items-start space-x-3 p-2 rounded-xl hover:bg-white/5 transition cursor-pointer">
              <div className="relative">
                <img src={friend.avatarUrl} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
                <div className={`
                  absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 flex items-center justify-center
                  ${friend.status === 'online' ? 'bg-green-500' : friend.status === 'listening' ? 'bg-violet-500' : 'bg-slate-500'}
                `}>
                  {friend.status === 'listening' && <Headphones size={8} className="text-white" />}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                   <h4 className="text-white text-sm font-medium truncate">{friend.name}</h4>
                   <span className="text-[10px] text-slate-500">
                     {friend.status === 'offline' ? '2h ago' : 'Now'}
                   </span>
                </div>
                
                {friend.status === 'listening' && friend.currentSong ? (
                  <div className="text-xs text-violet-300 truncate mt-0.5">
                    Listening to <span className="font-semibold">{friend.currentSong.title}</span>
                  </div>
                ) : (
                   <div className="text-xs text-slate-500 truncate mt-0.5 capitalize">
                    {friend.status}
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-white/10 text-center">
            <p className="text-sm font-semibold text-white mb-2">Invite Friends</p>
            <p className="text-xs text-slate-400 mb-3">Vibing is better together.</p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition text-white">
                Copy Link
            </button>
        </div>
      </div>
    </div>
  );
};