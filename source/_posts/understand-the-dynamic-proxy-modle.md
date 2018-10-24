---
title: 理解java中的动态代理
date: 2016-04-14 02:13:29
tags: java
---
假设老板有个服务：用户说他自己的名字(xxx)。服务要对其说hello xxx.
老板便买了个机器人来执行这个服务。

那么我们先定义一个服务类型接口：

```java
interface HelloService{
    String sayHello(String name);
}
```

然后我们让机器人实现这个服务类：

```java
class Robot implements HelloService{
    @Override
    public String sayHello(String name) {
        return "hello " + name;
    }
}
```

然后我们用这个服务类去服务他人：

```java
public class Demo {
    public static void main(String[] args) {
        Robot robot = new Robot();
        System.out.println(robot.sayHello("zhangsan"));     
    }
}
```

输出：

```bash
hello zhangsan
```

不错，这样写没有问题。但是，新的问题来了。有个用户lisi，老板不喜欢lisi。老板不会修改机器人，又希望当lisi来用这个服务的时候机器人对他说bye。该怎么办？

老板想到用代理来解决这个问题。找个保安代理机器人。当lisi 来的时候，不让机器人说话，自己冒充机器人声音说bye lisi。

逻辑说通了，那么我们现在来实现这个逻辑。

先写这个保安的逻辑：

```java
class ProxyHandler implements InvocationHandler{
    private Object robot;
    //想让保安代理机器人那就要把机器人交给他。这个object将来存机器人
    public ProxyHandler(Object robot) {
        this.robot= robot;  
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args)throws Throwable {
        if("lisi".equals(args[0])){
            //当参数为lisi的时候，老板不喜欢lisi，那就改为对其说bye bye
            String rs = (String) method.invoke(robot, args);
            System.out.println("the robot return value:"+rs);
            return "bye " + args[0];
        }
        //其他时候正常返回机器人说的话
        return method.invoke(robot, args);

    }
}
```

接下来我们让保安和机器和为一体。

```java
Robot robot = new Robot();
//构造保安的时候将机器人传入
ProxyHandler baoan = new ProxyHandler(robot);
//proxy为保安和机器一体化的对象
HelloService proxy = (HelloService) Proxy.newProxyInstance(
                robot.getClass().getClassLoader(),
                robot.getClass().getInterfaces(), 
                baoan);
```

接下来我们测试下结果是不是我们预期的。

```java
//输出：hello zhangsan
System.out.println(proxy.sayHello("zhangsan"));
//本来应该输出:hello lisi,但是由于我们的保安改变了返回值。所以实际输出：bye lisi
System.out.println(proxy.sayHello("lisi"));
```

完整代码：

```java
public class Demo {
    public static void main(String[] args) {

//      Robot robot = new Robot();
//      System.out.println(robot.sayHello("xxx"));

        Robot robot = new Robot();
        ProxyHandler baoan = new ProxyHandler(robot);
        HelloService proxy = (HelloService) Proxy.newProxyInstance(
                robot.getClass().getClassLoader(),
                robot.getClass().getInterfaces(), 
                baoan);
        //输出：hello zhangsan
        System.out.println(proxy.sayHello("zhangsan"));
        //本来应该输出:hello lisi,但是由于我们的保安改变了返回值。所以实际输出：bye lisi
        System.out.println(proxy.sayHello("lisi"));

    }
}
interface HelloService{
    String sayHello(String name);
}
class Robot implements HelloService{
    @Override
    public String sayHello(String name) {
        return "hello " + name;
    }
}
class ProxyHandler implements InvocationHandler{
    private Object robot;
    public ProxyHandler(Object target) {
        this.robot = target;    
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args)throws Throwable {
        if("lisi".equals(args[0])){
            String rs = (String) method.invoke(robot, args);
            System.out.println("the robot return value:"+rs);
            return "bye " + args[0];
        }
        return method.invoke(robot, args);

    }
}
```

希望读者看完后可以理解为什么使用代理和如何使用代理。

