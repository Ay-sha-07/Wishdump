import React from 'react';
import { Star, Sparkles } from 'lucide-react';

interface HeaderProps {
  onPostWish: () => void;
}

export default function Header({ onPostWish }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-black via-blue-900 to-black border-b border-blue-500/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-shimmer"></div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative animate-float">
              <Star className="w-8 h-8 text-blue-400 fill-blue-400 animate-pulse-glow" />
              <Sparkles className="w-4 h-4 text-blue-300 absolute -top-1 -right-1 animate-bounce-gentle" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text animate-slideInLeft">
                Wishdump
              </h1>
              <p className="text-blue-200 text-sm animate-fadeInUp">where dreams meet reality ✨</p>
            </div>
          </div>
          
          <button
            onClick={onPostWish}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-blue-500/50 animate-pulse-glow hover-lift"
          >
            Make a Wish ⭐
          </button>
        </div>
      </div>
    </header>
  );
}