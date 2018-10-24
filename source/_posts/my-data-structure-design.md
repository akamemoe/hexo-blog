---
title: 我的数据结构的课程设计
date: 2014-11-20 15:57:11
tags: algorithm
---

```c
#include<stdio.h>  
#include<string.h>  
#include<stdlib.h>  
#include<iostream>  
using namespace std;  
template <class T>  
class mystack{//自定义栈，方便栈的输出  
    T sta[500];  
    int s_top;  
public:  
    mystack(){  
        s_top=0;  
    }  
    void push(T n){  
        if(s_top>=499)  
            printf("栈满了，进栈失败！\n");  
        else  
            sta[++s_top]=n;  
    }  
    void pop(){  
        if(s_top==0)  
        {printf("栈为空，不能出栈。\n");exit(1);}  
        else  
            --s_top;  
    }  
    T top(){  
        return sta[s_top];  
    }  
    void clear(){  
        s_top=0;  
    }  
    bool empty(){  
        return s_top==0;  
    }  
    int size(){  
        return s_top;  
    }  
    void printstack(){  
        int i;  
        for(i=1;i<=s_top;i++)  
            cout<<sta[i]<<" ";  
        printf("      大小是:%d\n",s_top);  
    }  
};  
  
mystack<double> ovs;//运算数栈  
mystack<char> ops;//操作符栈  
char s[1005];  
int comp(char);  
double calculate(double ,char ,double);  
int main()  
{  
    int N;  
    int i,j;  
    double num1,num2;  
    char op;  
    char w[100];  
    while(printf("请输入算式(输入\"exit\"退出):"),~scanf("%s",s),strcmp(s,"exit"))  
    {  
        ops.push('#');  
        for(i=0;s[i]!='=';)  
        {  
            printf("当前处理:");  
            if(s[i]>='0' && s[i]<='9')//处理数字  
            {  
                j=0;  
                w[j++]=s[i++];  
                while((s[i]>='0' && s[i]<='9') || s[i]=='.')  
                {  
                    w[j++]=s[i++];  
                }  
                w[j]='\0';  
                printf("%s\n",w);  
                ovs.push(atof(w));  
            }  
            else//运算符  
            {  
                  
                if(comp(ops.top())<comp(s[i]) || s[i]=='(')  
                {  
                    printf("%c\n",s[i]);  
                    ops.push(s[i]);  
                    i++;  
                }  
                else if(ops.top()=='(' && s[i]==')')  
                {  
                    printf("%c\n",s[i]);  
                    ops.pop();  
                    i++;  
                }  
                else  
                {  
                    num2=ovs.top(); ovs.pop();                
                    num1=ovs.top(); ovs.pop();                
                    op=ops.top(); ops.pop();  
                    //printf("%lf%c%lf\n",num1,op,num2);  

                    cout<<num1<<" "<<op<<" "<<num2<<endl;  
                    ovs.push(calculate(num1,op,num2));  
                }  
            }  
            printf("运算符当前栈为:");  
            ops.printstack();  
            printf("操作数当前栈为:");  
            ovs.printstack();  
            printf("\n");  
  
        }  
        while(ovs.size()!=1)//最后只剩下同级运算  
        {             
            printf("当前处理:");  
            num2=ovs.top(); ovs.pop();                
            num1=ovs.top(); ovs.pop();                
            op=ops.top(); ops.pop();  
            printf("%lf%c%lf\n",num1,op,num2);  
            ovs.push(calculate(num1,op,num2));            
        }  
        printf("\n\n运算结果:%s%.2lf\n",s,ovs.top());  
        ovs.clear();//清空  
        ops.clear();//清空  
    }  
    return 0;  
      
}  
int comp(char op)  
{  
    int t;  
    switch(op)  
    {  
    case '*':  
    case '/':t=3;break;  
    case '+':  
    case '-':t=2;break;  
    case '(':  
    case ')':t=1;break;  
    case '#':t=0;break;  
    default :printf("%c_error!\n",op);exit(1);  
    }  
    return t;  
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
    default :printf("%c_error!\n",op);exit(1);  
    }  
    return ans;  
}  
```

运行结果：
```
请输入算式(输入"exit"结束):1+2*3/(3+5)-3=
当前处理:1
运算符当前栈为:#       大小是:1
操作数当前栈为:1       大小是:1


当前处理:+
运算符当前栈为:# +       大小是:2
操作数当前栈为:1       大小是:1


当前处理:2
运算符当前栈为:# +       大小是:2
操作数当前栈为:1 2       大小是:2


当前处理:*
运算符当前栈为:# + *       大小是:3
操作数当前栈为:1 2       大小是:2


当前处理:3
运算符当前栈为:# + *       大小是:3
操作数当前栈为:1 2 3       大小是:3


当前处理:2.000000*3.000000
运算符当前栈为:# +       大小是:2
操作数当前栈为:1 6       大小是:2


当前处理:/
运算符当前栈为:# + /       大小是:3
操作数当前栈为:1 6       大小是:2


当前处理:(
运算符当前栈为:# + / (       大小是:4
操作数当前栈为:1 6       大小是:2


当前处理:3
运算符当前栈为:# + / (       大小是:4
操作数当前栈为:1 6 3       大小是:3


当前处理:+
运算符当前栈为:# + / ( +       大小是:5
操作数当前栈为:1 6 3       大小是:3


当前处理:5
运算符当前栈为:# + / ( +       大小是:5
操作数当前栈为:1 6 3 5       大小是:4


当前处理:3.000000+5.000000
运算符当前栈为:# + / (       大小是:4
操作数当前栈为:1 6 8       大小是:3


当前处理:)
运算符当前栈为:# + /       大小是:3
操作数当前栈为:1 6 8       大小是:3


当前处理:6.000000/8.000000
运算符当前栈为:# +       大小是:2
操作数当前栈为:1 0.75       大小是:2


当前处理:1.000000+0.750000
运算符当前栈为:#       大小是:1
操作数当前栈为:1.75       大小是:1


当前处理:-
运算符当前栈为:# -       大小是:2
操作数当前栈为:1.75       大小是:1


当前处理:3
运算符当前栈为:# -       大小是:2
操作数当前栈为:1.75 3       大小是:2


当前处理:1.750000-3.000000




运算结果:1+2*3/(3+5)-3=-1.25
请输入算式(输入"exit"结束):exit
Press any key to continue
```
