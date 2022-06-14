const express = require('express');

const app = express();
app.use(express.json());

// visualise html
app.get('/',function(req,res) 
{
    res.sendFile('F:/FMI 3ti kurs 2ri sem/webteh/project/WebTexProject_team3/public/mainPage.html');
});

// visualise css (public\css) and js
app.use(express.static('F:/FMI 3ti kurs 2ri sem/webteh/project/WebTexProject_team3/public' + '/'));

app.listen(3003);

