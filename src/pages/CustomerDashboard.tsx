import React, { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  SettingsIcon,
  CreditCardIcon,
  LogOutIcon,
  SparklesIcon,
  GiftIcon,
  CrownIcon,
  BellIcon,
  LayoutDashboardIcon,
  XIcon,
  CheckCircleIcon,
  PhoneIcon,
  ShieldCheckIcon
} from 'lucide-react';
import { Booking, Provider, Review } from '../data/mockData';
import { BookingTracker } from '../components/BookingTracker';

interface CustomerDashboardProps {
  user: any;
  bookings: Booking[];
  providers: Provider[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onSubmitReview: (providerId: string, rating: number, comment: string) => void;
  onSelectProvider: (providerId: string) => void;
  onShowToast: (msg: string) => void;
}

export function CustomerDashboard({
  user,
  bookings,
  providers,
  onNavigate,
  onLogout,
  onUpdateBookingStatus,
  onSubmitReview,
  onSelectProvider,
  onShowToast
}: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'settings'>('overview');
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);
  const [reviewModalBooking, setReviewModalBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [points, setPoints] = useState<number>(1450);
  const [isPrime, setIsPrime] = useState<boolean>(false);

  // Separate bookings
  const upcomingBookings = bookings.filter((b) =>
    ['pending', 'confirmed', 'in-progress'].includes(b.status)
  );
  const pastBookings = bookings.filter((b) =>
    ['completed', 'cancelled'].includes(b.status)
  );

  const getProvider = (id: string) => providers.find((p) => p.id === id) || providers[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    onUpdateBookingStatus(bookingId, 'cancelled');
    onShowToast('Booking has been cancelled.');
    setSelectedBookingForDetails(null);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalBooking) return;
    onSubmitReview(reviewModalBooking.providerId, reviewRating, reviewComment);
    onShowToast('Thank you! Your review has been published.');
    setReviewModalBooking(null);
    setReviewComment('');
  };

