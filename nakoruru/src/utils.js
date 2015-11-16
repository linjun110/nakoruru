// defined by me
var nako_bindEntityEvents = function(model, eventsMap, context){
	_.each(eventsMap, function(cbName, event){
	  this.listenTo(model, event, this[cbName], this);
	}, context);
};

var nako_unbindEntityEvents = function(model){
	// TODO: not quite sure if it's correct
	model.off();
};