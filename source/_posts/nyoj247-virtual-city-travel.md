---
title: nyoj247 虚拟城市的旅行-SPFA算法
date: 2015-04-14 19:33:07
tags: [algorithm,nyoj]
---

```c
#include <iostream>  
#include<queue>  
#include<string.h>  
#include<stdio.h>  
#define max(a,b) (a>b?a:b)  
#define min(a,b) (a<b?a:b)  
using namespace std;  
struct node{  
    int v;  
    node* next;  
    node(int vv){  
        v = vv;  
        next = NULL;  
    }  
};  
const int N = 100000+5;  
node *t ;  
void add(node** h,node* p){  
    t = *h;  
    *h = p;  
    p->next = t;  
}  
node* head1[N];  
node* head2[N];  
int a[N],b[N];  
bool vis1[N];  
bool vis2[N];  
int spfa(int s,int n){  
    queue<int> q;  
    int v;  
    memset(vis1,false,sizeof(vis1));  
    vis1[s] = true;   
    q.push(s);  
    while(!q.empty()){  
        int x = q.front();q.pop();  
        for(node* p=head1[x];p;p=p->next){  
            v = p->v;  
            a[v]=min(a[v],a[x]);  
            if(!vis1[v]){  
                q.push(v);   
                vis1[v] = true;   
            }   
        }  
    }  
    memset(vis2,false,sizeof(vis2));  
    vis2[n] = true;  
    q.push(n);  
    while(!q.empty()){  
        int x = q.front();q.pop();  
        for(node* p=head2[x];p;p=p->next){  
            v = p->v;  
            b[v]=max(b[v],b[x]);  
            if(!vis2[v]){  
                q.push(v);   
                vis2[v] = true;   
            }   
        }  
    }  
    int ans =0;  
    for(int i=1;i<=n;i++){  
//      printf("a:%d b:%d\n",a[i],b[i]);  
        if(vis1[i] && vis2[i])  ans = max(ans,b[i]-a[i]);  
    }  
    return ans;  
      
}  
int main(int argc, char** argv) {  
    int n,m;  
    int u,v,c;  
    while(~scanf("%d%d",&n,&m)){  
        for(int i=1;i<=n;i++){  
            scanf("%d",&a[i]);  
            b[i] = a[i];//max  is itself <span style="font-family: Arial, Helvetica, sans-serif;">default</span>  
  
            head1[i] = NULL;//scanf and init;  
            head2[i] = NULL;  
        }  
        while(m--){  
            scanf("%d%d%d",&u,&v,&c);  
            add(&head1[u],new node(v));  
            add(&head2[v],new node(u));//逆向   
            if(c==2){  
                add(&head1[v],new node(u));  
                add(&head2[u],new node(v));  
            }   
        }  
        printf("%d\n",spfa(1,n));  
    }  
    return 0;  
}  
```