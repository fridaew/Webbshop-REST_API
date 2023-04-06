const app = require('./app');
const mongoose = require('mongoose')
require('dotenv').config();

const PORT = process.env.PORT || 9999

app.listen(PORT, () => console.log('server running on: ' + PORT))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connected to DB'))
  .catch(err => console.log(err.message))