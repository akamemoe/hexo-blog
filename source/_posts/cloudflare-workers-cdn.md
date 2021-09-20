---
title: 使用cloudflare-workers作为CDN
date: 2021-07-26 20:52:10
tags: [cloudflare,cdn]
---

# 1.添加记录

在DNS记录中添加一条IPv6记录指向`100::`：
```
type: AAAA
name: cdn
content: 100::
```

# 2.创建worker

创建一个worker代码如下:
```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event))
})

const BUCKET_NAME = "hugo-workers"
const BUCKET_URL = `http://storage.googleapis.com/${BUCKET_NAME}`

async function serveAsset(event) {
  const url = new URL(event.request.url)
  const cache = caches.default
  let response = await cache.match(event.request)

  if (!response) {
    response = await fetch(`${BUCKET_URL}${url.pathname}`)
    const headers = { "cache-control": "public, max-age=14400" }
    response = new Response(response.body, { ...response, headers })
    event.waitUntil(cache.put(event.request, response.clone()))
  }
  return response
}

async function handleRequest(event) {
  if (event.request.method === "GET") {
    let response = await serveAsset(event)
    if (response.status > 399) {
      response = new Response(response.statusText, { status: response.status })
    }
    return response
  } else {
    return new Response("Method not allowed", { status: 405 })
  }
}
```

# 3.配置路由

将本worker的路由配置为`cdn.YOURDOMAIN.com/*`，点击deploy。

# 4.测试

假如你有一个文件链接为:`https://storage.googleapis.com/akame-moe/public/random/food.png`，
那么现在你可以访问`https://cdn.YOURDOMAIN.com/public/random/food.png`试试，应该能正常访问，
如果不能，检查一下自己的步骤。其他类似 Google Cloud Storage 的服务应该也可以用此方法配置CDN。

当然，这种CDN不能无限制的使用，workers的具体限制有哪些可以翻阅[官方文档](https://developers.cloudflare.com/workers/platform/limits)。

# 5.声明

本用法来自官方[https://developers.cloudflare.com/workers/tutorials/configure-your-cdn](https://developers.cloudflare.com/workers/tutorials/configure-your-cdn)教程，
并无任何滥用cloudflare免费资源行为。

