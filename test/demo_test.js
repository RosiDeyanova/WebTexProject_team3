const connection =  require('E:/FMI/3 Курс/Web/project/WebTexProject_team3/connection.js')
const mocha  = require('mocha')
const assert = require('assert')
const Album = require('E:/FMI/3 Курс/Web/project/WebTexProject_team3/public/server/src/mvc/models/albums.js')

describe('basic db operation tests', function(){
    it('add a record to the db',async function(){
        var album = new Album({
            userId:'User2',
            imgBase64:'data:image.pngSnimka2'
        });
        album.save().then(function(){
            assert(char.isNew === false);
        })
    });
});