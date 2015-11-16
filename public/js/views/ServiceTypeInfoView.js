define(['utils', 'text!templates/ServiceTypeInfoViewTemplate.html'],function(utils, Template){
	view = Backbone.Nakoruru.View.extend({
		template: _.template(Template),
		events: {
			"click .checker": "checkerClickedHandler",
			"click .addNewRegions": "addNewRegionsClickedHandler"
		},
		checkerClickedHandler: function(e){
			this.model._set("isRestricted", !e.target.checked);
		},
		addNewRegionsClickedHandler: function(e){
			this.model._set("addNewButtonClicked", true);
		}
	});
	return view;
});
