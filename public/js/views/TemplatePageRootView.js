define(['utils', 'views/TemplatePageView'],function(utils, TemplatePageView){
	var view = Backbone.Nakoruru.View.extend({
		regions: {
			root: "#pageContent"
		},
		onShow: function () {
			// show templateName
			this.views.root = new TemplatePageView({model: this.model});
			this.getRegion("root").show(this.views.root);
		}
	});
	return view;
});
