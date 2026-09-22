import React from 'react';
import {
  CheckIcon,
  ClockIcon,
  TruckIcon,
  WrenchIcon,
  StarIcon } from
'lucide-react';
type BookingStatus =
'pending' |
'confirmed' |
'in-progress' |
'completed' |
'cancelled';
interface BookingTrackerProps {
  status: BookingStatus;
  providerName: string;
  estimatedTime?: string;
}
export function BookingTracker({
  status,
  providerName,
  estimatedTime
}: BookingTrackerProps) {
  const steps = [
  {
    id: 'pending',
    label: 'Requested',
    icon: ClockIcon
  },
  {
    id: 'confirmed',
    label: 'Confirmed',
    icon: CheckIcon
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    icon: WrenchIcon
  },
  {
    id: 'completed',
    label: 'Completed',
    icon: StarIcon
  }];

  const getStepIndex = (s: BookingStatus) => {
    switch (s) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'in-progress':
        return 2;
      case 'completed':
        return 3;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };
  const currentIndex = getStepIndex(status);
  if (status === 'cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="h-12 w-12 bg-red-100 text-error rounded-full flex items-center justify-center mx-auto mb-3">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12" />
            
          </svg>
        </div>
        <h3 className="text-lg font-bold text-red-800">Booking Cancelled</h3>
        <p className="text-red-600 text-sm mt-1">
          This booking has been cancelled.
        </p>
      </div>);

  }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Service Status</h3>
          <p className="text-sm text-gray-500 mt-1">
            Provider:{' '}
            <span className="font-medium text-gray-700">{providerName}</span>
          </p>
        </div>
        {estimatedTime && status !== 'completed' &&
        <div className="bg-blue-50 text-secondary-dark px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            Estimated Arrival: {estimatedTime}
          </div>
        }
      </div>

      {/* Progress Bar */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-5 left-6 right-6 h-1 bg-gray-200 rounded-full hidden sm:block">
          <div
            className="h-full bg-success rounded-full transition-all duration-500"
            style={{
              width: `${currentIndex / (steps.length - 1) * 100}%`
            }}>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-6 sm:gap-0">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="flex sm:flex-col items-center gap-4 sm:gap-2 relative">
                
                {/* Mobile connecting line */}
                {index < steps.length - 1 &&
                <div className="absolute left-5 top-10 bottom-[-24px] w-0.5 bg-gray-200 sm:hidden">
                    <div
                    className="w-full bg-success transition-all duration-500"
                    style={{
                      height: isCompleted ? '100%' : '0%'
                    }}>
                  </div>
                  </div>
                }

                <div
                  className={`
                  h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300
                  ${isCompleted ? 'bg-success text-white' : isCurrent ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'}
                `}>
                  
                  <Icon className="h-5 w-5" />
                </div>

                <div className="sm:text-center">
                  <p
                    className={`text-sm font-bold ${isCurrent ? 'text-primary' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    
                    {step.label}
                  </p>
                  {isCurrent &&
                  <p className="text-xs text-secondary mt-0.5 sm:mx-auto animate-pulse">
                      Current status
                    </p>
                  }
                </div>
              </div>);

          })}
        </div>
      </div>

      {/* Map Placeholder for "In Progress" or "En Route" */}
      {(status === 'confirmed' || status === 'in-progress') &&
      <div className="mt-8 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 relative h-48 flex items-center justify-center">
          <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}>
        </div>
          <div className="text-center relative z-10">
            <TruckIcon className="h-8 w-8 text-secondary mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-600">
              Live tracking available soon
            </p>
          </div>
        </div>
      }
    </div>);

}