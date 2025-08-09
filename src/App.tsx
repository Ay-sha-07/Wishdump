import React, { useState, useEffect } from 'react';
import { Wish, WishGranter } from './types';
import Header from './components/Header';
import WishFeed from './components/WishFeed';
import PostWish from './components/PostWish';
import FulfillWish from './components/FulfillWish';
import Leaderboard from './components/Leaderboard';
import CategoryFilter from './components/CategoryFilter';
import RandomWish from './components/RandomWish';

// Sample data for demo
const sampleWishes: Wish[] = [
  {
    id: '1',
    title: 'A lifetime supply of bubble tea',
    description: 'I\'m literally addicted to bubble tea and my wallet is crying. Someone please sponsor my boba addiction 🥺',
    category: 'wholesome',
    priceRange: '$201-$1000',
    imageUrl: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg',
    isGranted: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'A pink Lamborghini (no cap)',
    description: 'I know this is wild but imagine me pulling up to Starbucks in a hot pink Lambo. The aesthetic would be unmatched fr fr',
    category: 'whimsical',
    priceRange: '$1000+',
    imageUrl: 'https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg',
    isGranted: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Help me pay for my dog\'s surgery',
    description: 'My baby needs surgery and vet bills are expensive. Any help would mean the world to us 🐕💙',
    category: 'wholesome',
    priceRange: '$201-$1000',
    imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    isGranted: true,
    grantedBy: 'Anonymous Angel',
    createdAt: new Date(),
    grantedAt: new Date(),
  },
  {
    id: '4',
    title: 'A rubber duck collection',
    description: 'I want to start a rubber duck collection but make it ✨aesthetic✨. Different colors, maybe some with little hats?',
    category: 'funny',
    priceRange: '$1-$50',
    isGranted: false,
    createdAt: new Date(),
  },
  {
    id: '5',
    title: 'Someone to teach me how to adult properly',
    description: 'I\'m 23 and still don\'t know how to do taxes or cook anything beyond ramen. Send help (and maybe a life coach)',
    category: 'funny',
    priceRange: '$51-$200',
    isGranted: false,
    createdAt: new Date(),
  },
];

const sampleGranters: WishGranter[] = [
  { id: '1', name: 'Anonymous Angel', wishesGranted: 12, totalSpent: 2500 },
  { id: '2', name: 'Crypto Chad', wishesGranted: 8, totalSpent: 15000 },
  { id: '3', name: 'Generous Gen-Z', wishesGranted: 6, totalSpent: 890 },
];

function App() {
  const [wishes, setWishes] = useState<Wish[]>(sampleWishes);
  const [granters, setGranters] = useState<WishGranter[]>(sampleGranters);
  const [showPostWish, setShowPostWish] = useState(false);
  const [fulfillWish, setFulfillWish] = useState<Wish | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [randomWish, setRandomWish] = useState<Wish | null>(null);

  const handlePostWish = (newWish: Omit<Wish, 'id' | 'createdAt' | 'isGranted'>) => {
    const wish: Wish = {
      ...newWish,
      id: Date.now().toString(),
      isGranted: false,
      createdAt: new Date(),
    };
    setWishes([wish, ...wishes]);
  };

  const handleFulfillWish = (wish: Wish, granterName?: string) => {
    setWishes(wishes.map(w => 
      w.id === wish.id 
        ? { ...w, isGranted: true, grantedBy: granterName || 'Anonymous Angel', grantedAt: new Date() }
        : w
    ));

    // Update leaderboard
    const granter = granters.find(g => g.name === (granterName || 'Anonymous Angel'));
    if (granter) {
      setGranters(granters.map(g => 
        g.id === granter.id 
          ? { ...g, wishesGranted: g.wishesGranted + 1, totalSpent: g.totalSpent + 100 }
          : g
      ));
    } else {
      const newGranter: WishGranter = {
        id: Date.now().toString(),
        name: granterName || 'Anonymous Angel',
        wishesGranted: 1,
        totalSpent: 100,
      };
      setGranters([...granters, newGranter]);
    }
  };

  const generateRandomWish = () => {
    const availableWishes = wishes.filter(w => !w.isGranted);
    if (availableWishes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableWishes.length);
      setRandomWish(availableWishes[randomIndex]);
    }
  };

  // Wish of the day (random seed based on date)
  const [wishOfTheDay, setWishOfTheDay] = useState<Wish | null>(null);
  
  useEffect(() => {
    const today = new Date().toDateString();
    const availableWishes = wishes.filter(w => !w.isGranted);
    if (availableWishes.length > 0) {
      // Use date as seed for consistent "random" wish of the day
      const seed = today.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
      const index = Math.abs(seed) % availableWishes.length;
      setWishOfTheDay(availableWishes[index]);
    }
  }, [wishes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/30 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Header onPostWish={() => setShowPostWish(true)} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Wish of the Day */}
        {wishOfTheDay && (
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-700/20 border border-blue-500/40 rounded-2xl p-6 animate-fadeInUp hover-lift">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white mb-2 animate-bounce-gentle">✨ Wish of the Day ✨</h2>
              <p className="text-blue-200">The universe has chosen...</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="glass-effect rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">{wishOfTheDay.title}</h3>
                <p className="text-blue-100 mb-4">{wishOfTheDay.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-semibold">{wishOfTheDay.priceRange}</span>
                  <button
                    onClick={() => setFulfillWish(wishOfTheDay)}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-500 transform hover:scale-110 animate-pulse-glow"
                  >
                    Grant This Wish 🌟
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Random Wish Generator */}
        <RandomWish 
          wish={randomWish}
          onGenerate={generateRandomWish}
          onFulfill={setFulfillWish}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <WishFeed 
              wishes={wishes}
              selectedCategory={selectedCategory}
              onFulfill={setFulfillWish}
            />
          </div>
          
          <div className="lg:col-span-1">
            <Leaderboard granters={granters} />
          </div>
        </div>
      </main>

      {showPostWish && (
        <PostWish
          onClose={() => setShowPostWish(false)}
          onSubmit={handlePostWish}
        />
      )}

      {fulfillWish && (
        <FulfillWish
          wish={fulfillWish}
          onClose={() => setFulfillWish(null)}
          onFulfill={handleFulfillWish}
        />
      )}
    </div>
  );
}

export default App;