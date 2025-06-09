require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(
    cors({
      origin: "*",
    })
  );

// ✅ health check route
app.get('/health', (req, res) => {
  res.status(200).send('pong');
});

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4040;
app.listen(port, () => console.log('Server listening on port ' + port));
