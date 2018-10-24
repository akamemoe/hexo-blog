---
title: nyoj114 某种序列
date: 2014-09-21 16:12:15
tags: [algorithm,nyoj]
---
```c
#include<stdio.h>  
#include<string.h>  
#define base  10000  
int a[100][100];  
void t(int i,int n)  
{  
    int j=1;  
    do  
    {  
        a[i][j++]=n%base;  
        n/=base;  
    }while(n);  
}  
int main()  
{  
    //freopen("d:\\data\\1.txt","r",stdin);  
    int i,j,len,t1,t2,t3,temp,jw;  
    while(scanf("%d%d%d",&t1,&t2,&t3)!=EOF)  
    {  
        if(t1==0 && t2==0 && t3==0)  
            printf("0");  
        else  
        {  
            memset(a,0,sizeof(a));  
            t(0,t1);  
            t(1,t2);  
            t(2,t3);//将数转化为数组存储  
            len=1;  
            for(i=3;i<=99;i++)  
            {  
                jw=0;  
                for(j=1;j<=len;j++)    
                {  
                    temp=a[i-1][j]+a[i-2][j]+a[i-3][j]+jw;  
                    a[i][j]=temp%base;  
                    jw=temp/base;  
                    if(j==len && jw!=0)  
                        len++;  
                }  
            }  
        //  printf("[[[%d  %d  %d",a[0][0],a[0][]);  
            //while(a[99][len]==0)  
                //len--;  
            i=len;  
            printf("%d",a[99][i--]);  
            for(;i>=1;i--)  
                printf("%04d",a[99][i]);  
        }  
        printf("\n");  
    }  
    return 0;  
  
}  
```

这是之前的代码不知道为什么提交老是不对，然后去讨论区看了一下，发现了错误，数组存大数时候，要考虑到0，如果是55500522每个数位存一个两位数的话，就会输出5550522，那个0被省略了；这次我改成这样了

```c
#include<stdio.h>  
#include<string.h>  
#define base  100000000  
int a[100][100];  
void t(int i,int n)  
{  
    a[i][1]=n;  
}  
int main()  
{  
    //freopen("d:\\data\\1.txt","r",stdin);  
    int i,j,len,t1,t2,t3,temp,jw;  
    while(scanf("%d%d%d",&t1,&t2,&t3)!=EOF)  
    {  
        if(t1==0 && t2==0 && t3==0)  
            printf("0");  
        else  
        {  
            memset(a,0,sizeof(a));  
            t(0,t1);  
            t(1,t2);  
            t(2,t3);//将数转化为数组存储  
            len=1;  
            for(i=3;i<=99;i++)  
            {  
                jw=0;  
                for(j=1;j<=len;j++)    
                {  
                    temp=a[i-1][j]+a[i-2][j]+a[i-3][j]+jw;  
                    a[i][j]=temp%base;  
                    jw=temp/base;  
                    if(j==len && jw!=0)  
                        len++;  
                }  
            }  
        //  printf("[[[%d  %d  %d",a[0][0],a[0][]);  
            //while(a[99][len]==0)  
                //len--;  
            i=len;  
            printf("%d",a[99][i--]);  
            for(;i>=1;i--)  
                printf("%08d",a[99][i]);  
        }  
        printf("\n");  
    }  
    return 0;  
  
}  
```
然后ac了，时间0，内存300+。
