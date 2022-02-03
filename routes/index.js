var express = require('express');
var router = express.Router();
var Admin = require('../controllers/admin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取用户信息
router.get('/api/admin/info', Admin.getAdminInfo);
// 登录
router.post('/api/admin/login', Admin.login);

module.exports = router;
