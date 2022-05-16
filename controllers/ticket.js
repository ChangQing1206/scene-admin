var TicketModel = require('../models/ticket');
var dtime = require('time-formater');
class Ticket {
  constructor() {
    this.createTicket = this.createTicket.bind(this);
    this.getTickets = this.getTickets.bind(this);
    this.getTicketsCount = this.getTicketsCount.bind(this);
    this.getClientId = this.getClientId.bind(this);
    this.checkTicket = this.checkTicket.bind(this);
  }
  async createTicket(req, res, next) {
    var ticket = {
      _id: req.body.identity,
      client_id: req.body.client_id,
      name: req.body.name,
      create_time: dtime().format('YYYY-MM-DD HH:mm'),
      status: req.body.status,
      deposit: req.body.deposit
    }
    console.log(ticket)
    try{
      await TicketModel.create(ticket);
      res.send({
        status: 1
      })
    }catch(err) {
      console.log(err);
      res.send({
        status: 0
      })
    }

  }
  async getTickets(req, res, next) {
    const {offset, limit, queryDate} = req.query;
    if(queryDate == '') {
      // 正常查询
      try{
        var result = await TicketModel.find().skip(offset).limit(limit)
        console.log(result)
        res.send({
          status: '1',
          data: result
        })
      }catch(err) {
        res.send({
          status: '0',
          data: err
        })
      }
    }
    else if(queryDate) {
      // 如果传入了日期
      try{
        
        var result = await TicketModel.find({create_time: {$regex: queryDate} }).skip(offset).limit(limit);
        console.log(queryDate)
        console.log(result);
        res.send({
          status: '1',
          data: result,
          count: result.length
        })
      } catch(err) {
        res.send({
          status: '0',
          data: err
        })
      }
    }
  }

  async getTicketsCount(req, res, next) {
    try {
      var count = await TicketModel.find().count();
      res.send({
        status: '1',
        count: count
      })
    } catch(err) {
      res.send({
        status: '0',
        err: err
      })
    }
  }


  async getClientId(req, res, next) {
    var {name, identity} = req.query;
    try {
      var vistor = await TicketModel.findOne({name: name, _id: identity});
      res.send({
        status: 1,
        clientId: vistor.clientId
      })
    }catch (err) {
      res.send({
        status: 0,
        error: err
      })
    }
  }
 //  验票接口
  async checkTicket(req, res, next) {
    var {name, identity, status} = req.body
    try {
      var vistor = await TicketModel.findOne({name: name, _id: identity});
      vistor.status = status;
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
}

module.exports = new Ticket()