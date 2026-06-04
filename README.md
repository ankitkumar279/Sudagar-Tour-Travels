# Sudagar Tour & Travels

A modern taxi booking and tour management platform built with React, Node.js, Express, PostgreSQL, and Cloudinary.

## Features

### Customer Features

* Online taxi booking
* Local city transfers
* Airport pickup and drop services
* Outstation travel booking
* Tour package booking
* Live fare calculation
* Special offers and coupon codes
* Customer enquiry system
* Mobile responsive design

### Admin Features

* Secure admin authentication
* Manage cabs and fleet
* Manage tour packages
* Manage offers and coupons
* View bookings
* Customer management
* Dashboard analytics
* Image upload with Cloudinary

## Technology Stack

### Frontend

* React
* Vite
* React Router
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* Cloudinary
* Multer
* Resend Email API

## Project Structure

```text
transport-platform
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── config
│   └── package.json
│
└── vercel.json
```

## Installation

### Clone Repository

```bash
git clone https://github.com/ankitkumar279/Sudagar-Tour-Travels.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend

```env
DATABASE_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
```

### Frontend

```env
VITE_API_URL=
```

## Deployment

* Frontend: Vercel
* Backend: Vercel
* Database: PostgreSQL
* Images: Cloudinary

## Author

Ankit Kumar

## License

MIT License
