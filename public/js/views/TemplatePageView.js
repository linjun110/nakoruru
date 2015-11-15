define(['utils', 'text!templates/TemplatePageTemplate.html', 'views/TemplateNameView', 'views/TemplateRateModelView', 'views/PrimeSettingView', 'views/ServiceTypeGroupCollectionView'],function(utils, Template, TemplateNameView, TemplateRateModelView, PrimeSettingView, ServiceTypeGroupCollectionView){
	var view = Backbone.Nakoruru.View.extend({
		template: _.template(Template),
		regions: {
			templateName: "#templateName",
			templateRateModel: "#templateRateModel",
			primeSetting: "#primeSetting",
			serviceTypeGroups: "#serviceTypeGroups"
		},
		onShow: function () {
			// show templateName
			this.views.templateName = new TemplateNameView({model: this.model.get("templateName")});
			this.getRegion("templateName").show(this.views.templateName);
			// show templateRateModel
			this.views.templateRateModel = new TemplateRateModelView({model: this.model.get("rateModel")});
			this.getRegion("templateRateModel").show(this.views.templateRateModel);

			// show primeSetting
			this.views.primeSetting = new PrimeSettingView({model: this.model.get("primeSetting")});
			this.getRegion("primeSetting").show(this.views.primeSetting);

			// show serviceTypeGroups
			this.views.serviceTypeGroups = new ServiceTypeGroupCollectionView({model: this.model.get("serviceTypeGroups")});
			this.getRegion("serviceTypeGroups").show(this.views.serviceTypeGroups);
		}
	});
	return view;
});
