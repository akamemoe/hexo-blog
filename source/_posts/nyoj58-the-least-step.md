---
title: "nyoj58 最少步数"
date: 2014-08-04 17:24:49
tags: [algorithm,nyoj]
---
这题明显是简单的DFS.  
Accept代码：
```c
#include<stdio.h>  
int p[9][9]={  
 1,1,1,1,1,1,1,1,1,  
 1,0,0,1,0,0,1,0,1,  
 1,0,0,1,1,0,0,0,1,  
 1,0,1,0,1,1,0,1,1,  
 1,0,0,0,0,1,0,0,1,  
 1,1,0,1,0,1,0,0,1,  
 1,1,0,1,0,1,0,0,1,  
 1,1,0,1,0,0,0,0,1,  
 1,1,1,1,1,1,1,1,1};  
int ans,cur;  
int x1,x2,y1,y2;  
int main()  
{  
    void dfs(int ,int,int);  
    int N;  
    scanf("%d",&N);  
    while(N--)  
    {  
        scanf("%d%d%d%d",&x1,&y1,&x2,&y2);  
        p[x1][y1]=1;  
        ans=100;  
        dfs(x1,y1,0);  
        printf("%d\n",ans);  
          
    }  
    return 0;  
}  
void dfs(int x1,int y1,int cur)  
{  
    if(x1==x2 && y1==y2)  
    {  
        ans=cur>ans?ans:cur;  
    }  
    if(x1<0 || x1>8 || y1<0 || y1>8)  
        return ;  
    if(!p[x1+1][y1]){ p[x1][y1]=1;  dfs(x1+1,y1,cur+1); p[x1][y1]=0;    }  
    if(!p[x1][y1+1]){ p[x1][y1]=1;  dfs(x1,y1+1,cur+1); p[x1][y1]=0;    }  
    if(!p[x1-1][y1]){ p[x1][y1]=1;  dfs(x1-1,y1,cur+1); p[x1][y1]=0;    }  
    if(!p[x1][y1-1]){ p[x1][y1]=1;  dfs(x1,y1-1,cur+1); p[x1][y1]=0;    }  
}  
```
