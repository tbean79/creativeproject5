var mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  directions: String,
});

mongoose.model('Recipe', recipeSchema);
