import React, { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { Wish } from '../types';

interface FulfillWishProps {
  wish: Wish;
  onClose: () => void;
  onFulfill: (wish: Wish, granterName?: string) => void;
}

export default function FulfillWish({ wish, onClose, onFulfill }: FulfillWishProps) {
  const [granterName, setGranterName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleFulfill = () => {
    onFulfill(wish, isAnonymous ? undefined : granterName || 'Anonymous Angel');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fadeInUp">
      <div className="glass-effect rounded-2xl p-8 max-w-md w-full animate-slideInLeft">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-blue-400 fill-blue-400 animate-bounce-gentle" />
            Grant a Wish
          </h2>
          <button
            onClick={onClose}
            className="text-blue-300 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-black/30 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{wish.title}</h3>
            <p className="text-blue-100 text-sm mb-3">{wish.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-semibold">{wish.priceRange}</span>
              <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded-full capitalize">
                {wish.category}
              </span>
            </div>
          </div>

          <div>
            <p className="text-blue-100 text-sm mb-4">
              You're about to make someone's day! ✨ This is completely anonymous and secure.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-black/50 border-blue-500/30 rounded focus:ring-blue-500"
                  />
                  <span className="text-blue-200">Stay anonymous (recommended)</span>
                </label>
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Name for leaderboard (optional)
                  </label>
                  <input
                    type="text"
                    value={granterName}
                    onChange={(e) => setGranterName(e.target.value)}
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                    placeholder="Your fairy godparent name..."
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">How it works:</h4>
            <ul className="text-blue-100 text-sm space-y-1">
              <li>• Secure checkout through our platform</li>
              <li>• Direct shipping to recipient (no contact)</li>
              <li>• 100% anonymous (unless you choose otherwise)</li>
              <li>• Warm fuzzy feelings guaranteed 💜</li>
            </ul>
          </div>

          <button
            onClick={handleFulfill}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2 animate-pulse-glow"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span>Grant This Wish 🌟</span>
          </button>
        </div>
      </div>
    </div>
  );
}