const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ContactRoutes = require('./routes/ContactRoutes');

const app = express();

const corsOptions = {
    origin: '*', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', ContactRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;