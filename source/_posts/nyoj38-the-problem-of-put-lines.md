---
title: nyoj38 布线问题(最小生成树)
date: 2014-11-03 19:05:56
tags: [algorithm,nyoj]
---
最小生成树算法有两个比较出名的，就是prime算法和krakusl算法。
首先说下krakusl算法。这个算法就是三个步骤，
第一，把每个顶点看成一个集合，边集按照权值大小排序。
第二，从最小的 边集开始，如果边的加入没有使得生成树成为环（并查集），则把该边加入生成树，否则，判断下一条边。
第三，当所有的顶点都加入了生成树，则所有加入的边构成最小生成树。
更加详细的请查找百度百科。
下面是我写的此题的代码。

```c
#include<stdio.h>  
#include<stdlib.h>  
#include<limits.h>  
#include<string.h>  
#include<algorithm>  
#define min(a,b) a>b?b:a  
using namespace std;  
int L[502];  
int father[502];  
struct P{  
    int val;  
    int v1,v2;  
}a[130000];  
void work();  
int v,e;  
int sum;  
int comp(const void *a,const void *b)  
{  
    P *c=(P *)a;  
    P *d=(P *)b;  
    return c->val-d->val;  
}  
int main()  
{  
    int T;    
    int i;  
    scanf("%d",&T);  
    while(T--)  
    {  
        memset(father,0,sizeof(father));  
        scanf("%d%d",&v,&e);  
        for(i=0;i<e;i++)  
            scanf("%d %d %d",&a[i].v2,&a[i].v1,&a[i].val);  
        for(i=0;i<v;i++)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            scanf("%d",&L[i]);  
        sum=0;  
        qsort(a,e,sizeof(a[0]),comp);  
        work();  
        printf("%d\n",sum+*min_element(L,L+v));  
          
    }  
    return 0;  
}  
int find(int x)//并查集函数  
{  
    if(x!=father[x]) father[x]=find(father[x]);  
    return father[x];  
}  
void work()//kruskal算法  
{  
    int i;  
    for(i=1;i<=v;i++)  
        father[i]=i;  
    for(i=0;i<e;i++)  
    {  
        int t=find(a[i].v1);  
        int tt=find(a[i].v2);  
        if(t!=tt)  
        {  
            sum+=a[i].val;  
            father[t]=tt;  
        }  
    }     
}  
```

这个算法也不是很理解，但是pime算法我也不太清楚，我写不出来，所以要想了解此算法，请移步[此处](https://www.baidu.com)。