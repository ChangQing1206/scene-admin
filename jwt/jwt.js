//用一个单独模块来放生成token和验证token的方法，方便后面调用。
const secretKey = "icq1206"
const jwt = require("jsonwebtoken");
const {expressjwt} = require("express-jwt");
//生成 token
const createToken = payload =>
  jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60 * 240 // 设置token的有效期 单位（秒）   
  });

// 验证 token
const jwtAuth = expressjwt({
  secret: secretKey,
  algorithms: ["HS256"],
  credentialsRequired: true//  false：不校验
}).unless({
  // path: ["/api/admin/resigter"] //不需要校验的路径
path: [/register/, /login/]
});
module.exports = { jwtAuth, createToken };
