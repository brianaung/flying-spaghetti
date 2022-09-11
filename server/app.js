

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

/********* TODO: move routes ************/
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
/****************************************/

const server = app.listen(process.env.PORT || 9000, () => {
  console.log(
    'our app is listening on port %d', 
    server.address().port
  )
})
