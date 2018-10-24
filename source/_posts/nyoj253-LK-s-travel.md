---
title: nyoj253 LK的旅行(旋转卡壳法)
date: 2015-01-06 18:52:29
tags: [algorithm,nyoj]
---

做这个题之前最好先做下78圈水池这题，这两个题差不多，区别在于一个是求哪些点在凸包内，这个是求凸包的两个最远的点的距离的平方。

```c
#include<stdio.h>  
#include<math.h>  
#include<stdlib.h>  
#define NN 100005  
#define max(a,b) ((a)>(b)?(a):(b))  
const int INF=1<<30;  
typedef struct Point{  
    int x,y;  
}P;  
P a[NN],q[NN];  
int top;  
int dis_2(P p1,P p2)  
{  
    return (p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y);  
}  
int xx(P p,P p1,P p2)  
{  
    return (p1.x-p.x)*(p2.y-p.y)-(p1.y-p.y)*(p2.x-p.x);  
}  
int comp(const void *x,const void *y)  
{  
    P i=*(P *)x;  
    P j=*(P *)y;  
    if(i.x!=j.x)  
        return i.x-j.x;  
    else  
        return i.y-j.y;  
}  
int main()  
{  
    int N,i,n;  
    scanf("%d",&N);  
    while(N--)  
    {  
        scanf("%d",&n);  
        for(i=0;i<n;i++)  
        {  
            scanf("%d%d",&a[i].x,&a[i].y);  
        }  
        qsort(a,n,sizeof(a[0]),comp);  
      
        top=0;  
        q[0]=a[0];  
        for(i=1;i<n;i++)//下凸包  
        {  
            if(a[i].x==q[top].x && a[i].y==q[top].y) continue;  
            while(top>=1 && xx(q[top-1],q[top],a[i])>=0) top--;  
            q[++top]=a[i];  
        }  
        int t=top;  
        for(i=n-1;i>=0;i--)//上凸包  
        {  
            if(a[i].x==q[top].x && a[i].y==q[top].y) continue;  
            while(top>t && xx(q[top-1],q[top],a[i])>=0) top--;  
            q[++top]=a[i];  
        }     
        double ans=0.0;  
        t=1;  
        for(i=0;i<top;i++)  
        {  
            while(xx(q[i+1],q[t],q[i]) > xx(q[i+1],q[t+1],q[i])) t=(t+1)%top;  
            ans=max(ans,max(dis_2(q[i],q[t]),dis_2(q[i+1],q[t+1])));  
        }  
        printf("%.0lf\n",ans);        
    }  
    return 0;  
}  
```