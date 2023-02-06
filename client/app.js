const express = require('express');
const bodyParser = require('body-parser');
const equityRoutes = require('./routes/equityRoutes');

// express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/api', equityRoutes);

// run server
app.listen(3000, () => {
  console.log('Server listing on port 3000');
});