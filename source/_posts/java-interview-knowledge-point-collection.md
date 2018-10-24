---
title: java面试知识点整理(未完待续)
date: 2018-07-25 23:05:53
tags: java
---
<style type="text/css"> body{counter-reset:section;} h5:before{ counter-increment:section; content:"Q" counter(section) " - "; }</style>

## J2SE基础

##### 九种基本数据类型的大小，以及他们的封装类

> java提供的九种基本数据类型：boolean、byte、char、short、int、long、float、double、void 
> 以及它们的封装类：Boolean、Byte、Character、Short、Integer、Long、Float、Double、Void


##### Switch能否用string做参数

> 能，这是Java1.7之后的特性


##### equals与==的区别

> ==是比较引用是否相等。equals是比较对象的值是否相等，可以自己重写对象的次方法


##### Object有哪些公用方法

> - clone 实现对象的浅复制，只有实现了Cloneable接口才可以调用该方法，否则抛出CloneNotSupportedException异常 
> - equals在Object中与==是一样的，子类一般需要重写该方法 
> - hashCode 该方法用于哈希查找，重写了equals方法一般都要重写hashCode方法。这个方法在一些具有哈希功能的Collection中用到 
> - getClass final方法，获得运行时类型 
> - wait 使当前线程等待该对象的锁，当前线程必须是该对象的拥有者，也就是具有该对象的锁。wait()方法一直等待，直到获得锁或者被中断。
>   wait(long timeout)设定一个超时间隔，如果在规定时间内没有获得锁就返回。 调用该方法后当前线程进入睡眠状态，直到以下事件发生： 
>    1. 其他线程调用了该对象的notify方法 
>    2. 其他线程调用了该对象的notifyAll方法 
>    3. 其他线程调用了interrupt中断该线程 
>    4. 时间间隔到了,此时该线程就可以被调度了，如果是被中断的话就抛出一个InterruptedException异常 
> - notify 唤醒在该对象上等待的某个线程 
> - notifyAll 唤醒在该对象上等待的所有线程 
> - toString 转换成字符串，一般子类都有重写，否则打印句柄 

<!--more-->
##### Java的四种引用，强弱软虚，用到的场景。

> - 强引用：是指创建一个对象并把这个对象赋给一个引用变量。如果想中断强引用和某个对象之间的关联，可以显示地将引用赋值为null，这样一来的话，JVM在合适的时间就会回收该对象。
> - 软引用：如果一个对象具有软引用，内存空间足够，垃圾回收器就不会回收它。软引用可用来实现内存敏感的高速缓存,比如网页缓存、图片缓存等。使用软引用能防止内存泄露，增强程序的健壮性。
> - 弱引用：弱引用也是用来描述非必需对象的，当JVM进行垃圾回收时，无论内存是否充足，都会回收被弱引用关联的对象。在java中，用java.lang.ref.WeakReference类来表示。
> - 虚引用：虚引用和前面的软引用、弱引用不同，它并不影响对象的生命周期。在java中用java.lang.ref.PhantomReference类表示。如果一个对象与虚引用关联，则跟没有引用与之关联一样，在任何时候都可能被垃圾回收器回收。


##### Hashcode的作用

> hashCode方法的主要作用是为了配合基于散列的集合一起正常运行，这样的散列集合包括HashSet、HashMap以及HashTable。


##### ArrayList、LinkedList、Vector的区别。

> ArrayList是用数组实现的列表，LinkedList是用链表实现的列表，Vector是ArrayList的线程安全的版本。


##### String、StringBuffer与StringBuilder的区别。

> String是字符串类，是不可变对象，StringBuffer是线程安全的，StringBuilder是线程不安全的，是可变对象。


##### Map、Set、List、Queue、Stack的特点与用法。

> - map：键值对
> - set：无序不重复集合
> - List：列表，有序可重复集合
> - queue：先进先出集合
> - stack：先进后出集合


##### HashMap和HashTable的区别。

> 一个是线程安全的一个是线程不安全的


##### HashMap和ConcurrentHashMap的区别，HashMap的底层源码。

> ConcurrentHashMap是线程安全的，实现了更细粒度的锁操作。jdk1.7中采用Segment + HashEntry的方式进行实现。1.8中放弃了Segment臃肿的设计，取而代之的是采用Node + CAS + 红黑树 + Synchronized来保证并发安全进行实现。


