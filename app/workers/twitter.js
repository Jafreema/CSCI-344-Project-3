var http = require('http');
var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');

//create redis client      
function TwitterWorker(terms) {                                                                                                                                                                                                                 
var client = redis.createClient();
var words;
//if the 'awesome' key doesn't exist, create it                                                                                                                                                                                             
client.exists('awesome', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    } else if(!exists) {
        //cilent.set('word', );
        client.set('awesome', 0); //create the awesome key
    };
});

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});


 var update = function(key) {
    client.incr(key, function(err, result) {
        if(err) {
        console.log('ERROR: ' + err);
        } else {
        var message = {key:key, count:result};
        client.publish('update', JSON.stringify(message));
        }
    });
    };
    

t.stream(
    'statuses/filter',
    { track: [terms] },
    function(stream) {
        stream.on('data', function(tweet) {
           // console.log(tweet.text);
            //if awesome is in the tweet text, increment the counter                                                                                                                                                                        
                try {
                    
                if (tweet.entities.urls[0].expanded_url != " ") { 
                    url = tweet.entities.urls[0].expanded_url; 
                    }
                else if (tweet.entities.urls[0].url !=  " ") {
                    url = tweet.entities.urls[0].url;
                    }
                    //console.log(url);
                   
                    client.incr(url); 
                
            }
                
                catch (error) {
                }


        });
    }
  );
 };

  module.exports = TwitterWorker;