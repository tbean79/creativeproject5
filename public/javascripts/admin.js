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
      recipeID: '',
      comments: {},
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
  }
  
});