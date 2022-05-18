

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goodsSchema = new Schema({
	_id: Number,
  regCode: String,
  goodsName: String,
  goodsType: String,
  create_time: String,
  isSell: String,
  price: Number,
  number: Number,
  desc: String
})

goodsSchema.index({id: 1});

const Goods = mongoose.model('Goods', goodsSchema);


module.exports = Goods
