---
title: 正则表达式复习
date: 2016-08-04 15:18:01
tags: regex
---

```java
import java.util.*;  
import java.util.regex.*;  
class Regex   
{  
    public static void main(String[] args)   
    {  
          
        test3();  
    }  
    public static void test3(){//邮箱匹配  
        String mail = "addf12@sina.com";  
        String regex = "[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\\.[a-zA-Z]{2,3}";  
        System.out.println(mail.matches(regex));  
    }  
    public static void test2(){//ip地址排序  
        String ip_str = "10.21.130.111   12.210.15.1  15.12.12.1   152.152.15.151   13.151.15.1";  
        ip_str = ip_str.replaceAll("(\\d+)","00$1");//补齐0  
        System.out.println(ip_str);  
  
        ip_str = ip_str.replaceAll("0*(\\d{3})","$1");//去掉多余的0  
        System.out.println(ip_str);  
        //用TreeSet排序。  
  
        String[] ips = {"10.21.130.111","12.210.15.1","15.12.12.1","152.152.15.151","13.151.15.1"};  
          
    }  
    public static void test1(){//治疗口吃  
        String str = "我我我我....我我我...要.要.要要要要..学学学学....学编编编...编编程..程...程程....程程";  
        str = str.replaceAll("\\.+","");  
        System.out.println(str);  
        str = str.replaceAll("(.)\\1+","$1");  
        System.out.println(str);  
  
    }  
    public static void f4(){//huo qu  
        String str = "da jia hao ,ming tian bu fang jia!";  
        /* 
        将正则规则进行对象的封装 
        Pattern p = Pattern.compile("a*b"); 
        通过正则对象的matcher方法与字符创串相关联、获取要对字符串操作的匹配器对象Matcher 
        Matcher m = p.matcher("aaaaab"); 
        通过Matcher匹配器对象的方法对字符串进行操作 
        boolean b = m.matches(); 
        */  
        String regex = "\\b[a-z]{3}\\b";  
        Pattern p = Pattern.compile(regex);  
        Matcher m = p.matcher(str);  
        while(m.find()){  
            System.out.print(m.group());System.out.println(m.start()+":"+m.end());  
        }  
        /* 
        jia 
        hao 
        jia 
        */  
  
    }  
    public static void f3(){//ti huan   
        String str = "xiaoqiangttttzhangsanmmmmmzhaoliu";  
        str = str.replaceAll("(.)\\1+","$1");  
        System.out.println(str);  
        String tel = "15700001111";  
        tel = tel.replaceAll("(\\d{3})(\\d{4})(\\d{4})","$1****$3");  
        System.out.println(tel);//157****1111  
    }  
    public static void f2(){//fen ge  
        String str = "xiaoqiangttttzhangsanmmmmmzhaoliu";  
        String[] name = str.split("(.)\\1+");  
        for(String s:name){  
            System.out.println(s);  
        }  
    }  
    public static void f1(){//pi pei  
        String regex = "1[358]\\d{9}";  
        String s = "211215121";  
        Scanner sc = new Scanner(System.in);  
        while((s=sc.nextLine())!=null){  
            System.out.println(s.matches(regex));  
        }  
    }  
}  
```
