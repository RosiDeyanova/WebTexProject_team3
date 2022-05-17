const express = require('express');

const app = express();
app.use(express.json());

// visualise html
app.get('/',function(req,res) 
{
    res.sendFile('C:/Users/Mimi/Documents/GitHub/WebTexProject_team3/mainPage.html');
});

// visualise css (public\css) and js
app.use(express.static(__dirname + '/'));

app.listen(3000);