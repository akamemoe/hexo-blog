---
title: 使用JavaScript画一个图片
date: 2017-08-19 17:47:27
tags: javascript
---

### html部分代码：
```html
<html>
<head>canvas</head>
<body>
<input type="file" id="avatar">

<canvas id="canvas"></canvas>
</body>
</html>
```

### javascript部分代码：
```javascript
function draw(avatar) {
  const $canvas = document.getElementById('canvas')
  const ctx = $canvas.getContext('2d')
  
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 5, 40, 40)
  }
  img.src = URL.createObjectURL(avatar)
  
  ctx.font = 'bold 14px sans-serif'
  ctx.fillStyle = 'blue'
  ctx.fillText('EGOIST', 50, 15)

  const usernameWidth = ctx.measureText('EGOIST').width
  ctx.font = '14px sans-serif'
  ctx.fillStyle = '#666'
  ctx.fillText('2017/7/7', usernameWidth + 50 + 10, 15)

  const content = `hello world
goodbye world`
  content.split('\n').forEach((text, index) => {
    ctx.fillText(text, 50, 30 + 15 * index)
  })
}

document.getElementById('avatar').addEventListener('change', e => {
   draw(e.target.files[0])
})
```

### 效果图：

#### 原图
![DrW9R.jpg](https://s1.ax2x.com/2017/10/19/DrW9R.jpg)

#### 渲染后
![DrjKY.png](https://s1.ax2x.com/2017/10/19/DrjKY.png)


