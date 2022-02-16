

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	_id: Number,
	password: String,
	username: String,
	create_time: String,
	admin: {type: String, default: '管理员'},
	status: Number  //1:普通管理、 2:超级管理员
})

adminSchema.index({id: 1});

const Admin = mongoose.model('Admin', adminSchema);


module.exports = Admin
