const express = require('express');
const formidable = require('express-formidable');
const app = express();

app.use(express.static("public"));

app.use(formidable());

app.post("/create-post", function(req, res) {
  console.log(req.fields);
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});
