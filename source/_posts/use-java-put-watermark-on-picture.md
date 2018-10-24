---
title: 用java代码给图片添加水印
date: 2016-08-01 17:09:07
tags: java
---

```java
package com.gentlehu.tools;  
  
  
import java.awt.Color;  
import java.awt.Font;  
import java.awt.Graphics;  
import java.awt.image.BufferedImage;  
import java.io.File;  
import java.io.IOException;  
  
import javax.imageio.ImageIO;  
  
  
public class Demo {       
  
    public static void main(String[] args) {       
        String srcImgPath = "d:/data/test.jpg";          
        String targerPath = "d:/data/test1.jpg";       
        new Demo().writeMark(srcImgPath,"http://www.domain.com",targerPath);  
        new Demo().writeMark(srcImgPath,"http://www.domain.com");  
  
    }       
    /** 
     * 将图片写到其他地方，不覆盖原图 
     */  
    public void writeMark(String srcImagePath,String info,String descImagePath){  
        try {  
            File uploadFile = new File(srcImagePath);  
            Font font = new Font("Courier New", Font.BOLD, 20);  
            BufferedImage uploadImage = ImageIO.read(uploadFile);  
            int width = uploadImage.getWidth();  
            int height = uploadImage.getHeight();  
            BufferedImage combined = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);  
            Graphics g = combined.getGraphics();  
            g.drawImage(uploadImage, 0, 0, null);  
            g.setFont(font);  
            g.setColor(Color.GRAY);  
            g.drawString(info, 10, height - 15);  
            File descFile = new File(descImagePath);  
            ImageIO.write(combined, "jpg", descFile);  
            System.out.println("添加水印成功！！！");  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
    }  
    /** 
     * 将图片写到本身，覆盖原图 
     */  
    public void writeMark(String srcImagePath,String info) {  
        writeMark(srcImagePath,info,srcImagePath);  
    }  
  
}  
```
