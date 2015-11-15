Nakoruru.Collection = Backbone.Collection.extend({
  initialize: function(){
    this.setUpListening();
  },
  setUpListening: function(){
    var _this = this;
    setTimeout(function(){
      _.each(_this.models, function(model){
        this.listenTo(model, "change", function(){
          this.trigger("update");
        }, this);
      }, _this);
    });
  }
});