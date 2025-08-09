import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Wish } from '../types';

interface RandomWishProps {
  wish: Wish | null;
  onGenerate: () => void;
  onFulfill: (wish: Wish) => void;
}

export default function RandomWish({ wish, onGenerate, onFulfill }: RandomWishProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500/10 via-blue-700/10 to-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8 animate-fadeInUp hover-lift">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-400 animate-bounce-gentle" />
          Feeling Generous?
        </h2>
        <p className="text-blue-200">Let the universe choose a wish to grant ✨</p>
      </div>

      {wish ? (
        <div className="glass-effect rounded-lg p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{wish.title}</h3>
              <p className="text-blue-100 text-sm mb-3">{wish.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-blue-400 font-semibold">{wish.priceRange}</span>
                <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded-full capitalize">
                  {wish.category}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => onFulfill(wish)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 animate-pulse-glow"
            >
              Grant This Wish 🌟
            </button>
            <button
              onClick={onGenerate}
              className="bg-black/50 border border-blue-500/30 hover:bg-blue-500/20 text-white p-3 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <RefreshCw className="w-5 h-5 animate-rotate-slow" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={onGenerate}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 transform hover:scale-110 animate-pulse-glow"
          >
            Show Me a Wish ✨
          </button>
        </div>
      )}
    </div>
  );
}