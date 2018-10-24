---
title: nyoj89 汉诺塔（二）
date: 2014-11-13 15:38:10
tags: [algorithm,nyoj]
---

```c
#include<stdio.h>  
long long f(int *p,int i,int final){  
    if(i==0) return 0;  
    else if(p[i]==final) return f(p,i-1,final);  
    else return f(p,i-1,6-p[i]-final)+(1LL<<(i-1));  
}  
int n,start[35],finish[35];//开始所在的柱子和最最终所在的柱子  
int main()  
{  
    int T;  
    int i,n;  
    scanf("%d",&T);  
    while(T--)  
    {  
        scanf("%d",&n);  
        for(i=1;i<=n;i++)  
        {  
            finish[i]=3;  
            scanf("%d",&start[i]);  
        }  
        int k=n;  
        long long ans=0;  
        while(k>=1 && start[k]==finish[k]) k--;  
        if(k>=1)   
        {  
            int t=6-start[k]-finish[k];  
            ans=f(start,k-1,t)+f(finish,k-1,t)+1;  
        }  
        printf("%lld\n",ans);  
    }  
    return 0;  
      
}  
```

要想解决这道题，我们先来分析一下。
开始，找出最大的盘子（也就是编号最大），设为k。那么k必须移动。
那么在移动k之前，假设k要从1移动到2，由于比k大的不需要移动，所以可以看做不存在，编号比k小的既不能在在1，也不能在2上，换句话说这时候1上只有k盘子，由于最后还需要移动k盘子，换句话说我们写一个函数`f（p，i,  finl)`,盘子的初始柱子编号数组是p，如果这样则这题的答案就是`f(start, k-1, 6-start[k]-finsh[k], )+ f(finish, k-1, 6-start[k]-finsh[k]) +1`（仔细理解下）,注意最后一个步骤是吧i-1个盘子整体从一个柱子移动到另一个柱子，这个需要`2^(i-1)-1`步。加上那个多出来的一步。所以就是`2^i-1`步。
于是便有了这个函数f:
```c
long long f(int *p,int i,int final){  
    if(i==0) return 0;  
    else if(p[i]==final) return f(p,i-1,final);  
    else return f(p,i-1,6-p[i]-final)+(1LL<<(i-1));//移位运算符算2的多少次方比较快，由于总数很大，需要用long long 保存。  
} 
```
——————参考自《算法竞赛入门经典》
