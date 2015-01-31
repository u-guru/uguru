var config = {
	writeable: true,
	enumberable: true,
	configurable: true
};

var defineProperty = function(obj, name, value) {
	config.value = value;
	Object.defineProperty(obj, name, config);
}

var initUser = function(properties) {
	var user = Object.create(null);	
	properties = [
		'name', 'email', 'devices', 'cards', 'position',
	]
}

var initPosition = function(properties) {

	//location

}

var initDevice = function(properties) {

	

}

var initCard = function(properties) {

	

}


id: null,
                name: null,
                email: null,
                devices: null,
                cards: null,
                position: null,


defineProperty(user, )