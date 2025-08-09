import React from 'react';
import { Trophy, Crown, Star } from 'lucide-react';
import { WishGranter } from '../types';

interface LeaderboardProps {
  granters: WishGranter[];
}

export default function Leaderboard({ granters }: LeaderboardProps) {
  const sortedGranters = granters.sort((a, b) => b.wishesGranted - a.wishesGranted).slice(0, 10);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
      case 1:
        return <Trophy className="w-5 h-5 text-gray-300 fill-gray-300" />;
      case 2:
        return <Star className="w-5 h-5 text-amber-600 fill-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-slate-400 font-bold">{index + 1}</span>;
    }
  };

  const getRankText = (index: number) => {
    switch (index) {
      case 0: return "Fairy Godparent 👑";
      case 1: return "Wish Wizard ✨";
      case 2: return "Dream Dealer 🌟";
      default: return "Guardian Angel 😇";
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 animate-fadeInUp">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400 animate-bounce-gentle" />
          Leaderboard
        </h2>
        <p className="text-blue-200">Our most generous souls ✨</p>
      </div>

      {sortedGranters.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3 animate-float">👑</div>
          <p className="text-blue-200">Be the first to grant a wish!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedGranters.map((granter, index) => (
            <div
              key={granter.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-500 hover-lift ${
                index < 3 
                  ? 'bg-gradient-to-r from-blue-500/20 to-blue-700/20 border border-blue-500/40' 
                  : 'bg-black/30 border border-blue-500/20'
              }`}
            >
              <div className="flex items-center space-x-4">
                {getRankIcon(index)}
                <div>
                  <h3 className="text-white font-semibold">{granter.name}</h3>
                  <p className="text-blue-300 text-sm">{getRankText(index)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-400 font-bold">{granter.wishesGranted} wishes</p>
                <p className="text-blue-300 text-sm">${granter.totalSpent} granted</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}