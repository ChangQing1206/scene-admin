var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const depositSchema = new Schema({
  // clientId: String, // 游客ID
	name: String,   // 游客姓名
  identity: String, // 身份证
	deposit: Number, // 充值记录
  dateTime: String, // 充值时间
  status: String // 充值状态：充值失败， 充值成功
})
// 为name建立索引 方面扩展按姓名查询游客充值信息功能
depositSchema.index({name: 1});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
