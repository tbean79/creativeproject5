var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');




router.param('recipe', function(req, res, next, id) {
  var query = Recipe.findById(id);
  query.exec(function (err, recipe){
    if (err) { return next(err); }
    if (!recipe) { return next(new Error("can't find recipe")); }
    req.recipe = recipe;
    return next();
  });
});

router.get('/recipe/:recipe',function(req,res) {
  res.json(req.recipe);
});


router.delete('/recipe/:recipe',function(req,res) {
  req.recipe.remove();
  res.sendStatus(200);
});

router.get('/recipe', function(req, res, next) {
  console.log("Get Route");
  Recipe.find(function(err, recipes){
    if(err){ console.log("Error"); return next(err); }
    res.json(recipes);
  console.log("res.json Get Route");
  });
  console.log("returningGet Route");
});

router.post('/recipe', function(req, res, next) {
  console.log("Post Route");
  var recipe = new Recipe(req.body);
  console.log("Post Route");
  console.log(recipe);
  recipe.save(function(err, recipe){
		console.log("Error "+err);
		if(err){  return next(err); }
    console.log("Post Route before json");
		res.json(recipe);
	});
});

module.exports = router;


