---
title: Client/Server UDP通信-java
date: 2015-03-14 15:43:27
tags: java
---

**Client端代码：**
```java
import java.net.*;  
import java.io.*;  
public class UDPClient{  
    public static void main(String args[]){  
        DatagramSocket socket = null;  
        DatagramPacket packet = null;  
        InetAddress address = null;  
        String s = "send the data , please !";  
        byte buf[] = new byte[256];  
        buf = s.getBytes();  
        byte ip[] = {(byte)127,(byte)0,(byte)0,(byte)1};  
        try{  
            address = InetAddress.getByAddress(ip);  
            socket = new DatagramSocket();  
            packet = new DatagramPacket(buf,buf.length,address,1080);  
            socket.send(packet);  
            Thread.sleep(2000);  
            packet = new DatagramPacket(buf,buf.length);  
            socket.receive(packet);  
            s = new String(packet.getData());  
            System.out.println("received data is :"+s);  
        }catch(Exception e){  
            System.out.println(e.toString());  
        }  
        socket.close();  
    }  
}  
```

**Server端代码：**

```java
import java.net.*;  
import java.io.*;  
import java.util.*;  
public class UDPSever{  
    public static void main(String args[]){  
        DatagramSocket socket1=null;  
        DatagramPacket packet1=null;  
        String s1;  
        byte buf1[]= new byte[256];  
        InetAddress address1 = null;  
        int port1;  
        Date date1;  
        try{  
            socket1 = new DatagramSocket(1080);  
            packet1 = new DatagramPacket(buf1,buf1.length);  
            socket1.receive(packet1);  
            s1=new String(packet1.getData());  
            System.out.println("received request:"+s1);  
            port1 = packet1.getPort();  
            address1= packet1.getAddress();  
            date1 = new Date();  
            s1 = date1.toString();  
            buf1= s1.getBytes();  
            packet1= new DatagramPacket(buf1,buf1.length,address1,port1);  
            socket1.send(packet1);  
            Thread.sleep(2000);  
        }catch(Exception e){  
            System.out.println(e.toString());  
        }  
        socket1.close();  
    }  
}  
```

如果把这IP地址改改。就可以做简单的网络通信。
网络编程刚接触，慢慢学习。