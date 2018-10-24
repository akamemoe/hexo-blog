---
title: nyoj123 士兵杀敌-四(树状数组)
date: 2014-10-29 20:24:01
tags: [algorithm,nyoj]
---
这题真的是出乎我的意料，我一直以为是线段树，没想到还是树状数组。我是在网上看的思路，然后自己编代码。
```c
#include<stdio.h>  
int N;  
int c[1000005];  
int lowbit(int i)  
{  
    return i&(-i);  
}  
void updata(int i,int num)  
{  
    while(i<=N)  
    {  
        c[i]+=num;  
        i+=lowbit(i);  
    }  
  
}  
int S(int i)  
{  
    int sum=0;  
    while(i>0)  
    {  
        sum+=c[i];  
        i-=lowbit(i);  
    }  
    return sum;  
}  
  
int main()  
{  
    int T;  
    int i;  
    int num,b,e;  
    scanf("%d%d",&T,&N);  
    char s[10];  
    while(T--)  
    {  
        scanf("%s",s);  
        if(s[0]=='A')  
        {  
            scanf("%d%d%d",&b,&e,&num);  
            updata(b,num);  
            updata(e+1,-num);///////只有这里变一下，然后就和三一样了。太，，，，，，，，，，，，，  
        }  
        else  
        {  
            scanf("%d",&i);  
            printf("%d\n",S(i));  
        }  
    }  
    return 0;  
  
}  
```

这个就不多解释了，会树状数组就会懂。这题放了好多天，今天终于ac了。
