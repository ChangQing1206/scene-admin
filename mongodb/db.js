
var mongoose = require('mongoose')
// const url = "mongodb://changqing:123456@localhost:27017/scene"
// 用户名：changqing  密码：123456  数据库名：scene 
const url = "mongodb://localhost:27017/scene"


// mongoose.connect(url, {useMongoClient:true});
mongoose.connect(url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open' ,() => {
	console.log(
    "数据库连接成功"
  );
})

db.on('error', function(error) {
    console.error(
      "数据库连接失败：" + error
    );
    mongoose.disconnect();
});

// db.on('close', function() {
//     console.log(
//       "数据库断开，重新连接数据库"
//     );
//     mongoose.connect(url, {server:{auto_reconnect:true}});
// });

module.exports = db;
