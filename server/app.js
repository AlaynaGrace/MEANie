//requires
var express = require( 'express' );
var app=express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
//uses
app.use( bodyParser.json() );
app.use( express.static( 'public' ) );
app.use(bodyParser.urlencoded({extended:true}));
// 27017 is default mongo port
mongoose.connect( 'localhost:27017/meanie' );
var ourSchema = new  mongoose.Schema({
  name: String,
  location: String
});
var ourModel = mongoose.model( 'ourmodels', ourSchema );
app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'public/index.html' ) );
});
app.get( '/getRecords', function( req, res ){
// get and send back all the things
  ourModel.find().then( function( data ){
    res.send( data );
  });
});
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});
app.post( '/testPost', function( req, res ){
  console.log( 'req.body.name: ' + req.body.name );
// retrieved the req.body
// putting it into an object to be saved in the db
  var recordToAdd={
    name:req.body.name,
    location:req.body.location
  };
// create new record
  var newRecord = ourModel( recordToAdd );
  newRecord.save();
  res.sendStatus(201); // added a send status
});

app.delete('/deleteRecord/:id',function(req,res){
  console.log('got this:',req.params.id);
  ourModel.remove({_id: req.params.id},function(err){
    if(err){
      console.log(err);
    }
    else{
      res.send(200);
    }
  });
});
