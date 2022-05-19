var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consumeSchema = new Schema({
	name: String,     // 游客姓名
	identity: String, // 游客手机号
  consume: Number,  // 消费记录数组 [{name:"火腿肠", num: 2, price:3}, {name: "钓鱼", num:1, price: 30}]
  dateTime: String, // 消费时间
  status: String,    // 订单状态：扣费失败， 扣费成功
  goods: Array,      // 食物商品
  orderNum: String,  // 订单编号
})
// 为name建立索引 方面扩展按姓名查询游客消费信息功能
consumeSchema.index({name: 1});

const Consume = mongoose.model('Consume', consumeSchema);

module.exports = Consume;
