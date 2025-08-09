import React, { useState, useEffect } from 'react';

type Wish = {
  id: number;
  title: string;
  isGranted: boolean;
};

function App() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState('');

  // 1) Load wishes on mount
  useEffect(() => {
    fetch('/api/wishes')
      .then(res => res.json())
      .then(data => setWishes(data))
      .catch(err => console.error('Error loading wishes:', err));
  }, []);

  // 2) Add new wish
  const handleAddWish = async () => {
    if (!newWish.trim()) return;
    const res = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newWish }),
    });
    const updatedWishes = await res.json();
    setWishes(updatedWishes);
    setNewWish('');
  };

  // 3) Mark wish as granted
  const handleGrantWish = async (id: number) => {
    const res = await fetch(`/api/wishes/${id}/grant`, { method: 'PUT' });
    const updatedWishes = await res.json();
    setWishes(updatedWishes);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">✨ Wish List</h1>

      {/* Add Wish */}
      <div className="flex gap-2 mb-4">
        <input
          value={newWish}
          onChange={(e) => setNewWish(e.target.value)}
          placeholder="What's your wish?"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleAddWish}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Wish List */}
      <ul className="space-y-2">
        {wishes.map(wish => (
          <li
            key={wish.id}
            className="flex justify-between items-center p-3 border rounded"
          >
            <span className={wish.isGranted ? 'line-through text-gray-500' : ''}>
              {wish.title}
            </span>
            {!wish.isGranted && (
              <button
                onClick={() => handleGrantWish(wish.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Grant
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
