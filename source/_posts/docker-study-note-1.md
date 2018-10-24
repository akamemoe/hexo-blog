---
title: docker学习笔记-1
date: 2017-01-09 18:37:10
tags: [docker,note]
---

#### 镜像拉取
`docker pull [选项] [Docker Registry地址]<仓库名>:<标签>`

有了镜像后，我们就可以以这个镜像为基础启动一个容器来运行。以上面的
ubuntu:14.04 为例，如果我们打算启动里面的 bash 并且进行交互式操作的
话，可以执行下面的命令。  
`docker run -it --rm ubuntu:14.04 bash`  
-it ：这是两个参数，一个是 -i ：交互式操作，一个是 -t 终端。我们
这里打算进入 bash 执行一些命令并查看返回结果，因此我们需要交互式终
端。
--rm ：这个参数是说容器退出后随之将其删除。默认情况下，为了排障需
求，退出的容器并不会立即删除，除非手动 docker rm 。我们这里只是随便
执行个命令，看看结果，不需要排障和保留结果，因此使用 --rm 可以避免
浪费空间。
ubuntu:14.04 ：这是指用 ubuntu:14.04 镜像为基础来启动容器。
bash ：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的
是 bash 。

<!--more-->
#### 列出镜像 docker images

 虚悬镜像(dangling image) 
 
```
$ docker images -f dangling=true
REPOSITORY TAG IMAGE ID CREA TED SIZE
<none> <none> 00285df0df87 5 days ago 342 MB
```

可以用下面的命令删除。

```
$ docker rmi $(docker images -q -f dangling=true)
```

显示包括中间层镜像在内的所有镜像

```
$ docker images -a
```

我们希望看到在 mongo:3.2 之后建立的镜像，可以用下面的命令：

```
$ docker images -f since=mongo:3.2
```

以表格等距显示，并且有标题行，和默认一样，不过自己定义列：
```
$ docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
IMAGE ID REPOSITORY TAG
5f515359c7f8 redis latest
05a60462f8ba nginx latest
fe9198c04d62 mongo 3.2
00285df0df87 <none> <none>
f753707788c5 ubuntu 16.04
f753707788c5 ubuntu latest
1e0c3dd64ccd ubuntu 14.04
```

使用 docker exec 命令进入容器，修改其内容。

```
$ docker exec -it webserver bash
root@3729b97e8226:/# echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
```

用下面的命令将容器保存为镜像：

```
docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]
$ docker commit --author "Tao Wang <twang2218@gmail.com>" --message "修改了默认网页" webserver nginx:v2
```

用 `docker history` 具体查看镜像内的历史记录

`docker commit`命令除了学习之外，还有一些特殊的应用场合，比如被入侵后保
存现场等。但是，不要使用 `docker commit` 定制镜像，定制行为应该使用
Dockerfile 来完成


*在 Docker Hub 上有非常多的高质量的官方镜像， 有可以直接拿来使用的服务类
的镜像，如
nginx 、 redis 、 mongo 、 mysql 、 httpd 、 php 、 tomcat 等； 也有
一些方便开发、构建、运行各种语言应用的镜像，如
node 、 openjdk 、 python 、 ruby 、 golang 等。 可以在其中寻找一个最
符合我们最终目标的镜像为基础镜像进行定制。 如果没有找到对应服务的镜像，官
方镜像中还提供了一些更为基础的操作系统镜像，如
ubuntu 、 debian 、 centos 、 fedora 、 alpine 等，这些操作系统的软
件库为我们提供了更广阔的扩展空间。*

表示一个空白的镜像。
`FROM scratch`

使用Dockerfile构建镜像
在 Dockerfile 文件所在目录执行：

```bash
$ docker build -t nginx:v3 .
Sending build context to Docker daemon 2.048 kB
Step 1 : FROM nginx
---> e43d811ce2f4
Step 2 : RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/h
tml/index.html
---> Running in 9cdc27646c7b
---> 44aa4490ce2c
Removing intermediate container 9cdc27646c7b
Successfully built 44aa4490ce2c
```
**解释：#（.指的是上下文路径）**

`docker build` 还支持从 URL 构建，比如可以直接从 Git
repo 中构建：

```bash
$ docker build https://github.com/twang2218/gitlab-ce-zh.git#:8.14
```

这行命令指定了构建所需的 Git repo，并且指定默认的 master 分支，构建目录
为 /8.14/ ，然后 Docker 就会自己去 git clone 这个项目、切换到指定分
支、并进入到指定目录后开始构建。

用给定的 tar 压缩包构建

```bash
$ docker build http://server/context.tar.gz
```

从标准输入中读取 Dockerfile 进行构建

```bash
docker build - < Dockerfile 或 cat Dockerfile | docker build -
```

如果标准输入传入的是文本文件，则将其视为 Dockerfile ，并开始构建。这种
形式由于直接从标准输入中读取 Dockerfile 的内容，它没有上下文，因此不可以像
其他方法那样可以将本地文件 COPY 进镜像之类的事情

Dockerfile 指令详解
FROM RUN ADD    
`COPY`指令将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像
内的 <目标路径> 位置。比如：

```
COPY package.json /usr/src/app/
```
