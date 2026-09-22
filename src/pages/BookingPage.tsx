import React, { useState } from 'react';
import {
  CheckIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  PackageIcon,
  Building2Icon,
  CreditCardIcon,
  BanknoteIcon,
  QrCodeIcon
} from 'lucide-react';
import { Provider, Booking, TIME_SLOTS } from '../data/mockData';
import { PaymentForm } from '../components/PaymentForm';

interface BookingPageProps {
  provider: Provider;
  initialServiceName?: string;
  initialDate?: string;
  initialTime?: string;
  onNavigate: (page: string) => void;
  onAddBooking: (booking: Omit<Booking, 'id'>) => void;
}

export function BookingPage({
  provider,
  initialServiceName,
  initialDate = '',
  initialTime = '',
  onNavigate,
  onAddBooking
}: BookingPageProps) {
  const [step, setStep] = useState(1);

  // Find initial service or fallback to first
  const defaultService = provider.services.find(s => s.name === initialServiceName) || provider.services[0];
  const [selectedService, setSelectedService] = useState(defaultService);

  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [address, setAddress] = useState('123 Galle Road, Colombo 03');
  const [instructions, setInstructions] = useState('');
  const [paymentMethodType, setPaymentMethodType] = useState<string>('card');
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  const isPeakHours = false;
  const surgeMultiplier = 1.0;

  const handleFinishBooking = () => {
    const newBookingId = `b_${Date.now().toString().slice(-5)}`;
    setCreatedBookingId(newBookingId);

    onAddBooking({
      providerId: provider.id,
      customerId: 'c1',
      serviceName: selectedService.name,
      date: date || new Date().toISOString().split('T')[0],
      time: time || '10:00 AM',
      status: 'confirmed',
      amount: selectedService.price,
      address: address || 'Colombo, Sri Lanka',
      specialInstructions: instructions,
      paymentMethod: paymentMethodType === 'card' ? 'Credit / Debit Card' : paymentMethodType === 'cash' ? 'Cash after service' : 'LankaQR / Bank Transfer',
      createdAt: new Date().toISOString().split('T')[0]
    });

    setStep(4);
  };

  const renderStepIndicator = () => {
    const steps = ['Service', 'Location & Time', 'Payment', 'Confirmation'];
    return (
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          <div
            className="absolute left-0 top-1/2 h-0.5 bg-primary -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>

          {steps.map((s, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            return (
              <div key={s} className="flex flex-col items-center bg-gray-50 px-2">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-white ring-4 ring-primary/20 scale-110'
                      : isCompleted
                      ? 'bg-success text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <CheckIcon className="h-4 w-4" /> : stepNum}
                </div>
                <span className={`text-[11px] mt-2 font-semibold ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {step < 4 && (
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : onNavigate('provider-profile'))}
            className="flex items-center text-xs font-bold text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back
          </button>
        )}

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Book Local Service
        </h1>

        {renderStepIndicator()}

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-slide-up">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="h-16 w-16 rounded-2xl object-cover border-2 border-primary/20"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{provider.name}</h2>
                <p className="text-xs text-secondary font-semibold uppercase">{provider.category} • {provider.city}</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4">Select Offered Service</h3>

            <div className="space-y-3 mb-8">
              {provider.services.map((service, idx) => (
                <label
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedService.name === service.name
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="service"
                      className="h-5 w-5 text-primary focus:ring-primary"
                      checked={selectedService.name === service.name}
                      onChange={() => setSelectedService(service)}
                    />
                    <div>
                      <span className="font-bold text-gray-900 text-sm block">{service.name}</span>
                      {service.description && (
                        <span className="text-xs text-gray-500">{service.description}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-extrabold text-primary text-base">
                      Rs. {service.price.toLocaleString()}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn btn-primary w-full py-4 text-base font-bold"
            >
              Next: Location & Time Slot
            </button>
          </div>
        )}

        {/* Step 2: Date, Time & Address */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" /> Schedule Appointment
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">Select Date</label>
                    <input
                      type="date"
                      className="input-field"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="label">Select Time Slot</label>
                    <select
                      className="input-field appearance-none cursor-pointer"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option value="">Choose a time slot</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-primary" /> Service Address in Sri Lanka
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">Full Street Address</label>
                    <textarea
                      className="input-field resize-none"
                      rows={3}
                      placeholder="E.g., 123 Galle Road, Bambalapitiya, Colombo 03..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <label className="label">Special Instructions (Optional)</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="E.g. Ring side gate bell, call upon arrival..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 mb-8 border border-blue-100">
              <ShieldCheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Your full address is strictly confidential and shared only with {provider.name} once the appointment is confirmed.
              </p>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!date || !time || !address}
              className="btn btn-primary w-full py-4 text-base font-bold disabled:opacity-50"
            >
              Continue to Payment Options
            </button>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="animate-slide-up space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Payment Preference</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethodType('card')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                    paymentMethodType === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <CreditCardIcon className="h-6 w-6" /> Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethodType('cash')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                    paymentMethodType === 'cash' ? 'border-success bg-green-50 text-success' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <BanknoteIcon className="h-6 w-6" /> Cash After Service (COD)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethodType('bank')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                    paymentMethodType === 'bank' ? 'border-secondary bg-blue-50 text-secondary' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <QrCodeIcon className="h-6 w-6" /> LankaQR / Bank Transfer
                </button>
              </div>

              {paymentMethodType === 'cash' ? (
                <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center space-y-3">
                  <BanknoteIcon className="h-10 w-10 text-success mx-auto" />
                  <h4 className="font-bold text-gray-900 text-base">Pay directly in Cash (LKR)</h4>
                  <p className="text-xs text-gray-600">You will pay Rs. {selectedService.price.toLocaleString()} in cash directly to {provider.name} after the service is completed to your satisfaction.</p>
                  <button onClick={handleFinishBooking} className="btn btn-primary w-full py-3 mt-4 text-base font-bold">
                    Confirm Booking (Cash on Delivery)
                  </button>
                </div>
              ) : paymentMethodType === 'bank' ? (
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 text-center space-y-3">
                  <QrCodeIcon className="h-10 w-10 text-secondary mx-auto" />
                  <h4 className="font-bold text-gray-900 text-base">LankaQR & Direct Bank Transfer</h4>
                  <p className="text-xs text-gray-600">Simulate Sri Lankan bank transfer (Sampath Bank / Commercial Bank) or scan LankaQR code.</p>
                  <button onClick={handleFinishBooking} className="btn btn-primary w-full py-3 mt-4 text-base font-bold">
                    Confirm & Complete Bank Simulation
                  </button>
                </div>
              ) : (
                <PaymentForm
                  amount={selectedService.price * surgeMultiplier}
                  serviceName={selectedService.name}
                  onPaymentSuccess={handleFinishBooking}
                  onCancel={() => setStep(2)}
                />
              )}
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center animate-slide-up max-w-2xl mx-auto">
            <div className="h-20 w-20 bg-green-100 text-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckIcon className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 text-sm mb-8">
              Your local service request has been sent to <span className="font-bold text-gray-900">{provider.name}</span>.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100 space-y-3">
              <h3 className="font-bold text-gray-900 pb-3 border-b border-gray-200 text-base flex justify-between items-center">
                <span>Booking Receipt</span>
                <span className="text-xs bg-green-100 text-green-800 font-bold px-2.5 py-1 rounded-full uppercase">Confirmed</span>
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Booking Reference</span>
                  <span className="font-mono font-bold text-primary">#CS-2026-{(createdBookingId || '84729').toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Provider</span>
                  <span className="font-bold text-gray-900">{provider.name} ({provider.phone || '+94 77 123 4567'})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Service</span>
                  <span className="font-bold text-gray-900">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Scheduled Date & Time</span>
                  <span className="font-bold text-gray-900">{date} at {time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-bold text-gray-900">{address}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="font-extrabold text-primary text-base">Rs. {selectedService.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('customer-dashboard')}
                className="btn btn-primary py-3.5 px-8 font-bold text-sm shadow-md"
              >
                Go to My Bookings Dashboard
              </button>
              <button
                onClick={() => onNavigate('landing')}
                className="btn btn-outline py-3.5 px-8 font-bold text-sm"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}