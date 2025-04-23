'use client';
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Organic'];

const SearchBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for "${searchTerm}" in "${selectedCategory}"`);
  };

  return (
    <form onSubmit={handleSearch} className="mx-1 flex items-center justify-center mt-6">
      <div className="relative w-full max-w-3xl rounded-full shadow-md flex bg-white overflow-visible border border-gray-300">

        {/* Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex items-center gap-1 px-4 py-2 text-sm bg-green-100 text-green-900 hover:bg-green-200 rounded-l-full"
          >
            {selectedCategory}
            <ChevronDown className="w-4 h-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="text-sm text-gray-700">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                      className="w-full text-left px-4 py-2 hover:bg-green-50"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search all..."
          className="flex-1 px-4 py-2 outline-none text-sm text-gray-700 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Search button */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-r-full"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
