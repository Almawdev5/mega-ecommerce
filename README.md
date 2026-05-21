<div align="center">
	<img src="client/public/favicon.svg" alt="Mega Technology Logo" width="80"/>
  
	# MEGA TECHNOLOGY
  
	**Ethiopia's Premier Tech Platform**
</div>

---

## Overview

Mega Technology is a full-stack web platform offering premium electronics, digital subscriptions, and professional social media advertising services. The project features a modern React frontend and a robust Node.js/Express backend with MongoDB.

---

## Features

- **Product Marketplace:** Browse and order mobile phones, smart watches, tablets, and accessories.
- **Digital Services:** Purchase digital subscriptions (Netflix, Spotify, Telegram, YouTube) and social media boosts (TikTok, Instagram, Facebook).
- **Order Management:** Place and track orders for products and services.
- **Admin Dashboard:** Manage products, services, orders, and payments (admin-only).
- **Authentication:** Secure admin login and JWT-based authentication.
- **Contact Form:** Users can send messages or inquiries directly from the platform.
- **Responsive UI:** Modern, mobile-friendly design with dark/light theme support.

---

## Tech Stack

### Frontend
- [React](https://react.dev/) (with Context API for Auth & Theme)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Axios (API requests)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (via Mongoose)
- JWT (authentication)
- Multer & Cloudinary (file uploads)
- CORS, dotenv

---

## Project Structure

```
mega-technology/
│
├── client/         # React frontend (Vite, Tailwind)
│   └── src/
│       ├── components/   # UI components
│       ├── context/      # Auth & Theme context
│       ├── hooks/        # Custom hooks
│       ├── pages/        # App pages (Home, Products, Services, Admin, etc.)
│       └── utils/        # API utilities
│
├── server/         # Node.js/Express backend
│   ├── config/     # DB config
│   ├── controllers/# Route controllers
│   ├── middleware/ # Auth, upload middleware
│   ├── models/     # Mongoose models
│   └── routes/     # API routes
└── README.md       # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mega-technology.git
cd mega-technology
```

### 2. Setup Environment Variables

Create a `.env` file in the `server/` directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### 4. Run the Application

#### Start Backend Server
```bash
cd server
npm run dev
```

#### Start Frontend (in a new terminal)
```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000` by default.

---

## Usage

- **Browse Products/Services:** Visit the homepage and navigate via the menu.
- **Place Orders:** Add products/services to your order and complete the checkout process.
- **Admin Access:** Go to `/admin` to log in and manage the platform (requires admin credentials).
- **Contact:** Use the contact page to send messages or inquiries.

---

## Folder Details

- **client/src/pages/**: Main pages (Home, Products, Services, Contact, Admin dashboard, etc.)
- **client/src/components/**: UI components (Navbar, Footer, ProductCard, ServiceCard, PaymentModal, etc.)
- **client/src/context/**: React Context for authentication and theme management
- **server/controllers/**: Express route controllers for products, services, orders, authentication, and contact
- **server/models/**: Mongoose schemas for Product, Service, Order, and Admin
- **server/routes/**: API endpoints for all resources

---

## License

This project is licensed under the MIT License.

---

<div align="center">
	Built with Almaw by Mega Technology Team
</div>
