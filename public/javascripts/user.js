/*global Vue*/
/*global axios*/
/*global moment*/
/*global VueStarRating*/

Vue.component('star-rating', VueStarRating.default);

let app = new Vue
({
  el: '#app',
  data: 
  {
    number: '',
    max: '',
    current: 
    {
      title: '',
      img: '',
      alt: '',
    },
    addedName: '',
    addedComment: '',
    comments: {},
    ratings: {},
    avg: '',
    loading: true,
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
  created: function() {
    this.getall();
    this.xkcd();
  },
  methods: 
  {
    async xkcd() 
    {
      try 
      {
        this.loading = true;
        const response = await axios.get('https://xkcdapi.now.sh/' + this.number);
        this.current = response.data;
        this.loading = false;
        this.number = response.data.num;
      } 
      catch (error) 
      {
        console.log(error);
      }
    },
    addComment()
    {
      if (!(this.number in this.comments))
        Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push
      ({
        author: this.addedName,
        text: this.addedComment,
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
      });
      this.addedName = '';
      this.addedComment = '';
      var url = "http://tylerthesmiler.com:3002/user/add";
      axios.post(url, {
        author: this.addedName,
        text: this.addedComment,
        date: moment().format("MMMM DO YYYY"),
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
    async getall() {
      console.log("get all");
      var url = "http://tylerthesmiler.com:3002/user/get"; // This is the route we set up in index.js
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

