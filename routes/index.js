var express = require('express');
var router = express.Router();
var Admin = require('../controllers/admin');
var Vistor = require('../controllers/vistor');
var Consume = require('../controllers/consume');
var Deposit = require('../controllers/deposit');
var Ticket = require('../controllers/ticket');
var Goods = require('../controllers/goods')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取用户信息
router.get('/api/admin/info', Admin.getAdminInfo);
// 登录
router.post('/api/admin/login', Admin.login);
// 注册
router.post('/api/admin/register', Admin.register);
// 退出
router.get('/api/admin/signout', Admin.signout);

// 游客记录查询
router.post('/api/vistor/getVistors', Vistor.getVistors);
// 游客数量查询
router.get('/api/vistor/getVistorsCount', Vistor.getVistorsCount);
// 删除游客
router.post('/api/vistor/deleteVistor', Vistor.deleteVistor);
// 获取游客id
router.get('/api/vistor/getClientId', Ticket.getClientId);
// // 更新游客去过的景点
// router.post('/api/vistor/updateScene', Vistor.updateScene);
// 增加游客消费记录
router.post('/api/consume/createOrder', Consume.createOrder);
// 按顺序查询消费记录
router.get('/api/vistor/getOrders', Consume.getOrders);
// // 按照游客查询消费记录
// router.get('/api/vistor/getClientOrders', Consume.getClientOrders);


// 按顺序查询充值记录
router.get('/api/vistor/getDeposits', Deposit.getDeposits);
// 按照游客查询充值记录
router.get('/api/vistor/getClientDeposits', Deposit.getClientDeposits);
// 获取按顺序充值记录的数量
router.get('/api/vistor/getDepositsCount', Deposit.getDepositsCount);
// // 游客位置分析
// router.get('/api/vistor/analyse/position', Vistor.posAnalyse);
// 游客消费分析
router.post('/api/vistor/analyse/goods', Consume.goodsAnalyse);
// 查询商品
router.get('/api/goods/getGoods', Goods.getGoods);
// 商家添加商品
router.post('/api/goods/addGoods', Goods.addGoods); 
// 编辑商品
router.get('/api/goods/editGoods', Goods.editGoods); 
// 商家删除商品
router.post('/api/goods/delGoods', Goods.delGoods); 
// 创建门票
router.post('/api/ticket/createTicket', Ticket.createTicket);
// 获取门票信息
router.get('/api/ticket/getTickets', Ticket.getTickets);
// 获取门票数量
router.get('/api/ticket/getTicketsCount', Ticket.getTicketsCount);
// 游客充值
router.post('/api/deposit/increaseDeposit', Deposit.increaseDeposit);
// 验票
router.post('/api/ticket/checkTicket', Ticket.checkTicket);

module.exports = router;
