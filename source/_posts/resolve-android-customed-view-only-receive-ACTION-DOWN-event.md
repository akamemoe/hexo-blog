---
title: 安卓关于自定义View只能接收ACTION_DOWN事件问题的解决
date: 2015-11-16 13:40:07
tags: android
---

在安卓里自定义一个View 。同时实现了Activity和View是onTouchEvent监听。
发现只响应了Activity 里的ACTION_UP 和 ACTION_DOWN
View里只有DOWN的事件，怎么都是调不出来。后来我在view里设置chickable =true；问题解决了。

<!--more-->
```java
@Override  
public boolean onTouchEvent(MotionEvent event) {  
    switch (event.getAction()) {  
    case MotionEvent.ACTION_DOWN:  
        x1 = event.getX();  
        y1 = event.getY();  
        Log.i("Touch", "MyView ------- > onTouchEvent DOWN");  
        break;  
    case MotionEvent.ACTION_UP:  
        x2 = event.getX();  
        y2 = event.getY();  
        if(y1 - y2 > 50) {  
            moveUp();  
        } else if(y2 - y1 > 50) {  
            moveDown();  
        } else if(x1 - x2 > 50) {  
            moveLeft();  
        } else if(x2 - x1 > 50) {  
            moveRight();  
        }  
        Log.i("Touch", "MyView ------- > onTouchEvent UP");  
        break;  
    default:  
        break;  
    }  
    Log.i("Touch", "MyView ------- > onTouchEvent");  
      
    return super.onTouchEvent(event);  
}  
```

```xml
<com.amy.viewdemo.MyView  
       android:layout_width="match_parent"  
       android:layout_height="match_parent"  
       android:layout_centerHorizontal="true"  
       android:clickable="true"  
       android:layout_centerVertical="true" />  
```
