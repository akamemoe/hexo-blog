---
title: mysql把结果输出到文件
date: 2015-08-14 20:55:07
tags: mysql
---

基本语法：
```sql
select * from table_name into outfile "/home/alisa/result.txt"
```

如果是远程连接的话可以用`mysql -e`
```sql
mysql -uroot -proot -P3310 -h10.1.2.3 dbname -e "select * from rank" > /home/a.txt  
```

如果需要将所有输出都输出到指定文件就需要用tee命令：
```
mysql> tee /home/output.txt
mysql> select * from table;
mysql> exit
```