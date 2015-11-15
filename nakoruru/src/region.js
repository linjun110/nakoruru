 Nakoruru.Region = Nakoruru.Object.extend({
    constructor: function(options) {
      options = options || {};
      _.extend(this, options);

      this.$el = this.owner.$el.find(this.selector);

      //Backbone.View.call(this, options);
    },
    show: function(view){
      var _this = this;
      //this._renderView(view);
      view.render();
      this._attachHtml(view);
      view._parent = this;

      // Time to trigger render event
      view.trigger("show");
    },

    // helpers
    _attachHtml: function(view) {
      this.$el.empty();
      this.$el.append(view.$el);
    },
  });