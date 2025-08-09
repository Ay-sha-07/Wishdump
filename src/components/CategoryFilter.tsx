import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: 'all', label: 'All ✨', emoji: '✨' },
  { value: 'wholesome', label: 'Wholesome', emoji: '🥺' },
  { value: 'funny', label: 'Funny', emoji: '😂' },
  { value: 'weird', label: 'Weird', emoji: '🤪' },
  { value: 'life-changing', label: 'Life-changing', emoji: '✨' },
  { value: 'whimsical', label: 'Whimsical', emoji: '🌈' },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8 animate-fadeInUp">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-500 transform hover:scale-110 ${
            selectedCategory === category.value
              ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg animate-pulse-glow'
              : 'bg-black/30 border border-blue-500/20 text-blue-200 hover:bg-blue-500/10 hover:border-blue-400/40'
          }`}
        >
          <span className="mr-1">{category.emoji}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
}