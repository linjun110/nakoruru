define(['backbone', 'models/ServiceTypeGroupModel'],function(backbone, Model){
	var collection = Backbone.Collection.extend({
  		model: Model,
	});
	return collection;
});
