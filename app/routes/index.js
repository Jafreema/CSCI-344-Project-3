
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.awesome = function(req, res){
  res.render('awesome.ejs', { title: 'awesome' })
};