//sets underscores templating delimeters to {{}}
_.templateSettings = {
   interpolate: /\{\{(.+?)\}\}/g
};



//the Post model and collection
var Post = Backbone.Model.extend({});

var Posts = Backbone.Collection.extend({
        model: Post,
        url: "/posts"
});


//the PostListView- view class for each individual post, which lists our models
var PostListView = Backbone.View.extend({
   tagName: "li",
   template: _.template("<a href='/posts/{{id}}'>{{title}}</a>"),
   render: function () {
      this.el.innerHTML = this.template(this.model.toJSON());
      return this;
   }
   events: {
      'click a': 'handleClick'
   },
   handleClick: function (e) {
      e.preventDefault();
      postRouter.navigate($(e.currentTarget).attr("href"),
         {trigger: true});
   }
});

//the PostsListView - wrapper of the PostListView instances
var PostsListView = Backbone.View.extend({
   template: _.template("<h1>My Blog</h1><ul></ul>"),
   render: function () {
      this.el.innerHTML = this.template();
      var ul = this.$el.find("ul");
      this.collection.forEach(function (post) {
         ul.append(new PostListView({
            model: post
         }).render().el);
      });
      return this;
   }
});

//Router for posts
var PostRouter = Backbone.Router.extend({
  initialize: function (options) {
     this.posts = options.posts;
     this.main = options.main;
  },
  routes: {
     '': 'index',
     'posts/:id':'singlePost'
  },
  index: function () {
     var pv = new PostsListView({collection: this.posts });
     this.main.html (pv.render().el);
  },
  singlePost: function (id) {
     console.log("view post " + id);
  }
});








