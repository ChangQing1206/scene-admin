var TicketModel = require('../models/ticket');
var dtime = require('time-formater');
class Ticket {
  constructor() {
    this.createTicket = this.createTicket.bind(this);
    this.getTickets = this.getTickets.bind(this);
  }
  async createTicket(req, res, next) {
    var ticket = {
      _id: req.body.identity,
      name: req.body.name,
      bodyTem: req.body.bodyTem,
      create_time: dtime().format('YYYY-MM-DD HH:mm'),
      position: req.body.position,
      status: req.body.status
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
    const {offset, limit, queryDate} = req.body;
    if(queryDate == undefined) {
      // 正常查询
      TicketModel.find()
    }
  }
}

module.exports = new Ticket()