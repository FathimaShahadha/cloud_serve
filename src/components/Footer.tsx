import React, { useState } from 'react';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon
} from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate?: (page: string) => void;
  onOpenModal?: (modalType: string) => void;
}

export function Footer({ onNavigate, onOpenModal }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput('');
    }, 3000);
  };

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div>
            <Logo size="md" className="text-white mb-6 brightness-0 invert" />
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Sri Lanka's most trusted platform for local services. Connecting
              you with background-verified Sri Lankan professionals for all your home and business
              needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal?.('about'); }} className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal?.('about'); }} className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal?.('about'); }} className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal?.('about'); }} className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services Col */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Services</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <button onClick={() => onNavigate?.('services')} className="hover:text-secondary transition-colors text-left">
                  Electricians in Colombo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('services')} className="hover:text-secondary transition-colors text-left">
                  Plumbers in Kandy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('services')} className="hover:text-secondary transition-colors text-left">
                  House Cleaners in Negombo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('services')} className="hover:text-secondary transition-colors text-left">
                  AC Repair & Servicing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('services')} className="hover:text-secondary transition-colors text-left">
                  Math & Science Tutors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('services')} className="hover:text-secondary transition-colors text-left">
                  Beauty & Salon Professionals
                </button>
              </li>
            </ul>
          </div>

          {/* Support Col */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support & Info</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <button onClick={() => onOpenModal?.('about')} className="hover:text-secondary transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal?.('how-it-works')} className="hover:text-secondary transition-colors text-left">
                  How it Works
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal?.('trust-safety')} className="hover:text-secondary transition-colors text-left">
                  Trust & Safety
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal?.('faq')} className="hover:text-secondary transition-colors text-left">
                  FAQ & Provider Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal?.('terms')} className="hover:text-secondary transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal?.('privacy')} className="hover:text-secondary transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>
                  123 Galle Road,
                  <br />
                  Colombo 03, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 text-secondary flex-shrink-0" />
                <button onClick={() => onOpenModal?.('contact')} className="hover:underline text-left">
                  support@cloudserve.lk
                </button>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">
                Subscribe to Newsletter
              </h4>
              {subscribed ? (
                <div className="bg-secondary/20 border border-secondary text-secondary text-xs p-2 rounded-lg flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4" /> Subscribed to updates!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Email address"
                    className="bg-primary px-3 py-2 rounded-l-lg text-sm text-white border border-primary-light focus:outline-none focus:border-secondary w-full"
                  />
                  <button type="submit" className="bg-secondary hover:bg-secondary-light px-3 py-2 rounded-r-lg text-sm font-medium transition-colors">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-light pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CloudServe Sri Lanka. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-primary px-3 py-1.5 rounded-full border border-primary-light">
            <span>Proudly built for Sri Lanka</span>
            <span role="img" aria-label="Sri Lanka Flag">
              🇱🇰
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}