##### TreeMap、HashMap、LindedHashMap的区别。

> - LinkedHashMap保存了记录的插入顺序
> - HashMap在jdk1.7有相同hash值得元素会用链表存储，1.8之后变成了如果元素个数大于（TREEIFY_THRESHOLD = 8）个会自动将链表转换成红黑树。
> - TreeMap会按照key值默认排序，这样会很方便我们操作


##### Collection包结构，与Collections的区别。

> - Collection是集合类的上级接口，子接口主要有Set 和List、Map。 
> - Collections是针对集合类的一个帮助类，提供了操作集合的工具方法：一系列静态方法实现对各种集合的搜索、排序、线程安全化等操作。


##### try catch finally，try里有return，finally还执行么？

> finally无论如何都会执行，当执行完try catch里的return语句的时候，会将将要返回的值暂存起来，再去执行finally，如果finally里有return，那么久直接返回


##### Excption与Error包结构。OOM你遇到过哪些情况，SOF你遇到过哪些情况。
> 
> 继承结构：
```
Throwable
| - Error
| - Exception
      | - RuntimeException
```
> - Error是程序不能自行处理的错误。 和运行时异常一样，编译器也不会对错误进行检查
> - Exception是可以处理并且继续运行的异常。 Exception类本身，以及Exception的子类中除了"运行时异常"之外的其它子类都属于被检查异常。
> - RuntimeException是不需要程序检查的，例如：IndexOutOfBoundsException（数组下标越界）,ArithmeticException（除0错误）
> - OOM:开辟数组过大，开启的线程太多
> - SOF:递归调用次数过多


##### Java面向对象的三个特征与含义。

> 封装，继承，多态


##### Override和Overload的含义去区别。

> - override是子类重写父类的方法
> - overload是重写自身的方法，方法名相同参数不同，方便调用。


##### Interface与abstract类的区别。

> - abstract 类不能创建的实例对象，含有abstract方法的类必须定义为abstract class，abstract class类中的方法不必是抽象的
> - interface可以说成是抽象类的一种特例，接口中的所有方法都必须是抽象的。接口中的方法定义默认为public abstract类型，接口中的成员变量类型默认为public static final.


##### Static class 与non static class的区别。

> - 内部静态类不需要有指向外部类的引用。但非静态内部类需要持有对外部类的引用。
> - 非静态内部类能够访问外部类的静态和非静态成员。静态类不能访问外部类的非静态成员。他只能访问外部类的静态成员。
> 一个非静态内部类不能脱离外部类实体被创建，一个非静态内部类可以访问外部类的数据和方法，因为他就在外部类里面


##### java多态的实现原理。

