var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comments = mongoose.model('Comments')



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

router.get('/admin', function (req, res) {
  
})



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

router.post('/admin', function (req, res) {
  
})


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

