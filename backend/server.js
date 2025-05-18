const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const commentRoutes = require('./routes/comments');
const noteRoutes = require('./routes/notes');
const videoRoutes = require('./routes/video');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/comments', commentRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/video', videoRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log('Server running on port', process.env.PORT || 5000)
    );
  });
