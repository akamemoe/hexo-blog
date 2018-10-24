---
title: nyoj1038 纸牌游戏
date: 2014-08-14 15:16:04
tags: [algorithm,nyoj]
---
南阳oj第1038题：纸牌游戏
Accept代码：
```c
#include<stdio.h>  
#include<string.h>  
#include<stdlib.h>  
struct Pai  
{  
    char num;  
    char huase;  
};  
int comp(const void *a,const void *b)  
{  
    struct Pai *c=(Pai *)a;  
    struct Pai *d=(Pai *)b;  
    char cc=(c->huase=='H'?'U':c->huase);  
    char dd=(d->huase=='H'?'U':d->huase);  
    char ccc=c->num;  
    char ddd=d->num;  
    ccc=(ccc=='A'?'Z':ccc);  
    ccc=(ccc=='K'?'Y':ccc);   
    ccc=(ccc=='T'?'B':ccc);  
      
    ddd=(ddd=='A'?'Z':ddd);  
    ddd=(ddd=='K'?'Y':ddd);  
    ddd=(ddd=='T'?'B':ddd);  
    if(cc!=dd)  
        return cc-dd;  
    else  
        return ccc-ddd;  
}  
int main()  
{  
    //freopen("d:\\data\\1.txt","r",stdin);  
    //freopen("d:\\data\\2.txt","w",stdout);  
    struct Pai p[4][14];  
    char s1[150],s2[60];  
    char person;//先拿牌的人  
    int yu;  
    int i,j,t,k;  
    char shuxu[4][6]={"East","South","West","North"};  
    while(~scanf("%c",&person))  
    {  
        getchar();  
        scanf("%s",s1);  
        scanf("%s",s2);  
        getchar();  
        strcat(s1,s2);  
        switch(person)  
        {  
            case 'E':yu=0;break;  
            case 'S':yu=1;break;  
            case 'W':yu=2;break;  
            case 'N':yu=3;break;  
            default :printf("ohmygod\n");  
        }  
        for(i=0;i<4;i++)  
        {  
            t=0;  
            k=(i+yu)%4;  
            for(j=i*2;j<=103;j+=8)  
            {  
                p[k][t].num=s1[j];  
                p[k][t].huase=s1[j+1];  
                t++;  
            }  
            p[k][t].num='\0';  
            p[k][t].huase='\0';  
              
        }  
        for(i=0;i<4;i++)  
        {  
            printf("%s player:\n",shuxu[i]);  
            qsort(p[i],13,sizeof(p[i][0]),comp);  
            for(j=0;j<13;j++)  
                printf("+---+");  
            printf("\n");  
            for(j=0;j<13;j++)  
                printf("|%c %c|",p[i][j].num,p[i][j].num);  
            printf("\n");  
            for(j=0;j<13;j++)  
                printf("| %c |",p[i][j].huase);  
            printf("\n");  
            for(j=0;j<13;j++)  
                printf("|%c %c|",p[i][j].num,p[i][j].num);  
            printf("\n");  
            for(j=0;j<13;j++)  
                printf("+---+");  
            printf("\n");  
        }  
        printf("\n");  
              
    }     
    return 0;  
}  
```
