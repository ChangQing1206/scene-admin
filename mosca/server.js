// mosca 服务端
var mosca = require('mosca')

/* 不使用ascoltarori作为数据库 原因如下
1.它实现是使用了mongo的固定集合，固定集合的特点有3：第一固定容量 第二固定文档数 第三超出固定文档数最新的数据将覆盖最旧的
2.固定集合适用存储日志等，所以直接使用mongo的正常操作，只要将server暴露出去
10000 条文档 10MB容量
*/
// var ascoltatore = {
//   //using ascoltatore
//   type: 'mongo',        
//   url: 'mongodb://localhost:27017/scene', // 数据库
//   pubsubCollection: 'ascoltatori', // 表
//   mongo: {}
// };
// var moscaSettings = {
//   port: 1883,
//   backend: ascoltatore,
//   persistence: {
//     factory: mosca.persistence.Mongo,
//     url: 'mongodb://localhost:27017/scene'
//   }
// };

// var server = new mosca.Server(moscaSettings);
// 实例化服务器
var server = new mosca.Server({
  http: {
    port: 3010,
    bundle: true,
    static: './'
  }
});


// https://www.runoob.com/nodejs/nodejs-mongodb.html

// 聚合操作 按游客姓名聚合 返回的信息有
/*
vistor = {
	name: 'tom',
	bodyTem: [],   // 体温数组
	bodyTemMax: , // 最高体温
	goodsNames: [], // 消费商品
	position: []  // 位置数组 
}
*/
// db.mos_test.aggregate([{$group: {_id: "$name", bodyTem: {$push: "$bodyTem"}, bodyTemMax: {$max: "$bodyTem"}, goodsName: {$push: "$goodsName"}, positions: {$push: "$position"}}}]) 完美


// 服务器启动
server.on('ready', function() {
  console.log("mqtt server started");
});
// 服务器处理发布端的事情
server.on('published', function(packet, client) {
  console.log("服务器接收客户端发布");
  var data = packet.payload.toString()
  console.log("Published: ", data);
  try {
    data = JSON.parse(data); 
  // 插入数据库
    test.collection("mos_test").insertOne(data, function (err, res) {
      if(err) throw err;
      console.log("插入成功");
    })
  } catch(err) {
	// throw err;
    console.log("这不是主要内容")
  }
});
// 服务器处理订阅端的事情
server.on("subscribed", function(topic, client) {
  console.log("服务端接收客户端订阅");
  console.log("subscribed: ", topic);
});

server.on("unSubscribed", function(topic, client) {
  console.log('unSubscribed', topic);
});

server.on("clientConnected", function(client) {
  console.log('client connect: ', client.id);
});

server.on("clientDisConnected", function(client) {
  console.log('client disConnected: ' + client.id + ' userNumber: ' + usermap.keys.length);
});

module.exports = server;