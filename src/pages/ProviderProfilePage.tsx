import React, { useState } from 'react';
import {
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ArrowLeftIcon,
  PhoneIcon,
  BriefcaseIcon
} from 'lucide-react';
import { Provider, Review, TIME_SLOTS } from '../data/mockData';
import { ReviewSystem } from '../components/ReviewSystem';

interface ProviderProfilePageProps {
  provider: Provider;
  reviews: Review[];
  onNavigate: (page: string) => void;
  onStartBooking: (providerId: string, serviceName?: string, date?: string, time?: string) => void;
  onSubmitReview?: (rating: number, comment: string) => void;
  canReview?: boolean;
}

export function ProviderProfilePage({
  provider,
  reviews,
  onNavigate,
  onStartBooking,
  onSubmitReview,
  canReview = false
}: ProviderProfilePageProps) {
  const providerReviews = reviews.filter((r) => r.providerId === provider.id);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Generate next 7 days for calendar
  const nextDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      date: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate()
    };
  });

  const handleBookingClick = () => {
    const selectedService = provider.services[selectedServiceIndex]?.name;
    onStartBooking(provider.id, selectedService, selectedDate, selectedTime);
    onNavigate('booking');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 animate-fade-in">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <button
            onClick={() => onNavigate('services')}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back to Services
          </button>
          <span className="text-xs text-gray-400">Sri Lankan Professional Verification ID: CS-PRO-{provider.id.toUpperCase()}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content (Left Column) */}
          <div className="lg:w-2/3 space-y-8">
            {/* Provider Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-36 bg-gradient-to-r from-primary-dark via-primary to-secondary relative">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                  Verified Sri Lankan Professional
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-8 relative">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-14 mb-6">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl border-4 border-white shadow-xl object-cover bg-white flex-shrink-0"
                  />
                  <div className="flex-1 pt-2 sm:pt-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        {provider.name}
                      </h1>
                      <ShieldCheckIcon className="h-6 w-6 text-success" title="Verified Sri Lankan Provider" />
                      <span className="bg-green-50 text-success text-xs font-bold px-2.5 py-0.5 rounded-full border border-green-200">
                        Available Today
                      </span>
                    </div>
                    <p className="text-secondary font-bold text-base mb-3 flex items-center gap-2">
                      <BriefcaseIcon className="h-4 w-4" /> {provider.category}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" /> {provider.city}, Sri Lanka
                      </span>
                      <span className="flex items-center font-bold text-gray-900">
                        <StarIcon className="h-4 w-4 mr-1 text-accent fill-current" /> {provider.rating} ({provider.reviews} reviews)
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1 text-gray-400" /> Joined {provider.memberSince}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">About {provider.name}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {provider.bio}
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Completed Jobs</p>
                    <p className="font-extrabold text-primary text-base">{provider.completedJobs}+</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Hourly Rate</p>
                    <p className="font-extrabold text-primary text-base">Rs. {provider.hourlyRate.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Verification</p>
                    <p className="font-bold text-success text-xs mt-1">NIC & Skill Checked</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Response Time</p>
                    <p className="font-bold text-gray-900 text-xs mt-1">&lt; 30 Mins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Services & Pricing
              </h3>
              <div className="space-y-4">
                {provider.services.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedServiceIndex(index)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                      selectedServiceIndex === index
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-100 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center mt-0.5 ${selectedServiceIndex === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                        <CheckCircleIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">{service.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {service.description || 'Professional execution with quality warranty.'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                      <span className="font-extrabold text-primary text-lg">
                        Rs. {service.price.toLocaleString()}
                      </span>
                      <span className={`text-xs font-bold ${selectedServiceIndex === index ? 'text-primary' : 'text-gray-400'}`}>
                        {selectedServiceIndex === index ? 'Selected' : 'Select'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <ReviewSystem
              reviews={providerReviews}
              averageRating={provider.rating}
              onSubmitReview={onSubmitReview}
              canReview={canReview}
            />
          </div>

          {/* Booking Sidebar (Right Column) */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book Service</h3>
              <p className="text-gray-500 text-xs mb-6">
                Selected: <span className="font-bold text-gray-800">{provider.services[selectedServiceIndex]?.name}</span>
              </p>

              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 font-medium">Service Price</span>
                  <span className="text-xl font-extrabold text-primary">
                    Rs. {provider.services[selectedServiceIndex]?.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-success font-medium mt-2">
                  <ShieldCheckIcon className="h-4 w-4 text-success" />
                  Free cancellation up to 2 hrs before
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" /> Select Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                  {nextDays.map((day) => (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDate(day.date)}
                      className={`flex-shrink-0 w-14 h-16 rounded-xl flex flex-col items-center justify-center border transition-all snap-start ${
                        selectedDate === day.date
                          ? 'bg-primary border-primary text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-primary'
                      }`}
                    >
                      <span className="text-[10px] font-medium uppercase">{day.dayName}</span>
                      <span className="text-base font-bold">{day.dayNum}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-8 animate-fade-in">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-primary" /> Select Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.slice(0, 6).map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                          selectedTime === time
                            ? 'bg-secondary border-secondary text-white shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-secondary'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleBookingClick}
                disabled={!selectedDate || !selectedTime}
                className="btn btn-primary w-full py-4 text-base shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Complete Booking
              </button>

              <p className="text-center text-[10px] text-gray-400 mt-4">
                No payment charged until final confirmation screen
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}