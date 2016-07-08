var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://prioriTz:PeopleAndData2016@ds015915.mlab.com:15915/prioritz');

function connect() {
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('Connected to the database');
	  	registerSchema();
	  	//console.log(createItem("Blank name", "This is a description", "", new Date(), new Date(), 5, 2, false));
	});
}

function createItem(item, callback) {
	var Item = db.model('Item');
	var createdItem = new Item({
		name: item.name,
		description: item.description,
		location: item.location,
		dateCreated: item.dateCreated,
		dateDue: item.dateDue,
		urgency: item.urgency,
		difficulty: item.difficulty,
		isHardGoal: item.isHardGoal
	});
	createdItem.save(callback);
}

function updateItem(id, newItemValues, callback) {
	var Item = db.model('Item');
	Item.findOneAndUpdate({ _id: id }, newItemValues, { new: true }, callback);
}

function getItem(id, callback) {
	var Item = db.model('Item');
	Item.findOne({ _id: id }, callback);
}

function getAllItems(callback) {
	var Item = db.model('Item');
	Item.find({}, callback);
}

function delItem(id, callback) {
	var Item = db.model('Item');
	Item.remove({ _id: id }, callback);
}

function registerSchema() {
	var itemSchema = mongoose.Schema({
		name: String,
		description: String,
		location: {type: String, default: ''},
		dateCreated: {type: Date, default: Date.now},
		dateDue: {type: Date, default: Date.now},
		urgency: Number,
		difficulty: Number,
		isHardGoal: {type: Boolean, default: true}
	});
	var Item = mongoose.model('Item', itemSchema);
}

module.exports = {
	connect: connect,
	createItem: createItem,
	updateItem: updateItem,
	getItem: getItem,
	getAllItems: getAllItems,
	delItem: delItem,
	registerSchema: registerSchema
}