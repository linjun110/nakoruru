
 /* Resposibility:
  1. as attr of Region, manage and render each part.
 */
 Nakoruru.Region = Nakoruru.Object.extend({
    constructor: function(options) {
      options = options || {};
      _.extend(this, options);
      this.$el = this.owner.$el.find(this.selector);
    },
    show: function(view){
      var _this = this;

      view._parentView = this.owner;
      view._parentRegion = this;

      view.render();

      this._attachHtml(view);

      view.trigger("show");
    },

    _attachHtml: function(view) {
      this.$el.empty();
      this.$el.append(view.$el);
    },
  });