var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://prioriTz:PeopleAndData2016@ds015915.mlab.com:15915/prioritz');

function connect() {
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('Connected');
	  	registerSchema();
	  	console.log(createItem("Blank name", "This is a description", "", new Date(), new Date(), 5, 2, false));
	});
}

function createItem(name, description, location, dateCreated, dateDue, urgency, difficulty, isHardGoal) {
	var Item = db.model('Item');
	var createdItem = new Item({
		name: name,
		description: description,
		location: location,
		dateCreated: dateCreated,
		dateDue: dateDue,
		urgency: urgency,
		difficulty: difficulty,
		isHardGoal: isHardGoal
	});

	createdItem.save(function(err, dateCreated) {
		if (err) {
			return console.error(err);
		}
	});
	return createdItem;
}

function registerSchema() {
	var itemSchema = mongoose.Schema({
		name: String,
		description: String,
		location: {type: String, default: ''},
		dateCreated: {type: Date, default: Date.now},
		dateDue: Date,
		urgency: Number,
		difficulty: Number,
		isHardGoal: {type: Boolean, default: true}
	});
	var Item = mongoose.model('Item', itemSchema);
}

module.exports = {
	connect: connect,
	createItem: createItem,
	registerSchema: registerSchema
}