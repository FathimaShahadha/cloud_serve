import React, { useState, useMemo } from 'react';
import {
  SearchIcon,
  MapPinIcon,
  StarIcon,
  FilterIcon,
  SlidersHorizontalIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  ZapIcon,
  DropletsIcon,
  SparklesIcon,
  BookOpenIcon,
  ScissorsIcon,
  WindIcon,
  PaintbrushIcon,
  HammerIcon,
  LeafIcon,
  BugIcon
} from 'lucide-react';
import { CATEGORIES, CITIES, Provider } from '../data/mockData';

interface ServicesPageProps {
  providers: Provider[];
  onNavigate: (page: string) => void;
  onSelectProvider: (providerId: string) => void;
  selectedCategory?: string;
  selectedCity?: string;
  initialSearch?: string;
}

export function ServicesPage({
  providers,
  onNavigate,
  onSelectProvider,
  selectedCategory: initialCategory = '',
  selectedCity: initialCity = '',
  initialSearch = ''
}: ServicesPageProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.bio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory
        ? provider.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;

      const matchesCity = selectedCity
        ? provider.city.toLowerCase() === selectedCity.toLowerCase()
        : true;

      const matchesRating = provider.rating >= minRating;
      const matchesPrice = provider.hourlyRate <= maxPrice;

      return matchesSearch && matchesCategory && matchesCity && matchesRating && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return b.rating - a.rating; // Default: Highest Rated
    });
  }, [providers, searchTerm, selectedCategory, selectedCity, minRating, maxPrice, sortBy]);

  const handleProviderAction = (providerId: string, page: 'provider-profile' | 'booking') => {
    onSelectProvider(providerId);
    onNavigate(page);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCity('');
    setMinRating(0);
    setMaxPrice(20000);
    setSortBy('rating');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 animate-fade-in">
      {/* Search Header */}
      <div className="bg-primary text-white py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold mb-2">
            Find Sri Lankan Service Professionals
          </h1>
          <p className="text-blue-100 text-sm mb-6">
            Compare verified electricians, plumbers, cleaners, tutors, and beauticians across Sri Lanka.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, service, or keyword..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-64 relative">
              <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-12 pr-10 py-3.5 rounded-xl text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-secondary bg-white text-sm cursor-pointer"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Sri Lanka Cities</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <button
              className="md:hidden btn bg-white/10 text-white hover:bg-white/20 py-3 flex items-center justify-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon className="h-5 w-5" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24 space-y-6">
            <div className="flex items-center justify-between font-bold text-gray-900 pb-4 border-b border-gray-100">
              <span className="flex items-center gap-2"><SlidersHorizontalIcon className="h-5 w-5 text-primary" /> Filter Results</span>
              {(selectedCategory || selectedCity || minRating > 0 || searchTerm) && (
                <button onClick={clearFilters} className="text-xs text-secondary hover:underline font-normal">
                  Reset All
                </button>
              )}
            </div>

            {/* Category Radio Group */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Service Category</h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                <label className="flex items-center gap-3 cursor-pointer group text-xs text-gray-700">
                  <input
                    type="radio"
                    name="category"
                    className="text-primary focus:ring-primary h-4 w-4"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                  />
                  <span className="group-hover:text-primary transition-colors">All Categories</span>
                </label>
                {CATEGORIES.map((category) => (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer group text-xs text-gray-700">
                    <input
                      type="radio"
                      name="category"
                      className="text-primary focus:ring-primary h-4 w-4"
                      checked={selectedCategory.toLowerCase() === category.name.toLowerCase()}
                      onChange={() => setSelectedCategory(category.name)}
                    />
                    <span className="group-hover:text-primary transition-colors flex-1">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Minimum Rating</h3>
              <div className="space-y-2">
                {[0, 4.8, 4.5, 4.0].map((rating) => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer text-xs text-gray-700">
                    <input
                      type="radio"
                      name="rating"
                      className="text-primary focus:ring-primary h-4 w-4"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                    />
                    <span>{rating === 0 ? 'Any Rating' : `${rating} Stars & Up`}</span>
                    {rating > 0 && <StarIcon className="h-3 w-3 text-accent fill-current" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-900 mb-2">
                <span>Max Hourly Rate</span>
                <span className="text-primary font-bold">Rs. {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Rs. 1,000</span>
                <span>Rs. 20,000</span>
              </div>
            </div>

            <button
              className="w-full py-2.5 text-xs text-gray-600 hover:text-primary font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredProviders.length} Sri Lankan Professionals Available
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs border-gray-300 rounded-xl py-2 pl-3 pr-8 focus:ring-primary focus:border-primary bg-white shadow-sm"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>

          {filteredProviders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No providers match your filter</h3>
              <p className="text-gray-500 text-sm mb-4">Try broadening your search term, city, or clearing active filters.</p>
              <button onClick={clearFilters} className="btn btn-outline py-2 px-6 text-sm">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <div key={provider.id} className="card flex flex-col h-full hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="p-5 flex gap-4 items-start">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="font-bold text-gray-900 leading-tight truncate">{provider.name}</h3>
                        <ShieldCheckIcon className="h-4 w-4 text-success flex-shrink-0" title="Verified Sri Lankan Provider" />
                      </div>
                      <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{provider.category}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPinIcon className="h-3.5 w-3.5 mr-1 text-gray-400" /> {provider.city}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                      {provider.bio}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-accent fill-current" />
                        <span className="font-bold text-gray-900 text-sm">{provider.rating}</span>
                        <span className="text-xs text-gray-400">({provider.reviews})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">Rate</span>
                        <span className="text-sm font-extrabold text-primary">
                          Rs. {provider.hourlyRate.toLocaleString()} <span className="text-[10px] font-normal text-gray-500">/hr</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                    <button
                      onClick={() => handleProviderAction(provider.id, 'provider-profile')}
                      className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 flex-1 text-xs py-2.5 font-semibold"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleProviderAction(provider.id, 'booking')}
                      className="btn btn-primary flex-1 text-xs py-2.5 font-semibold shadow-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}