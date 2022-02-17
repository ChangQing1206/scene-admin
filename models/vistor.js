var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vistorSchema = new Schema({
  clientId: String,
	name: String,
	bodyTem: Number,
	deposit: Number,
  consume: Number,
  goodsName: String,
  position: Array,
  date: String,
  sceneVisited: String
})
// 为name建立索引 方面扩展按姓名查询游客信息功能
vistorSchema.index({name: 1});

const Vistor = mongoose.model('Vistor', vistorSchema);


module.exports = Vistor;
