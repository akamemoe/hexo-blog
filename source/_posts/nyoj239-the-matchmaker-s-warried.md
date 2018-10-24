---
title: nyoj239 月老的难题
date: 2014-12-10 20:19:37
tags: [algorithm,nyoj]
---
这题我是研究了好久，就是去理解那个增广路花了一大部分时间。
有很多都是伪代码写的，说了个大致思想，但是没个试题给具体点的代码，所以我很困惑。
然后今天模仿一下别人做的题，对着题和代码认真想一遍。仔细想了那个神秘的增广路。
慢慢的明白了，哈哈。
然后我就小试牛刀一下，做了这题。
开始我代码就写对了，有个地方，就是一个小错误，让我改半天，wa了三四次。

```c
for(i=0;i<=n;i++)
	v[i].clear();
printf("%d\n",match);
```

清空应该是i<=n的，我开始一直写成了i<n;就因为这，一直错。
后来我还认认真真的把别人代码抄了一遍，结果对了，我郁闷啊。

通过了后我就研究了标准代码，和我开始写的一样，就是初始化直接是memset初始化的。

在经过我的再三思之后，终于发现了这个错误。
哎。我还以为。。。。。。啥都不说了。
下次再犯错误就。。。。。下面是ac代码。

```c
#include<stdio.h>  
#include<string.h>  
#include<vector>  
using namespace std;  
#define MAX 502  
int mat[MAX];  
bool used[MAX];  
vector<int > v[MAX];  
int n;  
bool crosspath(int k)  
{  
    int i;  
    for(i=0;i<v[k].size();i++)  
    {  
        int t=v[k][i];  
        if(!used[t])  
        {  
            used[t]=true;  
            if(mat[t]==0|| crosspath(mat[t]))  
            {  
                mat[t]=k;  
                return true;  
            }  
        }  
    }  
    return false;  
}  
int main()  
{  
    int N;  
    int a,b,k,i;  
    scanf("%d",&N);  
    while(N--)  
    {  
        scanf("%d%d",&n,&k);  
        for(i=0;i<k;i++)  
        {  
            scanf("%d%d",&a,&b);  
            v[a].push_back(b);//我看见别人都是把这改了，b改成n+b;我开始也学着他们改，但是后来我发现改了没用，根本没影响。  
        }  
        int match=0;  
        memset(mat,0,sizeof(mat));  
        for(i=1;i<=n;i++)  
        {  
            memset(used,false,sizeof(used));  
            if(crosspath(i))  
                match++;  
        }  
        for(i=0;i<=n;i++)  
            v[i].clear();  
        printf("%d\n",match);  
    }  
    return 0;  
}
```