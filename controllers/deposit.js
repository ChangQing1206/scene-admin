var DepositModel = require("../models/deposit");

class Deposit {
  constructor() {
    // 增加充值记录
    this.createDeposit = this.createDeposit.bind(this);
    // 查询充值记录
    this.getDeposits = this.getDeposits.bind(this);
    // 聚合查询 按照游客进行充值查询
    this.getClientDeposits = this.getClientDeposits.bind(this);
    // 获取充值记录的数量
    this.getDepositsCount = this.getDepositsCount.bind(this);
    
  }
  async createDeposit(req, res, next) {
    
  }
  async getDeposits(req, res, next) {

  }
  async getClientDeposits(req, res, next) {

  }
  async getDepositsCount(req, res, next) {
    
  }
}