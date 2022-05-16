var ConsumeModel = require("../models/consume");

class Consume {
  constructor() {
    // 增加消费记录
    this.createOrder = this.createOrder.bind(this);
    // 查询消费记录
    this.getOrders = this.getOrders.bind(this);
    // 聚合查询
    this.getClientOrders = this.getClientOrders.bind(this);
    // 获取消费数量
    this.getOrdersCount = this.getOrdersCount.bind(this);
    // 商品分析
    this.goodsAnalyse = this.goodsAnalyse.bind(this);
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
      goods: goods
    }
    try{
      await ConsumeModel.create(consume_record);
      res.send({
        status: 1
      })
    }catch (err) {
      res.send({
        status: 0,
        error: err
      })
    }
  }
  async getOrders(req, res, next) {

  }
  async getClientOrders(req, res, next) {

  }
  async getOrdersCount(req, res, next) {

  }
  async goodsAnalyse(req, res, next) {

  }
}

module.exports = new Consume()