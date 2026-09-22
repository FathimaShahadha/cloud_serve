import React, { useState } from 'react';
import { XIcon, ShieldCheckIcon, CheckCircleIcon, PhoneIcon, MailIcon, MapPinIcon, HelpCircleIcon, SendIcon } from 'lucide-react';

interface InfoModalProps {
  modalType: string | null;
  onClose: () => void;
}

export function InfoModals({ modalType, onClose }: InfoModalProps) {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  if (!modalType) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      onClose();
    }, 2000);
  };

  const renderContent = () => {
    switch (modalType) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-gray-100">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">About CloudServe</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-3">Sri Lanka's Premier Local Service Platform</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              CloudServe is a Sri Lankan web-based local service booking marketplace connecting households and businesses with top-rated, background-verified Sri Lankan service professionals.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h4 className="font-bold text-primary mb-1">Our Mission</h4>
                <p className="text-xs text-gray-600">To make booking trusted home and business services in Sri Lanka as easy, safe, and transparent as ordering food online.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h4 className="font-bold text-secondary mb-1">Islandwide Reach</h4>
                <p className="text-xs text-gray-600">Connecting qualified electricians, plumbers, tutors, and cleaners across Colombo, Kandy, Galle, Jaffna, Negombo, and 15+ cities.</p>
              </div>
            </div>
          </div>
        );

      case 'how-it-works':
        return (
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-gray-100">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Guide</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-3">How CloudServe Works</h2>
            </div>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Search & Compare', text: 'Select your service category (Electrical, Plumbing, Tutoring, etc.) and location to browse verified Sri Lankan professionals.' },
                { step: '2', title: 'Choose Date & Time', text: 'Select an available time slot that fits your schedule and review transparent upfront pricing in LKR.' },
                { step: '3', title: 'Simulated Payment or Cash', text: 'Book securely online via card simulation, LankaQR, or choose Cash After Service.' },
                { step: '4', title: 'Track & Rate', text: 'Track provider arrival status, mark job completion, and leave feedback to support local workers.' }
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start p-3 bg-gray-50 rounded-xl">
                  <div className="h-8 w-8 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">{item.step}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'trust-safety':
        return (
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-gray-100">
              <ShieldCheckIcon className="h-10 w-10 text-success mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-900">Trust & Safety Guarantee</h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-3 bg-green-50 rounded-xl border border-green-100">
                <CheckCircleIcon className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Identity & Qualification Verification</h4>
                  <p className="text-xs text-gray-600">Every provider undergoes NIC identity verification, reference checks, and skill assessment before joining CloudServe.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 bg-blue-50 rounded-xl border border-blue-100">
                <ShieldCheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Service Protection Escrow</h4>
                  <p className="text-xs text-gray-600">Online payments are held securely until the service is completed to your satisfaction.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-100">Terms of Service (Sri Lanka)</h2>
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed max-h-60 overflow-y-auto pr-2">
              <p><strong>1. Acceptance of Terms:</strong> By using CloudServe, users agree to abide by local Sri Lankan service policies and electronic transactions standards.</p>
              <p><strong>2. Service Bookings:</strong> CloudServe acts as a venue connecting customers and independent service providers. All pricing is stated in Sri Lankan Rupees (LKR).</p>
              <p><strong>3. Cancellations:</strong> Free cancellations are allowed up to 2 hours before the scheduled time slot.</p>
              <p><strong>4. Provider Conduct:</strong> Providers agree to maintain professional work standards and comply with safety guidelines.</p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-100">Privacy Policy</h2>
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed max-h-60 overflow-y-auto pr-2">
              <p><strong>Information Collected:</strong> We collect user details such as name, phone number, and service address solely to process local bookings.</p>
              <p><strong>Address Sharing:</strong> Address details are only disclosed to the selected service provider after a booking is confirmed.</p>
              <p><strong>Data Security:</strong> Your data is protected using SSL encryption. We do not sell user data to third parties.</p>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact CloudServe Support</h2>
            <p className="text-xs text-gray-500 mb-6">Our team in Colombo is ready to assist you with any questions or support inquiries.</p>
            
            {contactSubmitted ? (
              <div className="p-6 bg-green-50 rounded-xl text-center text-green-800 border border-green-200">
                <CheckCircleIcon className="h-10 w-10 text-success mx-auto mb-2" />
                <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                <p className="text-xs mt-1">Thank you for reaching out. A representative will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Your Name</label>
                    <input type="text" required className="input-field" placeholder="Kavinda Perera" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input type="email" required className="input-field" placeholder="kavinda@example.lk" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="label">Subject</label>
                  <input type="text" required className="input-field" placeholder="Booking Inquiry / Feedback" value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} />
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea rows={3} required className="input-field resize-none" placeholder="How can we help you?" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm">
                  <SendIcon className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap justify-between text-xs text-gray-500 gap-2">
              <span className="flex items-center gap-1"><MapPinIcon className="h-3.5 w-3.5 text-primary" /> Colombo 03, Sri Lanka</span>
              <span className="flex items-center gap-1"><PhoneIcon className="h-3.5 w-3.5 text-primary" /> +94 11 234 5678</span>
              <span className="flex items-center gap-1"><MailIcon className="h-3.5 w-3.5 text-primary" /> support@cloudserve.lk</span>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
              <HelpCircleIcon className="h-5 w-5 text-primary" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {[
                { q: 'Is CloudServe available across all districts in Sri Lanka?', a: 'Yes! CloudServe operates in all major urban centers including Colombo, Kandy, Galle, Jaffna, Negombo, Matara, Kurunegala, Batticaloa, and surrounding areas.' },
                { q: 'How do I pay for a service?', a: 'You can pay online securely using Credit/Debit Card, LankaQR, or choose Cash After Service to pay the provider directly upon job completion.' },
                { q: 'How are service providers verified?', a: 'All professionals complete identity verification (NIC), police clearance submission, and technical skill verification before being listed.' },
                { q: 'Can I reschedule or cancel a booking?', a: 'Yes, you can easily reschedule or cancel any appointment directly from your Customer Dashboard under "My Bookings".' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm">{item.q}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xl p-6 sm:p-8 relative animate-slide-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <XIcon className="h-5 w-5" />
        </button>
        {renderContent()}
      </div>
    </div>
  );
}
