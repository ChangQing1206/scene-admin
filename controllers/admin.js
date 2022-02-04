var AdminModel = require('../models/admin')
var crypto = require('crypto')
var formidable = require('formidable')
var dtime = require('time-formater');
const e = require('express');


class Admin {
  constructor() {
    this.login = this.login.bind(this);
    this.encryption = this.encryption.bind(this)
  }
  // 如果用户未登录将直接注册并登录
  async login(req, res, next){
    console.log(req.body);
    const {username, password, status = 1} = req.body;
    console.log("这是解构")
    console.log(username);
// 验证参数
    try{
				if (!username) {
					throw new Error('用户名参数错误')
				}else if(!password){
					throw new Error('密码参数错误')
				}
			}catch(err){
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
			// 加密密码
			const newpassword = this.encryption(password);
      console.log("这是加密后的密码");
      console.log(newpassword);
      try{
        console.log("开始数据库操作")
				const admin = await AdminModel.findOne({username})
        console.log("数据库操作完成")
        console.log(admin);
        // 如果未找到用户，将新建用户
				if (!admin) {
          console.log("该管理员不存在hhh");
					const adminTip = status == 1 ? '管理员' : '超级管理员'
					await AdminModel.find().count(async (err, count)=>{
						if(!err) {
							console.log(count);
							const admin_id = (count == 0 ? 1 : count+1);
							console.log(admin_id);
							const newAdmin = {
								_id: admin_id,
								password: newpassword, 
								username,
								create_time: dtime().format('YYYY-MM-DD HH:mm'),
								admin: adminTip,
								status
							}
							console.log("新注册的用户");
							console.log(newAdmin);
							await AdminModel.create(newAdmin);
							console.log(req.session);
							console.log("**************")
							
							req.session.admin_id = admin_id;
							console.log(req.session);
							res.send({
								status: 1,
								success: '注册管理员成功',
							});

						}
					}).clone().catch(function(err) {console.log(err);});
				}else if(newpassword.toString() != admin.password.toString()){
					console.log('管理员登录密码错误');
					res.send({
						status: 0,
						type: 'ERROR_PASSWORD',
						message: '该用户已存在，密码输入错误',
					})
				}else{
					console.log("@@@@@@@@@@@@@@@@@@@")
					console.log(req.session);
					req.session.admin_id = admin._id;
					console.log(req.session);
					res.send({
						status: 1,
						success: '登录成功'
					})
				}
			}catch(err){
				console.log('登录管理员失败', err);
				res.send({
					status: 0,
					type: 'LOGIN_ADMIN_FAILED',
					message: '登录管理员失败',
				})
			}

	}
  encryption(password){
		const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
		return newpassword
	}
	Md5(password){
		const md5 = crypto.createHash('md5');
		return md5.update(password).digest('base64');
	}
  async singout(req, res, next){
		try{
			delete req.session.admin_id;
			res.send({
				status: 1,
				success: '退出成功'
			})
		}catch(err){
			console.log('退出失败', err)
			res.send({
				status: 0,
				message: '退出失败'
			})
		}
	}
  async getAdminInfo(req, res, next){
		const admin_id = req.session.admin_id;  // 登录时设置
		console.log("session id");
		console.log(req.session);
		if (!admin_id || !Number(admin_id)) {
			// consoule.log('获取管理员信息的session失效');
			res.send({
				status: 0,
				type: 'ERROR_SESSION',
				message: '获取管理员信息失败'
			})
			return 
		}
		try{
			// const info = await AdminModel.findOne({_id: admin_id}, '-_id -__v -password');
			const info = await AdminModel.findOne({_id: admin_id});
			console.log("info:");
			console.log(info);
			console.log("session id 的数据库查询");
			if (!info) {
				throw new Error('未找到当前管理员')
			}else{
				res.send({
					status: 1,
					data: info
				})
			}
		}catch(err){
			console.log('获取管理员信息失败');
			res.send({
				status: 0,
				type: 'GET_ADMIN_INFO_FAILED',
				message: '获取管理员信息失败'
			})
		}
	}
}

module.exports = new Admin()