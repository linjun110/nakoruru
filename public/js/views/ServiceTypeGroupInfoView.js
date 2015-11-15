define(['utils', 'text!templates/ServiceTypeGroupInfoViewTemplate.html'],function(utils, Template){
	view = Backbone.Nakoruru.View.extend({
		template: _.template(Template)
	});
	return view;
});
