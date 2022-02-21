var express = require('express');
var router = express.Router();
var Admin = require('../controllers/admin');
var Vistor = require('../controllers/vistor');
var Consume = require('../controllers/consume');
var Deposit = require('../controllers/deposit');
var Ticket = require('../controllers/ticket');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取用户信息
router.get('/api/admin/info', Admin.getAdminInfo);
// 登录
router.post('/api/admin/login', Admin.login);
// 退出
router.get('/api/admin/signout', Admin.signout);

// // 游客记录查询
// router.post('/api/vistor/getVistors', Vistor.getVistors);
// // 游客数量查询
// router.get('/api/vistor/getVistorsCount', Vistor.getVistorsCount);
// // 删除游客
// router.post('/api/vistor/deleteVistor', Vistor.deleteVistor);
// // 更新游客去过的景点
// router.post('/api/vistor/updateScene', Vistor.updateScene);
// // 增加游客消费记录
// router.post('/api/vistor/createOrder', Consume.createOrder);
// // 按顺序查询消费记录
// router.get('/api/vistor/getOrders', Consume.getOrders);
// // 按照游客查询消费记录
// router.get('/api/vistor/getClientOrders', Consume.getClientOrders);
// // 获取按顺序消费记录的数量
// router.get('/api/vistor/getOrdersCount', Consume.getOrdersCount);
// // 增加游客充值记录
// router.get('/api/vistor/createDeposit', Deposit.createDeposit);
// // 按顺序查询充值记录
// router.get('/api/vistor/getDeposits', Deposit.getDeposits);
// // 按照游客查询充值记录
// router.get('/api/vistor/getClientDeposits', Deposit.getClientDeposits);
// // 获取按顺序充值记录的数量
// router.get('/api/vistor/getDepositsCount', Deposit.getDepositsCount);
// // 游客位置分析
// router.get('/api/vistor/analyse/position', Vistor.posAnalyse);
// // 游客消费分析
// router.get('/api/vistor/analyse/goods', Consume.goodsAnalyse);


// 创建门票
router.post('/api/ticket/createTicket', Ticket.createTicket);
module.exports = router;
