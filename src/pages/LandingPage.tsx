import React, { useState } from 'react';
import {
  SearchIcon,
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowRightIcon,
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

interface LandingPageProps {
  providers: Provider[];
  onNavigate: (page: string) => void;
  onSelectProvider: (providerId: string) => void;
  onSelectCategory?: (categoryName: string) => void;
  onSelectCity?: (cityName: string) => void;
  onSearchTerm?: (term: string) => void;
}

export function LandingPage({
  providers,
  onNavigate,
  onSelectProvider,
  onSelectCategory,
  onSelectCity,
  onSearchTerm
}: LandingPageProps) {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const topProviders = providers.filter((p) => p.rating >= 4.7).slice(0, 4);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ZapIcon': return <ZapIcon className="h-7 w-7" />;
      case 'DropletsIcon': return <DropletsIcon className="h-7 w-7" />;
      case 'SparklesIcon': return <SparklesIcon className="h-7 w-7" />;
      case 'BookOpenIcon': return <BookOpenIcon className="h-7 w-7" />;
      case 'ScissorsIcon': return <ScissorsIcon className="h-7 w-7" />;
      case 'WindIcon': return <WindIcon className="h-7 w-7" />;
      case 'PaintbrushIcon': return <PaintbrushIcon className="h-7 w-7" />;
      case 'HammerIcon': return <HammerIcon className="h-7 w-7" />;
      case 'LeafIcon': return <LeafIcon className="h-7 w-7" />;
      case 'BugIcon': return <BugIcon className="h-7 w-7" />;
      default: return <CheckCircleIcon className="h-7 w-7" />;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchTerm) onSearchTerm(search);
    if (onSelectCity) onSelectCity(selectedCity);
    onNavigate('services');
  };

  const handleCategoryClick = (catName: string) => {
    if (onSelectCategory) onSelectCategory(catName);
    onNavigate('services');
  };

  const handleProviderClick = (providerId: string, action: 'profile' | 'booking') => {
    onSelectProvider(providerId);
    if (action === 'booking') {
      onNavigate('booking');
    } else {
      onNavigate('provider-profile');
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-secondary pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-blue-100 text-sm font-medium mb-6 border border-white/20">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              Sri Lanka's #1 Local Service Booking Platform 🇱🇰
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Trusted Local Services, Just a Few Clicks Away
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
              From electricians in Colombo to tutors in Kandy and cleaners in Negombo. Book background-verified Sri Lankan professionals with transparent pricing.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearchSubmit} className="bg-white p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3 border border-gray-100">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What service do you need? (e.g. Electrician, Plumbing, Tutor)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-secondary bg-gray-50 text-gray-900 placeholder:text-gray-400 text-sm md:text-base"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="md:w-64 relative">
                <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-12 pr-8 py-4 rounded-xl border-none focus:ring-2 focus:ring-secondary bg-gray-50 text-gray-900 text-sm md:text-base appearance-none cursor-pointer"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">All Sri Lanka Locations</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-accent py-4 px-8 rounded-xl text-base font-bold shadow-lg shadow-accent/30 md:w-auto w-full flex items-center justify-center gap-2"
              >
                <SearchIcon className="h-5 w-5" /> Find Services
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100 py-8 relative -mt-10 z-20 max-w-6xl mx-auto rounded-2xl shadow-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
          <div>
            <p className="text-3xl font-extrabold text-primary mb-1">15,000+</p>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Bookings Completed
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary mb-1">1,200+</p>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Verified Providers
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary mb-1">20+</p>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Sri Lankan Cities</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary mb-1">4.9 ★</p>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Popular Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Find qualified experts for home repairs, education, personal beauty, and maintenance across Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-secondary transition-all duration-300 group text-center flex flex-col items-center"
              >
                <div className="h-14 w-14 bg-blue-50 text-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors shadow-sm">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {category.providerCount} Providers
                </p>
              </button>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('services')}
              className="btn btn-outline inline-flex items-center gap-2 px-8 py-3"
            >
              Browse All Services <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How CloudServe Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting reliable service done at your home or business in 4 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-100 -z-0"></div>

            <div className="text-center relative z-10 bg-white p-4">
              <div className="h-20 w-20 bg-blue-50 border-4 border-blue-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <SearchIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">1. Find Service</h3>
              <p className="text-gray-600 text-sm">Search by service type or your Sri Lankan city.</p>
            </div>

            <div className="text-center relative z-10 bg-white p-4">
              <div className="h-20 w-20 bg-blue-50 border-4 border-blue-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircleIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">2. Choose Professional</h3>
              <p className="text-gray-600 text-sm">Compare ratings, reviews, experience, and hourly rates in LKR.</p>
            </div>

            <div className="text-center relative z-10 bg-white p-4">
              <div className="h-20 w-20 bg-blue-50 border-4 border-blue-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <ClockIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">3. Select Date & Slot</h3>
              <p className="text-gray-600 text-sm">Pick a convenient time slot and payment preference.</p>
            </div>

            <div className="text-center relative z-10 bg-white p-4">
              <div className="h-20 w-20 bg-blue-50 border-4 border-blue-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <StarIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">4. Get Service Done</h3>
              <p className="text-gray-600 text-sm">Provider arrives on time, completes the job, and you leave feedback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Top Rated Sri Lankan Professionals
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Background-checked experts with proven track records in local service.
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="hidden md:flex text-secondary font-medium hover:text-secondary-dark items-center gap-1"
            >
              See all providers <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topProviders.map((provider) => (
              <div
                key={provider.id}
                className="card group cursor-pointer flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300"
                onClick={() => handleProviderClick(provider.id, 'profile')}
              >
                <div className="h-52 bg-gray-200 relative overflow-hidden">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-gray-900 flex items-center gap-1 shadow-md">
                    <StarIcon className="h-3.5 w-3.5 text-accent fill-current" /> {provider.rating}
                  </div>
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {provider.city}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                      {provider.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {provider.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                      {provider.bio}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-auto">
                    <div>
                      <span className="text-xs text-gray-400 block">Starting rate</span>
                      <span className="font-extrabold text-primary text-base">
                        Rs. {provider.hourlyRate.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500"> /hr</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProviderClick(provider.id, 'booking');
                      }}
                      className="btn btn-primary text-xs py-2 px-3 shadow-md"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Are you a skilled professional in Sri Lanka?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Join CloudServe today. Expand your local customer base, manage your work schedule, and receive guaranteed payments.
              </p>
              <ul className="space-y-3 mb-8 text-white text-sm md:text-base">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircleIcon className="h-5 w-5 text-success" /> Set your own service rates in LKR
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircleIcon className="h-5 w-5 text-success" /> Choose your preferred working cities
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircleIcon className="h-5 w-5 text-success" /> Direct customer booking requests
                </li>
              </ul>
              <button
                onClick={() => onNavigate('auth')}
                className="btn btn-accent py-4 px-8 text-base font-bold shadow-lg"
              >
                Register as Provider
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional Provider"
                className="rounded-2xl shadow-2xl relative z-10 object-cover h-80 w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-4 border border-gray-100">
                <div className="h-12 w-12 bg-green-100 text-success rounded-full flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Verified Identity</p>
                  <p className="font-bold text-gray-900 text-sm">Trusted Sri Lankan Professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}