import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Wish } from '../types';

interface PostWishProps {
  onClose: () => void;
  onSubmit: (wish: Omit<Wish, 'id' | 'createdAt' | 'isGranted'>) => void;
}

export default function PostWish({ onClose, onSubmit }: PostWishProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Wish['category']>('wholesome');
  const [priceRange, setPriceRange] = useState('$1-$50');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Easter egg for "more wishes"
    if (title.toLowerCase().includes('more wish') || title.toLowerCase().includes('extra wish')) {
      alert("bestie... you can't wish for more wishes 💀 that's not how this works fr");
      return;
    }

    onSubmit({
      title,
      description,
      category,
      priceRange,
      imageUrl: imageUrl || undefined,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fadeInUp">
      <div className="glass-effect rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideInLeft">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-400 animate-bounce-gentle" />
            Make a Wish
          </h2>
          <button
            onClick={onClose}
            className="text-blue-300 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              What do you wish for? ✨
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
              placeholder="I want a lifetime supply of bubble tea..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Tell us more (the tea ☕)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
              placeholder="Why do you need this? Make it compelling bestie..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Vibe check 🎭
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Wish['category'])}
              className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
            >
              <option value="wholesome">Wholesome 🥺</option>
              <option value="funny">Funny 😂</option>
              <option value="weird">Weird 🤪</option>
              <option value="life-changing">Life-changing ✨</option>
              <option value="whimsical">Whimsical 🌈</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              How much we talking? 💸
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
            >
              <option value="Free">Free (just vibes)</option>
              <option value="$1-$50">$1-$50 (coffee money)</option>
              <option value="$51-$200">$51-$200 (nice dinner)</option>
              <option value="$201-$1000">$201-$1000 (splurge territory)</option>
              <option value="$1000+">$1000+ (dreaming big)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
  Upload Image (optional but slay 📸)
</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // store base64 data in state
      };
      reader.readAsDataURL(file);
    }
  }}
  className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
/>
        
          </div>

          <button
            type="submit"
            disabled={!title.trim() || !description.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed animate-pulse-glow"
          >
            Send to the Universe 🚀
          </button>
        </form>
      </div>
    </div>
  );
}