---
title: java编译常量和运行时常量
date: 2017-02-15 22:43:20
tags: [java,note]
---

看下面一段代码：
```java
public class Test1 {
    public static void main(String args[]){
        System.out.println(FinalTest.x);
    }
}

class FinalTest{
    public static final int x =6/3;
    static {
        System.out.println("FinalTest static block");
    }
}
```

上面和下面的例子大家对比下，然后自己看看输出的是什么？
<!--more-->

```java
public class Test2 {
    public static void main(String args[]){
        System.out.println(FinalTest2.x);
    }
}
class FinalTest2{

    public static final int x =new Random().nextInt(100);
    static {
        System.out.println("FinalTest2 static block");
    }
}
```

实际测试的结果是：
第一个输出的是
```
2
```
第二个输出的是
```
FinalTest2 static block
61（随机数）
```

为何会出现这样的结果呢？
参考上面的Tips2和Tips3，第一个能够在编译时期确定的，叫做编译常量；第二个是运行时才能确定下来的，叫做运行时常量。编译常量不会引起类的初始化，而运行常量就会。

```java
public class Singleton {
    private static Singleton singleton = new Singleton();
    public static int counter1;
    public static int counter2 = 0;

    private Singleton() {
        counter1++;
        counter2++;
    }

    public static Singleton getSingleton() {
        return singleton;
    }

}
```

下面是我们的测试类TestSingleton

```java
public class TestSingleton {
    public static void main(String args[]){
        Singleton singleton = Singleton.getSingleton();
        System.out.println("counter1="+singleton.counter1);
        System.out.println("counter2="+singleton.counter2);
    }
}
```

输出是：

```
counter1=1
counter2=0

```
