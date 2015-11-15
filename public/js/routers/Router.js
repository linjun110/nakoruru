define(['marionette','controllers/Controller'],function(marionette,Controller){
	var _router = Backbone.Marionette.AppRouter.extend({
		initialize: function(options){
			this.controller = new Controller(options);
		},
		controller: null,
		appRoutes: {
			"": "createTemplate"
		}
	});
	return _router;
});
