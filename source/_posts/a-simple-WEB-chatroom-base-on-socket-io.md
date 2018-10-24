---
title: 用socket.io做一个简单的WEB聊天室
date: 2016-12-10 13:19:57
tags: nodejs
---

## 使用socket.io做一个简单的WEB聊天室(可消息私发) ##

### 1.创建工程目录 ###

目录命名为：chat-web

### 2.创建package.json ###

使用命令：npm init,会引导你设置package.json的内容.

### 3.安装依赖包 ###

使用命令： 
```bash
npm install --save express
npm install --save socket.io
```

<!--more-->
安装完成后你会在工程目录看见有自动生成的node_modules文件夹

### 4.编写index.js代码 ###

```javascript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    console.log("dir:" + __dirname);
    res.sendFile( __dirname + '/index.html');
});
//所有注册用户的socket集合（socketMap）
var sm = {};
io.on('connection', function(socket){
    socket.on('chat-reg',function(data){
        console.log("chat-reg:" + JSON.stringify(data));
        //注册 ：data 格式：{user:"alisa"}
        //消息 ：data 格式：{user:"alisa",msg:"@someone hello!!!"}
        //格式说明：msg内容以@符号开头，以空格分隔用户名和消息体的说明是私聊
        sm[data.user] = socket;
        socket.emit('chat-reg',{code:200,msg:"reg success"});
    });
    socket.on('chat-data',function(data){

        console.log("chat-data:" + JSON.stringify(data));
        if(data.msg[0] == '@'){//以@符号开头，说明这句消息是私聊
            //将消息显示在自己的聊天记录上
            socket.emit('chat-data',data);
            //查找第一个空格的位置
            var i = data.msg.indexOf(' ');
            //得到用户名
            var u = data.msg.substring(1,i);
            //得到消息体
            var m = data.msg.substring(i,data.msg.length);
            if(typeof sm[u] != 'undefined'){
                //在socket集合中得到目标用户的socket，并且发送消息事件
                sm[u].emit('chat-data',{user:data.user,msg:"[private]" + m});
            }
        }else{
            //不是以@开头的消息发送给所有连接的用户
            io.sockets.emit('chat-data',data);
        }
    });
});
//监听在3000端口
http.listen(3000, function(){
    console.log('listening on:3000');
});
```

### 5.编写index.html代码 ###

```html
<!doctype html>
<html>
<head>
  <title>私人聊天室</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font: 13px Helvetica, Arial; }
    form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
    form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
    form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
    #messages { list-style-type: none; margin: 0; padding: 0; }
    #messages li { padding: 5px 10px; }
    #messages li:nth-child(odd) { background: #eee; }

    #info{
      height: 50px;
      text-align: center;
      line-height: 50px;
      background-color: #333;
      color: white;
    }
  </style>
</head>
<body>
  <div id="info"></div>
  <ul id="messages"></ul>
  <form action="">
    <input id="m" autocomplete="off" /><button>Send</button>
  </form>
  <script src="http://cdn.bootcss.com/socket.io/1.7.1/socket.io.min.js"></script>
  <script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
  <script>
    //页面加载的时候随机生成一个用户名
    var user = "user" + Math.floor(Math.random()*1000);
    //打开一个socket,io()方法可以有namespace参数，默认为`/`，具体用法见官方
    var socket = io();
    //发送一个用户注册事件，在服务器端注册用户名
    socket.emit('chat-reg',{user:user});
    //将用户名显示在信息栏
    $("#info").text("您的用户名："+user);
    $('form').submit(function(){
      //发送聊天信息
      socket.emit('chat-data', {user:user,msg:$('#m').val()});
      $('#m').val('');
      return false;
    });
    //监听服务端发送的聊天信息，并将其显示在页面中
    socket.on('chat-data', function(data){
      $('#messages').append($('<li>').text("[" + data.user + "]:" + data.msg));
    });
    //注册成功后，在控制台显示返回的信息
    socket.on('chat-reg',function(data){
        console.log(JSON.stringify(data));
    });
  </script>
</body>
</html>
```

### 6.项目测试 ###

在控制台工程目录下运行node index.js. 
在浏览器中访问：localhost:3000.

你可以多打开几个浏览器窗口，模拟多个用户。 
赶紧动手试试效果吧。
