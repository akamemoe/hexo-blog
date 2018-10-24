---
title: nyoj42 一笔画问题(欧拉图)
date: 2014-12-21 15:54:08
tags: [algorithm,nyoj]
---

这题其实说不上难度4，只是一个简单的欧拉图判断，给一些点，首先判断连通性。如果不连通，就谈不上是欧拉图。
如果是连通的，在判断度的数目，每个顶点都是偶数个或者只有两个是奇数个。这样就可以构成欧拉图。

```c
#include<stdio.h>  
#include<string.h>  
#include<vector>  
using namespace std;  
vector <int > v[1005];  
int cnt;  
bool vis[1005];  
void dfs(int k)  
{  
    int i;  
    for(i=0;i<v[k].size();i++)  
    {  
        int t=v[k][i];  
        if(!vis[t])  
        {  
            vis[t]=true;  
            cnt++;  
            dfs(t);  
        }  
    }  
}  
int main()  
{  
    int N,n,m,a,b,i;  
    scanf("%d",&N);  
    while(N--)  
    {  
        memset(vis,false,sizeof(vis));  
        scanf("%d%d",&n,&m);  
        while(m--)  
        {  
            scanf("%d%d",&a,&b);  
            v[a].push_back(b);  
            v[b].push_back(a);  
        }  
        vis[b]=true;  
        cnt=1;  
        dfs(b);  
        int count=0;  
        if(cnt==n)  
        {             
            for(i=1;i<=n;i++)  
            {  
                  
                if(v[i].size()&1) count++;  
                v[i].clear();  
            }  
        }  
        printf("%s\n",(count==0 || count==2) && cnt==n?"Yes":"No");  
    }  
    return 0;  
}  
```
