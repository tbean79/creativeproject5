var app = new Vue({
  el: '#admin',
  data: {
      title: '',
      ingredients: '',
      directions: '',
      recipes: [],
      number: '',
      max: '',
      addedName: '',
      addedComment: '',
      comments: {},
      ratings: {},
      avg: '',
      loading: true,
  },
  
  created: function() {
    this.getall();
  },
  
  computed: 
  {
    month() 
    {
      var month = new Array;
      console.log("hello");
      if (this.current.month === undefined)
        return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    },
  },
  
   watch: 
  {
    number(value, oldvalue) 
    {
      if (oldvalue === '') 
      {
        this.max = value;
      } else
      {
        this.xkcd();
      }
    },
  },
  methods: {
    addItem() {
        var url = "http://tylerthesmiler.com:3004/recipe";
        axios.post(url, {
            title: this.title,
            ingredients: this.ingredients,
            directions: this.directions
        })
        .then(response => {
            console.log("Post Response ");
            console.log(response.data);
            this.recipes.push(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    },
    async getall() {
      console.log("get all");
      var url = "http://tylerthesmiler.com:3004/recipe"; // This is the route we set up in index.js
      try {
        let response = await axios.get(url);
        this.recipes = response.data; // Assign array to returned response
        console.log(this.recipes);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    
    deleteItem(recipe) {
      var index = this.recipes.indexOf(recipe);
      if (index > -1) {
        var url = "http://tylerthesmiler.com:3004/recipe/" + recipe._id;
        axios.delete(url)
          .then(response => {
            console.log(response.data.recipes);
            this.getall();
          })
          .catch(e => {
            console.log(e);
          });
        console.log("URL " + url);
      }
    },
    async addComment(recipe)
    {
      console.log("in addComment");
      var url = "http://tylerthesmiler.com:3004/recipe/" + recipe._id;
      var recipeID;
      try {
        let response = await axios.get(url);
        recipeID = response._id;
        console.log(this.comments);
        return true;
      }
      catch (error) {
        console.log(error);
      }
      if (!(this.number in this.comments))
        Vue.set(app.comments, this.number, new Array);


      var url = "http://tylerthesmiler.com:3004/add";
      axios.post(url, {
        author: this.addedName,
        text: this.addedComment,
        date: moment().format("MMMM Do YYYY"),
        recipeID: recipeID,
      })
      .then(response => {
          console.log("Post Response ");
          console.log(response.data);
          this.comment.author = response.data.author;
          this.comment.text = response.data.text;
          this.comment.date = response.data.date;
          this.comment.recipeID = response.data.recipeID;
          this.comments.push(response.data);
          console.log(this.comments);
      })
/*      this.comments[this.number].push
      ({
        author: this.addedName,
        text: this.addedComment,
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
        recipeID: recipeID,
      });*/
    },
    setRating(rating)
    {
      if (!(this.number in this.ratings))
      Vue.set(this.ratings, this.number, 
      {
        sum: 0,
        total: 0,
        average: 0,
      });
      this.ratings[this.number].sum += rating;
      this.ratings[this.number].total += 1;
      
        this.ratings[this.number].average = this.ratings[this.number].sum / this.ratings[this.number].total;
      this.avg = this.ratings[this.number].average;
    },
    async getcomments() {
      console.log("get all");
      var url = "http://tylerthesmiler:3004/get"; // This is the route we set up in index.js
      try {
        let response = await axios.get(url);
        this.comments = response.data; // Assign array to returned response
        console.log(this.comments);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
  }
  
});