> Java 对于方法调用动态绑定的实现主要依赖于方法表，但通过类引用调用和接口引用调用的实现则有所不同。
> 总体而言，当某个方法被调用时，JVM 首先要查找相应的常量池，得到方法的符号引用，并查找调用类的方法表以确定该方法的直接引用，最后才真正调用该方法
> 
> ![jvm运行时结构图](https://www.ibm.com/developerworks/cn/java/j-lo-polymorph/image003.jpg)


##### 实现多线程的两种方法：Thread与Runable。

> 继承Thread类实现多线程，不能实现资源共享，如果是实现Runable接口就可以在本类中资源共享。


##### 线程同步的方法：sychronized、lock、reentrantLock等。

> - Synchronized：在 软件层面依赖JVM实现同步，synchronized方法或语句的使用提供了对与每个对象相关的隐式监视器锁的访问，但却强制所有锁获取和释放均要出现在一个块结构中,若将一个大的方法声明为synchronized将会大大影响效率，典型地，若将线程类的方法run()声明为synchronized，由于在线程的整个生命期内它一直在运行，因此将导致它对本类任何synchronized方法的调用都永远不会成功。
> - Lock接口实现提供了比使用synchronized方法和语句可获得的更广泛的锁定操作。此实现允许更灵活的结构，可以具有差别很大的属性，可以支持多个相关的Condition对象。在硬件层面依赖特殊的CPU指令实现同步更加灵活。
> - ReentrantLock的lock机制有2种，忽略中断锁和响应中断锁，这给我们带来了很大的灵活性。比如：如果A、B 2个线程去竞争锁，A线程得到了锁，B线程等待，但是A线程这个时候实在有太多事情要处理，就是一直不返回，B线程可能就会等不及了，想中断自己，不再等待这个锁了，转而处理其他事情。这个时候ReentrantLock就提供了2种机制，第一，B线程中断自己（或者别的线程中断它），但是ReentrantLock不去响应，继续让B线程等待，你再怎么中断，我全当耳边风（synchronized原语就是如此）；第二，B线程中断自己（或者别的线程中断它），ReentrantLock 处理了这个中断，并且不再等待这个锁的到来，完全放弃。 
>
> **ReentrantLock相对于synchronized多了三个高级功能**：
>
> 1. 等待可中断
> 在持有锁的线程长时间不释放锁的时候,等待的线程可以选择放弃等待.
> tryLock(long timeout, TimeUnit unit)
>
> 2. 公平锁
> 按照申请锁的顺序来一次获得锁称为公平锁.synchronized的是非公平锁,ReentrantLock可以通过构造函数实现公平锁.
> new RenentrantLock(boolean fair)
> 公平锁和非公平锁。这2种机制的意思从字面上也能了解个大概：即对于多线程来说，公平锁会依赖线程进来的顺序，后进来的线程后获得锁。而非公平锁的意思就是后进来的锁也可以和前边等待锁的线程同时竞争锁资源。对于效率来讲，当然是非公平锁效率更高，因为公平锁还要判断是不是线程队列的第一个才会让线程获得锁。
>
> 3. 绑定多个Condition
> 通过多次newCondition可以获得多个Condition对象,可以简单的实现比较复杂的线程同步的功能.
> 
> **synchronized和lock的用法与区别：**  
> 1. synchronized是托管给JVM执行的，而Lock是Java写的控制锁的代码。  
> 2. synchronized原始采用的是CPU悲观锁机制，即线程获得的是独占锁。独占锁意味着其他线程只能依靠阻塞来等待线程释放锁。而在CPU转换线程阻塞时会引起线程上下文切换，当有很多线程竞争锁的时候，会引起CPU频繁的上下文切换导致效率很低。   
> 3. Lock用的是乐观锁方式。每次不加锁而是假设没有冲突而去完成某项操作，如果因为冲突失败就重试，直到成功为止。 
> 4. ReentrantLock必须在finally中释放锁，否则后果很严重，编码角度来说使用synchronized更加简单，不容易遗漏或者出错。 
> 5. ReentrantLock提供了可轮询的锁请求，他可以尝试的去取得锁，如果取得成功则继续处理，取得不成功，可以等下次运行的时候处理，所以不容易产生死锁，而synchronized则一旦进入锁请求要么成功，要么一直阻塞，所以更容易产生死锁。 
> 6. synchronized的话，锁的范围是整个方法或synchronized块部分；而Lock因为是方法调用，可以跨方法，灵活性更大


##### 锁的等级：方法锁、对象锁、类锁。

> synchronized用来处理多个线程同时访问同一个类的一个代码块、方法，甚至这个类。 
>（1）修饰代码块时，需要一个reference对象作为锁的对象。  
>（2）修饰方法时，默认是当前对线作为锁的对象。  
>（3）修饰类时，默认是当前类的Class对象作为锁的对象。  
> 当一个对象中有同步方法或者同步块，线程调用此对象进入该同步区域时，必须获得对象锁。如果此对象的对象锁被其他调用者占用，则进入阻塞队列，等待此锁被释放（同步块正常返回或者抛异常终止，由JVM自动释放对象锁）。
> 注意，方法锁也是一种对象锁。当一个线程访问一个带synchronized方法时，由于对象锁的存在，所有加synchronized的方法都不能被访问（前提是在多个线程调用的是同一个对象实例中的方法）。


##### 写出生产者消费者模式。

> null

##### ThreadLocal的设计理念与作用。

> 同步机制是为了同步多个线程对相同资源的并发访问，是为了多个线程之间进行通信的有效方式；而ThreadLocal是隔离多个线程的数据共享，从根本上就不在多个线程之间共享资源（变量），这样当然不需要对多个线程进行同步了。
> 所以，如果你需要进行多个线程之间进行通信，则使用同步机制；如果需要隔离多个线程之间的共享冲突，可以使用ThreadLocal，
> 这将极大地简化我们的程序，使程序更加易读、简洁。


##### ThreadPool用法与优势。

> 合理利用线程池能够带来三个好处。
> 第一：降低资源消耗。通过重复利用已创建的线程降低线程创建和销毁造成的消耗。
> 第二：提高响应速度。当任务到达时，任务可以不需要等到线程创建就能立即执行。
> 第三：提高线程的可管理性。
> 线程是稀缺资源，如果无限制的创建，不仅会消耗系统资源，还会降低系统的稳定性，使用线程池可以进行统一的分配，调优和监控。但是要做到合理的利用线程池，必须对其原理了如指掌。
> 
> 可以通过调用线程池的shutdown或shutdownNow方法来关闭线程池,它们的原理是遍历线程池中的工作线程，
> 然后逐个调用线程的interrupt方法来中断线程，所以无法响应中断的任务可能永远无法终止。但是它们存在一定的区别，
> shutdownNow首先将线程池的状态设置成STOP，然后尝试停止所有的正在执行或暂停任务的线程，
> 并返回等待执行任务的列表，而shutdown只是将线程池的状态设置成SHUTDOWN状态，然后中断所有没有正在执行任务的线程


##### Concurrent包里的其他东西：ArrayBlockingQueue、CountDownLatch等等。

> - CyclicBarrier.当所有等待的线程到达障栅后，才能继续向下运行。如一组数拆分n组排序，则要等这n组拍完后再合并，则每部分都排好了，可并行执行。
> - CountDownLatch（int count），带计数开关的门，只有在门前等待的线程达到一定数量，门才会打开，线程才会执行。


##### wait()和sleep()的区别。

> 1、这两个方法来自不同的类分别是，sleep来自Thread类，和wait来自Object类。
> 2、最主要是sleep方法没有释放锁，而wait方法释放了锁，使得其他线程可以使用同步控制块或者方法。
> sleep不出让系统资源；wait是进入线程等待池等待，出让系统资源，其他线程可以占用CPU。一般wait不会加时间限制，因为如果wait线程的运行资源不够，再出来也没用，要等待其他线程调用notify/notifyAll唤醒等待池中的所有线程，才会进入就绪队列等待OS分配系统资源。sleep(milliseconds)可以用时间指定使它自动唤醒过来，如果时间不到只能调用interrupt()强行打断。
> Thread.Sleep(0)的作用是“触发操作系统立刻重新进行一次CPU竞争
> 3、使用范围：wait，notify和notifyAll只能在同步控制方法或者同步控制块里面使用，而sleep可以在任何地方使用 
> 4、sleep必须捕获异常，而wait，notify和notifyAll不需要捕获异常


##### foreach与正常for循环效率对比。

> foreach 必须实现iterable接口，里面做了更多操作，相比于for效率要低一些。


##### Java IO与NIO。
> 
> NIO即New IO，这个库是在JDK1.4中才引入的。
> NIO和IO有相同的作用和目的，但实现方式不同，NIO主要用到的是块，所以NIO的效率要比IO高很多。
> 在Java API中提供了两套NIO，一套是针对标准输入输出NIO，另一套就是网络编程NIO。
> 主要区别：
> ```
 | io     | nio      |
 |:------:|:--------:|
 | 面向流 | 面向缓冲 |
 | 阻塞IO | 非阻塞IO |
 | 无     | 选择器   |
> ```


##### 反射的作用于原理。

> null

##### 泛型常用特点，`List<String>`能否转为`List<Object>`。

> 不能。
> 泛型只对编译器可见，对JVM不可见，JVM所看到的都是Object对象。
> 类型安全是由编译器保证的。类型的隐式转换也是由编译器做的（在编译后的字节码中在get泛型值的时候自动加上了转换语句）
> `List<?>` 和`List<Object>`的区别：前者可以被`List<String>`或`List<Number>`等赋值，而后者不可以。


##### Java1.7与1.8新特性。

> **1.7新特性**：
> - switch语句中支持使用字符串了
> - 支持 `List tempList = new ArrayList<>()`的声明方式，其实是泛型实例化类型自动推断。
> - 提供自定义关闭类的接口，实现AutoCloseable ，就可以在类销毁的时候自动关闭一些资源。
> - char值可以进行equals比较
> - boolean值支持反转和位运算
> - File System.* 增加了很多get环境信息的工具方法
> - try catch支持捕获多个异常，竖线分割异常即可
> - try块中使用的资源可以不用手动在finally中关闭
> - 安全的加减乘除操作 
> - 所有整数int、short、long、byte都可以用二进制表示，用0b开头，例如：byte aByte = (byte) 0b00100001;
> - Try-with-resource语句
> - 数字类型的下划线表示 更友好的表示方式，不过要注意下划线添加的一些标准。
> - 泛型实例的创建可以通过类型推断来简化 可以去掉后面new部分的泛型类型，只用<>就可以了。
> - 并发工具增强： fork-join框架最大的增强，充分利用多核特性，将大问题分解成各个子问题，由多个cpu可以同时解决多个子问题，最后合并结果，继承RecursiveTask，实现compute方法，然后调用fork计算，最后用join合并结果。
>
> **1.8特性**：
> - lambda表达式
> - 方法与构造函数引用
> - 新的日期时间 API
> - Base64编码成为了Java类库的标准。Base64类同时还提供了对URL、MIME友好的编码器与解码器
> - JavaScript引擎Nashorn：Nashorn允许在JVM上开发运行JavaScript应用，允许Java与JavaScript相互调用
> - Stream API是把真正的函数式编程风格引入到Java中。实现了链式编程。
> - 引入Optional类来防止空指针异常
> - Java 8扩展了注解的上下文，几乎可以为任何东西添加注解，包括局部变量、泛型类、父类与接口的实现，连方法的异常也能添加注解
> - 支持对数组进行并行处理，主要是parallelSort()方法，它可以在多核机器上极大提高数组排序的速度
> - Java 8将方法的参数名加入了字节码中，这样在运行时通过反射就能获取到参数名，只需要在编译时使用-parameters参数
> - 优化了hashmap以及concurrenthashmap.[Link](http://www.cnblogs.com/aspirant/p/8623864.html)
> - IO升级NIO。[Link](http://www.cnblogs.com/aspirant/p/8630283.html)


##### 设计模式：单例、工厂、适配器、责任链、观察者等等。

> null

##### JNI的使用。

> null

---
## JVM  

##### 内存模型以及分区，需要详细到每个区放什么。

> null

##### 堆里面的分区：Eden，survival from to，老年代，各自的特点。

> - 为什么要区分新生代和老生代？ 
> 堆中区分的新生代和老年代是为了垃圾回收，新生代中的对象存活期一般不长，而老年代中的对象存活期较长，所以当垃圾回收器回收内存时，新生代中垃圾回收效果较好，会回收大量的内存，而老年代中回收效果较差，内存回收不会太多。

> - 不同代采用的算法区别？ 
> 基于以上特性，新生代中一般采用复制算法，因为存活下来的对象是少数，所需要复制的对象少，而老年代对象存活多，不适合采用复制算法，一般是标记整理和标记清除算法。 
> 因为复制算法需要留出一块单独的内存空间来以备垃圾回收时复制对象使用，所以将新生代分为eden区和两个survivor区，每次使用eden和一个survivor区，另一个survivor作为备用的对象复制内存区。


##### 对象创建方法，对象的内存分配，对象的访问定位。

> null

##### GC的两种判定方法：引用计数与引用链。

> null

##### GC的三种收集方法：标记清除、标记整理、复制算法的原理与特点，分别用在什么地方，如果让你优化收集方法，有什么思路？

> null

##### GC收集器有哪些？CMS收集器与G1收集器的特点。

> null

##### Minor GC与Full GC分别在什么时候发生？

> null

##### 几种常用的内存调试工具：jmap、jstack、jconsole。

> null

##### 类加载的五个过程：加载、验证、准备、解析、初始化。

> null

##### 双亲委派模型：Bootstrap ClassLoader、Extension ClassLoader、ApplicationClassLoader。

> link:https://www.cnblogs.com/wxd0108/p/6681618.html
> 首先，先要知道什么是类加载器。简单说，类加载器就是根据指定全限定名称将class文件加载到JVM内存，转为Class对象。如果站在JVM的角度来看，只存在两种类加载器:
> - 启动类加载器（Bootstrap ClassLoader）：由C++语言实现（针对HotSpot）,负责将存放在<JAVA_HOME>\lib目录或-Xbootclasspath参数指定的路径中的类库加载到内存中。
> - 其他类加载器：由Java语言实现，继承自抽象类ClassLoader。如：
>   - 扩展类加载器（Extension ClassLoader）：负责加载<JAVA_HOME>\lib\ext目录或java.ext.dirs系统变量指定的路径中的所有类库。
>   - 应用程序类加载器（ApplicationClassLoader）。负责加载用户类路径（classpath）上的指定类库，我们可以直接使用这个类加载器。一般情况，如果我们没有自定义类加载器默认就是用这个加载器
>
> 自定义类加载器使用场景：
>
> 1)加密:java代码可以轻易的被反编译,如果你需要对你的代码进行加密以防止反编译,可以先将编译后的代码用加密算法加密,类加密后就不能再使用java自带的类加载器了,这时候就需要自定义类加载器.
> 2)从非标准的来源加载代码:字节码是放在数据库,甚至是云端,就可以自定义类加载器,从指定来源加载类.
>
> 如果不想打破双亲委派模型，那么只需要重写findClass方法，如果想打破双亲委派模型，那么就重写整个loadClass方法
>
> defineClass作用：将一个字节数组转为Class对象，这个字节数组是class文件读取后最终的字节数组。如，假设class文件是加密过的，则需要解密后作为形参传入defineClass函数
>

##### 分派：静态分派与动态分派。

> null

---
## 操作系统

##### 进程和线程的区别。

> null

##### 死锁的必要条件，怎么处理死锁。

> null

##### Window内存管理方式：段存储，页存储，段页存储。

> null

##### 进程的几种状态。

> null

##### IPC几种通信方式。

> null

##### 什么是虚拟内存。

> null

##### 虚拟地址、逻辑地址、线性地址、物理地址的区别。

> null

---
## TCP/IP

##### OSI与TCP/IP各层的结构与功能，都有哪些协议。

> null

##### TCP与UDP的区别。

> null

##### TCP报文结构。

> null

##### TCP的三次握手与四次挥手过程，各个状态名称与含义，TIMEWAIT的作用。

> null

##### TCP拥塞控制。

> null

##### TCP滑动窗口与回退N针协议。

> null

##### Http的报文结构。

> null

##### Http的状态码含义。

> null

##### Http request的几种类型。

> null

##### Http怎么处理长连接。

> null

##### Cookie与Session的作用于原理。

> null

##### 电脑上访问一个网页，整个过程是怎么样的：DNS、HTTP、TCP、OSPF、IP、ARP。

> null

##### Ping的整个过程。ICMP报文是什么。

> null

##### C/S模式下使用socket通信，几个关键函数。

> null

##### IP地址分类。

> null

##### 路由器与交换机区别。

> null

---
## 数据结构与算法

##### 链表与数组。

> null

##### 队列和栈，出栈与入栈。

> null

##### 链表的删除、插入、反向。

> null

##### 字符串操作。

> null

##### Hash表的hash函数，冲突解决方法有哪些。

> null

##### 各种排序：冒泡、选择、插入、希尔、归并、快排、堆排、桶排、基数的原理、平均时间复杂度、最坏时间复杂度、空间复杂度、是否稳定。

> null

##### 快排的partition函数与归并的Merge函数。

> null

##### 对冒泡与快排的改进。

> null

##### 二分查找，与变种二分查找。

> null

##### 二叉树、B+树、AVL树、红黑树、哈夫曼树。

> null

##### 二叉树的前中后续遍历：递归与非递归写法，层序遍历算法。

> null

##### 图的BFS与DFS算法，最小生成树prim算法与最短路径Dijkstra算法。

> null

##### KMP算法。

> null

##### 排列组合问题。

> null

##### 动态规划、贪心算法、分治算法。（一般不会问到）

> null

##### 大数据处理：类似10亿条数据找出最大的1000个数………等等

> null

---

## mysql

#### mysql常见索引
> **1.主键索引：**当一张表，把某个列设为主键的时候，则该列就是主键索引，可以在创建表添加`create table TT(id int primary key)`，也可以在表创建完成之后添加`alter table table_name add primary key (column name);`
> **2.普通索引:**普通索引一般是在建表后再添加的`create index 索引名 on table_name(column1,column2);`或者`alter table table_name add index 索引名(column1,column2);`
> **3.唯一索引:**`create table TT(id int primary key auto_increment , name varchar(32) unique)`，TT表中name就是唯一索引，唯一索引可以有多个null,不能是重复的内容，相比主键索引，主键字段不能为null，也不能重复
> **4.全文索引:**首先，全文索引主要针对文本文件，比如文章，标题，全文索引只有MyISAM有效(mysql5.6之后InnoDB也支持了全文索引)
>
```mysql
create table TT(  
	 id int primary key auto_increment ,  
	 title varchar(20),  
	 content text,  
	 fulltext(title,content)  
)engine=InnoDB charset=utf8;  
```
> **使用全文索引常见的错误：**  
> `select * from TT where content like "%mysql%";`  
> 这里并不会使用全文索引，可以用explain进行查看。正确用法：  
> `select *  from TT where match(title,content) against ('MYSQL');`

#### mysql索引机制
> 1.为什么我们添加完索引后查询速度为变快？  
> 传统的查询方法，是按照表的顺序遍历的，不论查询几条数据，mysql需要将表的数据从头到尾遍历一遍,在我们添加完索引之后，mysql一般通过BTREE算法生成一个索引文件，在查询数据库时，找到索引文件进行遍历(折半查找大幅查询效率)，找到相应的键从而获取数据   
> 2.索引的代价  
> 创建索引是为产生索引文件的，占用磁盘空间,索引文件是一个二叉树类型的文件，可想而知我们的dml操作同样也会对索引文件进行修改，所以性能会下降

#### 在哪些column上使用索引
> 1.较频繁的作为查询条件字段应该创建索引 
> 2.唯一性太差的字段不适合创建索引，尽管频繁作为查询条件，例如gender性别字段
> 3.更新非常频繁的字段不适合作为索引
> 4.不会出现在where子句中的字段不该创建索引
> 总结: 满足以下条件的字段，才应该创建索引.
> *a: 肯定在where条经常使用 b: 该字段的内容不是唯一的几个值 c: 字段内容不是频繁变化*

#### 索引使用注意事项
> 1.对于创建的多列索引，只要查询条件使用了最左边的列，索引一般就会被使用。比如我们对title,content 添加了复合索引  
> `select * from table_name where title = 'test';`会用到索引  
> `select * from table_name where content = 'test';`不会用到索引  
> 2.对于使用like的查询，查询如果是 ‘%a’不会使用到索引 ,而 like 'a%'就会用到索引。最前面不能使用%和_这样的变化值  
> 3.如果条件中有or，即使其中有条件带索引也不会使用。  
> 4.如果列类型是字符串，那一定要在条件中将数据使用引号引用起来。  
 
#### 如何查看索引使用的情况
> `show status like‘Handler_read%’;`  
> 注意：   
> handler_read_key:这个值越高越好，越高表示使用索引查询到的次数。  
> handler_read_rnd_next:这个值越高，说明查询低效。  
 
## 其他

> 使用AtomicInteger是非常的安全的.而且因为AtomicInteger由硬件提供原子操作指令实现的。在非激烈竞争的情况下，开销更小，速度更快。

下面贴一段最简单的RPC框架，麻雀虽小，五脏俱全
```java
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
public class RpcFramework{
    public static void servicePublish(Object interfaceImplClass, int port) throws IOException, ClassNotFoundException, InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        ServerSocket serverSocket = new ServerSocket();
        serverSocket.bind(new InetSocketAddress(port));
        while(true){
            Socket socket = serverSocket.accept();
            ObjectOutputStream outputStream = new ObjectOutputStream(socket.getOutputStream());
            ObjectInputStream inputStream = new ObjectInputStream(socket.getInputStream());
            String methodName = inputStream.readUTF();
            Class<?>[] argTypes = (Class<?>[])inputStream.readObject();
            Object[] args = (Object[])inputStream.readObject();
            Method method = interfaceImplClass.getClass().getMethod(methodName, argTypes);
            Object result =  method.invoke(interfaceImplClass, args);
            outputStream.writeObject(result);
            outputStream.close();
            inputStream.close();
            socket.close();
        }
    }
    public static Object clientProxy(Class interfaceClass, String hostname, int port){
        return Proxy.newProxyInstance(interfaceClass.getClassLoader(), new Class[] {interfaceClass},
                new InvocationHandler(){
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        Socket socket = new Socket();
                        socket.connect(new InetSocketAddress(hostname, port));
                        ObjectOutputStream outputStream = new ObjectOutputStream(socket.getOutputStream());
                        ObjectInputStream inputStream = new ObjectInputStream(socket.getInputStream());
                        outputStream.writeUTF(method.getName());
                        outputStream.writeObject(method.getParameterTypes());
                        outputStream.writeObject(args);
                        Object result = inputStream.readObject();
                        outputStream.close();
                        inputStream.close();
                        return result;
                    }
                });
    }
}
```




