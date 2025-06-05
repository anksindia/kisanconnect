'use client';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Organic'];

const SearchBar = ({ setProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // 🔍 Live search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        try {
          const params = new URLSearchParams();
          if (searchTerm) params.append('keyword', searchTerm);
          if (selectedCategory !== 'All') params.append('category', selectedCategory.toLowerCase());

          const res = await fetch(`/api/products?${params.toString()}`);
          const data = await res.json();
          setProducts(data);
        } catch (err) {
          console.error('Search error:', err);
        }
      };

      fetchData();
    }, 400); // delay to prevent too many API calls

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCategory, setProducts]);

  return (
    <div className="w-full flex flex-col items-center my-6 px-2">
      {/* Search Input */}
      <div className="w-full max-w-3xl flex bg-white rounded-full shadow-md overflow-hidden border border-gray-300">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 text-sm text-gray-800 outline-none"
        />
        <div className="px-4 py-2 bg-green-500 text-white flex items-center justify-center">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedCategory === cat
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
