export interface Category {
  id: string;
  name: string;
  icon: string;
  providerCount: number;
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  bio: string;
  avatar: string;
  memberSince: string;
  completedJobs: number;
  services: { name: string; price: number; description?: string }[];
  phone?: string;
  verified?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  avatar: string;
  joinedDate?: string;
  totalBookings?: number;
}

export interface Review {
  id: string;
  providerId: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'system';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
}

export interface Booking {
  id: string;
  providerId: string;
  customerId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  amount: number;
  address: string;
  specialInstructions?: string;
  paymentMethod?: string;
  createdAt?: string;
}

export const CITIES = [
  'Colombo',
  'Kandy',
  'Galle',
  'Negombo',
  'Jaffna',
  'Matara',
  'Kurunegala',
  'Anuradhapura',
  'Dehiwala',
  'Nugegoda',
  'Batticaloa',
  'Trincomalee',
  'Ratnapura',
  'Badulla',
  'Moratuwa',
  'Maharagama',
  'Kaduwela',
  'Nuwara Eliya',
  'Gampaha'
];

export const CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Nishantha Silva',
    city: 'Colombo',
    email: 'nishantha.s@example.lk',
    phone: '+94 77 123 4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    joinedDate: '2023-01-15',
    totalBookings: 12
  },
  {
    id: 'c2',
    name: 'Amali Perera',
    city: 'Kandy',
    email: 'amali.p@example.lk',
    phone: '+94 71 987 6543',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    joinedDate: '2023-03-22',
    totalBookings: 5
  },
  {
    id: 'c3',
    name: 'Kasun Fernando',
    city: 'Galle',
    email: 'kasun.f@example.lk',
    phone: '+94 76 555 4444',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    joinedDate: '2023-06-10',
    totalBookings: 8
  },
  {
    id: 'c4',
    name: 'Hasini Wijesinghe',
    city: 'Negombo',
    email: 'hasini.w@example.lk',
    phone: '+94 72 333 2222',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    joinedDate: '2023-08-05',
    totalBookings: 3
  },
  {
    id: 'c5',
    name: 'Sajith Bandara',
    city: 'Kurunegala',
    email: 'sajith.b@example.lk',
    phone: '+94 70 111 9999',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    joinedDate: '2023-09-18',
    totalBookings: 1
  }
];

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Electricians', icon: 'ZapIcon', providerCount: 145 },
  { id: 'c2', name: 'Plumbers', icon: 'DropletsIcon', providerCount: 120 },
  { id: 'c3', name: 'Cleaners', icon: 'SparklesIcon', providerCount: 210 },
  { id: 'c4', name: 'Tutors', icon: 'BookOpenIcon', providerCount: 340 },
  { id: 'c5', name: 'Beauty Professionals', icon: 'ScissorsIcon', providerCount: 185 },
  { id: 'c6', name: 'AC Repair', icon: 'WindIcon', providerCount: 95 },
  { id: 'c7', name: 'Painters', icon: 'PaintbrushIcon', providerCount: 110 },
  { id: 'c8', name: 'Carpenters', icon: 'HammerIcon', providerCount: 85 },
  { id: 'c9', name: 'Gardeners', icon: 'LeafIcon', providerCount: 70 },
  { id: 'c10', name: 'Pest Control', icon: 'BugIcon', providerCount: 45 }
];

