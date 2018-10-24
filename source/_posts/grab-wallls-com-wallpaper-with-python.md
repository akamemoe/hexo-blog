---
title: 用Python抓取wallls.com上的壁纸
date: 2017-12-17 15:33:02
tags: python
---

### 如果你喜欢动漫风格的壁纸而自己又不想一张一张下载。可以用下面的脚本批量下载

```python
# -*- coding: UTF-8 -*-

import requests
import re,sys,time
import random


failed_urls = []
image_urls = []

def record_data():
    global image_urls,failed_urls
    with open('H:/temp/list.txt','w') as f:
        #为了防止有重复的图片。用set集合去重
        ls = set(image_urls)
        print('DONE:',len(ls))
        f.write('\n'.join(ls))
        #可能会有访问失败的URL。但是一般不会有
    with open('H:/temp/failed_urls.txt','w') as f:
        ls = set(failed_urls)
        print('FAILED:',len(ls))
        f.write('\n'.join(ls))

<!--more-->
#封装一个请求方法，对失败的请求增加睡眠重试机制，超过三次失败的url放入failed_urls
def hr(url,retry=1,sleeptime=1):
    global failed_urls
    try:
        time.sleep(sleeptime)
        print('url:',url)
        return requests.get(url,timeout=3)
    except KeyboardInterrupt as e:
        raise e
    except:
        print('url:',url,'failed.retry=',retry)
        if retry > 3:
            print('url:',url,'failed more than 3 times.pass')
            failed_urls.append(url)
        else:
            #每失败一次增加5秒睡眠时间
            return hr(url,retry=retry+1,sleeptime=sleeptime+5)
    return None

#按下载顺序设置文件名
num = 0
def download_image(url):
    global num
    num+=1
    suffix = url[url.rindex('.'):]
    print('downloading:[',url,']-->',num)

    r = hr(url)
    if r is not None:
        with open('H:/temp/' + str(num) + suffix,'wb') as f:
            f.write(r.content)


def download():
    urls = []
    with open('H:/temp/list.txt','rb') as f:
        txt = f.read().decode('utf-8')
        urls = txt.split('\n')
    for x in urls:
        download_image(x.strip())



def main():
    global image_urls

    baseurl = 'http://wallls.com/tag/anime%2Bgirls'
    r = requests.get(baseurl)
    page_num = int(re.findall(r'of (\d+)',r.text)[0])
    print(page_num)
    try:
        #总共有303页，每页20张图片。共计6000+张壁纸。每个请求睡眠一秒。所以可能会下载很久(估计为2-3个小时)。
        for page in range(1,page_num+1): # //303
            list_url = baseurl + '/' + str(page)
            lr = hr(list_url)
            if lr is not None:
                #href="/wallpaper/188738/"
                detail_urls = re.findall(r'href="(/wallpaper/\d+)/',lr.text)
                for durl in ['http://wallls.com' + x for x in detail_urls]:
                    dr = hr(durl)
                    if dr is not None:
                        # download href="http://w4.wallls.com/uploads/original/201712/02/wallls.com_188729.png"
                        #每个壁纸的详情页面只有一个原图链接。所以只需要取第一个就可以了
                        imgurl = re.findall(r'http://\w+.wallls.com/uploads/original/\w+/\w+/\w+.\w+.(?:png|jpg)',dr.text)[0]
                        image_urls.append(imgurl)
    except:
        pass
    record_data()
    download()


if __name__ == '__main__':
    main()
```