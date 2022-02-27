var DepositModel = require("../models/deposit");
var dtime = require('time-formater');
class Deposit {
  constructor() {
    // 增加充值记录
    this.increaseDeposit = this.increaseDeposit.bind(this);
    // 查询充值记录
    this.getDeposits = this.getDeposits.bind(this);
    // 聚合查询 按照游客进行充值查询
    this.getClientDeposits = this.getClientDeposits.bind(this);
    // 获取充值记录的数量
    this.getDepositsCount = this.getDepositsCount.bind(this);
    
  }
  async increaseDeposit(req, res, next) {
    // 注意：这里的逻辑是：充值系统将
    // 1.req.body = {name:'tom', identity: '', deposit: 100, dateTime: 2022-02-01 11:20, status: "充值成功"}
    console.log(req.body);
    const {name, identity, deposit, status} = req.body;
    var dateTime = dtime().format('YYYY-MM-DD HH:mm');
    var deposit_record = {
      name: name,
      identity: identity,
      deposit: deposit,
      dateTime: dateTime,
      status: status
    }
    try{
      await DepositModel.create(deposit_record);
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
  async getDeposits(req, res, next) {
    const { offset, limit } = req.query;
    try {
      var record = await DepositModel.find().skip(offset).limit(limit);
      res.send({
        status: 1,
        data: record
      })
    }catch(err) {
      res.send({
        status: 0,
        error: err
      })
    }
  }
  async getClientDeposits(req, res, next) {
    // 分页的顺序还不能保证
    const { offset, limit } = req.query;
    try {
      var record = await DepositModel.aggregate([{
        $group: {
          _id: "$identity",
          name: {$first: "$name"}, // 姓名
          dateTime: {$push: "$dateTime"},
          deposit: {$push: "$deposit"},
          status: {$push: "$status"}
        }
      }]).skip(Number(offset)).limit(Number(limit));
      console.log(record)
      res.send({
        status: 1,
        data: record
      })
    } catch(err) {
      console.log(err);
      res.send({
        status: 0,
        error: err
      })
    }

  }
  async getDepositsCount(req, res, next) {
    try {
      var count = await DepositModel.find().count();
      res.send({
        status: 1,
        count: count
      })
    } catch(err) {
      res.send({
        status: 0,
        error: err
      })
    }
    
  }
}

module.exports = new Deposit()