export const PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Kamal Perera',
    category: 'Electricians',
    city: 'Colombo',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 2500,
    phone: '+94 77 456 7890',
    verified: true,
    bio: 'Master Electrician with over 15 years of experience in residential and commercial wiring, power distribution, and smart home lighting installations in Colombo. Certified by the CEB.',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    memberSince: '2021',
    completedJobs: 342,
    services: [
      { name: 'General Electrical Inspection', price: 3000, description: 'Complete safety audit of main distribution board, breakers & sockets.' },
      { name: 'Wiring & Rewiring', price: 5000, description: 'Single or three-phase wiring installation for homes and offices.' },
      { name: 'Light Fixture & Fan Installation', price: 2000, description: 'Installation of ceiling fans, chandeliers, and LED panel lights.' }
    ]
  },
  {
    id: 'p2',
    name: 'Nimal Jayawardena',
    category: 'Plumbers',
    city: 'Kandy',
    rating: 4.8,
    reviews: 89,
    hourlyRate: 2000,
    phone: '+94 71 234 5678',
    verified: true,
    bio: 'Licensed Sri Lankan Plumber specializing in pressure leak detection, pipe repair, water tank cleanouts, and modern bathroom fixture installations across Kandy.',
    avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
    memberSince: '2022',
    completedJobs: 215,
    services: [
      { name: 'Leak Detection & Pipe Repair', price: 2500, description: 'Thermal & acoustic leak location with minimal wall damage.' },
      { name: 'Overhead Tank & Pump Fitting', price: 4500, description: 'Installation and maintenance of pressure pumps and water tanks.' },
      { name: 'Drain Clearing & Unclogging', price: 3000, description: 'Heavy-duty drain snake clearing for kitchen & bathroom pipes.' }
    ]
  },
  {
    id: 'p3',
    name: 'Priya Wickramasinghe',
    category: 'Cleaners',
    city: 'Negombo',
    rating: 4.9,
    reviews: 210,
    hourlyRate: 1500,
    phone: '+94 76 890 1234',
    verified: true,
    bio: 'Professional house care expert offering deep house cleaning, post-construction cleanup, and regular housekeeping services in Negombo and Ja-Ela. Eco-friendly supplies used.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    memberSince: '2020',
    completedJobs: 560,
    services: [
      { name: 'Standard House Cleaning', price: 4000, description: 'Sweeping, mopping, dusting, and bathroom sanitation.' },
      { name: 'Deep Cleaning Package', price: 8000, description: 'Comprehensive sanitization including kitchen appliances & windows.' },
      { name: 'Move-in / Move-out Cleaning', price: 10000, description: 'Total property refresh before moving in or handing over keys.' }
    ]
  },
  {
    id: 'p4',
    name: 'Lakshmi Ratnayake',
    category: 'Tutors',
    city: 'Galle',
    rating: 4.9,
    reviews: 156,
    hourlyRate: 3000,
    phone: '+94 77 345 6789',
    verified: true,
    bio: 'Senior Science & Mathematics teacher with 12+ years preparing students for G.C.E. O/L and A/L examinations. Sinhala & English medium lessons with revision papers.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    memberSince: '2019',
    completedJobs: 420,
    services: [
      { name: 'O/L Mathematics Tuition (2 hrs)', price: 5000, description: 'Structured syllabus coverage with monthly model paper tests.' },
      { name: 'A/L Physics / Chemistry Tuition (2 hrs)', price: 6000, description: 'In-depth theory and past paper discussion.' },
      { name: 'Exam Revision Crash Course', price: 15000, description: 'Intensive 10-session exam preparation module.' }
    ]
  },
  {
    id: 'p5',
    name: 'Amaya Fernando',
    category: 'Beauty Professionals',
    city: 'Colombo',
    rating: 4.8,
    reviews: 178,
    hourlyRate: 3500,
    phone: '+94 72 901 2345',
    verified: true,
    bio: 'Certified Bridal & Glamour Makeup Artist providing luxury doorstep beauty services in Colombo. Expert in saree draping, hair styling, facials, and manicure/pedicure.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    memberSince: '2021',
    completedJobs: 310,
    services: [
      { name: 'Bridal Makeup Trial & Consultation', price: 15000, description: 'Full makeup test with high-definition cosmetics and saree fitting.' },
      { name: 'Herbal & Gold Facial Therapy', price: 6000, description: 'Deep pore cleansing, exfoliation, and rejuvenating face mask.' },
      { name: 'Hair Styling & Blowout', price: 4500, description: 'Party hair updos, curls, or sleek straightening at your home.' }
    ]
  },
  {
    id: 'p6',
    name: 'Dinesh Silva',
    category: 'AC Repair',
    city: 'Dehiwala',
    rating: 4.7,
    reviews: 92,
    hourlyRate: 2800,
    phone: '+94 70 567 8901',
    verified: true,
    bio: 'HVAC & Inverter Air Conditioner specialist covering Dehiwala, Mount Lavinia, and Ratmalana. Complete diagnostic, chemical wash, and refrigerant refilling.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    memberSince: '2022',
    completedJobs: 185,
    services: [
      { name: 'Standard AC Servicing (Chemical Wash)', price: 3500, description: 'Outdoor unit wash, blower filter cleaning, and gas check.' },
      { name: 'Split AC Installation', price: 12000, description: 'Wall mounting, copper pipe routing, vacuuming, and testing.' },
      { name: 'R32 / R410 Gas Refilling', price: 8000, description: 'Leak fix and full pressure refrigerant recharge.' }
    ]
  },
  {
    id: 'p7',
    name: 'Ruwan Bandara',
    category: 'Painters',
    city: 'Matara',
    rating: 4.7,
    reviews: 64,
    hourlyRate: 2200,
    phone: '+94 77 112 2334',
    verified: true,
    bio: 'Professional House & Commercial Painter in Matara. Color scheme consulting using Dulux & Asian Paints weather shield solutions.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    memberSince: '2023',
    completedJobs: 112,
    services: [
      { name: 'Interior Room Painting (per room)', price: 15000, description: 'Two coats of premium emulsion including minor crack filler.' },
      { name: 'Exterior Wall Paint & Waterproofing', price: 25000, description: 'High-pressure wash, sealer coat, and weather-shield paint.' },
      { name: 'Wall Putty & Primer Prep', price: 5000, description: 'Smooth wall plaster preparation for sleek finish.' }
    ]
  },
  {
    id: 'p8',
    name: 'Chaminda Herath',
    category: 'Carpenters',
    city: 'Kurunegala',
    rating: 4.8,
    reviews: 105,
    hourlyRate: 2500,
    phone: '+94 71 445 5667',
    verified: true,
    bio: 'Traditional Teak & Mahogany Woodworking Carpenter. Custom kitchen pantries, door lock replacements, wooden roof repairs, and furniture restoration.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    memberSince: '2020',
    completedJobs: 240,
    services: [
      { name: 'Custom Pantry & Cabinet Fitting', price: 18000, description: 'Custom wooden pantry cupboard crafting and alignment.' },
      { name: 'Door & Lock Repair / Replacement', price: 3500, description: 'Mortise lock installation, door shaving, and hinge alignment.' },
      { name: 'Furniture Polishing & Touch-up', price: 6500, description: 'Varnish & polyurethane coat refresh for dining tables & chairs.' }
    ]
  },
  {
    id: 'p9',
    name: 'Mohamed Rizwan',
    category: 'Electricians',
    city: 'Batticaloa',
    rating: 4.8,
    reviews: 87,
    hourlyRate: 2400,
    phone: '+94 77 889 9001',
    verified: true,
    bio: 'Solar inverter installer and emergency electrician serving Batticaloa and Kalmunai. Certified in industrial automation and home DB box upgrades.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    memberSince: '2021',
    completedJobs: 204,
    services: [
      { name: 'Solar Inverter & Battery Setup', price: 12000, description: 'Off-grid or hybrid solar system backup wiring.' },
      { name: 'Main DB Box & RCCB Upgrade', price: 6500, description: 'Replacement of trip switches and circuit breakers.' }
    ]
  },
  {
    id: 'p10',
    name: 'Kavitha Subramaniam',
    category: 'Tutors',
    city: 'Jaffna',
    rating: 4.9,
    reviews: 142,
    hourlyRate: 2800,
    phone: '+94 76 123 9988',
    verified: true,
    bio: 'English Literature and Combined Mathematics Educator in Jaffna. Special focus on O/L English paper preparation and A/L Combined Maths guidance.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    memberSince: '2020',
    completedJobs: 380,
    services: [
      { name: 'O/L English Language & Lit (2 hrs)', price: 4500, description: 'Grammar mastery, essay composition, and past papers.' },
      { name: 'Combined Maths Session (2.5 hrs)', price: 5500, description: 'Pure and Applied maths problem sets explained.' }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    providerId: 'p1',
    customerName: 'Sachini Gunawardena',
    rating: 5,
    date: '2026-02-15',
    comment: 'Kamal was excellent! He arrived right on time at our Bambalapitiya apartment, diagnosed the main breaker tripping issue quickly, and installed high quality Schneider breakers. Highly recommended!'
  },
  {
    id: 'r2',
    providerId: 'p1',
    customerName: 'Ravindu Senanayake',
    rating: 5,
    date: '2026-01-22',
    comment: 'Great service. Installed 6 LED panel lights and a ceiling fan in our living room. Neat wiring work and left the workspace clean.'
  },
  {
    id: 'r3',
    providerId: 'p3',
    customerName: 'Dilhani Abeysekera',
    rating: 5,
    date: '2026-02-10',
    comment: 'Priya did an amazing job with the deep cleaning of our house before we moved in. The kitchen tiles and bathrooms look completely brand new.'
  },
  {
    id: 'r4',
    providerId: 'p5',
    customerName: 'Ishara Weerasinghe',
    rating: 5,
    date: '2026-02-05',
    comment: 'Amaya is fantastic! Her bridal makeup trial was flawless and she arrived with all premium products. I felt so relaxed and happy with the result.'
  },
  {
    id: 'r5',
    providerId: 'p2',
    customerName: 'Thilina Bandara',
    rating: 4,
    date: '2026-02-18',
    comment: 'Fixed a major kitchen pipe leak under the sink in Kandy town. Very professional plumber, brought all necessary PVC fittings.'
  },
  {
    id: 'r6',
    providerId: 'p6',
    customerName: 'Melani De Silva',
    rating: 5,
    date: '2026-03-01',
    comment: 'Dinesh serviced both our inverter AC units in Dehiwala. Cooling is so much better now and the chemical wash eliminated all bad odor.'
  }
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking with Kamal Perera for Electrical Rewiring has been confirmed for tomorrow at 10:00 AM.',
    timeAgo: '10 minutes ago',
    read: false
  },
  {
    id: 'n2',
    type: 'payment',
    title: 'Payment Receipt Issued',
    message: 'Receipt CS-2026-8910 for Rs. 5,000 has been sent to your email.',
    timeAgo: '2 hours ago',
    read: false
  },
  {
    id: 'n3',
    type: 'review',
    title: 'Leave a Review',
    message: 'How was your recent deep cleaning service with Priya Wickramasinghe? Share your experience with the community.',
    timeAgo: '1 day ago',
    read: true
  },
  {
    id: 'n4',
    type: 'system',
    title: 'Welcome to CloudServe',
    message: 'Discover top-rated Sri Lankan service professionals near you.',
    timeAgo: '3 days ago',
    read: true
  }
];

