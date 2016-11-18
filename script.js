var restify = require( "restify" );
var config = require("./config/config.json");
//var db = require("./models" ); eventually when I have models to work with


var server = restify.createServer( {
  name: config.api.name,
  version: config.api.version
} ); 

server.use( restify.acceptParser( server.acceptable ) );
server.use( restify.queryParser() );
server.use( restify.bodyParser() );
server.use( restify.authorizationParser() );
server.use( restify.CORS() );
server.use( restify.fullResponse() );

db.sequelize.sync( { force:false } )
    .complete( function( err ){
        if( err ){
          throw( err );
        } 
        else {
          server.listen(config.api.port, function()
             console.log( '*** ' + config.api.name + 'listening on port' + config.api.port + ' ***' ){
          })
        }
    } );

require('./config/routes')(server);
