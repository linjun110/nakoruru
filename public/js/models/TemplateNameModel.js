define(['backbone'],function(backbone){
	var model = Backbone.Model.extend({
		defaults: {
			"name":  ""
		}
	});
	return model;
});
