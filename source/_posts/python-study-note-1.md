---
title: python学习笔记-1
date: 2016-12-20 14:43:28
tags: [python,note]
---


### **1.编码**  

- 对于单个字符的编码，Python提供了ord()函数获取字符的整数表示，chr()函数把编码转换为对应的字符：  
- 要注意区分'ABC'和b'ABC'，前者是str，后者虽然内容显示得和前者一样，但bytes的每个字符都只占用一个字节。  
- 以Unicode表示的str通过encode()方法可以编码为指定的bytes，例如：  
<!--more-->

        >>>'ABC'.encode('ascii')
        b'ABC'
        >>>'中文'.encode('utf-8')
        b'\xe4\xb8\xad\xe6\x96\x87'
        '中文'.encode('ascii')
        Traceback (most recent call last):
          File "<stdin>", line 1, in <module>
        UnicodeEncodeError: 'ascii' codec can't encode characters in position 0-1: ordinal not in range(128)

- 反过来，如果我们从网络或磁盘上读取了字节流，那么读到的数据就是bytes。要把bytes变为str，就需要用decode()方法：  

        >>> b'ABC'.decode('ascii')
        'ABC'
        >>> b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
        '中文'

### **2.len()函数**

- 要计算str包含多少个字符，可以用len()函数：  

        >>> len('ABC')
        3
        >>> len('中文')
        2
- len()函数计算的是str的字符数，如果换成bytes，len()函数就计算字节数：  

        >>> len(b'ABC')
        3
        >>> len(b'\xe4\xb8\xad\xe6\x96\x87')
        6
        >>> len('中文'.encode('utf-8'))
        6
可见，1个中文字符经过UTF-8编码后通常会占用3个字节，而1个英文字符只占用1个字节。

- %s永远起作用，它会把任何数据类型转换为字符串：  

        >>> 'Age: %s. Gender: %s' % (25, True)
        'Age: 25. Gender: True'
- 可以用-1做索引，直接获取最后一个元素：  

        >>> classmates = ['Michael', 'Bob', 'Tracy']
        >>> classmates[-1]
        'Tracy'
### **3.数组**
- 往list中追加元素到末尾：`classmates.append('Adam')`  
- 把元素插入到指定的位置: `classmates.insert(1, 'Jack')`
- 要删除list末尾的元素，用pop()方法：`classmates.pop(1)`
- 要删除指定位置的元素，用pop(i)方法，其中i是索引位置：`classmates.pop(1)`
- 定义元组(tuple)`classmates = ('Michael', 'Bob', 'Tracy')`
- 定义一个只有1个元素的tuple, 必须加一个逗号,，来消除歧义：`t = (1,)`
- range(5)生成的序列是从0开始小于5的整数：  
        
        >>> list(range(5))
        [0, 1, 2, 3, 4]
- 要创建一个set，需要提供一个list作为输入集合：`s = set([1, 2, 3])`
- 通过add(key)方法可以添加元素到set中，可以重复添加，但不会有效果：  

        >>> s.add(4)
        >>> s
        {1, 2, 3, 4}
        >>> s.add(4)
        >>> s
        {1, 2, 3, 4}

- 通过remove(key)方法可以删除元素： 
 
        >>> s.remove(4)
        >>> s
        {1, 2, 3}
- set可以看成数学意义上的无序和无重复元素的集合，因此，两个set可以做数学意义上的交集、并集等操作：  

        >>> s1 = set([1, 2, 3])
        >>> s2 = set([2, 3, 4])
        >>> s1 & s2
        {2, 3}
        >>> s1 | s2
        {1, 2, 3, 4}
- 如果一个自定义函数没有写返回值。则默认返回None
###**4.定义默认参数**
- 计算x^2，所以，完全可以把第二个参数n的默认值设定为2：  

        def power(x, n=2):#注意：必选参数在前，默认参数在后，否则Python的解释器会报错
            s = 1
            while n > 0:
                n = n - 1
                s = s * x
            return s
- 先定义一个函数，传入一个list，添加一个END再返回：  

        def add_end(L=[]):
            L.append('END')
            return L
当你正常调用时，结果似乎不错：  

        >>> add_end([1, 2, 3])
        [1, 2, 3, 'END']
        >>> add_end(['x', 'y', 'z'])
        ['x', 'y', 'z', 'END']
当你使用默认参数调用时，一开始结果也是对的：  

        >>> add_end()
        ['END']
当你使用默认参数调用时，一开始结果也是对的：  

        >>> add_end()
        ['END']
但是，再次调用add_end()时，结果就不对了：  
        
        >>> add_end()
        ['END', 'END']
        >>> add_end()
        ['END', 'END', 'END']
很多初学者很疑惑，默认参数是[]，但是函数似乎每次都“记住了”上次添加了'END'后的list。  
**原因解释如下**：
Python函数在定义的时候，默认参数L的值就被计算出来了，即[]，因为默认参数L也是一个变量，它指向对象[]，每次调用该函数，如果改变了L的内容，则下次调用时，默认参数的内容就变了，不再是函数定义时的[]了。
所以，定义默认参数要牢记一点：***默认参数必须指向不变对象！***
###**4.可变参数**
- 实例  

        def calc(*numbers):
            sum = 0
            for n in numbers:
                sum = sum + n * n
            return sum
