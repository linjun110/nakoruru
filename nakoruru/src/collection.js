
Nakoruru.Collection = Backbone.Collection.extend({
  initialize: function(){
    this.setUpListening();
  },
  setUpListening: function(){
    var _this = this;

    // the reason use setTimeout is that in backbone, 
    //the initialize is called before all models are added to this.models
    setTimeout(function(){
      // In backbone, collection just listen to model remove & add events, then trigger a 'update'
      // Here we also listen to model change event
      _.each(_this.models, function(model){
        this.listenTo(model, "change", function(){
          this.trigger("update");
        }, this);
      }, _this);
    });
  },
  addChild: function(){
    var childModelClass = this.model || Backbone.Model;
    var childToAdded = new childModelClass();
    this.add(childToAdded);
  }
});