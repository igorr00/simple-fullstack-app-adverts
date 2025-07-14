# simple-fullstack-app-adverts
A full-stack web application for posting and browsing adverts. Built with **React**, **Node.js (Express)**, and **PostgreSQL**.

## Features

- User registration and login
- Create, edit, delete your own adverts
- Browse all adverts with:
  - Search (name)
  - Filter by name, category and price range
  - "Show mine only" checkbox
  - Pagination (20 per page)
- View full advert and user info

---

## Technologies

- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: PostgreSQL

---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/igorr00/simple-fullstack-app-adverts.git
cd simple-fullstack-app-adverts
```

### 2. Backend Setup (server)

```bash
cd backend
npm install
```
Environment Variables
Create a .env file in the backend folder:

```env
PORT=5000
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_db
```

Create Tables, Seed Data and Start Server
```bash
node index.js
```

### 3. Frontend Setup (client)
```bash
cd ../frontend
npm install
npm start
```
App will be available at: http://localhost:3000
