---
title: 线段树算法(数组和链表两种实现)
date: 2014-10-25 21:20:08
tags: algorithm
---
虽然oj上超时了吧，那是因为需要优化，暂时没想到怎么优化，但是我学会了线段树，值得纪念一下。
```c
#include<stdio.h>  
#define N 1000005  
struct Node{  
    int left,right;  
    int val;  
}c[N*4+5];  
int father[N+5];  
int n;  
void build(int i,int l,int r)//建立一个以i为祖先的线段树  
{  
    c[i].left=l;  
    c[i].right=r;  
    c[i].val=0;  
    if(l==r)  
    {  
        father[l]=i;  
        return ;  
    }  
    else  
    {  
        build(i*2  ,    l     ,  (l+r)/2 );  
        build(i*2+1, (l+r)/2+1,    r     );  
    }  
}  
void insert(int l,int r,int num,int i)  
{  
    if(l<=c[i].left && c[i].right<=r)  
        c[i].val+=num;  
    if(c[i].left==c[i].right)  
        return ;  
    if(l<=(c[i].left+c[i].right)/2) insert(l,r,num,i*2);  
    if(r>(c[i].left+c[i].right)/2) insert(l,r,num,i*2+1);  
}  
int main()  
{  
    int T,M;  
    int num,l,r;  
    scanf("%d%d",&T,&M);  
    build(1,1,M);  
    char s[15];  
    while(T--)  
    {  
        scanf("%s",s);  
        if(s[0]=='A')  
        {  
            scanf("%d %d %d",&l,&r,&num);  
            insert(l,r,num,1);    
        }  
        else  
        {  
            scanf("%d",&n);  
            printf("%d\n",c[father[n]].val);  
        }  
  
    }  
    return 0;  
}  
```
这是南阳oj上第123题，超时。大家不要抄啊，自己看看如何优化吧，。我也正在想。会了在发一篇博客讲解一下。

```c
#include<cstdio>  
#include<iostream>  
//#define N 1000002  
using namespace std;  
struct Node{  
    int left,right;  
    Node *leftchild,*rightchild;  
    int cover;  
};  
Node *Root;  
int n;  
Node* build(int l,int r)  
{  
    Node *root=new Node;  
    root->left=l;  
    root->right=r;  
    root->leftchild=NULL;  
    root->rightchild=NULL;  
    root->cover=0;  
    if(l<r)  
    {  
        int mid=(r+l)>>1;  
        root->leftchild = build(l,mid);  
        root->rightchild= build(mid+1,r);  
    }  
    return root;  
}  
void insert(int l,int r,int num,Node *root)  
{  
    if(root==NULL)  
        return ;  
    if(l<=root->left && root->right<=r)  
        root->cover+=num;  
    if(l<=(root->left+root->right)/2) insert(l,r,num,root->leftchild);  
    if(r>(root->left+root->right)/2) insert(l,r,num,root->rightchild);  
  
  
}  
int f(int l,int r,Node *root)  
{  
    if(root->left==n && root->right==n)  
        return root->cover;  
    else  
    {  
        int mid=(l+r)>>1;  
        if(n<=mid) f(l,mid,root->leftchild);  
        else f(mid+1,r,root->rightchild);  
    }  
  
}  
/*  
void print(Node *p)  
{  
    if(p->leftchild==NULL)   
    {  
        printf("[%d %d]->[%d] \n",p->left,p->right,p->cover);  
          
    }  
    else{  
    print(p->leftchild);  
    print(p->rightchild);  
    }  
}*/  
int main()  
{  
    int num,l,r;  
    int T,M;  
    char s[15];  
      
    scanf("%d %d",&T,&M);     
    Root=build(1,M+2);  
    while(T--)  
    {  
        scanf("%s",s);  
        if(s[0]=='A')  
        {  
            scanf("%d %d %d",&l,&r,&num);  
            insert(l,r,num,Root);  
        }  
        else  
        {  
            scanf("%d",&n);  
            printf("%d\n",f(1,M+2,Root));  
  
        }         
    }  
    //print(Root);  
  
    return 0;  
      
}  
```

上面是数组写的，这个是链表写的。很不好意思，这个也超时。不知道你们能不能看懂，我写仅仅是纪念。