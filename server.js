const express = require('express');
const connectDB = require('./config/db');

const usersRoutes = require('./routes/api/users-routes');
const authRoutes = require('./routes/api/auth-routes');
const profileRoutes = require('./routes/api/profile-routes');

const app = express();

// Connection to the DataBase
connectDB();

// app.get('/', (req, res) => res.send('API Running'));

//Middleware

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(express.json({ extended: false }));

// Define the Routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occured!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
