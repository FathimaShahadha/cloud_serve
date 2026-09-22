import React, { useEffect, useState, useRef } from 'react';
import {
  BellIcon,
  CheckCircleIcon,
  CreditCardIcon,
  StarIcon,
  InfoIcon,
  CheckIcon } from
'lucide-react';
import { Notification } from '../data/mockData';
interface NotificationCenterProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}
export function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CheckCircleIcon className="h-5 w-5 text-success" />;
      case 'payment':
        return <CreditCardIcon className="h-5 w-5 text-secondary" />;
      case 'review':
        return <StarIcon className="h-5 w-5 text-accent" />;
      default:
        return <InfoIcon className="h-5 w-5 text-primary" />;
    }
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-primary transition-colors focus:outline-none rounded-full hover:bg-gray-100"
        aria-label="Notifications">
        
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 &&
        <span className="absolute top-1 right-1 h-4 w-4 bg-error text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount}
          </span>
        }
      </button>

      {isOpen &&
      <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            {unreadCount > 0 &&
          <button
            onClick={onMarkAllRead}
            className="text-xs text-secondary hover:text-secondary-dark font-medium flex items-center gap-1">
            
                <CheckIcon className="h-3 w-3" /> Mark all read
              </button>
          }
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ?
          <div className="p-6 text-center text-gray-500">
                <BellIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div> :

          <div className="divide-y divide-gray-100">
                {notifications.map((notification) =>
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors flex gap-3 cursor-pointer ${!notification.read ? 'bg-blue-50/50' : ''}`}
              onClick={() => onMarkRead(notification.id)}>
              
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                  className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                  
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.timeAgo}
                      </p>
                    </div>
                    {!notification.read &&
              <div className="flex-shrink-0 flex items-center">
                        <div className="h-2 w-2 bg-secondary rounded-full"></div>
                      </div>
              }
                  </div>
            )}
              </div>
          }
          </div>

          <div className="p-3 border-t border-gray-100 text-center bg-gray-50">
            <button className="text-sm text-primary font-medium hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      }
    </div>);

}