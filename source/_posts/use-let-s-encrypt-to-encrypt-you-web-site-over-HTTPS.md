---
title: 在nginx中配置Let's Encrypt的https证书
date: 2018-06-10 20:02:12
tags: [linux,nginx]
---

### 1 、获取 Let's Encrypt 程序
```bash
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
chmod +x letsencrypt-auto
```
### 2 、执行安装证书
在执行一下命令之前要注意，你的域名下必须要有服务器正在运行，不然下面脚本无法执行成功。如果你的服务器里已经有Python环境，
直接执行`python -m http.server 80`开启一个http服务器。一般1024以下端口非管理员用户不能绑定，所以你还需要确保你的80端口可以在公网访问，如果不能请自行Google
寻找解决办法。
```bash
./letsencrypt-auto certonly -a webroot --webroot-path=/home/www/www.gentlehu.com --email me@gentlehu.com -d www.gentlehu.com
```
将上面的目录、邮箱和域名换成你自己的,如果在输出信息中没有看到错误提示并且在`/etc/letsencrypt/live/www.gentlehu.com/`目录看到如下五个文件就说明证书申请成功：
```
cert.pem  - Apache 服务器端证书  
chain.pem  - Apache 根证书和中继证书  
fullchain.pem  - ssl_certificate
privkey.pem  - ssl_certificate_key
README.md
```
然后就可以关闭之前的http服务器了。

<!--more-->

### 3 、修改 nginx 配置文件
用`vim /etc/nginx/nginx.conf`命令打开你的 nginx 配置文件，默认是：`/etc/nginx/nginx.conf`。

配置里原来的server块的全部注释(注意其他块不要注释)，添加以下内容。
```
server {  
    listen 80;
    server_name www.gentlehu.com; #改成你上面填写的域名
    rewirte ^ https://$server_name$request_uri permanent;  #http请求全部重写为https请求
}
server {
        listen 443 ssl;
        ssl on;
        ssl_certificate     /etc/letsencrypt/live/www.gentlehu.com/fullchain.pem;  #上面得到的fullchain.pem文件路径
        ssl_certificate_key /etc/letsencrypt/live/www.gentlehu.com/privkey.pem; #上面得到的privkey.pem文件路径
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        ssl_ciphers AES256+EECDH:AES256+EDH:!aNULL;

        server_name www.gentlehu.com;
        index index.html;
        root  /home/www/www.gentlehu.com;
}
```
填写完成后按`ESC`后输入`:wq`保存退出。

### 4、开启nginx
在nginx命令所在目录执行`./nginx`

### 5、尝试访问
在浏览器输入`https://www.gentlehu.com` 应该能看到你的主页。如果你没有布置主页那么你会看到nginx默认主页。
输入`http://www.gentlehu.com`能跳转到`https://www.gentlehu.com`则说明Https部署成功。

