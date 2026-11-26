# Khwaja Mozammel Hoque (R) Foundation

An official web application for the **Khwaja Mozammel Hoque (R) Foundation**, built to empower humanitarian initiatives including **Sadka-E-Zaria**, **educational scholarship programs**, and **community health support**.

## About

The Foundation works to support people in need through charity, education, and healthcare. This web application is the Foundation's online home. It lets visitors learn about the Foundation's work, take part in its programs, and support its mission.

## Programs

- **Sadka-E-Zaria**: ongoing charity initiatives that help people in need.
- **Educational Scholarships**: financial support for students so they can continue their education.
- **Community Health Support**: healthcare assistance for people in the community.

## Features

- Information pages about the Foundation and each of its programs
- Online forms for scholarship applications and support requests
- Donation and contribution information
- Admin dashboard to manage programs, applications, and donations
- Fully responsive design for mobile, tablet, and desktop

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | React, React Router, Tailwind CSS |
| Backend  | Node.js, Express                  |
| Database | MongoDB                           |

## Project Structure

```
Khwaja-Mozammel-Hoque-Foundation/
├── README.md
├── .gitignore
│
├── client/                          # Frontend (React + Vite)
│   ├── public/
│   │   ├── favicon.ico
│   │   └── images/
│   ├── src/
│   │   ├── assets/                  # images, logos, fonts
│   │   ├── components/
│   │   │   ├── common/              # Button, Modal, Loader, SectionTitle
│   │   │   ├── layout/              # Navbar, Footer, Layout
│   │   │   └── home/                # Hero, Programs, Impact, Gallery
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── SadkaEZaria.jsx
│   │   │   ├── Scholarship.jsx
│   │   │   ├── HealthSupport.jsx
│   │   │   ├── Donate.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Applications.jsx
│   │   │       └── Donations.jsx
│   │   ├── hooks/
│   │   │   └── useScroll.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js               # axios instance
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                          # Backend (Node + Express)
    ├── config/
    │   └── db.js                    # MongoDB connection
    ├── controllers/
    │   ├── authController.js
    │   ├── scholarshipController.js
    │   ├── healthController.js
    │   ├── donationController.js
    │   └── contactController.js
    ├── models/
    │   ├── User.js
    │   ├── ScholarshipApplication.js
    │   ├── HealthRequest.js
    │   ├── Donation.js
    │   └── Message.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── scholarshipRoutes.js
    │   ├── healthRoutes.js
    │   ├── donationRoutes.js
    │   └── contactRoutes.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── errorHandler.js
    │   └── upload.js                # file/image upload
    ├── utils/
    ├── uploads/
    ├── .env
    ├── package.json
    └── server.js
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A running database instance (for example, MongoDB local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Shimul-DIU/Khwaja-Mozammel-Hoque-Foundation.git
cd Khwaja-Mozammel-Hoque-Foundation
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_database_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

### 3. Set up the client

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file inside `client/` if needed:

```env
VITE_API_URL=http://localhost:5000
```

Start the client:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm start`     | Run the production server    |

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

Add your license here (for example, MIT).

## Contact

**Khwaja Mozammel Hoque (R) Foundation**

- Website: _add link_
- Email: _add email_
- Address: _add address_

Developed by [Shimul-DIU](https://github.com/Shimul-DIU).
