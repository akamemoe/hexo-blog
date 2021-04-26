---
title: implement an authenticating link using nginx-module-njs
date: 2021-04-10 11:11:17
tags: [nginx]
---

sometimes, we need an authenticated link to protect our file form abuse.  
now we will accomplish that by using nginx-module-njs. here we go.


### install nginx and nginx-module-njs module

```bash
wget http://nginx.org/keys/nginx_signing.key -O nginx_signing.key
sudo apt-key add nginx_signing.key
echo "deb http://nginx.org/packages/mainline/ubuntu/ xenial nginx" | sudo tee -a /etc/apt/sources.list
sudo apt-get update
sudo apt-get install nginx nginx-module-njs
```

<!--more-->
### authentication.js
```js
var cr = require('crypto')
var reg = /\/(\d+?)\/(\w+)(.*)/
var secure_key = "yoursecurekey"
var b = Buffer.from(secure_key.toUTF8().slice(0,4))
var mask = ((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3])
function authenticate(r) {
        var uri = r.uri
        var m = uri.match(reg)
        if(m.length != 4){
            return "0";
        }
        var hashval = cr.createHash('md5').update(secure_key + m[1] + m[3]).digest("hex").substr(0,30);
        if (hashval != m[2]){
            return "0";
        }
        var now = Date.parse(new Date())/1000;
        var expires = parse_expires(m[1]);
        if (expires - now < 0){
            return "0";
        }
        r.headersOut["Expires-In"] = (expires - now) + "s"
        return "1"
}
function parse_expires(e){
    var ee = parseInt(e)
    return ee ^ mask
}

export default {authenticate}
```

### nginx.conf
```
user www-data;
worker_processes auto;
pid /run/nginx.pid;

load_module modules/ngx_http_js_module.so;

events {
        worker_connections 768;
        # multi_accept on;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    server_tokens off;
    sendfile        on;
    js_include authentication.js;
    js_set $auth_result authenticate;
    server {
        listen              80;
        server_name         _;
        access_log /home/log/access.log;
        error_log  /home/log/error.log;
        charset utf-8;
        location ~* /(\d+)/(\w+)/(.+) {
            if ($auth_result = "0"){
                return 403;
            }
            alias /downloads;
            try_files /$3 =404;
        }

    }
}

```


### link generator(Python)
```python
import click
import hashlib
import time

secure_key = 'yoursecurekey'
t = [int(x) for x in secure_key.encode()[:4]]
mask = ((t[0] << 24) | (t[1] << 16) | (t[2] << 8) | t[3])


@click.command()
@click.option("-e",default=10,help="minutes to expires")
@click.option("-f",help="the file path base to ~/downloads, should be always starts with /")
def main(e,f):
    if not f:
        click.echo("the f parameter can't be null")
        return
    now = int(time.time())
    expires = now + (e * 60)
    masked_expires = str(expires ^ mask)
    s = secure_key + expire + f
    hasher = hashlib.md5()
    hasher.update(s.encode())
    hashval = hasher.hexdigest()[:30]
    link = 'https://v.gentlehu.com/{}/{}{}'.format(em,hashval,f)
    click.echo(link)

if __name__ == '__main__':
    main()
```

### link generator usage
```bash
python gen_link.py -f /path/to/file.txt -e 10
```
this script generate a link to file.txt and expires in 10 minutes


