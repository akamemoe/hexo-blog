---
title: nyoj290 动物统计
date: 2014-10-28 15:35:34
tags: [algorithm,nyoj]
---
```c
#include<stdio.h>  
#include<string.h>  
struct Tire{  
    int count;  
    Tire *next[26];  
};  
Tire *root;  
int Max;  
char Maxs[11];  
char ss[11];  
void insert(char *s)  
{  
    if(root==NULL || *s=='\0')  
        return ;  
    Tire *p=root;  
    int i;  
    int n;  
    while(*s!='\0')  
    {  
        n=*s-'a';  
        if(p->next[n]==NULL)  
        {  
            Tire *temp=new Tire;  
            for(i=0;i<26;i++)  
                temp->next[i]=NULL;  
            temp->count=0;  
            p->next[n]=temp;  
        }  
        p=p->next[n];  
        s++;  
    }  
    p->count++;  
    if(p->count>Max){ Max=p->count; strcpy(Maxs,ss);}  
}  
int main()  
{  
    int N;  
    int i;  
    while(~scanf("%d",&N))  
    {  
        root=new Tire;  
        for(i=0;i<26;i++)  
            root->next[i]=NULL;  
        root->count=0;  
        Max=0;  
        while(N--)  
        {  
            scanf("%s",ss);  
            insert(ss);  
        }  
        printf("%s %d\n",Maxs,Max);  
    }  
    return 0;  
  
} 
```

我觉得这题应该可以用哈希表做，但是我没试验过，不知道可不可以过，不过你们可以试试。
