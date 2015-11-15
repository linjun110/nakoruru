requirejs.config({
	baseUrl: '/js',
	paths: {
		jquery: 'libs/jquery-2.1.4.min',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		marionette: 'libs/backbone.marionette',
        linjun: 'libs/backbone.linjun',
        nakoruru: 'libs/backbone.nakoruru',
		text: 'libs/text',
        bootstrap: 'libs/bootstrap',
        bootstrapswitch: 'libs/bootstrap-switch',
        icheck: 'libs/icheck',
        utils: 'utils'
    },
    shim: {
    	'underscore': {
    		deps: ['jquery']
        },
        'backbone': {
            deps: ['underscore']
        },
        'marionette': {
            deps: ['backbone', 'text']
        },
        'linjun': {
            deps: ['marionette']
        },
        'nakoruru': {
            deps: ['backbone']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrapswitch': {
            deps: ['bootstrap']
        },
        'icheck': {
            deps: ['jquery']
        },
        'utils':{
            deps: ['nakoruru', 'linjun', 'bootstrapswitch', 'icheck']
        }
    }
});

require(['app'], function(App){
 App.start();
});