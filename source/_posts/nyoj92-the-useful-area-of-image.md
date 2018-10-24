---
title: nyoj92 图像有用区域
date: 2014-10-09 21:01:11
tags: [algorithm,nyoj]
---
这题其实不难，就是一个bfs；
```c
#include<stdio.h>  
#include<stdlib.h>  
#include<queue>  
using namespace std;  
int map[965][1445];  
int dir[4][2]={1,0,  0,1,  -1,0,  0,-1};  
typedef struct Point  
{  
    int x,y;  
}P;  
queue<P> Q;  
int w,h;  
int main()  
{  
//  freopen("d:\\data\\1.txt","r",stdin);  
    void bfs();  
    int ncase;  
    int i,j;  
    P tt;  
    scanf("%d",&ncase);  
    while(ncase--)  
    {  
        scanf("%d%d",&w,&h);  
        for(i=0;i<h;i++)  
        {  
            for(j=0;j<w;j++)  
            {  
                scanf("%d",&map[i][j]);  
                if((i==0 || j==0 || i==(h-1) || j==(w-1) )&& map[i][j]!=0)  
                {  
                    tt.x=j;  
                    tt.y=i;  
                    map[i][j]=0;  
                    Q.push(tt);  
                }  
            }  
        }  
        bfs();  
        for(i=0;i<h;i++)  
        {  
            for(j=0;j<w;j++)  
                printf("%d ",map[i][j]);  
            printf("\n");  
        }  
    }  
    return 0;  
}  
void bfs()  
{  
      
    P cur,next;  
    while(!Q.empty())  
    {  
        int k;  
        cur=Q.front();  
        Q.pop();  
        for(k=0;k<4;k++)  
        {  
            next.x=cur.x+dir[k][0];  
            next.y=cur.y+dir[k][1];  
            if(next.x>=0 && next.x<w && next.y>=0 && next.y<h && map[next.y][next.x]!=0)  
            {  
                map[next.y][next.x]=0;  
                Q.push(next);  
            }  
        }  
    }  
      
    while(!Q.empty())  
        Q.pop();  
    return ;  
}  
```
上面的代码不不需要讲了吧，只要你会bfs你就会做，但是注意这题有个坑，就是他说的长度和高度，我之前提交几次，就是被这个坑了，其实自习看看还是怪自己粗心大意，
好好看题，养成好习惯，对以后的工作生活都有好处。