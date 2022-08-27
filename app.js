const express = require("express");
const app = express();

app.get('/', (req, res) => { 
    res.send('Our demo app is working!') 
});

app.get('/about', (req, res) => { 
    res.send('this is about page') 
});

app.get('/user:id', (req, res) => { 
    res.send("<p>this is user" + req.params.id + "page!"+"</p>")
     
});

app.get('/login', (req, res) => { 
    res.send('this is login page') 
});

app.get('/register', (req, res) => { 
    res.send('this is register page!') 
});

app.get('/upload', (req, res) => { 
    res.send('this is upload page!') 
});

app.get('/photo', (req, res) => { 
    res.send('this is photo page') 
});




app.listen(3000, () => { 
    console.log('Demo app is listening on port 3000!') 
});