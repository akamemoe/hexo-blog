---
title: PostgreSQL和MySQL之间的比较
date: 2018-07-03 22:08:59
tags: [sql]
---

对比表如下：

|features|PostgreSQL|MySQL|
|:----|:----|:----|
|Known as|The world’s most *advanced* open source database|The world’s most *popular* open source database|
|Development|PostgreSQL is an open source *project*|MySQL is an open-source *product*|
|Pronunciation|post gress queue ell|my ess queue ell|
|Licensing|MIT-style license|GNU General Public License|
|Implementation programming language|C|C/C++|
|GUI tool|PgAdmin|MySQL Workbench|
|ACID|Yes|Yes|
|Storage engine|*Single* storage engine|Multiple [storage engines](http://www.mysqltutorial.org/understand-mysql-table-types-innodb-myisam.aspx) e.g., InnoDB and MyISAM|
|Full-text search|Yes|Yes|
|Drop a [temporary table](http://www.postgresqltutorial.com/postgresql-temporary-table/)|No `TEMP` or `TEMPORARY` keyword in `DROP TABLE` statement|MySQL supports the `TEMP` or `TEMPORARY` keyword in the `DROP TABLE` statement that allows you to remove the temporary table only.|
|[`DROP TABLE`](http://www.postgresqltutorial.com/postgresql-drop-table/)|Support `CASCADE` option to drop table’s dependent objects e.g., tables, views, etc.|Does not support `CASCADE` option|
|[`TRUNCATE TABLE`](http://www.postgresqltutorial.com/postgresql-truncate-table/)|PostgreSQL `TRUNCATE TABLE` supports more features like `CASCADE`, `RESTART IDENTITY`, `CONTINUE IDENTITY`, transaction-safe, etc.|[MySQL `TRUNCATE TABLE`](http://www.mysqltutorial.org/mysql-truncate-table/) does not support `CASCADE` and transaction safe i.e,. once data is deleted, it cannot be rolled back.|
|Auto increment Column|[`SERIAL`](http://www.postgresqltutorial.com/postgresql-serial/)|[`AUTO_INCREMENT`](http://www.mysqltutorial.org/mysql-sequence/)|
|Analytic functions|Yes|No|
|[Data types](http://www.postgresqltutorial.com/postgresql-data-types/)|Support many advanced types such as [array](http://www.postgresqltutorial.com/postgresql-array/), [hstore](http://www.postgresqltutorial.com/postgresql-hstore/), user-defined type, etc.|SQL-standard types|
|Unsigned [integer](http://www.postgresqltutorial.com/postgresql-integer/)|No|Yes|
|[Boolean type](http://www.postgresqltutorial.com/postgresql-boolean/)|Yes|Use `TINYINT(1)` internally for [Boolean](http://www.mysqltutorial.org/mysql-boolean/)|
|IP address data type|Yes|No|
|Set default value for a column|Support both constant and function call|Must be a constant or `CURRENT_TIMESTAMP` for `TIMESTAMP` or `DATETIME` columns|
|CTE|Yes|No|
|`EXPLAIN` output|More detailed|Less detailed|
|[Materialized views](http://www.postgresqltutorial.com/postgresql-materialized-views/)|Yes|No|
|[CHECK constraint](http://www.postgresqltutorial.com/postgresql-check-constraint/)|Yes|No (MySQL ignores the [CHECK constraint](http://www.mysqltutorial.org/mysql-check-constraint/))|
|Table inheritance|Yes|No|
|Programming languages for [stored procedures](http://www.postgresqltutorial.com/postgresql-stored-procedures/)|Ruby, Perl, Python, TCL, PL/pgSQL, SQL, JavaScript, etc.|SQL:2003 syntax for [stored procedures](http://www.mysqltutorial.org/mysql-stored-procedure-tutorial.aspx)|
|[`FULL OUTER JOIN`](http://www.postgresqltutorial.com/postgresql-full-outer-join/)|Yes|No|
|[`INTERSECT`](http://www.postgresqltutorial.com/postgresql-intersect/)|Yes|No|
|[`EXCEPT`](http://www.postgresqltutorial.com/postgresql-tutorial/postgresql-except/)|Yes|No|
|Partial indexes|Yes|No|
|Bitmap indexes|Yes|No|
|Expression indexes|Yes|No|
|Covering indexes|Yes (since version 9.2)|Yes. MySQL supports covering indexes that allow data to be retrieved by scanning the index alone without touching the table data. This is advantageous with large tables with millions of rows.|
|Common table expression (CTE)|Yes|No|
|[Triggers](http://www.postgresqltutorial.com/postgresql-triggers/)|Support triggers that can fire on most types of command, except for ones affecting the database globally e.g.,roles and tablespaces.|Limited to some commands|
|Partitioning|RANGE, LIST|RANGE, LIST, HASH, KEY, and composite partitioning using a combination of RANGE or LIST with HASH or KEY subpartitions|
|Task Schedule|pgAgent|[Scheduled event](http://www.mysqltutorial.org/mysql-triggers/working-mysql-scheduled-event/)|
|Connection Scalability|Each new connection is an OS process|Each new connection is an OS thread|
