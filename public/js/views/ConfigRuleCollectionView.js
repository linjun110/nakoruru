define(['utils', 'views/ConfigRuleView'],function(utils, childView){
	view = Backbone.Nakoruru.View.extend({
		//template: _.template(Template),
		childView: childView,
		tagName: "tbody",

		events:{
		},
		// view listen to model(Collection)
		collectionEvents: {
	      "remove": "collectionModelDestroyed",
	      "add": "collectionModelAdded",
	      "update": "collectionUpdated"
	    },
	    collectionModelDestroyed: function(){
	    	console.log("ConfigRuleCollectionView detect model destroy");
	    	this.render();
	    },
	    collectionModelAdded: function(){
	    	console.log("ConfigRuleCollectionView detect model add");
	    	this.render();
	    },
	    collectionUpdated: function(){
	    	console.log("configRuleCollectionView detect model Update");
	    	this.render();
	    },
		initialize: function(){
			//utils.log("ServiceTypeCollection initialize");
		},
		onShow: function () {
			//utils.log("ServiceTypeCollectionView onShow");
		}
	});
	return view;
});
