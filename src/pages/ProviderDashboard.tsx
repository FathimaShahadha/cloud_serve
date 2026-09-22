import React, { useState } from 'react';
import {
  LayoutDashboardIcon,
  CalendarIcon,
  DollarSignIcon,
  StarIcon,
  SettingsIcon,
  LogOutIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  BriefcaseIcon,
  MapPinIcon,
  MapIcon,
  BellIcon,
  PlusIcon,
  Edit2Icon,
  Trash2Icon,
  NavigationIcon,
  PhoneIcon,
  XIcon
} from 'lucide-react';
import { Booking, Provider, Review } from '../data/mockData';

interface ProviderDashboardProps {
  user: any;
  provider: Provider;
  bookings: Booking[];
  reviews: Review[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onUpdateProviderServices: (providerId: string, services: Provider['services']) => void;
  onShowToast: (msg: string) => void;
}

export function ProviderDashboard({
  user,
  provider,
  bookings,
  reviews,
  onNavigate,
  onLogout,
  onUpdateBookingStatus,
  onUpdateProviderServices,
  onShowToast
}: ProviderDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'route' | 'services' | 'earnings' | 'settings'>('overview');

  // Modals
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  // Provider's bookings
  const providerBookings = bookings.filter((b) => b.providerId === provider.id || b.providerId === 'p1');
  const pendingBookings = providerBookings.filter((b) => b.status === 'pending');
  const upcomingBookings = providerBookings.filter((b) => ['confirmed', 'in-progress'].includes(b.status));
  const completedBookings = providerBookings.filter((b) => b.status === 'completed');

  const totalEarnings = completedBookings.reduce((sum, b) => sum + b.amount, 0);

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

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newServicePrice) return;
    const updated = [
      ...provider.services,
      { name: newServiceName, price: Number(newServicePrice), description: newServiceDesc }
    ];
    onUpdateProviderServices(provider.id, updated);
    onShowToast(`Service "${newServiceName}" added successfully!`);
    setIsAddServiceOpen(false);
    setNewServiceName('');
    setNewServicePrice('');
    setNewServiceDesc('');
  };

  const handleDeleteService = (index: number) => {
    const updated = provider.services.filter((_, i) => i !== index);
    onUpdateProviderServices(provider.id, updated);
    onShowToast('Service removed.');
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-primary flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-extrabold text-gray-900">
                  Ayubowan, {provider.name}!
                </h1>
                <span className="bg-success/10 text-success text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircleIcon className="h-3.5 w-3.5" /> Verified Sri Lankan Pro
                </span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm">
                {provider.category} • {provider.city}, Sri Lanka
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100">
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                Overall Rating
              </p>
              <p className="text-lg font-extrabold text-gray-900 flex items-center gap-1 justify-end">
                {provider.rating} <StarIcon className="h-4 w-4 text-accent fill-current" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <nav className="flex flex-col">
                {[
                  { id: 'overview', label: 'Overview', icon: LayoutDashboardIcon },
                  { id: 'bookings', label: 'Job Requests', icon: CalendarIcon, badge: pendingBookings.length },
                  { id: 'route', label: 'Route Planner', icon: MapIcon },
                  { id: 'services', label: 'My Services', icon: BriefcaseIcon },
                  { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSignIcon },
                  { id: 'settings', label: 'Profile Settings', icon: SettingsIcon }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`flex items-center justify-between px-6 py-4 text-sm font-semibold transition-all border-l-4 ${
                        activeTab === item.id
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-transparent text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" /> {item.label}
                      </div>
                      {item.badge ? (
                        <span className="bg-error text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
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
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 bg-blue-50 text-secondary rounded-xl flex items-center justify-center">
                        <DollarSignIcon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-success flex items-center gap-1">
                        <TrendingUpIcon className="h-3 w-3" /> +15%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Total Earnings</p>
                    <h3 className="text-2xl font-extrabold text-gray-900">
                      Rs. {totalEarnings.toLocaleString()}
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 bg-green-50 text-success rounded-xl flex items-center justify-center">
                        <CheckCircleIcon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-success flex items-center gap-1">
                        <TrendingUpIcon className="h-3 w-3" /> +8%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Completed Jobs</p>
                    <h3 className="text-2xl font-extrabold text-gray-900">
                      {provider.completedJobs + completedBookings.length}
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 bg-yellow-50 text-accent rounded-xl flex items-center justify-center">
                        <ClockIcon className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Pending Requests</p>
                    <h3 className="text-2xl font-extrabold text-gray-900">
                      {pendingBookings.length}
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                        <StarIcon className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Total Reviews</p>
                    <h3 className="text-2xl font-extrabold text-gray-900">
                      {provider.reviews}
                    </h3>
                  </div>
                </div>

                {/* Pending Requests */}
                {pendingBookings.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900">New Booking Requests</h2>
                      <button onClick={() => setActiveTab('bookings')} className="text-xs text-primary font-bold hover:underline">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {pendingBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-white rounded-2xl shadow-sm border-l-4 border-l-accent border-y border-r border-gray-100 p-5 flex flex-col md:flex-row gap-5 items-start md:items-center"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 text-base">{booking.serviceName}</h3>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-800">
                                New Request
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-2">
                              <span className="flex items-center"><CalendarIcon className="h-3.5 w-3.5 mr-1 text-primary" /> {booking.date}</span>
                              <span className="flex items-center"><ClockIcon className="h-3.5 w-3.5 mr-1 text-primary" /> {booking.time}</span>
                              <span className="flex items-center"><MapPinIcon className="h-3.5 w-3.5 mr-1 text-primary" /> {booking.address}</span>
                            </div>
                            <span className="font-extrabold text-primary text-base">Rs. {booking.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex gap-2 w-full md:w-auto">
                            <button
                              onClick={() => { onUpdateBookingStatus(booking.id, 'confirmed'); onShowToast('Job request accepted!'); }}
                              className="btn bg-success text-white hover:bg-green-600 text-xs py-2.5 px-4 flex items-center justify-center gap-1.5 font-bold"
                            >
                              <CheckCircleIcon className="h-4 w-4" /> Accept Job
                            </button>
                            <button
                              onClick={() => { onUpdateBookingStatus(booking.id, 'cancelled'); onShowToast('Job request declined.'); }}
                              className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs py-2.5 px-4 flex items-center justify-center gap-1.5"
                            >
                              <XCircleIcon className="h-4 w-4" /> Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Schedule */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Confirmed Jobs Schedule</h2>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {upcomingBookings.length === 0 ? (
                      <div className="p-8 text-center text-gray-500 text-xs">
                        No upcoming jobs scheduled yet.
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {upcomingBookings.map((booking) => (
                          <div key={booking.id} className="p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 flex flex-col items-center justify-center flex-shrink-0 text-primary">
                              <span className="text-[10px] font-bold uppercase">
                                {new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}
                              </span>
                              <span className="text-base font-extrabold leading-none">
                                {new Date(booking.date).getDate()}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 text-sm truncate">{booking.serviceName}</h4>
                              <p className="text-xs text-gray-500 truncate">
                                {booking.time} • {booking.address}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ROUTE PLANNER TAB */}
            {activeTab === 'route' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Today's Job Route Planner</h2>
                    <p className="text-xs text-gray-500">Visual job dispatch route across Sri Lankan locations.</p>
                  </div>
                  <button onClick={() => onShowToast('Optimized route saved to GPS navigation!')} className="btn btn-primary text-xs py-2 px-4 flex items-center gap-2">
                    <NavigationIcon className="h-4 w-4" /> Optimize Route
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="h-64 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="text-center z-10 p-6">
                      <MapPinIcon className="h-10 w-10 text-primary mx-auto mb-2 animate-bounce" />
                      <h4 className="font-bold text-gray-900 text-base">Sri Lanka Dispatch Map Active</h4>
                      <p className="text-xs text-gray-600 mt-1">Showing 3 active job locations in {provider.city} & surrounding areas.</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="font-bold text-gray-900 text-sm">Scheduled Stops</h3>
                    {providerBookings.slice(0, 3).map((job, idx) => (
                      <div key={job.id} className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="h-8 w-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
                          Stop {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm">{job.serviceName}</h4>
                          <p className="text-xs text-gray-500">{job.time} • {job.address}</p>
                        </div>
                        <div className="flex gap-2">
                          <a href={`tel:${user?.phone || '+94771234567'}`} className="btn btn-outline text-xs p-2" title="Call Customer">
                            <PhoneIcon className="h-4 w-4" />
                          </a>
                          <button onClick={() => onShowToast(`Navigating to ${job.address}...`)} className="btn btn-primary text-xs py-1.5 px-3">
                            Start GPS
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900">All Job Requests</h2>

                <div className="space-y-4">
                  {providerBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row gap-5 items-start md:items-center"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-base">{booking.serviceName}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-2">
                          <span className="flex items-center"><CalendarIcon className="h-3.5 w-3.5 mr-1 text-primary" /> {booking.date}</span>
                          <span className="flex items-center"><ClockIcon className="h-3.5 w-3.5 mr-1 text-primary" /> {booking.time}</span>
                          <span className="flex items-center"><MapPinIcon className="h-3.5 w-3.5 mr-1 text-primary" /> {booking.address}</span>
                        </div>
                        <span className="font-extrabold text-primary text-base">Rs. {booking.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col gap-2 w-full md:w-auto">
                        {booking.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => { onUpdateBookingStatus(booking.id, 'confirmed'); onShowToast('Job request accepted!'); }}
                              className="btn bg-success text-white hover:bg-green-600 text-xs py-2 px-3 flex-1 font-bold"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => { onUpdateBookingStatus(booking.id, 'cancelled'); onShowToast('Job request declined.'); }}
                              className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs py-2 px-3 flex-1"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => { onUpdateBookingStatus(booking.id, 'in-progress'); onShowToast('Job marked as In Progress!'); }}
                            className="btn btn-primary text-xs py-2 px-4 font-bold"
                          >
                            Start Job Now
                          </button>
                        )}
                        {booking.status === 'in-progress' && (
                          <button
                            onClick={() => { onUpdateBookingStatus(booking.id, 'completed'); onShowToast('Job marked as Completed!'); }}
                            className="btn bg-success text-white hover:bg-green-600 text-xs py-2 px-4 font-bold"
                          >
                            Mark Job Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Manage Offered Services</h2>
                  <button onClick={() => setIsAddServiceOpen(true)} className="btn btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5 font-bold">
                    <PlusIcon className="h-4 w-4" /> Add New Service
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    {provider.services.map((service, index) => (
                      <div key={index} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition-colors">
                        <div>
                          <h3 className="font-bold text-gray-900 text-base mb-1">{service.name}</h3>
                          <p className="text-xs text-gray-500">{service.description || 'Standard service offering in Sri Lanka'}</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                          <div className="text-right">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Price</span>
                            <span className="font-extrabold text-primary text-lg">Rs. {service.price.toLocaleString()}</span>
                          </div>
                          <button onClick={() => handleDeleteService(index)} className="btn bg-white border border-red-200 text-error hover:bg-red-50 text-xs p-2">
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Earnings & Payouts</h2>
                  <button onClick={() => onShowToast('CSV Statement downloaded!')} className="btn btn-outline text-xs py-2">
                    Download Statement
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-primary text-white rounded-2xl shadow-md p-6">
                    <p className="text-blue-100 text-xs font-semibold mb-1">Available Payout Balance</p>
                    <h3 className="text-3xl font-extrabold mb-4">Rs. {(totalEarnings * 0.9).toLocaleString()}</h3>
                    <button onClick={() => onShowToast('Withdrawal request submitted to Commercial Bank account!')} className="w-full py-2.5 bg-white text-primary rounded-xl font-bold text-xs hover:bg-gray-50 transition-colors">
                      Withdraw to Bank Account
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:col-span-2">
                    <h3 className="font-bold text-gray-900 text-sm mb-4">Monthly Income (LKR)</h3>
                    <div className="h-40 flex items-end justify-between gap-3 pt-4">
                      {[25, 40, 55, 70, 85, 100].map((height, i) => (
                        <div key={i} className="flex flex-col items-center flex-1">
                          <div className="w-full bg-primary/20 hover:bg-primary rounded-t-md transition-colors" style={{ height: `${height}%` }}></div>
                          <span className="text-[10px] text-gray-500 mt-2">{['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Provider Settings</h2>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast('Provider profile saved.'); }} className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Full Name</label>
                      <input type="text" className="input-field" defaultValue={provider.name} />
                    </div>
                    <div>
                      <label className="label">City</label>
                      <input type="text" className="input-field" defaultValue={provider.city} />
                    </div>
                    <div>
                      <label className="label">Hourly Rate (LKR)</label>
                      <input type="number" className="input-field" defaultValue={provider.hourlyRate} />
                    </div>
                    <div>
                      <label className="label">Phone Number</label>
                      <input type="tel" className="input-field" defaultValue={provider.phone || '+94 77 123 4567'} />
                    </div>
                  </div>
                  <div>
                    <label className="label">Professional Bio</label>
                    <textarea rows={4} className="input-field resize-none" defaultValue={provider.bio}></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary px-8 py-3 text-xs font-bold">Save Settings</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Service Modal */}
      {isAddServiceOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full p-6 relative animate-slide-up">
            <button onClick={() => setIsAddServiceOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <XIcon className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Service</h3>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="label">Service Title</label>
                <input type="text" required value={newServiceName} onChange={(e) => setNewServiceName(e.target.value)} className="input-field" placeholder="E.g., Solar Inverter Maintenance" />
              </div>
              <div>
                <label className="label">Price in LKR (Rs.)</label>
                <input type="number" required value={newServicePrice} onChange={(e) => setNewServicePrice(e.target.value)} className="input-field" placeholder="3500" />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea rows={3} value={newServiceDesc} onChange={(e) => setNewServiceDesc(e.target.value)} className="input-field resize-none" placeholder="Brief service details..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full py-3 text-xs font-bold">Save Service</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}