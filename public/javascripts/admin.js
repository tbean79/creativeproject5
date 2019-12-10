var app = new Vue({
  el: '#admin',
  data: {
      title: '',
      ingredients: '',
      directions: '',
      recipes: [],
      
  },
  
  created: function() {
    this.getall();
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
  }
  
});