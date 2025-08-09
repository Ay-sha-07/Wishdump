import React from 'react';
import { Wish } from '../types';
import WishCard from './WishCard';

interface WishFeedProps {
  wishes: Wish[];
  selectedCategory: string;
  onFulfill: (wish: Wish) => void;
}

export default function WishFeed({ wishes, selectedCategory, onFulfill }: WishFeedProps) {
  const filteredWishes = selectedCategory === 'all' 
    ? wishes 
    : wishes.filter(wish => wish.category === selectedCategory);

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {selectedCategory === 'all' ? 'All Wishes' : `${selectedCategory} wishes`} 
          <span className="text-blue-400 animate-bounce-gentle"> ({filteredWishes.length})</span>
        </h2>
        <p className="text-blue-200">Dreams waiting to be fulfilled ✨</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWishes.map((wish) => (
          <WishCard key={wish.id} wish={wish} onFulfill={onFulfill} />
        ))}
      </div>

      {filteredWishes.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 animate-float">🌟</div>
          <h3 className="text-xl font-semibold text-white mb-2">No wishes here yet</h3>
          <p className="text-blue-200">Be the first to dream big!</p>
        </div>
      )}
    </div>
  );
}