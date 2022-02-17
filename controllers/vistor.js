const { off } = require('../models/vistor');
var VistorModel = require('../models/vistor');
class Vistor {
  constructor() {
    // 游客记录查询
    this.getVistors = this.getVistors.bind(this);
    // 游客数量查询
    this.getVistorsCount = this.getVistorsCount.bind(this);
    // 删除游客
    this.deleteVistor = this.deleteVistor.bind(this);
    // 更新游客去过的景点
    this.updateScene = this.updateScene.bind(this);
    // 游客位置分析
    this.posAnalyse = this.posAnalyse.bind(this);
    // 游客消费分析
    this.goodsAnalyse = this.goodsAnalyse.bind(this);
  }
  async getVistors(req, res, next) {
    // 解构出 偏移量 和 一页数据
    const {offset, limit} = req.body;
    try{
      // 聚合查询
      const data = await VistorModel.aggregate(
        [
          { $group: { 
              _id: "$name",  // 姓名
              clientId: "$clientId", // 游客ID
              date: {$push: "$date"}, // 时间数组
              bodyTem: {$push: "$bodyTem"},  // 体温数组
              bodyTemMax: {$max: "$bodyTem"},  // 最大体温
              goodsName: {$addToSet: "$goodsName"}, // 商品数组
              positions: {$push: "$position"}, // 位置数组
              // 充值的逻辑:通过管理员系统充值,售票模块发送数据到设备 同时更新充值记录
              // 所以直接push
              deposit: {$push: "$deposit"}, // 充值记录 设备端可以判断下数据有无变化,无则不上传
              // 消费的逻辑:同样是只在消费时更新,由消费设备发送记录去数据库
              consume: {$addToSet: "$consume"}, // 消费记录
              scenePoint: {$push: "$scenePoint"} // 景点数组
            }
          }
        ]
      ).skip(offset).limit(limit);  // 跳过偏移量, 限定20条
      // 返回给前端
      res.send({
        status: 1,
        data: data
      })
    } catch(err) {
      console.log(err);
      res.send({
        status: 0,
        error: err
      })
    }
  }
  async getVistorsCount(req, res, next) {
    try{
      const data = await VistorModel.aggregate(
        [
          {
            $group: {
              _id: "$name",
              count: {$sum: "$name"}
            }
          }
        ]
      );
      res.send({
        status: 1,
        count: data.count
      })
    } catch(err) {
      console.log(err);
      res.send({
        status: 0,
        error: err 
      })
    }
  }
  
}