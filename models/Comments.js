var mongoose = require('mongoose');


// Create a scheme for items in the museum: a title and a path to an image.
const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
  date: String,
  recipeID: String,
});

mongoose.model('Comments', commentSchema);