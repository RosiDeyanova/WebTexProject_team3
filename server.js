const express = require('express'); 
const { join } = require('path'); // to join paths

const app = express(); // create application from express
const port = 3000;
const cwd = process.cwd(); // current working directory

const index = join(cwd, 'public', 'index.html'); // path to index.html
// (file needs to be with the name "index.html")

app.use(express.json()); // middleware to parse json request body (req.body !== undefined)
app.use(express.static('public')) // serve the static files

app.listen(port); // choose on which port to listen


