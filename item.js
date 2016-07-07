var mongoose = require('mongoose');

function create(name, description, location, dateCreated, dateDue, urgency, difficulty, isHardGoal) {
	var Item = mongoose.model('Item', animalSchema);
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

	createdItem.save(function(err, fluffy) {
		if (err) {
			return console.error(err);
		}
	});
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

function debug() {
	console.log('It worked');
}

module.exports = {
	create: create,
	registerSchema: registerSchema,
	debug: debug
}