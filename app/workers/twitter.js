var http = require('http');
var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');

//create redis client      
function TwitterWorker(terms) {                                                                                                                                                                                                                 
var client = redis.createClient();

//if the 'awesome' key doesn't exist, create it                                                                                                                                                                                             
client.exists('awesome', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    } else if(!exists) {
        client.set('awesomelinks','link')
        client.set('awesome', 0); //create the awesome key
    };
});

/*
client.exists('cool', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    } else if(!exists) {
        client.set('cool', 0); //create the awesome key
    };
});

client.exists('rad', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    } else if(!exists) {
        client.set('rad', 0); //create the awesome key
    };
});

client.exists('gnarly', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    } else if(!exists) {
        client.set('gnarly', 0); //create the awesome key
    };
});

client.exists('groovy', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    } else if(!exists) {
        client.set('groovy', 0); //create the awesome key
    };
});*/

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
    { track: ['awesome', 'cool', 'rad', 'gnarly', 'groovy'] },
    function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            //if awesome is in the tweet text, increment the counter                                                                                                                                                                        
            if(tweet.url && tweet.text.match(/awesome/)) {
                client.incr('awesome');
            }

            if(tweet.text.match(/cool/)) {
                client.incr('cool');
            }

            if(tweet.text.match(/rad/)) {
                client.incr('rad');
            }

            if(tweet.text.match(/gnarly/)) {
                client.incr('gnarly');
            }

            if(tweet.text.match(/groovy/)) {
                client.incr('groovy');
            }



        });
    }
  );
 };

  module.exports = TwitterWorker;