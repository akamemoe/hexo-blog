---
title: nyoj267 中缀式变后缀式(二叉树)(下)
date: 2014-11-06 13:54:47
tags: [algorithm,nyoj]
---
这个题我前几天只是做了表达式变换部分，今天把求值部分加进去了。

```c
#include<stdio.h>  
#include<string.h>  
#include<stdlib.h>  
#include<stack>  
using namespace std;  
typedef struct Tree  
{  
    char c;//如果不是叶节点，则是操作符，用字符存  
    char ss[25];//由于要输出原来的输入，这里保存着  
    double n;//字符串转换后的值  
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
double calcu(double n1,char op,double n2)  
{  
    switch(op)  
    {  
    case '*':return n1*n2;  
    case '/':return n1/n2;  
    case '+':return n1+n2;  
    case '-':return n1-n2;  
    default :printf("%c_error!",op);return 0;  
    }  
}  
void visit(tree * r)  
{  
    if(r!=NULL)  
    {  
        visit(r->liftchild);  
        visit(r->rightchild);  
        if(r->liftchild==NULL && r->rightchild==NULL)  
        { printf("%s",r->ss); r->n=atof(r->ss);}//叶节点必定是数字  
        else  
        { printf("%c",r->c); r->n=calcu(r->liftchild->n,r->c,r->rightchild->n);}//遍历的时候计算。  
    }  
}  
  
  
int main()  
{  
  
    int i,j;  
    int  N;  
    scanf("%d",&N);  
    char w[100];  
    while(N--)  
    {  
        scanf("%s",s);//1-2*3-4/5=  
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
        printf("=\n%.2lf\n\n",Root->n);  
    }  
    return 0;  
}  
```
我觉得不是很难，只要表达式求值你会了，这题也是小意思。
