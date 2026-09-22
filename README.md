# CloudServe

CloudServe is a Sri Lankan web-based local service booking platform designed to connect customers with trusted local service providers such as electricians, plumbers, cleaners, tutors, beauticians, and home maintenance professionals. The platform allows users to discover professionals, view detailed profiles, select time slots, create bookings, and track service progress.

## Features

* Browse and search local service categories
* Filter providers by service, Sri Lankan city, rating, and price
* View service-provider profiles with pricing, bios, ratings, and reviews
* 4-step booking workflow with date/time slot selection and payment simulation
* Live service status tracking (`Pending` → `Confirmed` → `In Progress` → `Completed` → `Cancelled`)
* Customer dashboard for managing appointments, Cloud Points, and settings
* Service-provider dashboard for managing job requests, services, and route planning
* Ratings and review submission system
* Responsive mobile and desktop design

## Tech Stack

* **Architecture**: MERN Stack (MongoDB, Express.js, React.js, Node.js)
* **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React

## Current Status

The frontend user interface and interaction flows are fully developed and responsive. Backend REST API services and MongoDB database integration are planned for future development.

## Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cloudServe.git
   cd cloudServe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.
