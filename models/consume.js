var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consumeSchema = new Schema({
  clientId: String, // 游客ID
	name: String,   // 游客姓名
	deposit: Array, // 充值记录数组 [{deposit: 100}, {deposit: 200}]
  consume: Array, // 消费记录数组 [{name:"火腿肠", num: 2, price:3}, {name: "钓鱼", num:1, price: 30}]
  date: String, // 消费时间
  status: String // 订单状态：扣费失败， 扣费成功
})
// 为name建立索引 方面扩展按姓名查询游客消费信息功能
consumeSchema.index({name: 1});

const Consume = mongoose.model('Consume', consumeSchema);

module.exports = Consume;
