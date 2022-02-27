// const { off } = require('../models/vistor');
var VistorModel = require('../models/vistor');
var dtime = require('time-formater');
class Vistor {
  constructor() {
    // 游客记录查询
    this.getVistors = this.getVistors.bind(this);
    // 游客数量查询
    this.getVistorsCount = this.getVistorsCount.bind(this);
    // 删除游客
    this.deleteVistor = this.deleteVistor.bind(this);
    // // 更新游客去过的景点
    // this.updateScene = this.updateScene.bind(this);
    // // 游客位置分析
    // this.posAnalyse = this.posAnalyse.bind(this);
  
    
  } 
  async getVistors(req, res, next) {
    // 解构出 偏移量 和 一页数据
    const {offset, limit} = req.body;
    try{
      // 聚合查询
      const data = await VistorModel.aggregate(
        [
          { $group: { 
              _id: "$identity",  
              name: {$first: "$name"}, // 姓名
              date_time: {$push: "$date_time"}, // 时间数组
              bodyTem: {$push: "$bodyTem"},  // 体温数组
              bodyTemMax: {$max: "$bodyTem"},  // 最大体温
              position: {$push: "$position"}, // 位置数组
              // 充值的逻辑:通过管理员系统充值,售票模块发送数据到设备 同时更新充值记录
              // 所以直接push
              // deposit: {$push: "$deposit"}, // 充值记录 设备端可以判断下数据有无变化,无则不上传
              // 消费的逻辑:同样是只在消费时更新,由消费设备发送记录去数据库
              // consume: {$addToSet: "$consume"}, // 消费记录
              // scenePoint: {$push: "$scenePoint"} // 景点数组
            }
          }
        ]
      ).skip(offset).limit(limit);  // 跳过偏移量, 限定20条 这里聚合查询返回的顺序不知道一不一样
      // 返回给前端
      console.log(data);
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
      var data = await VistorModel.aggregate(
        [
          {
            $group: {
              _id: "$identity",
            }
          }
        ]
      )
      console.log(data);
      res.send({
        status: 1,
        count: data.length
      })
    } catch(err) {
      console.log(err);
      res.send({
        status: 0,
        error: err 
      })
    }
  }
  // 更新景点 其实就是插入一条数据 这条数据只有clientId
  // async updateScene(req, res, next) {
  //   const {clientId, name, scenePoint} = req.body;

  //   // 只需要更新一条，因为不需要把游客去过的景点与时间相对应
  //   try{
  //     await VistorModel.create({
  //       clientId: clientId,
  //       name: name,
  //       scenePoint: scenePoint,
  //       date: dtime().format('YYYY-MM-DD HH:mm'),
  //     })
  //     res.send({
  //       status: 1
  //     })
  //   } catch(err) {
  //     console.log(err);
  //     res.send({
  //       status: 0,
  //       error: err 
  //     })
  //   }
  // }
  // 删除游客
  async deleteVistor(req, res, next) {
    try{
      await VistorModel.deleteMany({identity: req.body.identity}, function(err) {
        if(err) {
          res.send({
            status: 0,
            error: "删除失败"
          })
        }
        else {
          res.send({
            status: 1
          })
        }
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

module.exports = new Vistor()