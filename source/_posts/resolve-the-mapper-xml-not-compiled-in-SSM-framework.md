---
title: 解决SSM框架下mapper.xml不被编译的问题
date: 2016-07-19 10:22:56
tags: java
---

我在MyEclipse中完整的可以运行的项目完整复制到idea中,运行却报:`org.apache.ibatis.binding.BindingException: Invalid bound statement (not found):com.gentlehu.diary.mapper.DiaryMapper.findDiaryById(id);`

找了好久，发现在idea生成的classes中确实没有DiaryMapper.xml文件。

在MyEclipse中可以运行是因为MyEclipse中建立的是目录(src/main/java)的属性是资源目录，所以MyEclipse识别了这个属性会自动把这个目录的所有内容编译生成在classes中。而在IDEA中目录是普通属性，所以它的（src/main/java）目录中的只有.java文件会默认编译，.xml文件不会被编译。所以需要在maven的pom.xml中配置一下节点。

```xml
<project>  
        ......  
        <build>  
            <resources>  
        <resource>  
            <directory>src/main/java</directory>  
                <includes>  
                    <include>**/*.xml</include>  
                </includes>  
                <filtering>true</filtering>  
            </resource>  
        </resources>  
        </build>  
</project>  
```
然后IDEA才会编译.xml文件。	
做个笔记，方便以后查询。