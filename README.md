# CloudServe

A Sri Lankan web-based local service booking platform designed to seamlessly connect customers with trusted local service professionals across Sri Lanka.

## About the Project

CloudServe aims to solve the challenge of discovering, booking, and tracking reliable local service providers in Sri Lanka. Whether a customer requires an electrician in Colombo, a plumber in Kandy, a home tutor in Galle, a house cleaner in Negombo, or an AC repair technician in Dehiwala, CloudServe provides a centralized marketplace.

The platform empowers local service professionals to showcase their qualifications, manage their availability, handle service requests, and build an online reputation through customer ratings and reviews.

## Key Features

### For Customers
* **Service Category Browsing**: Explore popular local categories including Electricians, Plumbers, Cleaners, Tutors, Beauty Professionals, AC Repair, Painters, Carpenters, Gardeners, and Pest Control.
* **Search & Location Filtering**: Filter professionals by service keyword, Sri Lankan city (Colombo, Kandy, Galle, Jaffna, Negombo, etc.), minimum rating, and price range in LKR.
* **Service Provider Profiles**: Detailed professional profiles featuring verified badges, hourly rates, service catalogs, biographies, contact information, and verified customer reviews.
* **End-to-End Booking Interface**: 4-step booking workflow with service selection, date picker, time slot selection, Sri Lankan address input, and payment preference selection.
* **Live Service Status Tracking**: Visual progress tracker showing real-time appointment status (`Pending` → `Confirmed` → `In Progress` → `Completed` → `Cancelled`).
* **Customer Dashboard**: Overview of active appointments, past bookings history, Cloud Points loyalty rewards, CloudServe Prime membership, and notification center.
* **Ratings & Reviews**: Post star ratings and written reviews for completed appointments.

### For Service Providers
* **Provider Dashboard**: Real-time overview of incoming booking requests, total earnings in LKR, and completed job statistics.
* **Route Planner & Dispatch Map**: Visual route schedule displaying daily job stops across Sri Lankan locations with GPS navigation simulation.
* **Service Management**: Add, edit, or delete service offerings with custom descriptions and pricing.
* **Schedule & Job Requests**: Accept or decline incoming customer booking requests and update job progress.

### Platform & UI
* **Sri Lankan Localization**: Sri Lankan cities, names, currency (`Rs.` / `LKR`), phone formatting (`+94 7X ...`), and Sri Lankan payment options (Credit/Debit Card, Cash After Service, LankaQR / Bank Transfer).
* **Responsive Design**: Optimized for desktop, tablet, and mobile browsers.

## Technology Stack

CloudServe is designed around the **MERN Stack**:
* **MongoDB**: Planned database solution for document storage (users, providers, bookings, reviews).
* **Express.js**: Planned backend web application framework for REST API endpoints.
* **React.js**: Modern component-based frontend library (React 18 with TypeScript).
* **Node.js**: Planned JavaScript runtime environment for backend service execution.

### Frontend Technologies Used in Repository
* **React 18** with **TypeScript**
* **Vite** (Build tool & development server)
* **Tailwind CSS** (Utility-first CSS framework for UI styling)
* **Lucide React** (Icon library)

## Current Development Status

The CloudServe project is currently in the **Frontend Phase**:
* **Frontend Implementation**: Fully developed, styled, and responsive user interface covering all public pages, booking flows, customer dashboard, provider dashboard, and admin portal.
* **Backend Status**: The Express.js / Node.js backend and MongoDB database integration are currently under development.
* **Data Simulation**: Frontend interactions (booking creation, status updates, review submissions, profile edits, and notifications) utilize rich frontend state and mock data to demonstrate the complete user experience.

## Screenshots

*(Add screenshots of the CloudServe platform here)*

## Installation & Setup

Follow these steps to run the CloudServe frontend repository locally:

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/cloudServe.git
   cd cloudServe
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

### Additional Commands
* **Build for Production**:
  ```bash
  npm run build
  ```
* **Preview Production Build**:
  ```bash
  npm run preview
  ```

## Future Improvements

* **Backend API Development**: Implement Node.js and Express.js REST APIs for authentication, booking endpoints, and user management.
* **MongoDB Database Integration**: Connect persistent database schemas for accounts, provider listings, bookings, and reviews.
* **User Authentication**: Secure JWT-based authentication for customers, service providers, and administrators.
* **Payment Gateway Integration**: Connect local Sri Lankan payment gateways (e.g., PayHere) and online card processing.
* **Real-Time Push Notifications**: Integrate WebSockets / Socket.io for live booking status updates.
* **Provider Verification Portal**: Automated document upload (NIC, police certificate) for provider verification.

## Project Purpose

CloudServe was developed as a practical software engineering project focused on addressing local service marketplace needs in Sri Lanka. It serves as an exploration of modern frontend architecture, user experience design, and digital marketplace dynamics.
