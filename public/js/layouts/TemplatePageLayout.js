/*
 * If the content position and content would changed in this area and no need to listen to model, please consider use layout
 */
define(['utils', 'marionette', 'text!templates/TemplatePageTemplate.html', 'views/TemplateNameView', 'models/TemplateNameModel', 'views/TemplateRateModelView', 'models/TemplateRateModelModel', 'views/PrimeSettingView', 'models/PrimeSettingModel', 'views/ServiceTypeGroupCollectionView', 'models/ServiceTypeGroupCollection', 'models/ServiceTypeGroupModel'],function(utils, marionette, Template, TemplateNameView, TemplateNameModel, TemplateRateModelView, TemplateRateModelModel, PrimeSettingView, PrimeSettingModel, ServiceTypeGroupCollectionView, ServiceTypeGroupCollection, ServiceTypeGroupModel){
	var layout = Backbone.Marionette.LayoutView.extend({
		template: Template,
		initialize: function(options){
			// dm = options.dm
			utils.log(options);
			this.dm = options.dm;
			// split dm, store views, monitor events
			this.views = {};

			this.templateName.on("show", function(view){
				utils.log("TemplatePageLayout.templateName show:",view);
			});
			this.templateName.on("close", function(view){
				utils.log("TemplatePageLayout.templateName close:",view);
			});
			this.templateRateModel.on("show", function(view){
				utils.log("TemplatePageLayout.templateRateModel show:",view);
			});
			this.templateRateModel.on("close", function(view){
				utils.log("TemplatePageLayout.templateRateModel close:",view);
			});
			this.primeSetting.on("show", function(view){
				utils.log("TemplatePageLayout.primeSetting show:",view);
			});
			this.primeSetting.on("close", function(view){
				utils.log("TemplatePageLayout.primeSetting close:",view);
			});
			this.serviceTypeGroups.on("show", function(view){
				utils.log("TemplatePageLayout.serviceTypeGroups show:",view);
			});
			this.serviceTypeGroups.on("close", function(view){
				utils.log("TemplatePageLayout.serviceTypeGroups close:",view);
			});
		},
		regions: {
			templateName: "#templateName",
			templateRateModel: "#templateRateModel",
			primeSetting: "#primeSetting",
			serviceTypeGroups: "#serviceTypeGroups"
		},
		onShow: function () {
			// show templateName
			this.views.templateName = new TemplateNameView({model: this.dm.get("templateName")});
			this.templateName.show(this.views.templateName);

			// show templateRateModel
			this.views.templateRateModel = new TemplateRateModelView({model: this.dm.get("rateModel")});
			this.templateRateModel.show(this.views.templateRateModel);

			// show primeSetting
			this.views.primeSetting = new PrimeSettingView({model: this.dm.get("primeSetting")});
			this.primeSetting.show(this.views.primeSetting);

			// show serviceTypeGroups
			this.views.serviceTypeGroups = new ServiceTypeGroupCollectionView({collection: this.dm.get("serviceTypeGroups")});
			this.serviceTypeGroups.show(this.views.serviceTypeGroups);
		}
	});
	return layout;
});
