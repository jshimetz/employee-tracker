const express = require('express');
const app = express();
const DB = require('./db/DB');

// Your application code goes here

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
