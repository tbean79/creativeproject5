var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comments = mongoose.model('Comments');
var Recipe = mongoose.model('Recipe');



// GET method route
router.get('/get', async (req, res) => {
  try {
    let items = await Comments.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

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



// POST new comment
router.post('/add', async (req, res) => {
  console.log(req);
  const item = new Comments({
    author: req.body.author,
    text: req.body.text,
    date: req.body.date,
    //recipe: req.body.recipe,
  });
  try {
    console.log(item);
    await item.save();
    console.log(res);
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


router.delete('/admin/:id', async (req, res) => {
  var id = req.params.id;
  try {
    Comments.deleteOne({ _id: id }, function (err, results) {
  });
  }catch (error) {
    console.log(error);
  }

  res.json({ success: id })
});

module.exports = router;

//app.listen(3003, () => console.log('Server listening on port 3003!'));