export const BOOKINGS: Booking[] = [
  {
    id: 'b1',
    providerId: 'p1',
    customerId: 'c1',
    serviceName: 'Wiring & Rewiring',
    date: '2026-09-24',
    time: '10:00 AM',
    status: 'confirmed',
    amount: 5000,
    address: '123 Galle Road, Colombo 03',
    specialInstructions: 'Ring bell at side entrance. Parking available in driveway.',
    paymentMethod: 'Credit / Debit Card',
    createdAt: '2026-09-21'
  },
  {
    id: 'b2',
    providerId: 'p3',
    customerId: 'c1',
    serviceName: 'Deep Cleaning Package',
    date: '2026-09-15',
    time: '09:00 AM',
    status: 'completed',
    amount: 8000,
    address: '123 Galle Road, Colombo 03',
    paymentMethod: 'Cash after service',
    createdAt: '2026-09-12'
  },
  {
    id: 'b3',
    providerId: 'p6',
    customerId: 'c1',
    serviceName: 'Standard AC Servicing (Chemical Wash)',
    date: '2026-09-28',
    time: '02:00 PM',
    status: 'pending',
    amount: 3500,
    address: '123 Galle Road, Colombo 03',
    specialInstructions: 'Please check bedroom unit noise.',
    paymentMethod: 'LankaQR / Bank Transfer',
    createdAt: '2026-09-22'
  }
];

export const TIME_SLOTS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM'
];