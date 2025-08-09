import React from 'react';
import { Heart, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { Wish } from '../types';

interface WishCardProps {
  wish: Wish;
  onFulfill: (wish: Wish) => void;
}

const categoryEmojis = {
  funny: '😂',
  weird: '🤪',
  wholesome: '🥺',
  'life-changing': '✨',
  whimsical: '🌈'
};

export default function WishCard({ wish, onFulfill }: WishCardProps) {
  return (
    <div className="glass-effect rounded-2xl p-6 hover-lift animate-fadeInUp group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      {wish.imageUrl && (
        <div className="w-full h-48 bg-black/50 rounded-lg mb-4 overflow-hidden relative">
          <img src={wish.imageUrl} alt={wish.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}
      
      <div className="space-y-4 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{categoryEmojis[wish.category]}</span>
              <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded-full capitalize animate-bounce-gentle">
                {wish.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{wish.title}</h3>
            <p className="text-blue-100 text-sm leading-relaxed">{wish.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-blue-500/20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-blue-300">
              {wish.isGranted ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400 animate-bounce-gentle" />
                  <span className="text-sm text-green-400 font-medium animate-pulse">Granted! ✨</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 animate-rotate-slow" />
                  <span className="text-sm">Still dreaming...</span>
                </>
              )}
            </div>
            <span className="text-blue-400 font-semibold">{wish.priceRange}</span>
          </div>

          {!wish.isGranted && (
            <button
              onClick={() => onFulfill(wish)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 transform hover:scale-110 flex items-center space-x-1 animate-pulse-glow"
            >
              <Heart className="w-4 h-4 animate-bounce-gentle" />
              <span>Grant Wish</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}