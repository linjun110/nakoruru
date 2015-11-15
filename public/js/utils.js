define(['underscore'], function(){
	var _utils = {
		debug: true,
		log: function(data){
			if(this.debug){
				console.log(data);	
			}
		}
	};
	return _utils;
});

