
# MERN Stack Signup

This project is a simple signup application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to sign up by providing their details and stores the data in MongoDB. The frontend is built with React and styled-components, and local storage is used to store data when offline. If a user already exists, the application will throw an error.

## Features

- User signup with basic details (first name, last name, email, username, password)
- Data storage in MongoDB
- Frontend built with React and styled-components
- Offline data storage using local storage
- Validating an email
- Error handling for duplicate users

## Deployment

The application is deployed on Vercel. You can access it [here](https://zarektroniks-ui.vercel.app/).

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- styled-components
- local storage

## Setup Instructions

1. Clone the repositories:

```bash
for frontend
git clone https://github.com/NAVEED476/zarektroniks-ui.git

for backend 
git clone https://github.com/NAVEED476/api-zarektroinks.git
```

2. Navigate to the project directory:

```bash
cd mern-signup
```

3. Install dependencies for both the backend and frontend:

```bash
cd server && npm install
cd ../user && npm install
```

4. Start the backend server:

```bash
cd ../server && npm start
```

5. Start the frontend server:

```bash
cd ../user && npm start
```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
mern-signup/
│
├── server/                  # Backend server files
│   ├── controllers/          # Controller functions
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   └── index.js                # Express app configuration
│
└── user/                 # Frontend React application
    ├── public/
    └── src/
        ├── components/       # React components
       
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.