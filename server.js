//import { MongoClient } from 'mongodb';
const express = require('express');

const app = express();
app.use(express.json());

// visualise html
app.get('/',function(req,res) 
{
    res.sendFile('C:/Users/Mimi/Documents/GitHub/WebTexProject_team3/public/mainPage.html');
});

// visualise css (public\css) and js
app.use(express.static(__dirname + '/'));

/*
MongoClient.connect("mongodb+srv://root:root@cluster0.8eazs.mongodb.net/?retryWrites=true&w=majority",(error,client)=>{
    if(error){
        client.close();
        return;
    }
});
*/

app.listen(3000);

