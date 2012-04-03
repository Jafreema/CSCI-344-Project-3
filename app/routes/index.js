
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.awesome = function(req, res){
  res.render('awesome.ejs', { title: 'awesome' })
};

exports.cool = function(req, res){
  res.render('cool.ejs', { title: 'cool' })
};

exports.rad = function(req, res){
  res.render('rad.ejs', { title: 'rad' })
};

exports.gnarly = function(req, res){
  res.render('gnarly.ejs', { title: 'gnarly' })
};

exports.groovy = function(req, res){
  res.render('groovy.ejs', { title: 'groovy' })
};