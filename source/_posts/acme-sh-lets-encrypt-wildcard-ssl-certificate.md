---
title: Linux 下使用 acme.sh 和 NS代管 申请 Let's Encrypt 免费通配符证书
date: 2019-02-14 20:55:07
tags: linux
---


简介
--

在[《Linux 下使用 acme.sh 配置 Let’s Encrypt 免费 SSL 证书 + 通配符证书》](https://sb.sb/blog/linux-lets-encrypt-wildcard-ssl/)一文中，我们介绍了如何使用 [acme.sh](https://acme.sh/) 生成 Let’s Encrypt 通配符证书，而 DNS 认证签发证书一直是一个麻烦事。例如需要将 API Key 甚至是账号密码与签发脚本保存在一起，会有潜在的安全隐患；有些 DNS 服务商不提供 API，只能每三个月手工修改等等。

本文主要介绍了一种折衷的方法，将 ACME 认证域名单独托管至支持 API 的 DNS 服务商。即使 API Key 泄露，攻击者也无法篡改网站的其它 DNS 记录。


<!--more-->
选择一个 DNS 服务商
------------

有多家 DNS 服务商提供了免费 DNS 托管服务，也支持使用 API 在线修改 DNS 解析。本文以 DigitalOcean 面板作为示例。其他 DNS 服务商，例如 Cloudflare 等，也可提供类似的功能。

DigitalOcean 是一家老牌云计算服务商，同时也提供免费的 DNS 托管服务。在其管理平台上可以随时生成或注销 API Key，以便于保护账号的安全。DigitalOcean 的免费 DNS 托管服务需要进行支付认证方可开通。绑定信用卡或 PayPal 即可完成支付认证。

DigitalOcean DNS 面板特色：

* 价格免费

* API 直接操作 DNS 记录

* 时效高，5秒内生效

* 推荐度：五星


选择一个域名代管方法
----------

常用的域名代管包括 NS 代管和 CNAME 转发。无论如何，在 DNS 托管平台上，至少要有一个 NS 代管子域名。其他域名的挑战子域名则可以用 CNAME 转发到这个代管域名上。

本文推荐将一个无关紧要的域名代管给 DNS 托管平台，然后将挑战子域名直接 CNAME 转发至这个代管地址。

示例
--

本文采用的方法是 NS 代管一个任意子域名，然后利用 CNAME 转发 ACME 挑战子域名。

你也可以选择直接将 ACME 挑战子域名用 NS 代管至其他域名托管服务，做法类似，不再赘述。

本文假设你拥有域名 `example.com`，现在希望将 `acme.example.com` 转交由 DigitalOcean 域名托管服务代管，并将域名的 ACME 挑战子域名转发至这个代管子域名。

### 1、设置 NS 代管

1.  访问 DigitalOcean 的域名设置中心： [https://cloud.digitalocean.com/networking/domains](https://cloud.digitalocean.com/networking/domains)

2.  添加域名 `acme.example.com`

3.  访问你自己域名的设置中心

4.  添加三条 NS 记录并等待其生效：
```
NS  acme.example.com  ns1.digitalocean.com.  1800
NS  acme.example.com  ns2.digitalocean.com.  1800
NS  acme.example.com  ns3.digitalocean.com.  1800
```


### 2、设置 CNAME 转发

1.  访问你自己域名的设置中心

2.  为每个要转发的挑战子域名添加 CNAME 转发记录并等待其生效：
```
CNAME  _acme-challenge.example.com acme.example.com.  1800
```

这步即是告诉签发机构，凡是为 `example.com` 申请证书者，只需要验证 `acme.example.com` 的 DNS 记录即可。


### 3、使用 acme.sh 申请 Let's Encrypt 通配符证书

先设定 API Key 变量为你自己申请的 API Key。
```
export DO_API_KEY=eaf4d5db51c8f89a46d36ce1a216a94c483913b823c8cd3c9cd64498 （请替换为你自己的 Key）
```

接着根据你的实际需要，执行以下命令，为这些域名签署证书。

1.  泛域名和根域名在同一张证书：
	```
	acme.sh --dns dns_dgon --issue -d example.com -d \*.example.com --domain-alias @.acme.example.com
	```

	这张证书将包含两个域名：
	```
	example.com
	*.example.com
	```

2.  多个域名，泛域名和根域名在同一张证书：
	```
	acme.sh --dns dns_dgon --issue -d example.com -d \*.example.com -d example.org -d \*.example.org --domain-alias @.acme.example.com
	```

	这张证书将包含四个域名：
	```
	example.com
	*.example.com
	example.org
	*.example.org
	```
