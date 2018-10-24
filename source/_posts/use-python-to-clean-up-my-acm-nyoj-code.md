---
title: 使用Python整理我的ACM-nyoj的代码
date: 2018-01-12 21:06:18
tags: python
---

这几天在整理电脑里的文件。发现了之前自己写的[南阳OJ](http://acm.nyist.edu.cn)的刷题代码。当时还不知道有github这样的好东西，于是自己就把自己Accept之后的代码都保存成[题目].txt文件了。


现在发现这样挺不方便的，于是就写了个Python脚本，把题号和题目名作为文件名并且自动抓取[南阳OJ](http://acm.nyist.edu.cn)上的题目描述、样例输入和样例输出等信息作为注释
放在代码的前面。

<!--more-->

```python
# coding:utf-8

import os
import codecs
import re
import requests
import html
import html2text

def rewrite(src,dest):
    with open(src,'rb') as fin:
        with open(dest,'wb') as fout:
            fout.write(fin.read())

#为了谨慎保留原代码，只是复制一份出来
def copy():
    srcpath = 'F:/files/ACM'
    destpath = 'F:/files/ACM_DEST'
    files = os.listdir(srcpath)

    for name in [x for x in files if os.path.isfile(srcpath + '/' + x)]:
        perfix,suffix = os.path.splitext(name)
        src =  srcpath + '/' + name
        dest = destpath + '/' + perfix + '.cpp'

        rewrite(src,dest)
        print(src,dest,'OK')

#通过题目名查询题目ID
def query_by_name(name):
    url = 'http://acm.nyist.edu.cn/JudgeOnline/search_result.php?pid=&title=' + name +'&content=&source=&score_least=&score_great=&totalaccept_least=&totalaccept_great=&submit='
    r = requests.get(url)
    rs = re.findall(r'/JudgeOnline/problem.php\?pid=(\d+)">(.*)</a>',r.content.decode('utf-8'))
    return rs

#仅为题目命名的都改名为id_title这样的格式
def convert():
    srcpath = 'F:/files/ACM_DEST'

    files = os.listdir(srcpath)
    for name in files:
        rs = re.findall(r'(^\d+)(.*)',name)

        if len(rs) > 0:
            # print(type(rs[0]),rs[0])
            if type(rs[0]) == tuple:
                t = rs[0]
                print(t[0]+'_'+t[1])
                os.rename(srcpath + '/' + name,srcpath + '/' + t[0]+'_'+t[1])
                print('AUTO_RENAME:',name,'-->',t[0]+'_'+t[1])
        else:
            perfix = os.path.splitext(name)[0]
            print('query:',name)
            result = query_by_name(perfix)
            print(result)
            pid = input('input:')
            os.rename(srcpath+'/'+name,srcpath+'/'+pid+'_'+name)
            print('RENAME:',name,'-->',pid+'_'+name)


#得到 --------------title---------------这样的分割线
def get_tag(name):
    return '-' * 10 + name + '-' * 10

#我抓下来题目后发现里面还是有Html代码，于是用这个方法清除
def to_text(src):
    return html2text.html2text(src)
    
#根据题目ID获取题目信息
def get_problem(pid):
    r = requests.get('http://acm.nyist.edu.cn/JudgeOnline/problem.php?pid='+pid)
    rs = re.findall(r'<DD>([\w\W]*?)</DD>',r.content.decode('utf-8'))
    details = [html.unescape(x).strip() for x in rs]
    text_list = []
    text_list.append(get_tag('description'))
    text_list.append(to_text(details[0]))
    text_list.append(get_tag('input'))
    text_list.append(to_text(details[1]))
    text_list.append(get_tag('output'))
    text_list.append(to_text(details[2]))
    text_list.append(get_tag('sample_input'))
    text_list.append(details[3].replace(r'<PRE id="sample_input">','').replace(r'</PRE>',''))
    text_list.append(get_tag('sample_putput'))
    text_list.append(details[4].replace(r'<PRE id="sample_output">','').replace(r'</PRE>',''))
    return '\n'.join(text_list)


#根据题号在网站上抓取描述、输入、输出、样例输入、样例输出等信息附加在代码头部。
def complete():
    srcpath = 'H:/acm'
    files = [x for x in os.listdir(srcpath) if not x.startswith('00')] #00开头的是自定义的
    for name in files:
        pid = name.split('_')[0]
        print('WRITE:',pid,name)
        code = ''
        with open(srcpath + '/' + name,'r+',encoding='utf-8') as f:
            code = f.read()
            f.seek(0)
            f.write('/*\n')
            f.write(get_problem(pid))
            f.write('\n*/\n')
            f.write('/////////////////////////////\n')
            f.write(code)

#其中有几个代码我记得是用java写的。于是用这个方法找出来手动改名。
def find_java_file():
    srcpath = 'H:/acm'
    files = os.listdir(srcpath)
    for name in files:
        with open(srcpath + '/' + name,'rb') as f:
            code = f.read().decode('utf-8')
            if code.find('class') > 0:
                print(name)


def main():
    # convert()
    # query_by_name('棋盘覆盖')
    # get_problem('618')
    # complete()
    find_java_file()

if __name__ == '__main__':
    main()
```

总的来说python真的是很好的一门语言。已经打算深入学习了。
