---
title: nyoj35 表达式求值
date: 2014-09-19 16:36:58
tags: [algorithm,nyoj]
---
```c
#include<stdio.h>  
#include<stdlib.h>  
#include<stack>  
using namespace std;  
stack<double> ovs;  
stack<char> ops;  
char s[1005];  
bool comp(char ,char);  
double calculate(double ,char ,double);  
int main()  
{  
    int N;  
    int i,j;  
    double num1,num2,ans;  
    char op;  
    scanf("%d",&N);  
    char w[100];  
    while(N--)  
    {  
        ops.push('#');  
        scanf("%s",s);  
        for(i=0;s[i]!='=';)//步长不写  
        {             
            if(s[i]>='0' && s[i]<='9')  
            {  
                j=0;  
                w[j++]=s[i++];  
                while((s[i]>='0' && s[i]<='9') || s[i]=='.')  
                {  
                    w[j++]=s[i++];  
                }  
                w[j]='\0';  
                ovs.push(atof(w));//如果是数字，则压入操作数栈  
                //printf("[ovs=%lf]\n",ovs.top());  
            }  
            else  
            {  
                if(comp(ops.top(),s[i]) || s[i]=='(')//如果是左括号或者运算符优先级高于top则压入运算符栈。  
                {  
                    ops.push(s[i]);  
                    i++;  
                }  
                else if(ops.top()=='(' && s[i]==')')//如果top和s[i]匹配，则运算符出栈  
                {  
                    ops.pop();  
                    i++;  
                }  
                else  
                {  
                    num2=ovs.top(); ovs.pop();//取出栈定元素运算                  
                    num1=ovs.top(); ovs.pop();                
                    op=ops.top(); ops.pop();                  
                    ovs.push(calculate(num1,op,num2));//再次压入栈。  
                }  
            }  
  
        }  
        //printf("size=%d\n",ovs.size());  
        while(ovs.size()!=1)//如果栈里运算数不是一个。则按顺序进行运算即可  
        {             
            num2=ovs.top(); ovs.pop();                
            num1=ovs.top(); ovs.pop();                
            op=ops.top(); ops.pop();              
            ovs.push(calculate(num1,op,num2));            
        }  
        printf("%.2lf\n",ovs.top());  
        while(!ovs.empty())//清空  
            ovs.pop();  
        while(!ops.empty())  
            ops.pop();  
    }  
    return 0;  
      
}  
bool comp(char op_top ,char op)//判断运算符优先级  
{  
    int top,_op;  
    switch(op_top)  
    {  
    case '*':  
    case '/':top=3;break;  
    case '+':  
    case '-':top=2;break;  
    case '(':  
    case ')':top=1;break;  
    case '#':top=0;break;  
    default :printf("1_error!\n");exit(1);  
    }  
    switch(op)  
    {  
    case '*':  
    case '/':_op=3;break;  
    case '+':  
    case '-':_op=2;break;  
    case '(':  
    case ')':_op=1;break;  
    case '#':_op=0;break;  
    default :printf("2_error!\n");exit(1);  
    }  
    return top<_op;  
}  
double calculate(double num1,char op,double num2)  
{  
    double ans;  
    switch(op)  
    {  
    case '*':ans=num1*num2;break;  
    case '/':ans=num1/num2;break;  
    case '+':ans=num1+num2;break;  
    case '-':ans=num1-num2;break;  
    default :printf("3_error!\n");exit(1);  
    }  
    return ans;  
}  
```
