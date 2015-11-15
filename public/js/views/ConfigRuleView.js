define(['utils', 'text!templates/ConfigRuleViewTemplate.html'],function(utils, Template){
	view = Backbone.Nakoruru.View.extend({
		template: _.template(Template),
		tagName: "tr",
		events: {
			"click .delete":"deleteClickHandler",
			"change .unitPrice":"unitPriceChangeHandler",
		},

		modelEvents: {
			"change": "modelChange"
		},
		modelChange: function(){
			console.log("configRuleView detect model change: ");
			console.log(this.model);
		},

		//DOM事件Handler
		deleteClickHandler: function () {
			console.log("configRuleView detele mode");
			this.model.destroy();
		},
		unitPriceChangeHandler: function (e) {
			this.model._set("unitPrice", e.currentTarget.value);
			this.render();
		}
	});
	return view;
});
