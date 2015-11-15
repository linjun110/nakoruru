define(['utils', 'text!templates/TemplateRateModelViewTemplate.html'],function(utils, Template){
	view = Backbone.Nakoruru.View.extend({
		tagName: "div",
		className: "templateRateModel",
		template: _.template(Template),

		initialize: function(){
			if( typeof(this.model) !== "undefined"){
				//this.listenTo(this.model, "change:foo", this.modelChanged);
				this.listenTo(this.model, "change", this.modelChanged);
			}
	    	//this.listenTo(this.collection, "add", this.modelAdded);
		},

		//DOM事件监听 DOM->view
		events: {
			"change input":"domTemplateRateModelChangeHandler"
		},

		//DOM事件Handler
		domTemplateRateModelChangeHandler: function () {
			console.log("dom templateRateModel Changed");
			var _this = this;
			//this.trigger("catEvent",{ event: "clicked", model: _this.model });
		},

		//MODEL事件监听 MODEL->view
		modelEvents: {
    		"change": "modelChanged"
		},

		//MODEL事件Handler
		modelChanged: function(model, value){
	  		console.log("TemplateRateModelView modelChanged", model);
	  		this.render();
		},
		
		//View 事件监听+Handler
		onShow: function(){
			console.log("TemplateRateModelView onShow");
		},
		onBeforeClose: function(){
	  		console.log("TemplateRateModelView onBeforeClose");
	  	},
	  	onClose: function(){
	  		console.log("TemplateRateModelView onClose");
	  	}
	});
	_.extend(view.prototype, Backbone.Events);
	return view;
});
