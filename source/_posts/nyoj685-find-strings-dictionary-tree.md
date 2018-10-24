---
title: nyoj685 查找字符串(字典树)
date: 2014-10-27 21:25:21
tags: [algorithm,nyoj]
---
刚学的字典树就用上了。
```c
#include<stdio.h>//685查找字符串  
struct Trie{  
    int count;  
    Trie *next[30];  
};  
Trie *root;;  
int turn(char c)//把字符转换成数组序号  
{  
    if(c>='a' && c<='z')  
        return c-'a';  
    else if(c=='@')  
        return 26;//@  
    else   
        return 27;//  +  
}  
void insert(char *s)//插入一个字符串  
{  
    if(root==NULL || *s=='\0')  
        return ;  
    int i;  
    Trie *p=root;  
    while(*s!='\0')  
    {  
        if(p->next[turn(*s)]==NULL)//字符串不存在，则创建  
        {  
            Trie *temp=new Trie;  
            for(i=0;i<30;i++)  
                temp->next[i]=NULL;  
            temp->count=0;//付初值0  
            p->next[turn(*s)]=temp;  
        }  
        p=p->next[turn(*s)];  
        s++;  
    }  
    p->count++;  
}  
int Tfind(char *s)  
{  
    Trie *p=root;  
    while(p!=NULL && *s!='\0')  
    {  
        p=p->next[turn(*s)];  
        s++;  
    }  
    return p==NULL?0:p->count;//注意如果字符串不存在也是0；不存在时候p==NULL  
}  
void del(Trie *p)//删除，oj提交的时候建议不删除，因为这个也耗时间。系统自动会回收，但是自己写的时候要注意。  
{  
    int i;  
    for(i=0;i<30;i++)  
    {  
        if(p->next[i]!=NULL)  
            del(p->next[i]);  
    }  
    delete p;  
}  
int main()  
{  
    int T;  
    int n,m;  
    int i;  
    char s[20];  
    scanf("%d",&T);  
    getchar();  
    while(T--)  
    {  
        root=new Trie;  
        for(i=0;i<30;i++)  
            root->next[i]=NULL;  
        root->count=0;  
        scanf("%d%d",&n,&m);  
        for(i=0;i<n;i++)  
        {  
            scanf("%s",s);  
            insert(s);  
        }  
        while(m--)  
        {  
            scanf("%s",s);  
            printf("%d\n",Tfind(s));  
        }  
        del(root);  
    }  
    return 0;  
} 
```