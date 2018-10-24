---
title: nyoj78 圈水池(凸包问题)
date: 2014-12-16 17:11:27
tags: [algorithm,nyoj]
---

解决这样的问题两个出名的算法：  
- Graham扫描法，运行时间为O(nlgn)
- Jarvis步进法，运行时间为O(nh),h为凸包中的顶点数

**Graham扫描法**  
基本思想：通过设置一个关于候选点的堆栈s来解决凸包问题。  
操作：输入集合Q中的每一个点都被压入栈一次，非CH（Q）(表示Q的凸包)中的顶点的点最终将被弹出堆栈，当算法终止时，堆栈S中仅包含CH(Q)中的顶点，其顺序为个各顶点在边界上出现的逆时针方向排列的顺序。  
*注：下列过程要求|Q|>=3，它调用函数TOP（S）返回处于堆栈S 顶部的点，并调用函数NEXT-TO –TOP（S）返回处于堆栈顶部下面的那个点。但不改变堆栈的结构。*


```c
#include<stdio.h>  
#include<stdlib.h>  
#include<limits.h>  
#include<math.h>  
#include<iostream>  
using namespace std;  
typedef struct Point  
{  
    int x,y;  
}P;  
int q[105];//zhan  
P a[105],b[105];  
int top;  
void _swap(int u,int uu)  
{  
    P t=a[u];  
    a[u]=a[uu];  
    a[uu]=t;  
}  
double dis(P p1,P p2)  
{  
    return sqrt(pow(fabs((double)p1.x-p2.x),2)+pow(fabs((double)p1.y-p2.y),2));  
}  
int xchen(P p,P p1,P p2)//左转关系判定。大于0就是。  
{  
    return (p1.x-p.x)*(p2.y-p.y)-(p1.y-p.y)*(p2.x-p.x);  
}  
int comp(const void *x,const void *y)  
{  
    int t=xchen(a[0],*(P *)x,*(P *)y);//以极角排序。  
    if(t==0)  
        return dis(*(P *)x,a[0])-dis(*(P *)y,a[0])>0?1:-1;//如果极角相等，就按照和基本点的距离排序。   
    else   
        return t;  
}  
int _comp(const void *c,const void *d)  
{  
    P x=*(P *)c;  
    P y=*(P *)d;  
    if(x.x!=y.x)  
        return x.x-y.x;  
    else  
        return x.y-y.y;  
}  
int main()  
{  
    int N,i,n,j;  
    scanf("%d",&N);  
    while(N--)  
    {  
        scanf("%d",&n);  
        int tt=INT_MAX;  
        int loc=0;  
        for(i=0;i<n;i++)  
        {  
            cin>>a[i].x>>a[i].y;  
            if(a[i].y<tt || (a[i].y==tt && a[i].x<=a[loc].x)){ tt=a[i].y; loc=i; }//求最小的y点的坐标。  
        }  
        _swap(0,loc);//交换到第一个。  
        qsort(a+1,n-1,sizeof(a[0]),comp);//第一个基本点不参与排序。  
//      for(i=0;i<n;i++)  
//      cout<<a[i].x<<"..."<<a[i].y<<endl;  
        top=1;  
        q[0]=0;q[1]=1;  
        for(i=2;i<n;i++)  
        {  
            while(top>=1 && xchen(a[q[top-1]],a[q[top]],a[i])>0) top--;//这里xchen是求叉乘。>0是包括在一条直线上的点。  
            q[++top]=i;  
        }  
        for(i=0,j=0;i<=top;i++,j++)  
            b[j]=a[q[i]];  
        qsort(b,top+1,sizeof(b[0]),_comp);  
        for(i=0;i<=top;i++)  
            cout<<b[i].x<<" "<<b[i].y<<endl;  
    }  
    return 0;  
} 
```
