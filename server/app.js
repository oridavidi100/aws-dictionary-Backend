const express = require('express');
require('dotenv').config();
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();
const PORT = 8000;
const { wordRouter } = require('./routers/word');

app.use(cors());
app.use(express.json());
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use('/', wordRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
// module.exports.handler = serverless(app);
