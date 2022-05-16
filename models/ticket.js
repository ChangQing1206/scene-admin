// 门票信息
// 除了这部分，门票信息还应有充值部分
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
	client_id: String, // 考虑到游客毁坏设备的可能  clientId就有必要
	_id: String,  // 手机号作为id
	name: String, // 姓名
	create_time: String, // 创建时间
	status: String, // 门票状态
	deposit: Number // 充值金额 
})

ticketSchema.index({id: 1});  // 

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket
