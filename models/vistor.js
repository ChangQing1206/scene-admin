var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vistorSchema = new Schema({
  clientId: String,
	name: String,
	bodyTem: Number,
	deposit: Number,
  consume: Number,
  goodsName: String,
  positionLong: Number,
  positionLati: Number,
  date: Date
})

// adminSchema.index({id: 1});

const Vistor = mongoose.model('Vistor', vistorSchema);


module.exports = Vistor;
