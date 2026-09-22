import React, { useState } from 'react';
import {
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
  ArrowRightIcon } from
'lucide-react';
import { Logo } from '../components/Logo';
import { CATEGORIES, CITIES } from '../data/mockData';
interface AuthPageProps {
  onLogin: (userType: 'customer' | 'provider' | 'admin', user: any) => void;
}
export function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'customer' | 'provider' | 'admin'>(
    'customer'
  );
  const [isLoading, setIsLoading] = useState(false);
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // Provider specific states
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock user data based on type
      const mockUser = {
        id: 'u1',
        name: isLogin ? 'Test User' : name,
        email: email,
        avatar: `https://i.pravatar.cc/150?u=${email}`
      };
      onLogin(userType, mockUser);
    }, 1500);
  };
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-primary hover:text-primary-light transition-colors">
            
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          {/* User Type Selector */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${userType === 'customer' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType('provider')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${userType === 'provider' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              
              Service Provider
            </button>
            {isLogin &&
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${userType === 'admin' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              
                Admin
              </button>
            }
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin &&
            <>
                <div>
                  <label className="label">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                    type="text"
                    required
                    className="input-field pl-10"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                  
                  </div>
                </div>
                <div>
                  <label className="label">Phone Number</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                    type="tel"
                    required
                    className="input-field pl-10"
                    placeholder="+94 7X XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} />
                  
                  </div>
                </div>

                {userType === 'provider' &&
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-bold text-primary mb-3">
                        Professional Details
                      </h4>
                    </div>
                    <div>
                      <label className="label">Service Category</label>
                      <div className="relative">
                        <BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                      required
                      className="input-field pl-10 appearance-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}>
                      
                          <option value="">Select Category</option>
                          {CATEGORIES.map((c) =>
                      <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                      )}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="label">City</label>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                      required
                      className="input-field pl-10 appearance-none"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}>
                      
                          <option value="">Select City</option>
                          {CITIES.map((c) =>
                      <option key={c} value={c}>
                              {c}
                            </option>
                      )}
                        </select>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Hourly Rate (LKR)</label>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                      type="number"
                      required
                      className="input-field pl-10"
                      placeholder="e.g. 2500"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)} />
                    
                      </div>
                    </div>
                  </div>
              }
              </>
            }

            <div>
              <label className="label">Email address</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                
              </div>
            </div>

            {isLogin &&
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                
                  <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900">
                  
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                  href="#"
                  className="font-medium text-primary hover:text-primary-light">
                  
                    Forgot password?
                  </a>
                </div>
              </div>
            }

            <button
              type="submit"
              className="btn btn-primary w-full py-3 text-base flex justify-center items-center gap-2 mt-6"
              disabled={isLoading}>
              
              {isLoading ?
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> :

              <>
                  {isLogin ? 'Sign in' : 'Create account'}
                  <ArrowRightIcon className="h-5 w-5" />
                </>
              }
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                <span className="ml-2">Google</span>
              </button>
              <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}