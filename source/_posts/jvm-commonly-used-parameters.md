---
title: JVM常用参数
date: 2018-06-27 23:02:55
tags: [jvm,java]
---

<style type="text/css">
table th{
    width: 100px;
}
table tr:nth-child(odd){
    background: #fff;
}
table tr:nth-child(even){
    background: #f6f8fa;
}
</style>

### 1.Java堆参数

|parameter|explain|example|
|--|--|--|
|-Xms|堆最小值|-Xms20M|
|-Xmx|堆最大值|-Xmm20M|
|-Xmn|年轻代大小|-Xmn2g  **(设置年轻代大小为2G。整个堆大小=年轻代大小 + 年老代大小 + 持久代大小。持久代一般固定大小为64m，所以增大年轻代后，将会减小年老代大小。此值对系统性能影响较大，Sun官方推荐配置为整个堆的3/8)**|
|-XX:NewSize|新生代大小|-XX:NewSize=20M|
|-XX:MaxNewSize|年轻代最大值||
|-XX:SurvivorRatio|新生代/年老代|-XX:SurvivorRatio=2 **(新生代是老年代的2倍)**|
|-XX:NewRatio|老年代/新生代|-XX:NewRatio=4 **(老年代是新生代的4倍)**|

例：
```
java -Xmx3550m -Xms3550m -Xss128k -XX:NewRatio=4 -XX:SurvivorRatio=4 -XX:MaxPermSize=16m -XX:MaxTenuringThreshold=0
```
-XX:NewRatio=4:设置年轻代（包括Eden和两个Survivor区）与年老代的比值（除去持久代）。设置为4，则年轻代与年老代所占比值为1：4，年轻代占整个堆栈的1/5
-XX:SurvivorRatio=4：设置年轻代中Eden区与Survivor区的大小比值。设置为4，则两个Survivor区与一个Eden区的比值为2:4，一个Survivor区占整个年轻代的1/6

<!--more-->
### 2.虚拟机栈

|parameter|explain|example|
|--|--|--|
|-Xss|栈大小|-Xss128k  **(设置每个线程的堆栈大小。 JDK5.0以后每个线程堆栈大小为1M，以前每个线程堆栈大小为256K。根据应用的线程所需内存大小进行调整。在相同物理内存下，减小这个值能生成更 多的线程。但是操作系统对一个进程内的线程数还是有限制的，不能无限生成，经验值在3000~5000左右)**|

### 3.方法区

|parameter|explain|example|
|--|--|--|
|-XX:PermSize|初始值|-XX:PermSize=10M|
|-XX:MaxPermSize|方法区最大值|-XX:MaxPermSize=10M|

### 4.直接内存
 
|parameter|explain|example|  
|--|--|--|  
|-XX:MAxDirectMemorySize|直接内存最大值  **(缺省值与Java堆最大值相同)**|-XX:MaxDirectMemorySize=10M|

### 5.其他
|parameter|explain|
|--|--|
|-XX:+HeapDumpOnOutOfMemoryError |出现OOM时Dump出当前的内存转储快照| 
|-Xnoclassgc |禁用垃圾回收|  
|-XX:+PrintHeapAtGC|在每次GC前后打印堆的信息|  
|-XX:+PrintGCDetails|打印GC详细信息|  
|-XX:+PrintVMOptions|打印JVM参数|  
|-XX:PrintCommandLineFlags|打印传给虚拟机的隐式和显示参数|  
|-XX:+PrintGCDateStamps|打印GC日期|  
|-XX:+PrintGCTimeStamps|打印GC时间|  
|-XX:+PrintGCApplicationConcurrentTime|打印应用程序的执行时间| 
|-XX:+HeapDumpOnOutOfMemoryError|在内存溢出时导出堆信息|
|-XX:HeapDumpPath|导出的路径|
|-XX:MaxDirectMemorySize|直接内存，默认和堆(-Xmx)一样大|

### 6.知识补充： 

-Xmx ：堆的最大值 
-Xms ：堆的最小值 
-Xmn ：堆年轻代大小 
-XXSurvivorRatio：Eden区和Survior区的占用比例.
VM内存区域总体分两类，heap区 和 非heap 区 。 
- heap区： 堆区分为Young Gen(新生代)，Tenured Gen（老年代-养老区）。其中新生代又分为Eden Space（伊甸园）、Survivor Space(幸存者区)。 
- 非heap区： Code Cache(代码缓存区)、Perm Gen（永久代）、Jvm Stack(java虚拟机栈)、Local Method Statck(本地方法栈)。

##### jvm内存结构如图：
![jvm-struct](https://res.cloudinary.com/akame-moe/image/upload/v1532633880/2018/06/jvm--struct.png)

**Q:不同代采用的算法区别？**
A:基于以上特性，新生代中一般采用复制算法，因为存活下来的对象是少数，所需要复制的对象少，而老年代对象存活多，不适合采用复制算法，一般是标记整理和标记清除算法。 
因为复制算法需要留出一块单独的内存空间来以备垃圾回收时复制对象使用，所以将新生代分为eden区和两个survivor区，每次使用eden和一个survivor区，另一个survivor作为备用的对象复制内存区。

**Q:为什么要区分新生代和老生代？** 
A:堆中区分的新生代和老年代是为了垃圾回收，新生代中的对象存活期一般不长，而老年代中的对象存活期较长，所以当垃圾回收器回收内存时，新生代中垃圾回收效果较好，会回收大量的内存，而老年代中回收效果较差，内存回收不会太多。
