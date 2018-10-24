---
title: 记第一次tensorflow实践
date: 2018-08-02 23:32:53
tags: [tensorflow,python]
---
<style type="text/css">
.article-entry img{
	margin-left:0px;
}
</style>

### 1. 下载安装
我个人建议用docker安装，这样不用被安装时候环境的各种依赖困扰，简单方便。
官方[tensorflow](https://github.com/tensorflow/tensorflow)的docker地址：[Link](https://hub.docker.com/r/tensorflow/tensorflow/)

官方的地址下载很慢甚至连接失败，比如我就是。
![docker_pull_tensorflow_failed](https://res.cloudinary.com/akame-moe/image/upload/v1533313724/2018/08/test_tensorflow_6.png)

所以我找了个国内的镜像地址下载。
```
docker pull daocloud.io/daocloud/tensorflow:latest
```
![docker_pull_tensorflow](https://res.cloudinary.com/akame-moe/image/upload/v1533313726/2018/08/test_tensorflow_1.png)

下载的东西有点多(解压后1.25G)，需要等待一些时间。
![docker_tensorflow_size](https://res.cloudinary.com/akame-moe/image/upload/v1533313726/2018/08/test_tensorflow_4.png)

<!--more-->
### 2. 运行tensorflow的docker镜像
```
docker run -it -p 8888:8888 daocloud.io/daocloud/tensorflow
```
![docker_tensorflow_run](https://res.cloudinary.com/akame-moe/image/upload/v1533313726/2018/08/test_tensorflow_3.png)

直接根据提示在浏览器输入提示的地址就可以了。**由于我用的是虚拟机，所以我在PC上访问的地址是`http://193.192.193.129:8888`而不是它提示的地址**

输入地址后你就会看到jupyter界面，~~玩过Python的话别说你不知道[jupyter](https://wiki.archlinux.org/index.php/Jupyter)~~。

接下来去官网找一些示例程序，WTF，tensorflow的官网国内访问不了，脑补`黑人问号.jpg`。那好吧，去它的[中文社区](http://www.tensorfly.cn/)了。
![tensorflow_official_site](https://res.cloudinary.com/akame-moe/image/upload/v1533313725/2018/08/test_tensorflow_5.png)看看。

果然有示例程序，复制一下，新建一个`main.py`文件，把官方的示例程序粘贴进去，然后执行`python main.py`(由于里面有中文注释，所以需要手动指定编码为utf-8不然会报错)。
```python
#coding=utf-8
import tensorflow as tf
import numpy as np

# 使用 NumPy 生成假数据(phony data), 总共 100 个点.
x_data = np.float32(np.random.rand(2, 100)) # 随机输入
y_data = np.dot([0.100, 0.200], x_data) + 0.300

# 构造一个线性模型
# 
b = tf.Variable(tf.zeros([1]))
W = tf.Variable(tf.random_uniform([1, 2], -1.0, 1.0))
y = tf.matmul(W, x_data) + b

# 最小化方差
loss = tf.reduce_mean(tf.square(y - y_data))
optimizer = tf.train.GradientDescentOptimizer(0.5)
train = optimizer.minimize(loss)

# 初始化变量
init = tf.initialize_all_variables()

# 启动图 (graph)
sess = tf.Session()
sess.run(init)

# 拟合平面
for step in xrange(0, 201):
    sess.run(train)
    if step % 20 == 0:
        print step, sess.run(W), sess.run(b)

# 得到最佳拟合结果 W: [[0.100  0.200]], b: [0.300]
```
得到以下输出说明环境已经一切OK了，完成了一个简单的基于机器学习的求值程序。
![tensorflow_output](https://res.cloudinary.com/akame-moe/image/upload/v1533313726/2018/08/test_tensorflow_2.png)
上面的WARING是说initialize_all_variables方法将会在2017-03-02之后废弃，使用global_variables_initializer代替(但是，现在都8102年八月了....)，可以先不管，把程序跑起来再说。

### 3. 计划
下一步打算学习一下如何使用tensorflow识别验证码了，然后做一些高科技的事情，再然后可以跟朋友吹嘘我会玩人工智能，哈哈哈。当然，吹归吹，做人还是要踏实，打算用树莓派+openVC+tensorflow做出一个自动欢迎机器再说吧。


