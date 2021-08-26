---
title: implement an authenticating link using nginx-module-njs
date: 2021-04-10 11:11:17
tags: [nginx]
---

sometimes, we need an authenticated link to provent our resources form abusing.  
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
var reg = /^\/(\d+)\/(\w+)\/(.*)$/
var secure_key = "yoursecurekey"
var b = Buffer.from(secure_key.toUTF8().slice(0,4))
var mask = ((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3])
function authenticate(r) {
        var m = r.uri.match(reg)
        if(!m || m.length != 4){
            return "0";
        }
        var hashval = cr.createHash('md5').update(secure_key + m[1] + m[3]).digest("hex").substr(0,30); //misguide the bad guys on the signing algorithm
        if (hashval != m[2]){
            return "0";
        }
        
        var duration = parse_expires(m[1]);
        if (duration < 0){
            return "0";
        }
        r.headersOut["Expires-In"] = duration + "s"
        return "1"
}
function parse_expires(e){
    var ee = parseInt(e)
    var now = Date.parse(new Date())/1000;
    return (ee ^ mask) - now
}
export default { authenticate };

```

### nginx.conf
```
user www-data;
worker_processes auto;
pid /run/nginx.pid;

load_module modules/ngx_http_js_module.so;

events {
        worker_connections 768;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    server_tokens off;
    sendfile        on;
    js_import auth from authenticator.js;
    js_set $auth_result auth.authenticate;
    server {
        listen              80;
        server_name         _;
        access_log /home/log/access.log;
        error_log  /home/log/error.log;
        charset utf-8;
        location ~* /(\d+)/(\w+)/(.+) {
            if($auth_result = "0"){
                return 403;
            }
            alias /home/downloads;
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
import re

secure_key = 'yoursecurekey'

b = [int(x) for x in secure_key.encode()[:4]]
mask = ((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3])


pattern = re.compile(r'^(\d+)(d|h|m)$')
def parse_duration(e):
    g = pattern.search(e)
    if g:
        d,u = g.groups()
        if u == 'm':
            return int(d)
        if u == 'h':
            return int(d) * 60
        if u == 'd':
            return int(d) * 60 * 24
    return 60


@click.command()
@click.option("-e",default="1h",help="expires duration. i.e. 9m/5h/1d")
@click.option("-f",help="the file path base to alias or root directive value. i.e. foo/bar.txt")
def main(e,f):
    if not f:
        print("the parameter f can not be null")
        return
    now = int(time.time())
    e = parse_duration(e)
    expires = now + (e * 60)
    masked_expires = str(expires ^ mask)
    s = secure_key + masked_expires + f
    hasher = hashlib.md5()
    hasher.update(s.encode())
    hashval = hasher.hexdigest()[:30]
    link = 'http://<YOURHOST>/{}/{}/{}'.format(masked_expires,hashval,f)
    print(link)

if __name__ == '__main__':
    main()
```

### link generator usage
```bash
python gen_link.py -f path/to/file.txt -e 3h #the generated link will be expires in 3 hours 
```


