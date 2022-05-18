var AdminModel = require('../models/admin')
var crypto = require('crypto')
var formidable = require('formidable')
var dtime = require('time-formater');
const e = require('express');
const jwt = require("../jwt/jwt")


class Admin {
  constructor() {
    this.login = this.login.bind(this);
    this.encryption = this.encryption.bind(this)
  }
  // 如果用户未登录将直接注册并登录
  async login(req, res, next){
    console.log(req.body);
		const {username, password} = req.body;
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


      try{
				const admin = await AdminModel.findOne({username})
        console.log(admin);
				// 密码错误
        if(password != admin.password.toString()){
					console.log('管理员登录密码错误');
					res.send({
						status: 0,
						type: 'ERROR_PASSWORD',
						message: '管理员登录密码错误',
					})
				}else{
					// 进行token生成
					let tokenExpiresTime = 1000 * 60 * 60 * 24 * 7; // token有效时间
					let payload = {
						user: username,
						expires: Date.now() + tokenExpiresTime,
						role: admin.role,
						power: admin.power,
						id: admin._id
					}
					console.log(admin)
					let mytoken = jwt.createToken(payload)
					res.send({
						status: 1,
						// 返回角色、权限和token
						message: {
							role: admin.role,
							power: admin.power,
							token: mytoken
						},
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
	async register(req, res, next) {
		const {username, password, role, token} = req.body
		// 如果未找到用户，将新建用户
		try{
			const admin = await AdminModel.findOne({username})
			if (!admin) {
				let adminTip;
				let power;
				if(role === 1) {
					adminTip = "游客"
				}else if(role === 2) {
					adminTip = "商家"
					if(token != "sjhxwtoken") {
						res.send({
							status: 0,
							message: "你的商家注册码错误"
						})
						return;
					}
					power = "sj"
				}else if(role === 3) {
					adminTip = "管理员"
					if(token != "adminhxwtoken") {
						res.send({
							status: 0,
							message: "你的管理员注册码错误"
						})
						return;
					}
					power = "admin"
				}
				await AdminModel.find().count(async (err, count)=>{
					if(!err) {
						console.log(count);
						const admin_id = (count == 0 ? 1 : count+1);  
						console.log(admin_id); // 注册的人数
						const newAdmin = {
							_id: admin_id,
							password: password, 
							username: username,
							create_time: dtime().format('YYYY-MM-DD HH:mm'),
							role: adminTip, // 角色
							power: power     // 权限
						}
						console.log("新注册的用户");
						console.log(newAdmin);
						await AdminModel.create(newAdmin);
						
						res.send({
							status: 1,
							success: '注册' + adminTip + '成功',
						});

					}
				}).clone().catch(function(err) {console.log(err);});
			}else {
				res.send({
					status: 0,
					message: "该用户已经存在，请更换用户名"
				})
			}
		}catch (err) {
			res.send({
				status: 0,
				message: "服务器错误"
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

  async signout(req, res, next){
		try{
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
		if(req.auth) {
			res.send({
				status: 1,
				message: {
					user: req.auth.user,
					role: req.auth.role
				}
			})
		}else {
			res.send({
				status: 0,
				message: "获取用户信息失败"
			})
		}
	}
}

module.exports = new Admin()