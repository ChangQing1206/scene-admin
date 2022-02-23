var mongoose = require('mongoose');

const Schema = mongoose.Schema;
// 没有id选项，没必要
const vistorSchema = new Schema({
  identity: String,
	name: String,
	bodyTem: Number,
  position: Array,
  date_time: String
})
// 为identity建立索引 方面扩展按身份证查询游客信息功能
vistorSchema.index({identity: 1});

const Vistor = mongoose.model('Vistor', vistorSchema);


module.exports = Vistor;
