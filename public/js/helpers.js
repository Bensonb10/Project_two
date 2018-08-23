var Handlebars = require('handlebars');

Handlebars.registerHelper('isDay', function(lvalue, rvalue, options){
	if(arguments.length < 3){
		throw new Error('Handlebars Helper isDay needs 2 params');
	}

	if(lvalue != rvalue){
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
    
});

module.exports = Handlebars;