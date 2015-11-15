define(['utils'],function(utils){
	var model = Backbone.Nakoruru.Model.extend({
		defaults: {
			"isEnabled":  false
		}
	});
	return model;
});
