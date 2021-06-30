const express = require('express');
const formidable = require('express-formidable');
const fs = require('fs');

const app = express();

app.use(express.static("public"));

app.use(formidable());

app.get("/get-posts", function(req, res) {
  res.sendFile(__dirname + '/data/posts.json');
});

app.post("/create-post", function(req, res) {

  fs.readFile(__dirname + '/data/posts.json', function(error, file) {
    if (error) {
        console.log(error);
    } else {
        const content = req.fields.blogpost;
        const timestamp = Date.now().toString();

        const parsedFile = JSON.parse(file);
        parsedFile[timestamp] = content;

        const stringifiedFile = JSON.stringify(parsedFile);

        fs.writeFile(__dirname + '/data/posts.json', stringifiedFile, function(error) {
          if (error) {
              console.log(error);
          } else {
              res.redirect('/');
          }
        });
    };
  });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});
