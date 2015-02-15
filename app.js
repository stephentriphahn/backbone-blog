//the Post model and collection


var Post = Backbone.Model.extend({});

var Posts = Backbone.Collection.extend({
        model: Post,
        url: "/posts"
});
