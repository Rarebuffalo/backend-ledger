# Backend Ledger System

A robust banking backend ledger system built with Node.js, Express, and MongoDB. This system provides secure user authentication, account management, and a transactional ledger with strict immutability for financial integrity.

## Features

- **User Authentication**: Secure registration and login using JWT and Bcrypt hashing.
- **Account Management**: Support for multiple accounts per user with statuses (Active, Frozen, Closed).
- **Transaction Engine**: Process transfers between accounts with idempotency support to prevent duplicate transactions.
- **Immutable Ledger**: A double-entry style ledger where entries are strictly immutable (no updates or deletes allowed) to ensure a reliable audit trail.
- **Email Notifications**: Automated welcome emails upon registration using Nodemailer and Google OAuth2.
- **Security**: Middleware-based authentication and cookie-based token management.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.x)
- **Database**: MongoDB with Mongoose ODM
- **Security**: JSON Web Tokens (JWT), BcryptJS
- **Email**: Nodemailer with Google APIs (OAuth2)
- **Utilities**: Dotenv, Cookie-parser

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- Google Cloud Console project (for Gmail OAuth2 credentials)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend-ledger
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_gmail_address
   CLIENT_ID=your_google_client_id
   CLIENT_SECRET=your_google_client_secret
   REFRESH_TOKEN=your_google_refresh_token
   ```

### Running the Application

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

## API Documentation

### Authentication (`/api/auth`)
- `POST /register`: Register a new user.
- `POST /login`: Login and receive a JWT (stored in cookies).

### Accounts (`/api/accounts`)
- `POST /`: Create a new banking account for the authenticated user.

### Transactions (`/api/transactions`)
- `POST /`: (In Development) Initiate a transfer between accounts.

## Ledger Immutability

One of the core design principles of this system is **Ledger Immutability**. Once a ledger entry is created via Mongoose, pre-hooks prevent any modification or deletion:
- `findOneAndUpdate`, `updateOne`, `deleteOne`, and other modification methods are restricted.
- This ensures that the transaction history remains tamper-proof.

## License

This project is licensed under the [ISC License](LICENSE).
