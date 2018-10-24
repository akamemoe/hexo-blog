---
title: nyoj267 中缀式变后缀式(二叉树)(上)
date: 2014-11-03 21:37:18
tags: [algorithm,nyoj]
---
```c
#include<stdio.h>  
#include<stdlib.h>  
#include<stack>  
using namespace std;  
typedef struct Tree  
{  
    char c;  
    char ss[50];  
    Tree *liftchild,*rightchild;  
}tree;  
stack <tree*> ops;  
stack <tree*> ovs;  
tree *Root;   
char s[1005];  
int p(char ch)  
{  
    switch(ch)  
    {  
    case '*':  
    case '/':return 2;  
    case '+':  
    case '-':return 1;  
    case '(':  
    case ')':return 0;  
    case ';':return -1;  
    default :printf("%c_error!\n",ch);exit(1);  
    }  
}  
tree *_build(char *s)  
{  
    tree *root=new tree;  
    strcpy(root->ss,s);  
    root->liftchild=NULL;  
    root->rightchild=NULL;  
    return root;  
}  
tree *build(char ch)  
{  
    tree *root=new tree;  
    root->c=ch;  
    root->liftchild=NULL;  
    root->rightchild=NULL;  
    return root;  
}  
void visit(tree * r)  
{  
    if(r!=NULL)  
    {  
        visit(r->liftchild);  
        visit(r->rightchild);  
        if(r->liftchild==NULL && r->rightchild==NULL)  
            printf("%s",r->ss);  
        else  
            printf("%c",r->c);  
    }  
}  
int main()  
{  
  
    int i,j;  
    int  N;  
    scanf("%d",&N);  
    char w[100];  
    while(N--)//1-2*3-4/5  
    {  
        scanf("%s",s);  
        for(i=0;s[i]!='=';)  
        {  
            if(s[i]>='0' && s[i]<='9')  
            {  
                j=0;  
                while((s[i]>='0' && s[i]<='9') || s[i]=='.')  
                {  
                    w[j++]=s[i++];  
                }  
                w[j]='\0';  
                //printf("[%lf]",atof(w));  
                ovs.push(_build(w));  
            }  
            else  
            {  
                if(ops.empty() || s[i]=='(' || p(ops.top()->c)<p(s[i]) )  
                    ops.push(build(s[i])),i++;  
                else if(ops.top()->c=='(' && s[i]==')')  
                    ops.pop(),i++;  
                else//p(ops.top())>=p(s[i])  
                {  
                    ops.top()->rightchild=ovs.top();ovs.pop();  
                    ops.top()->liftchild=ovs.top();ovs.pop();                      
                    Root=ops.top();ops.pop();     
                    ovs.push(Root);  
                }  
            }  
  
        }  
        while(ovs.size()!=1)  
        {  
            ops.top()->rightchild=ovs.top();ovs.pop();  
            ops.top()->liftchild=ovs.top();ovs.pop();                      
            Root=ops.top();ops.pop();  
            ovs.push(Root);  
        }  
        Root=ovs.top();ovs.pop();  
        while(!ops.empty())  
            ops.pop();  
        visit(Root);  
        printf("=\n");  
    }  
    return 0;  
}  
```

这本来是南阳理工oj的第267题，我只是完成了表达式的转换部分。
下面的这个是个位数操作数的中缀变后缀，是栈和队列写的。其实和上面的差不多，但是上面的二叉树建立了之后可以先序遍历中序遍历后序遍历变成各种形式的式子。

```c
#include<stdio.h>//栈和队列  
#include<stdlib.h>  
#include<queue>  
#include<stack>  
using namespace std;  
stack <char> ops;  
queue <char> ovs;  
int p(char);  
int main()  
{  
    char s[10005];  
    int i,k;  
    int N;  
    scanf("%d",&N);  
    while(N--)//   1+2*(3-4)/5=  
    {  
        scanf("%s",s);  
        ops.push('=');  
        for(i=0;;)  
        {  
            if(s[i]>='0' && s[i]<='9')  
            {  
                ovs.push(s[i]);i++;  
            }  
            else   
            {  
                if(s[i]=='\0')  
                {  
                    while(!ops.empty())  
                    {  
                        ovs.push(ops.top());  
                        ops.pop();  
                    }  
                    break;  
                }  
                else if(s[i]==')')  
                {  
                    while(ops.top()!='(')  
                    {  
                        ovs.push(ops.top());ops.pop();  
                    }  
                    ops.pop();  
                    i++;  
                }  
                else if(s[i]=='(' || p(s[i]) > p(ops.top()))  
                {  
                    ops.push(s[i]);i++;  
                }  
                else //(s[i]!='=' && p(s[i])<=  p(ops.top())  )  
                {  
                    ovs.push(ops.top());  
                    ops.pop();  
                }                     
            }  
        }  
        while(ovs.size()!=1)  
            printf("%c",ovs.front()),ovs.pop();  
        printf("\n");  
        ovs.pop();  
        while(!ops.empty())  
            ops.pop();  
  
    }  
    return 0;  
      
}  
int p(char c)  
{  
    switch(c)  
    {  
    case '*':  
    case '/':return 2;  
    case '+':  
    case '-':return 1;  
    case '(':  
    case ')':  
    case '=':return 0;  
    default :printf("%c_error!",c);exit(1);  
    }  
}  
```

有待完善。