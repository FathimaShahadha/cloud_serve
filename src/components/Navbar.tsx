import React, { useState } from 'react';
import {
  MenuIcon,
  XIcon,
  UserIcon,
  LogOutIcon,
  LayoutDashboardIcon,
  CalendarIcon,
  BriefcaseIcon,
  DollarSignIcon,
  UsersIcon,
  FileTextIcon } from
'lucide-react';
import { Logo } from './Logo';
import { NotificationCenter } from './NotificationCenter';
import { Notification } from '../data/mockData';
export type UserType = 'customer' | 'provider' | 'admin' | null;
export interface AuthState {
  isLoggedIn: boolean;
  userType: UserType;
  user: any | null;
}
interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  authState: AuthState;
  onLogout: () => void;
  notifications: Notification[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
}
export function Navbar({
  currentPage,
  onNavigate,
  authState,
  onLogout,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };
  const renderNavLinks = () => {
    if (!authState.isLoggedIn) {
      return (
        <>
          <button
            onClick={() => handleNavigate('landing')}
            className={`text-sm font-medium ${currentPage === 'landing' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
            
            Home
          </button>
          <button
            onClick={() => handleNavigate('services')}
            className={`text-sm font-medium ${currentPage === 'services' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
            
            Services
          </button>
        </>);

    }
    if (authState.userType === 'customer') {
      return (
        <>
          <button
            onClick={() => handleNavigate('landing')}
            className={`text-sm font-medium ${currentPage === 'landing' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
            
            Home
          </button>
          <button
            onClick={() => handleNavigate('services')}
            className={`text-sm font-medium ${currentPage === 'services' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
            
            Find Services
          </button>
          <button
            onClick={() => handleNavigate('customer-dashboard')}
            className={`text-sm font-medium ${currentPage === 'customer-dashboard' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
            
            My Bookings
          </button>
        </>);

    }
    if (authState.userType === 'provider') {
      return (
        <>
          <button
            onClick={() => handleNavigate('provider-dashboard')}
            className={`text-sm font-medium ${currentPage === 'provider-dashboard' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
            
            Dashboard
          </button>
          <button
            onClick={() => handleNavigate('provider-dashboard')}
            className="text-sm font-medium text-gray-600 hover:text-primary">
            
            My Services
          </button>
          <button
            onClick={() => handleNavigate('provider-dashboard')}
            className="text-sm font-medium text-gray-600 hover:text-primary">
            
            Earnings
          </button>
        </>);

    }
    if (authState.userType === 'admin') {
      return (
        <>
          <button
            onClick={() => handleNavigate('admin-dashboard')}
            className={`text-sm font-medium ${currentPage === 'admin-dashboard' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
            
            Dashboard
          </button>
          <button
            onClick={() => handleNavigate('admin-dashboard')}
            className="text-sm font-medium text-gray-600 hover:text-primary">
            
            Users
          </button>
          <button
            onClick={() => handleNavigate('admin-dashboard')}
            className="text-sm font-medium text-gray-600 hover:text-primary">
            
            Reports
          </button>
        </>);

    }
  };
  const renderAuthButtons = () => {
    if (!authState.isLoggedIn) {
      return (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavigate('auth')}
            className="text-sm font-medium text-primary hover:text-primary-light">
            
            Login
          </button>
          <button
            onClick={() => handleNavigate('auth')}
            className="btn btn-primary text-sm py-1.5">
            
            Register as Provider
          </button>
        </div>);

    }
    return (
      <div className="flex items-center gap-4">
        <NotificationCenter
          notifications={notifications}
          onMarkRead={onMarkNotificationRead}
          onMarkAllRead={onMarkAllNotificationsRead} />
        

        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2 focus:outline-none">
            
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
              {authState.user?.name?.charAt(0) || 'U'}
            </div>
          </button>

          {isProfileDropdownOpen &&
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-1 animate-fade-in">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {authState.user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {authState.user?.email || 'user@example.com'}
                </p>
              </div>

              <button
              onClick={() =>
              handleNavigate(`${authState.userType}-dashboard`)
              }
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              
                <LayoutDashboardIcon className="h-4 w-4" /> Dashboard
              </button>

              <button
              onClick={() => {
                onLogout();
                setIsProfileDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 flex items-center gap-2">
              
                <LogOutIcon className="h-4 w-4" /> Logout
              </button>
            </div>
          }
        </div>
      </div>);

  };
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigate('landing')}
              className="focus:outline-none">
              
              <Logo size="md" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {renderNavLinks()}
          </div>

          <div className="hidden md:flex items-center">
            {renderAuthButtons()}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            {authState.isLoggedIn &&
            <NotificationCenter
              notifications={notifications}
              onMarkRead={onMarkNotificationRead}
              onMarkAllRead={onMarkAllNotificationsRead} />

            }
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-primary focus:outline-none">
              
              {isMobileMenuOpen ?
              <XIcon className="h-6 w-6" /> :

              <MenuIcon className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen &&
      <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!authState.isLoggedIn ?
          <>
                <button
              onClick={() => handleNavigate('landing')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              
                  Home
                </button>
                <button
              onClick={() => handleNavigate('services')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              
                  Services
                </button>
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2 px-3">
                  <button
                onClick={() => handleNavigate('auth')}
                className="btn btn-outline w-full justify-center">
                
                    Login
                  </button>
                  <button
                onClick={() => handleNavigate('auth')}
                className="btn btn-primary w-full justify-center">
                
                    Register as Provider
                  </button>
                </div>
              </> :

          <>
                <button
              onClick={() =>
              handleNavigate(`${authState.userType}-dashboard`)
              }
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              
                  Dashboard
                </button>
                {authState.userType === 'customer' &&
            <button
              onClick={() => handleNavigate('services')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              
                    Find Services
                  </button>
            }
                <div className="mt-4 pt-4 border-t border-gray-100 px-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {authState.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {authState.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {authState.user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                  <button
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-error hover:bg-red-50 flex items-center gap-2">
                
                    <LogOutIcon className="h-5 w-5" /> Logout
                  </button>
                </div>
              </>
          }
          </div>
        </div>
      }
    </nav>);

}