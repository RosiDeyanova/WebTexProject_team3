const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://root:root@cluster0.8eazs.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.once('open',function(){
    console.log('Connection to db is sucessful.');
}).on('error',function(error){
    console.log('Error with connectting to the db: ', error);
});