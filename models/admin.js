

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	_id: Number,
	password: String,
	username: String,
	create_time: String,
	role: String,    // 角色
	power: String    // 权限
})

adminSchema.index({id: 1});

const Admin = mongoose.model('Admin', adminSchema);


module.exports = Admin
