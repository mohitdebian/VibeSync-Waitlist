import React from 'react';

export const Visualizer: React.FC = () => {
  return (
    <div className="flex items-end justify-center space-x-1 h-8 w-12">
      <div className="bar w-1 bg-cyan-400 rounded-t-sm"></div>
      <div className="bar w-1 bg-violet-400 rounded-t-sm"></div>
      <div className="bar w-1 bg-fuchsia-400 rounded-t-sm"></div>
      <div className="bar w-1 bg-pink-400 rounded-t-sm"></div>
      <div className="bar w-1 bg-indigo-400 rounded-t-sm"></div>
    </div>
  );
};