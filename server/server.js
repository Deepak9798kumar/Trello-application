const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://nutechuser:Nutechuser@cluster0.g1p3xeq.mongodb.net/trello-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
console.log("MongoDB connected")

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
