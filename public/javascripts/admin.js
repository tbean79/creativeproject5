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
    this.getcomments();
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
  
  methods: {
    addItem() {
        var url = "http://chandlernet.org:8080/recipe";
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
      var url = "http://chandlernet.org:8080/recipe"; // This is the route we set up in index.js
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
        var url = "http://chandlernet.org:8080/recipe/" + recipe._id;
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
    addComment()
    {
      console.log("in addComment");
      if (!(this.number in this.comments))
        Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push
      ({
        author: this.addedName,
        text: this.addedComment,
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
      });
      //this.addedName = '';
      //this.addedComment = '';
      var url = "http://chandlernet.org:8080/add";
      axios.post(url, {
        author: this.addedName,
        text: this.addedComment,
        date: moment().format("MMMM Do YYYY"),
      })
      .then(response => {
          console.log("Post Response ");
          console.log(response.data);
          this.comment.author = response.data.author;
          this.comment.text = response.data.text;
          this.comment.date = response.data.date;
          this.comments.push(response.data);
      })
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
      var url = "http://chandlernet.org:8080/get"; // This is the route we set up in index.js
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