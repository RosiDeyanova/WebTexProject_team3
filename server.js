
const express = require('express');

const app = express();
app.use(express.json()); // middleware 

// visualise html
app.get('/',function(req,res) 
{
    res.sendFile('C:/Users/Mimi/Documents/GitHub/WebTexProject_team3/mainPage.html');
});

// visualise css (public\css) and js
app.use(express.static(__dirname + '/'));

app.listen(3000);


/*
const express = require('express'); // get express function
const { join } = require('path'); // to join paths according to your OS (normalize)

const app = express(); // create application from express
const port = 3000;
const cwd = process.cwd(); // cwd === current working directory

const index = join(cwd, 'public', 'mainPage.html'); // path to index.html

app.use(express.json()); // middleware to parse json request body (req.body !== undefined)
app.use(express.static('public')) // serve index.html, index.js (static files)

app.get('/', (req, res) => { // endpoint
    
    res.sendFile(index)
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
*/