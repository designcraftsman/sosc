const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ContactRoutes = require('./routes/ContactRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const ArticleRoutes = require('./routes/ArticleRoutes');
const CommentRoutes = require('./routes/CommentRoutes');
const MediaRoutes = require('./routes/MediaRoutes');

const app = express();

const corsOptions = {
    origin: '*', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api', ContactRoutes);
app.use('/api/blog', ArticleRoutes);
app.use('/api/blog', CommentRoutes);
app.use('/api/blog', MediaRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;