  const handleRedeemPoints = () => {
    if (points >= 500) {
      setPoints(points - 500);
      onShowToast('Redeemed Rs. 500 discount voucher!');
    } else {
      onShowToast('Minimum 500 Cloud Points required.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-md">
              {user?.name?.charAt(0) || 'N'}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">
                Ayubowan, {user?.name || 'Nishantha Silva'}!
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                Manage your local Sri Lankan bookings, Cloud Points, and profile preferences.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="btn btn-primary shadow-sm text-sm py-3 px-6"
          >
            + Book New Service
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all border-l-4 ${
                    activeTab === 'overview'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <LayoutDashboardIcon className="h-5 w-5" /> Overview
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`flex items-center justify-between px-6 py-4 text-sm font-semibold transition-all border-l-4 ${
                    activeTab === 'bookings'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-3"><CalendarIcon className="h-5 w-5" /> My Bookings</span>
                  {upcomingBookings.length > 0 && (
                    <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {upcomingBookings.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all border-l-4 ${
                    activeTab === 'settings'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <SettingsIcon className="h-5 w-5" /> Account Settings
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-3 px-6 py-4 text-sm font-semibold text-error hover:bg-red-50 transition-colors border-l-4 border-transparent"
                >
                  <LogOutIcon className="h-5 w-5" /> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                {/* Cloud Points & Prime Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                    <GiftIcon className="absolute -right-4 -bottom-4 h-32 w-32 text-white/10" />
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2"><SparklesIcon className="h-5 w-5 text-accent" /> Cloud Points</h3>
                    <p className="text-blue-100 text-xs mb-4">Earn 10 points for every Rs. 100 spent on bookings.</p>
                    <div className="text-4xl font-extrabold mb-4">{points} <span className="text-sm font-normal opacity-80">pts</span></div>
                    <button onClick={handleRedeemPoints} className="bg-white text-primary text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                      Redeem for Rs. 500 Voucher
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden border border-gray-700">
                    <CrownIcon className="absolute -right-4 -bottom-4 h-32 w-32 text-white/5" />
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-bold text-lg flex items-center gap-2 text-yellow-400"><CrownIcon className="h-5 w-5" /> CloudServe Prime</h3>
                       <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${isPrime ? 'bg-green-500 text-white' : 'bg-white/20 text-gray-200'}`}>
                         {isPrime ? 'Active Member' : 'Not Active'}
                       </span>
                    </div>
                    <p className="text-gray-300 text-xs mb-4">Priority scheduling, zero surge fees, and 10% cash discount on all services.</p>
                    <div className="text-2xl font-bold mb-4">Rs. 990 <span className="text-xs font-normal text-gray-400">/ month</span></div>
                    <button
                      onClick={() => { setIsPrime(!isPrime); onShowToast(isPrime ? 'Prime Subscription paused.' : 'Welcome to CloudServe Prime!'); }}
                      className="bg-yellow-400 text-gray-900 text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm hover:bg-yellow-300 transition-colors"
                    >
                      {isPrime ? 'Manage Subscription' : 'Activate Prime Membership'}
                    </button>
                  </div>
                </div>

                {/* Recommended Providers */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <SparklesIcon className="h-5 w-5 text-accent" /> Recommended Sri Lankan Experts
                  </h2>
                  <p className="text-xs text-gray-500 mb-4">Based on top customer reviews and nearby availability.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {providers.slice(0, 3).map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center relative hover:shadow-md transition-all">
                        <div className="absolute top-3 right-3 bg-accent/10 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Top Match
                        </div>
                        <img src={p.avatar} alt={p.name} className="h-20 w-20 rounded-full object-cover mb-3 shadow-sm border-2 border-primary/20" />
                        <h3 className="font-bold text-gray-900 text-base">{p.name}</h3>
                        <p className="text-xs text-secondary font-semibold uppercase mb-2">{p.category} • {p.city}</p>
                        <div className="flex items-center gap-1 text-xs bg-gray-50 px-3 py-1 rounded-full mb-4">
                          <StarIcon className="h-3.5 w-3.5 text-accent fill-current" /> <span className="font-bold">{p.rating}</span> ({p.reviews})
                        </div>
                        <button
                          onClick={() => { onSelectProvider(p.id); onNavigate('provider-profile'); }}
                          className="btn btn-outline w-full text-xs py-2 font-semibold"
                        >
                          View Profile & Book
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-8 animate-fade-in">
                {/* Active Tracker */}
                {upcomingBookings.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Current Active Service Status</h2>
                    <BookingTracker
                      status={upcomingBookings[0].status}
                      providerName={getProvider(upcomingBookings[0].providerId).name}
                      estimatedTime={`${upcomingBookings[0].date} at ${upcomingBookings[0].time}`}
                    />
                  </div>
                )}

                {/* Upcoming Bookings */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
                  {upcomingBookings.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500 text-sm">
                      No active upcoming appointments.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => {
                        const provider = getProvider(booking.providerId);
                        return (
                          <div
                            key={booking.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row gap-5 items-start md:items-center hover:shadow-md transition-all"
                          >
                            <img src={provider.avatar} alt={provider.name} className="h-16 w-16 rounded-full object-cover border-2 border-gray-100 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="font-bold text-gray-900 text-base">{booking.serviceName}</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                                  {booking.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">With <span className="font-bold text-gray-800">{provider.name}</span> ({provider.phone || '+94 77 123 4567'})</p>
                              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                <span className="flex items-center"><CalendarIcon className="h-3.5 w-3.5 mr-1 text-primary" /> {booking.date}</span>
                                <span className="flex items-center"><ClockIcon className="h-3.5 w-3.5 mr-1 text-primary" /> {booking.time}</span>
                                <span className="flex items-center"><MapPinIcon className="h-3.5 w-3.5 mr-1 text-primary" /> {booking.address}</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full md:w-auto text-right">
                              <span className="font-extrabold text-primary text-base">Rs. {booking.amount.toLocaleString()}</span>
                              <div className="flex gap-2">
                                <button onClick={() => setSelectedBookingForDetails(booking)} className="btn btn-outline text-xs py-1.5 px-3 flex-1">
                                  View Details
                                </button>
                                <button onClick={() => handleCancelBooking(booking.id)} className="btn bg-white border border-red-200 text-error hover:bg-red-50 text-xs py-1.5 px-3">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Past Bookings */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Past Completed Services</h2>
                  <div className="space-y-4">
                    {pastBookings.map((booking) => {
                      const provider = getProvider(booking.providerId);
                      return (
                        <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col md:flex-row gap-5 items-start md:items-center">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 text-sm">{booking.serviceName}</h3>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">With {provider.name} on {booking.date}</p>
                            <span className="font-bold text-gray-900 text-sm">Rs. {booking.amount.toLocaleString()}</span>
                          </div>
                          {booking.status === 'completed' && (
                            <button
                              onClick={() => setReviewModalBooking(booking)}
                              className="btn bg-accent text-white hover:bg-accent-dark text-xs py-2 px-4 flex items-center gap-1.5 w-full md:w-auto font-semibold"
                            >
                              <StarIcon className="h-4 w-4" /> Leave Review
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                  Account Preferences
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); onShowToast('Profile settings saved.'); }} className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Full Name</label>
                      <input type="text" className="input-field" defaultValue={user?.name || 'Nishantha Silva'} />
                    </div>
                    <div>
                      <label className="label">Email Address</label>
                      <input type="email" className="input-field" defaultValue={user?.email || 'nishantha.s@example.lk'} />
                    </div>
                    <div>
                      <label className="label">Sri Lankan Phone Number</label>
                      <input type="tel" className="input-field" defaultValue="+94 77 123 4567" />
                    </div>
                    <div>
                      <label className="label">City</label>
                      <input type="text" className="input-field" defaultValue="Colombo" />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><BellIcon className="h-5 w-5" /> SMS & Email Alerts</h3>
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900">SMS Notifications upon Provider Arrival</p>
                          <p className="text-gray-500">Get text alert when provider is on the way.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900">Email Booking Receipts</p>
                          <p className="text-gray-500">Receive tax invoice receipts for all completed jobs.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 flex justify-end">
                    <button type="submit" className="btn btn-primary px-8 py-3 text-xs font-bold">
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full p-6 relative animate-slide-up">
            <button onClick={() => setSelectedBookingForDetails(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <XIcon className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Booking Information</h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-mono font-bold text-primary">#CS-2026-{selectedBookingForDetails.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service</span>
                <span className="font-bold text-gray-900">{selectedBookingForDetails.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Provider</span>
                <span className="font-bold text-gray-900">{getProvider(selectedBookingForDetails.providerId).name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Provider Phone</span>
                <span className="font-bold text-primary">{getProvider(selectedBookingForDetails.providerId).phone || '+94 77 123 4567'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date & Time</span>
                <span className="font-bold text-gray-900">{selectedBookingForDetails.date} at {selectedBookingForDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service Location</span>
                <span className="font-bold text-gray-900">{selectedBookingForDetails.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Status</span>
                <span className="font-bold text-success">Confirmed (Rs. {selectedBookingForDetails.amount.toLocaleString()})</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => setSelectedBookingForDetails(null)} className="btn btn-outline text-xs py-2 px-4">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModalBooking && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full p-6 relative animate-slide-up">
            <button onClick={() => setReviewModalBooking(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <XIcon className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Leave a Review</h3>
            <p className="text-xs text-gray-500 mb-4">How was your service with {getProvider(reviewModalBooking.providerId).name}?</p>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="label">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button type="button" key={star} onClick={() => setReviewRating(star)}>
                      <StarIcon className={`h-7 w-7 ${star <= reviewRating ? 'text-accent fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Your Experience & Feedback</label>
                <textarea rows={3} required value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} className="input-field resize-none" placeholder="Punctuality, quality of work, cleanliness..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full py-3 text-xs font-bold">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}