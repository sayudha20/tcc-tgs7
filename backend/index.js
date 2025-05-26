require('dotenv').config();
const express = require('express');
const cors = require('cors');
const route = require('./routes/route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});