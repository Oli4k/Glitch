// init project
var express = require('express'),
    json = require('express-json'), 
    router = express.Router(),
    request = require('request'),
    Tabletop = require('tabletop'),
    url = require('url');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(json());

var sendData = {};

Tabletop.init( {
  key: process.env.GOOGLE_SHEET_URL,
  wanted: ['posts', 'info'],
  // prettyColumnNames: true,
  parseNumbers: true,
  callback: function (data, tabletop) {
        sendData.posts = tabletop.sheets().posts.elements;
        sendData.info = tabletop.sheets().info.elements;
        var i;
        for (i = 0; i < sendData.posts.length; i++) { 
        var postID = [sendData.posts[i]["id"]];
        sendData.posts[postID] = ({[postID] : sendData.posts[i]});
        };
  },
  simpleSheet: false
  });

// console.log(sendData.posts);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/data/content.json", function (req, res) {
  // res.setHeader('Content-Type', 'application/json');
  res.json(sendData);
});

app.get("/data/content/:postID", function (req, res, err) {
    var postID = "";
    postID = req.params.postID;
    if (sendData.posts[postID] != undefined || '') {
    res.json(sendData.posts[postID]);
    } else {
    console.error(err.stack)
    res.status(204).send("No content")
    }
    // res.send(req.params);
    }
);

app.get("/posts/post.html", function (req, res, err) {
    var postid = req.query.postid;
    console.log('Query:' + postid);
    // res.sendFile(__dirname + '/views/post.html');
    if (sendData.posts[postid] != undefined || '') {
    res.sendFile(__dirname + '/views/post.html');
    } else {
    console.error(err.stack)
    res.status(404).send("Not found")
    }

    }
);

// app.get("/posts/:postID", function (req, res, err) {
//     var postID = "";
//     postID = req.params.postID;
//     res.sendFile(__dirname + '/views/post.html');
//     if (sendData.posts[postID] != undefined || '') {
//     res.json(sendData.posts[postID]);
//     } else {
//     console.error(err.stack)
//     res.status(404).send("Not found")
//     }
//     // res.send(req.params);
//     var id = req.query.id;
//     console.log(id);
//     }
// );

app.get("/data/content", function (req, res) {
    res.json(sendData.posts);
    }   
);
app.get("/data/info", function (req, res) {
    res.json(sendData.info);
    }   
);
app.get("/content.json", function (req, res) {
    res.json(sendData.posts);
    }   
);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});