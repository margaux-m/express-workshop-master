const express = require('express');
const app = express();

app.get("/", function(req, res) {
  res.send("Yay!");
});

app.get("/node", function(req, res) {
  res.send("No...de endpoint!");
});

app.get("/girls", function(req, res) {
  res.send("Girlsss endpoint!");
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});
