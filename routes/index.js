var express = require('express');
var router = express.Router();
var Admin = require('../controllers/admin');
var Vistor = require('../controllers/vistor');
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
// 游客记录查询
router.post('/api/vistor/getVistors', Vistor.getVistors);
// 游客数量查询
router.get('/api/vistor/getVistorsCount', Vistor.getVistorsCount);
// 删除游客
router.post('/api/vistor/deleteVistor', Vistor.deleteVistor);
// 更新游客去过的景点
router.post('/api/vistor/updateScene', Vistor.updateScene);
// 游客位置分析
router.get('/api/vistor/analyse/position', Vistor.posAnalyse);
// 游客消费分析
router.get('/api/vistor/analyse/goods', Vistor.goodsAnalyse);

module.exports = router;
