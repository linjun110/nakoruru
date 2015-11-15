define(['utils', 'text!templates/TemplateNameViewTemplate.html'],function(utils, Template){
	view = Backbone.Nakoruru.View.extend({
		tagName: "div",
		className: "templateName",
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
			"change input":"domTemplateNameChangeHandler"
		},

		//DOM事件Handler
		domTemplateNameChangeHandler: function () {
			console.log("dom TemplateName Changed");
			var _this = this;
			//this.trigger("catEvent",{ event: "clicked", model: _this.model });
		},

		//MODEL事件监听 MODEL->view
		modelEvents: {
    		"change": "modelChanged"
		},

		//MODEL事件Handler
		modelChanged: function(model, value){
	  		console.log("TemplateNameView modelChanged", model);
	  		this.render();
		},
		
		//View 事件监听+Handler
		onShow: function(){
			console.log("TemplateNameView onShow");
		},
		onBeforeClose: function(){
	  		console.log("TemplateNameView onBeforeClose");
	  	},
	  	onClose: function(){
	  		console.log("TemplateNameView onClose");
	  	}
	});
	return view;
});
