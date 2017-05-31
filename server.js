const express = require('express');
const app = express();
const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(expression);

var targetUrl, randNum;

app.get('/', function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(
            `
            <h3>Example creation usage:</h3>
            <code>https://url-shortener-evandersar.c9users.io/new/https://www.google.com</code><br>
            <code>https://url-shortener-evandersar.c9users.io/new/http://foo.com:80</code>
            <h3>Example creation output</h3>
            <code>{"original_url":"https://www.google.com","short_url":"https://url-shortener-evandersar.c9users.io/53}</code>
            <h3>Usage:</h3>
            <code>https://url-shortener-evandersar.c9users.io/53</code>
            <h3>Will redirect to:</h3>
            <code>https://www.google.com/</code>
            `
        );
});

app.get('/new/*', function (req, res) {
    targetUrl = req.url.split('new/')[1];
    
    if (targetUrl.match(regex)){
        randNum =  Math.floor(Math.random() * 99) + 1;
        //console.log(targetUrl);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
            JSON.stringify({
                original_url: targetUrl,
                short_url:  "https://url-shortener-evandersar.c9users.io/" + randNum
            })    
        );
    }
    else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({error: "Wrong URL format"}));
    }

});

app.get('/*', function (req, res) {
    
    if (req.url.slice(1) == randNum){
        res.redirect(targetUrl); 
    }
    else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({error: "Wrong URL"}));
    }
    
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});