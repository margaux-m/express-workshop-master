const express = require('express');
const formidable = require('express-formidable');
const mustacheExpress = require('mustache-express');

const fs = require('fs');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static("public"));
app.use(express.static("data"));
app.use(formidable());

app.get('/get-posts', function(req, res) {
  res.sendFile(__dirname + '/data/posts.json');
});

app.post('/create-post', function(req, res) {

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

app.get('/posts/:postId', function(req, res) {
  const postId = req.params.postId;

  fs.readFile(__dirname + '/data/posts.json', function(error, file) {
    if (error) {
        console.log(error);
    } else {
        const parsedFile = JSON.parse(file);
        const postContent = parsedFile[postId];

        res.render('post', { post: postContent });
    };
  });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});
