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