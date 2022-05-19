var GoodsModel = require('../models/goods')

var formidable = require('formidable')
var dtime = require('time-formater');
const e = require('express');



class Goods {
  constructor() {
    this.addGoods = this.addGoods.bind(this);       // 增加商品
    this.getGoods = this.getGoods.bind(this);       // 获取商品
    this.editGoods = this.editGoods.bind(this);     // 编辑商品
    this.updateState = this.updateGoods.bind(this); // 更新商品出售状态
    this.delGoods = this.delGoods.bind(this);       // 删除商品
  }
  async getGoods(req, res, next) {
    // 按商品类型聚合
    
    try {
      const _data = await GoodsModel.aggregate([
        {
          $project: {
            _id: 0,
            goodsType: 1,
            goodsName: 1,
            price: 1
          }
        },
        {
          $group: {
            _id: "$goodsType",
            goods: { $push: "$$ROOT" }
          }
        }
      ])
      console.log(_data)
      
      res.send({
        status: 1,
        message: _data
      })
    }catch(err) {
      console.log(err)
      res.send({
        status: 0,
        message: "查询商品失败"
      })
    }
  }
  async addGoods(req, res, next){
		const {regCode, name, type, isSell, price, number, desc} = req.body;
    console.log(req.body)
    try{
				if (regCode != "sjhxwtoken") {
					throw new Error('注册码参数错误')
        }
			}catch(err){
        console.log(err)
				res.send({
					status: 0,
					message: "商家注册码错误"
				})
				return
			}
      try{
        await GoodsModel.find().count(async (err, count)=>{
					if(!err) {
						const goods_id = (count == 0 ? 1 : count+1);  // 商品id
						const newGoods = {
							_id: goods_id,
							regCode: regCode, 
							goodsName: name,
              goodsType: type,
              isSell: isSell,
              price: price,
              number: number,
              desc: desc,
							create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
						}
						console.log("新增加的商品");
						console.log(newGoods);
						await GoodsModel.create(newGoods);
						
						res.send({
							status: 1,
							success: "添加商品成功",
						});

					}
				}).clone().catch(function(err) {console.log(err);});
        }catch(err) {
          console.log(err)
          res.send({
            status: 0,
            message: "添加商品错误"
          })
        }
      }

  async editGoods(req, res, next) {
    const { offset, limit } = req.query;
    try {
      const length = await GoodsModel.find(null, {_id: 0});
      
      const data = await GoodsModel.find(null, {_id: 0}).skip(offset).limit(limit);
      console.log(data)
      res.send({
        status: 1,
        message: data,
        count: length.length
      })
    }catch (err) {
      console.log(err)
    }
  }
  async delGoods(req, res, next) {
    console.log(req.body)
    try{
      const result = await GoodsModel.deleteOne({"goodsName": req.body.goodsName});
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
  async updateGoods(req, res, next) {
		const {regCode, goodsName, state} = req.body
		try{
			const goods = await GoodsModel.findOne({goodsName: goodsName})
			if (!goods) {
        res.send({
          status: 0,
          message: "该商品不存在"
        })
        return;
			}else {
        goods.isSell = state
        res.send({
          status: 1,
          message: "出售状态更新成功"
        })
			}
		}catch (err) {
			res.send({
				status: 0,
				message: "服务器错误"
			})
		}
	}


}

module.exports = new Goods()