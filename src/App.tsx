import React, { useState, useEffect } from 'react';
import { Navbar, AuthState, UserType } from './components/Navbar';
import { Footer } from './components/Footer';
import { InfoModals } from './components/InfoModals';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProviderProfilePage } from './pages/ProviderProfilePage';
import { BookingPage } from './pages/BookingPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import {
  BOOKINGS,
  PROVIDERS,
  REVIEWS,
  NOTIFICATIONS,
  CATEGORIES,
  Booking,
  Provider,
  Review,
  Notification,
  Category
} from './data/mockData';
import { ChatWidget } from './components/ChatWidget';
import { CheckCircleIcon } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userType: null,
    user: null
  });

  // Global Interactive States
  const [providers, setProviders] = useState<Provider[]>(PROVIDERS);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  // Dynamic Routing & Selection State
  const [selectedProviderId, setSelectedProviderId] = useState<string>('p1');
  const [bookingServiceName, setBookingServiceName] = useState<string | undefined>(undefined);
  const [bookingDate, setBookingDate] = useState<string | undefined>(undefined);
  const [bookingTime, setBookingTime] = useState<string | undefined>(undefined);

  const [searchCategory, setSearchCategory] = useState<string>('');
  const [searchCity, setSearchCity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Auxiliary Overlays & Toast
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setCurrentPage(page);
    window.history.pushState(null, '', `#${page}`);
  };

  const handleLogin = (userType: UserType, user: any) => {
    setAuthState({
      isLoggedIn: true,
      userType,
      user: {
        ...user,
        name: userType === 'customer' ? 'Nishantha Silva' : userType === 'provider' ? 'Kamal Perera' : 'Super Admin'
      }
    });
    showToast(`Logged in successfully as ${userType}!`);

    if (userType === 'customer') handleNavigate('customer-dashboard');
    else if (userType === 'provider') handleNavigate('provider-dashboard');
    else if (userType === 'admin') handleNavigate('admin-dashboard');
  };

  const handleLogout = () => {
    setAuthState({
      isLoggedIn: false,
      userType: null,
      user: null
    });
    showToast('Signed out successfully.');
    handleNavigate('landing');
  };

  const handleSelectProvider = (id: string) => {
    setSelectedProviderId(id);
  };

  const handleStartBooking = (providerId: string, serviceName?: string, date?: string, time?: string) => {
    setSelectedProviderId(providerId);
    setBookingServiceName(serviceName);
    setBookingDate(date);
    setBookingTime(time);
  };

  // Add new booking to global state
  const handleAddBooking = (newBookingData: Omit<Booking, 'id'>) => {
    const newBookingId = `b_${Date.now()}`;
    const newBooking: Booking = {
      id: newBookingId,
      ...newBookingData
    };

    setBookings([newBooking, ...bookings]);

    // Push simulated notification
    const newNotif: Notification = {
      id: `n_${Date.now()}`,
      type: 'booking',
      title: 'Booking Confirmed!',
      message: `Your booking for ${newBooking.serviceName} has been confirmed.`,
      timeAgo: 'Just now',
      read: false
    };
    setNotifications([newNotif, ...notifications]);
    showToast('Service booking successfully created!');
  };

  // Update booking status
  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );

    const newNotif: Notification = {
      id: `n_${Date.now()}`,
      type: 'booking',
      title: `Booking ${status.toUpperCase()}`,
      message: `Booking #${bookingId.toUpperCase()} status updated to ${status}.`,
      timeAgo: 'Just now',
      read: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Submit review
  const handleSubmitReview = (providerId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `r_${Date.now()}`,
      providerId,
      customerName: authState.user?.name || 'Nishantha Silva',
      rating,
      date: new Date().toISOString().split('T')[0],
      comment
    };
    setReviews([newReview, ...reviews]);

    // Update provider's review count & rating average
    setProviders(
      providers.map((p) => {
        if (p.id === providerId) {
          const provReviews = [...reviews.filter((r) => r.providerId === providerId), newReview];
          const avg = provReviews.reduce((sum, r) => sum + r.rating, 0) / provReviews.length;
          return {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviews: provReviews.length
          };
        }
        return p;
      })
    );
  };

  // Update provider services
  const handleUpdateProviderServices = (providerId: string, services: Provider['services']) => {
    setProviders(
      providers.map((p) => (p.id === providerId ? { ...p, services } : p))
    );
  };

  // Add category
  const handleAddCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  const selectedProvider = providers.find((p) => p.id === selectedProviderId) || providers[0];

  // Render current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            providers={providers}
            onNavigate={handleNavigate}
            onSelectProvider={handleSelectProvider}
            onSelectCategory={(cat) => setSearchCategory(cat)}
            onSelectCity={(city) => setSearchCity(city)}
            onSearchTerm={(term) => setSearchTerm(term)}
          />
        );
      case 'auth':
        return <AuthPage onLogin={handleLogin} />;
      case 'services':
        return (
          <ServicesPage
            providers={providers}
            onNavigate={handleNavigate}
            onSelectProvider={handleSelectProvider}
            selectedCategory={searchCategory}
            selectedCity={searchCity}
            initialSearch={searchTerm}
          />
        );
      case 'provider-profile':
        return (
          <ProviderProfilePage
            provider={selectedProvider}
            reviews={reviews}
            onNavigate={handleNavigate}
            onStartBooking={handleStartBooking}
            onSubmitReview={(rating, comment) => handleSubmitReview(selectedProvider.id, rating, comment)}
            canReview={authState.isLoggedIn && authState.userType === 'customer'}
          />
        );
      case 'booking':
        if (!authState.isLoggedIn) {
          showToast('Please log in or register to complete your booking.');
          handleNavigate('auth');
          return null;
        }
        return (
          <BookingPage
            provider={selectedProvider}
            initialServiceName={bookingServiceName}
            initialDate={bookingDate}
            initialTime={bookingTime}
            onNavigate={handleNavigate}
            onAddBooking={handleAddBooking}
          />
        );
      case 'customer-dashboard':
        return (
          <CustomerDashboard
            user={authState.user}
            bookings={bookings}
            providers={providers}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onSubmitReview={(provId, rating, comment) => handleSubmitReview(provId, rating, comment)}
            onSelectProvider={handleSelectProvider}
            onShowToast={showToast}
          />
        );
      case 'provider-dashboard':
        return (
          <ProviderDashboard
            user={authState.user}
            provider={selectedProvider}
            bookings={bookings}
            reviews={reviews}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onUpdateProviderServices={handleUpdateProviderServices}
            onShowToast={showToast}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard
            user={authState.user}
            providers={providers}
            bookings={bookings}
            categories={categories}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onAddCategory={handleAddCategory}
            onShowToast={showToast}
          />
        );
      default:
        return (
          <LandingPage
            providers={providers}
            onNavigate={handleNavigate}
            onSelectProvider={handleSelectProvider}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900 selection:bg-secondary selection:text-white relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[200] bg-gray-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700 animate-slide-up">
          <CheckCircleIcon className="h-5 w-5 text-success" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      {currentPage !== 'admin-dashboard' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          authState={authState}
          onLogout={handleLogout}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        />
      )}

      <main className="flex-grow">{renderPage()}</main>

      {/* Footer */}
      {currentPage !== 'admin-dashboard' && (
        <Footer onNavigate={handleNavigate} onOpenModal={(modal) => setActiveModal(modal)} />
      )}

      {/* Auxiliary Info Modals (About, How It Works, Terms, etc.) */}
      <InfoModals modalType={activeModal} onClose={() => setActiveModal(null)} />

      {/* Live Chat Widget */}
      <ChatWidget userType={authState.userType} />
    </div>
  );
}