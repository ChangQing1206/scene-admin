var ConsumeModel = require("../models/consume");
var GoodsModel = require("../models/goods");
var dtime = require('time-formater');
class Consume {
  constructor() {
    // 增加消费记录
    this.createOrder = this.createOrder.bind(this);
    // 查询消费记录
    this.getOrders = this.getOrders.bind(this);
    // 聚合查询
    this.getClientOrders = this.getClientOrders.bind(this);
    // 商品分析
    this.goodsAnalyse = this.goodsAnalyse.bind(this);
    // 删除记录
    this.delConsume = this.delConsume.bind(this);
  }
  async createOrder(req, res, next) {
    console.log(req.body);
    const {name, identity, consume, status, goods} = req.body;
    var dateTime = dtime().format('YYYY-MM-DD HH:mm');
    var consume_record = {
      name: name,
      identity: identity,
      consume: consume,
      dateTime: dateTime,
      status: status,
      goods: goods,
      orderNum: String(Math.sin(Math.random() * Math.PI)).slice(2, 12)
    }

    try{
      var j = 0;
      var gs = [];
      // 判断库存是否足够
      for(var i = 0; i < goods.length; i++) {
        const g = await GoodsModel.findOne({goodsName: goods[i].foodName})
        gs.push(g)
        if(!g) {
          res.send({
            status: 0,
            message: "该商品不存在"
          })
          return;
        }else {
          // 库存足够的话
          if(g.number - goods[i].number > 0) {
            j = j + 1;
          }
        }
      }
      // 全部库存都足够
      if(j == i && i == goods.length) {
        await ConsumeModel.create(consume_record);
        gs.forEach(i => {
          i.number--;
        })
        gs.length = 0;
        res.send({
          status: 1
        })
      }else {
        console.log("库存不足")
        res.send({
          status: 0,
          message: "库存不足，此次订单取消"
        })
      }

    }catch (err) {
      console.log("数据库错误")
      console.log(err)
      res.send({
        status: 0,
        message: err
      })
    }
  }
  async getOrders(req, res, next) {
    const { offset, limit } = req.query;
    try {
      const length = await ConsumeModel.find(null, {_id: 0});
      const data = await ConsumeModel.find().skip(offset).limit(limit);
      res.send({
        status: 1,
        message: data,
        count: length.length
      })
    }catch(err) {
      res.send({
        status: 0,
        message: "获取订单错误"
      })
    }
  }
  // 游客的消费记录
  async getClientOrders(req, res, next) {
    // const { username, identity } = req.body;

  }

  async goodsAnalyse(req, res, next) {
    // 食物名： 食物数量
    try {
      const result = await ConsumeModel.find();
      var foodName = [];
      var food_price = [];
      var obj = {};
      for(var i = 0; i < result.length; i++) {
        var o = result[i].goods;
        for(var j = 0; j < o.length; j++) {
          foodName.push(o[j].foodName);
          food_price.push({
            name: o[j].foodName,
            value: o[j].number
          })
          // 如果这个键存在
          if(obj[o[j].foodType]) {
            console.log(o[j].food)
            obj[o[j].foodType] = obj[o[j].foodType] + o[j].number
          }else {
            obj[o[j].foodType] = o[j].number
          }
        }
      }
      console.log(obj)
      // 按类别统计数量
      
      res.send({
        status: 1,
        message: {
          foodName: foodName,
          food_price: food_price,
          food_type: obj
        }
      })
    }catch(err) {
      console.log(err);
      res.send({
        status: 0,
        error: "分析失败"
      })
    }
  }
  async delConsume(req, res, next) {
    console.log(req.body)
    try{
      const result = await ConsumeModel.deleteOne({"orderNum": req.body.orderNum});
      res.send({
        status: 1,
        message: "删除成功"
      })
    } catch(err) {
      console.log(err);
      res.send({
        status: 0,
        error: "删除失败"
      })
    }
  }
}

module.exports = new Consume()