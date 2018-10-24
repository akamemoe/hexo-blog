---
title: 使用golang编写一个windows-GUI应用
date: 2018-08-30 12:13:52
tags: [golang,gui]
---

本着技多不压身的精神，我最近叕学习了GO语言。发现GO可以直接编译成EXE文件，可以跑在与编译平台相同的任何机器上。
于是我就想着用一个项目练练手。就写了个windows GUI 应用。目前内容还比较简单，因为这只是刚刚开始，只是输入一个URL，显示请求的响应头，日后会照着这个模板写更多的小工具。

代码如下：
```go
package main

import (
    "bytes"
    "fmt"
    "log"
    "net/http"
    "strings"

    "github.com/lxn/walk"
    . "github.com/lxn/walk/declarative"
)

var (
    outTE   *walk.TextEdit
    urlLE   *walk.LineEdit
    mw      *walk.MainWindow
    tipsSBI *walk.StatusBarItem
)

func main() {

    MainWindow{
        AssignTo: &mw,
        Title:    "HeaderViewer - Design by Akame",
        MinSize:  Size{600, 400},
        Layout:   VBox{Margins: Margins{Left: 5, Right: 5, Bottom: 10}},
        Children: []Widget{
            Composite{
                MaxSize: Size{0, 40},
                Layout:  HBox{},
                Children: []Widget{
                    Label{Text: "URL:"},
                    LineEdit{AssignTo: &urlLE},
                    PushButton{
                        Text: "GET",
                        OnClicked: func() {
                            log.Println("url:", urlLE.Text())
                            go fetchHeader(strings.TrimSpace(urlLE.Text()))
                        },
                    },
                },
            },
            TextEdit{
                Font:     Font{Family: "Courier New", PointSize: 12},
                HScroll:  true,
                VScroll:  true,
                AssignTo: &outTE,
            },
        },

        StatusBarItems: []StatusBarItem{
            StatusBarItem{
                AssignTo: &tipsSBI,
                Text:     "准备就绪",
            },
        },
    }.Run()
}
func fetchHeader(url string) {
    tipsSBI.SetText("正在获取中...")
    resp, err := http.Get(url)
    if err != nil {
        tipsSBI.SetText("获取失败")
        walk.MsgBox(mw, "错误", "网站无法访问或者URL不正确", walk.MsgBoxOK)
        return
    }
    var buf bytes.Buffer
    for k, v := range resp.Header {
        buf.WriteString(fmt.Sprintf("%s: %s\r\n", k, strings.Join(v, "")))
    }
    outTE.SetText(buf.String())
    tipsSBI.SetText("获取完成")
}

```

效果如下：
![screenshot.png](https://res.cloudinary.com/akame-moe/image/upload/v1535740301/2018/08/header-viewer.png)


由于GO语言本身就是为高并发设计的编程语言，是C语言的升级版，在如今的云计算时代有着不可估量的潜力。所以，我打算把GO作为既java,python之后的第三个必须掌握的编程语言。


