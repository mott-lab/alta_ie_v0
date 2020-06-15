const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));


app.get('/alta_ie_v0/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

//app.listen(5000);

module.exports = app;
