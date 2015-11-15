define(['backbone'],function(backbone){
	var model = Backbone.Model.extend({
		defaults: {
			"rateModel":  "shipment_based"
		}
	});
	return model;
});