调用函数的方式可以简化成这样：  

        >>> calc(1, 2, 3)
        14
        >>> calc(1, 3, 5, 7)
        84
***注意：参数numbers接收到的是一个tuple，因此，函数代码完全不变。但是，调用该函数时，可以传入任意个参数，包括0个参数***
- Python允许你在list或tuple前面加一个*号，把list或tuple的元素变成可变参数传进去：  
        
        >>> nums = [1, 2, 3]
        >>> calc(*nums)
        14
\*nums表示把nums这个list的所有元素作为可变参数传进去。这种写法相当有用，而且很常见。
###**6.关键字参数**
- 可变参数允许你传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个tuple。而关键字参数允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict。请看示例：  

        def person(name, age, **kw):
            print('name:', name, 'age:', age, 'other:', kw)
函数person除了必选参数name和age外，还接受关键字参数kw。在调用该函数时，可以只传入必选参数：  

        >>> person('Michael', 30)
        name: Michael age: 30 other: {}
也可以传入任意个数的关键字参数：  

        >>> person('Bob', 35, city='Beijing')
        name: Bob age: 35 other: {'city': 'Beijing'}
        >>> person('Adam', 45, gender='M', job='Engineer')
        name: Adam age: 45 other: {'gender': 'M', 'job': 'Engineer'}
还可以这样简单写：  

        >>> extra = {'city': 'Beijing', 'job': 'Engineer'}
        >>> person('Jack', 24, **extra)
        name: Jack age: 24 other: {'city': 'Beijing', 'job': 'Engineer'}
注意：** extra表示把extra这个dict的所有key-value用关键字参数传入到函数的 ** kw参数，kw将获得一个dict，注意kw获得的dict是extra的一份拷贝，对kw的改动不会影响到函数外的extra。
- 要限制关键字参数的名字，就可以用命名关键字参数，例如，只接收city和job作为关键字参数。这种方式定义的函数如下：  

        def person(name, age, *, city, job):
            print(name, age, city, job)
和关键字参数 ** kw不同，命名关键字参数需要一个特殊分隔符*，*后面的参数被视为命名关键字参数。调用方式如下：  

        >>> person('Jack', 24, city='Beijing', job='Engineer')
        Jack 24 Beijing Engineer
如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不再需要一个特殊分隔符*了：  

        def person(name, age, *args, city, job):
            print(name, age, args, city, job)
*命名关键字参数必须传入参数名，这和位置参数不同。如果没有传入参数名，调用将报错*：  

        >>> person('Jack', 24, 'Beijing', 'Engineer')
        Traceback (most recent call last):
          File "<stdin>", line 1, in <module>
        TypeError: person() takes 2 positional arguments but 4 were given
###**7.参数组合**
- 在Python中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，这5种参数都可以组合使用。但是请注意，参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。

###**8.切片**
        >>> L = list(range(100))
        >>> L
        [0, 1, 2, 3, ..., 99]
        前10个数：
        >>> L[:10]
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        后10个数：
        >>> L[-10:]
        [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
        前10个数，每两个取一个：
        >>> L[:10:2]
        [0, 2, 4, 6, 8]
        所有数，每5个取一个：
        >>> L[::5]
        [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
###**9.迭代**
        >>> d = {'a': 1, 'b': 2, 'c': 3}
        默认情况下，dict迭代的是key。
        >>> for key in d:
                print(key)
        如果要迭代value，可以用for value in d.values()，如果要同时迭代key和value，可以用for k, v in d.items()
        字符串也可以迭代
        >>> for ch in 'ABC':
                print(ch)
- 判断是否可以迭代，方法是通过collections模块的Iterable类型判断：  

        >>> from collections import Iterable
        >>> isinstance('abc', Iterable) # str是否可迭代
        True
        >>> isinstance([1,2,3], Iterable) # list是否可迭代
        True
        >>> isinstance(123, Iterable) # 整数是否可迭代
        False
- 如果要对list实现类似Java那样的下标循环怎么办？Python内置的enumerate函数可以把一个list变成索引-元素对，这样就可以在for循环中同时迭代索引和元素本身：  

        >>> for i, value in enumerate(['A', 'B', 'C']):
                print(i, value)
        0 A
        1 B
        2 C

- for循环里，同时引用了两个变量，在Python里是很常见的，比如下面的代码：  

        >>> for x, y in [(1, 1), (2, 4), (3, 9)]:
        ...     print(x, y)
        ...
        1 1
        2 4
        3 9
        >>> [x * x for x in range(1, 11) if x % 2 == 0]
        [4, 16, 36, 64, 100]
        #还可以使用两层循环，可以生成全排列：
        >>> [m + n for m in 'ABC' for n in 'XYZ']
        ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']

