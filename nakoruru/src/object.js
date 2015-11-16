
// Object
// ------

// A Base Class that other Classes should descend from.
// Object borrows many conventions and utilities from Backbone.
// Borrow from marinette.
Nakoruru.Object = function(options) {
  this.options = _.extend({}, _.result(this, 'options'), options);

  this.initialize.apply(this, arguments);
};

Nakoruru.Object.extend = Nakoruru.extend;

// Object Methods
// --------------

// Ensure it can trigger events with Backbone.Events
_.extend(Nakoruru.Object.prototype, Backbone.Events, {

  //this is a noop method intended to be overridden by classes that extend from this base
  initialize: function() {},

  destroy: function() {
    this.triggerMethod('before:destroy');
    this.triggerMethod('destroy');
    this.stopListening();

    return this;
  },

  // Import the `triggerMethod` to trigger events with corresponding
  // methods if the method exists
  triggerMethod: Nakoruru.triggerMethod,

  // A handy way to merge options onto the instance
  mergeOptions: Nakoruru.mergeOptions,

  // Proxy `getOption` to enable getting options from this or this.options by name.
  getOption: Nakoruru.proxyGetOption,

  // Proxy `bindEntityEvents` to enable binding view's events from another entity.
  bindEntityEvents: Nakoruru.proxyBindEntityEvents,

  // Proxy `unbindEntityEvents` to enable unbinding view's events from another entity.
  unbindEntityEvents: Nakoruru.proxyUnbindEntityEvents
});