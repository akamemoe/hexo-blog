---
title: java中一个强大的工具类-Unsafe
date: 2018-06-06 11:51:23
tags: java
---

### 1.简介
Unsafe是java中一个强有力的工具类，很多高性能框架都用到了它，并且在我们常用的ConcurrentHashMap,AtomicInteger类中也用到了它。

ConcurrentHashMap.java中：
![Unsafe_in_ConcurrentHashMap](https://res.cloudinary.com/akame-moe/image/upload/v1533532565/2018/06/unsafe_in_concurrenthashmap.png)

AtomicInteger.java中：
![Unsafe_in_AtomicInteger](https://res.cloudinary.com/akame-moe/image/upload/v1533532564/2018/06/unsafe_in_atomicinteger.png)


高性能框架中(包括但不限于)：

- Netty
- Hazelcast
- Cassandra
- Mockito / EasyMock / JMock / PowerMock
- Scala Specs
- Spock
- Robolectric
- Grails
- Neo4j
- Spring Framework
- Akka
- Apache Kafka
- Apache Wink
- Apache Storm
- Apache Hadoop
- Apache Continuum

***[refer:https://blog.dripstat.com/removal-of-sun-misc-unsafe-a-disaster-in-the-making/](https://blog.dripstat.com/removal-of-sun-misc-unsafe-a-disaster-in-the-making/)***
***[refer:https://adtmag.com/blogs/watersworks/2015/08/java-9-hack.aspx](https://adtmag.com/blogs/watersworks/2015/08/java-9-hack.aspx)***

这个类强大之处在于可以像C的指针一样，直接操作内存。正如它的名字一样，它是不安全的，如果处理不好，会导致程序问题发生的概率增大，官方也不建议使用。

### 2.限制

Unsafe内部使用的是单例模式，通过其静态方法getUnsafe方法获取，但是有些限制，那就是只有系统类加载器可以加载这个类，其他加载器加载会抛出异常，这个我们可以通过看源码来证明：
![Unsafe_of_getUnsafe](https://res.cloudinary.com/akame-moe/image/upload/v1533532564/2018/06/unsafe_getunsafe.png)

但是这个限制也只是普通限制，别忘了java还有一个更强大的特性：反射(reflect)。如果你也想试一试这个类，可以通过下面的方法获取其实例：

```java
Field f = Unsafe.class.getDeclaredField("theUnsafe");
f.setAccessible(true);
Unsafe unsafe = (Unsafe) f.get(null);
```

里面具体有哪些方法，读者可以自己去[源码](http://www.docjar.com/html/api/sun/misc/Unsafe.java.html)看下，但是这个类没有官方文档，仅有的是源码上的注释，不过可以通过自己试验来了解和验证其功能。我这里找到一个blog，博主详细介绍了Unsafe中的方法，有兴趣可以去看下：[http://mishadoff.com/blog/java-magic-part-4-sun-dot-misc-dot-unsafe/](http://mishadoff.com/blog/java-magic-part-4-sun-dot-misc-dot-unsafe/)。


### 3.移除

Unfortunately，oracle计划在jdk1.9中移除它，而且是没有原因的。下面的是Oracle邮件中部分内容：

> Let me be blunt -- sun.misc.Unsafe must die in a fire. It is -- wait
> for it -- Unsafe. It must go. Ignore any kind of theoretical rope and
> start the path to righteousness

***[refer:https://blog.dripstat.com/removal-of-sun-misc-unsafe-a-disaster-in-the-making/](https://blog.dripstat.com/removal-of-sun-misc-unsafe-a-disaster-in-the-making/)***

如果直接移除的话，必然导致很多框架不得不修改源码以让其可以正常运行，不然就没法使用。

就像java8中使用`java.time`包来代替`java.util`中Date类一样，提供一个过渡期，不强制移除Unsafe类，而是在启动JVM的时候提供一个开关，这个开启的时候我们才可以使用Unsafe，默认是关闭的。




