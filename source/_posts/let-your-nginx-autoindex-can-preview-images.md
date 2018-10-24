---
title: 让你的nginx目录浏览功能可以预览图片
date: 2018-04-10 12:35:55
tags: [nginx,javascript]
---

### 0.前言
最近自己做了个图床，想要预览所有上传的图片于是开启了nginx的目录浏览功能，但是目录下面展示的是图片链接
，我想要看图片内容的话还需要一个个点进去看，很不方便。

我通过查[文档](https://nginx.org/en/docs/http/ngx_http_sub_module.html)了解到nginx的`http_sub_module`可以在response返回给客户端之前替换内容。所以我想到了利用这个模块添加一个js文件，这个js文件功能就是搜索页面的和上的链接，是图片后缀的话就动态生成img标签附加在后面。

但是写完后我发现还有个问题：有可能某个目录下图片文件有很多，上百个，如果全部自动加载的话会很耗时间和流量。于是我又在这个基础上添加了分页功能，并且利用`details & summary`标签实现了展开和折叠功能。

<!--more-->
### 1.nginx configuration(location部分,其他部分配置网上有)
```
location / {
    #你想要浏览的目录
    alias /home/public/;
    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;
    #这里要注意，你要保证你http://{yourhost}/js/append.js可以访问的到
    sub_filter '</body>' '<script src="/js/append.js"></script></body>';
    sub_filter_once on;
}
```

### 2.append.js内容
```javascript
(function(ps){
    var pagesize = ps ? ps : 5;
    var dd = document.createElement("details");
    var ss = document.createElement("summary");
    ss.innerHTML='expand';
    dd.appendChild(ss);
    
    //create images waper.
    var showbox = document.createElement("div");
    showbox.id = 'showbox';
    showbox.style="text-align: center;";
    //should append in details tag.
    //document.body.appendChild(showbox);
    //find all a link
    var alinks = document.body.getElementsByTagName('a');
    var imglinks = new Array();
    //filter image link
    for(var i=0;i<alinks.length;i++){
        var xhref = alinks[i].getAttribute('href')
        if(xhref.match(/.+\.(jpg|png)$/gi)){
            //console.log('find img:'+xhref);
            imglinks.push(xhref);

        }

    }
    //calc page
    var curpage = 1;
    var pagecount = Math.round((imglinks.length - 1)/pagesize)+1;
    //console.log('pagecount:'+pagecount);

    //page&pagecount
    var pinfo = document.createElement("p");
    pinfo.style='margin:10px auto;position:absolute;width:97%;z-index:-1';
    pinfo.align='center';
    function changepage(n){
        //if(!dd.hasAttribute('open')){return;}
        //clear content before append
        showbox.innerHTML = '';
        for(var i=(n-1)*pagesize;i<n*pagesize;i++){
            if(imglinks[i]){
                var im = document.createElement('img');
                im.src = imglinks[i];
                im.alt = imglinks[i];
                im.title = imglinks[i];
                im.style="margin: 10px auto;";
                //console.log('create img:'+imglinks[i])
                showbox.appendChild(im); 
            }       
        }
        pinfo.innerHTML = '['+curpage+'/'+pagecount+']';
    }
    //prev&next button
    var prevbtn = document.createElement("a");
    prevbtn.style='float:left;margin:10px;';
    prevbtn.href='#showbox';
    prevbtn.innerHTML = 'prev';
    prevbtn.onclick = function(){
        curpage--;
        if(curpage < 1){
            console.log('already first page.');
            curpage = pagecount;
        }
        changepage(curpage);
    }
    

    

    var nextbtn = document.createElement("a");
    nextbtn.style='float:right;margin:10px;';
    nextbtn.href='#showbox';
    nextbtn.innerHTML = 'next';
    nextbtn.onclick = function(){
        curpage++;
        if(curpage > pagecount){
            console.log('already lasted page.');
            curpage = 1;           
        }
        changepage(curpage);
    }
    changepage(1);

    dd.appendChild(showbox);
    

    var btnbox = document.createElement("div");
    btnbox.style='min-height:50px;margin:10px 10px 10px 10px;font-size:20px;align:center';
    btnbox.appendChild(prevbtn);
    btnbox.appendChild(pinfo);
    btnbox.appendChild(nextbtn);
    dd.appendChild(btnbox);
    //append only if current dirctory contains image links
    //console.log('imglinks len:'+imglinks.length)
    if(imglinks && imglinks.length>0){
        document.body.appendChild(dd);
        document.write('<hr>');
    }
    // append ToS(term of service)
    var txt = document.createElement("div");
    txt.style="text-align: center;";
    txt.innerHTML = '本站资源全部来互联网，如有违规，请联系管理员&lt; me AT gentlehu DOT com &gt;删除';
    document.body.appendChild(txt);

})(5);//parameter:pagesize
```
### 3.测试
配置过以上内容之后测试一下你的配置文件是否正确：`nginx -t`，如果你看到ok/successful等字样说明正确。
好了，你现在可以打开`http://{yourhost}`看看效果了。
**(注意：这里的js文件使用的原生javascript语法，所以不需要引入jquery库)**

### 4.结语
其实nginx还有其他很多实用的模块可以在[这里](https://nginx.org/en/docs/)找到。如果需要，可以去看看。

