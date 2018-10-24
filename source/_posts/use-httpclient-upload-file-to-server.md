---
title: 使用httpclient上传文件到服务器-Android
date: 2016-06-24 18:08:17
tags: [android,java]
---

### 一、准备 ###
准备好三个jar包：
```
httpclient-4.3.6.jar  
httpcore-4.3.2.jar  
httpmime-4.3.6.jar 
```

### 二、服务端接收代码 ###
**使用的是strtus2框架**

<!--more-->
UploadAction:
```java
public class UploadAction extends BaseAction {  
    private static final long serialVersionUID = -7303046935729691708L;  
    private String fileName;  
    private File file;  
    private final String DEFAULT_SAVE_PATH = "D:\\data";//默认路径  
    private String savePath;  
    public String upload(){  
        if(fileName != null && file != null){  
            try {  
                if(savePath == null || savePath.equals("")){  
                    savePath = DEFAULT_SAVE_PATH;  
                }  
                File temp = new File(savePath + File.separator +fileName);  
                if(!temp.exists()){  
                    file.createNewFile();  
                }  
                FileOutputStream fos = new FileOutputStream(temp);  
                FileInputStream fis = new FileInputStream(file);  
                int len = -1;  
                byte[] buf = new byte[1024];  
                while((len = fis.read(buf)) != -1){  
                    fos.write(buf, 0, len);  
                }  
                fos.flush();  
                fis.close();  
                fos.close();  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
            responseJson.put("msg", "上传文件成功");  
        }else{  
            responseJson.put("msg", "上传文件为空的！！！");  
        }  
          
        return SUCCESS;  
    }  
  
    public String getFileName() {  
        return fileName;  
    }  
  
    public void setFileName(String fileName) {  
        this.fileName = fileName;  
    }  
  
    public File getFile() {  
        return file;  
    }  
  
    public void setFile(File file) {  
        this.file = file;  
    }  
  
    public String getSavePath() {  
        return savePath;  
    }  
  
    public void setSavePath(String savePath) {  
        this.savePath = savePath;  
    }  
      
}  
```

BaseAction:
```java
public class BaseAction extends ActionSupport {  
    public final boolean DEBUG = true;  
      
    private static final long serialVersionUID = 5716179789177779317L;  
    public static final String CODE = "code";  
    public static final String STATUS = "status";  
    public static final String MESSAGE = "message";  
    public Map<String, Object> responseJson = new HashMap<String, Object>();  
  
    public Map<String, Object> getResponseJson() {  
        return responseJson;  
    }  
  
    public void setResponseJson(Map<String, Object> responseJson) {  
        this.responseJson = responseJson;  
    }  
      
  
}  
```

struts.xml:
```xml
<action name="upload" class="com.alisa.schoolapp.action.UploadAction" method="upload">  
	<result name="success" type="json">  
		<param name="root">responseJson</param>  
	</result>  
 </action>  
```

### 三、Android上传代码 ###

MainActivity:
```java
public class MainActivity extends Activity implements OnClickListener {  
  
    private static final String TAG = "MainActivity";  
    private EditText et_fileName;  
    private TextView tv_filePath;  
    private EditText et_url;  
    private Button btn_selectFile;  
    private Button btn_upload;  
    private File file;  
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.activity_main);  
        initView();  
        initEvent();  
    }  
  
  
    private void initEvent() {  
        btn_selectFile.setOnClickListener(this);  
        btn_upload.setOnClickListener(this);  
    }  
  
  
    private void initView() {  
        btn_selectFile = (Button) findViewById(R.id.btn_selectFile);  
        btn_upload = (Button) findViewById(R.id.btn_upload);  
        et_fileName = (EditText) findViewById(R.id.et_fileName);  
        et_url = (EditText) findViewById(R.id.et_url);  
        tv_filePath = (TextView) findViewById(R.id.tv_filePath);  
    }  
  
  
    @Override  
    public boolean onCreateOptionsMenu(Menu menu) {  
        getMenuInflater().inflate(R.menu.main, menu);  
        return true;  
    }  
  
  
    @Override  
    public void onClick(View v) {  
        switch (v.getId()) {  
        case R.id.btn_selectFile:  
             Intent intent = new Intent();   
             intent.setType("*/*");  
             intent.setAction(Intent.ACTION_GET_CONTENT);  
             startActivityForResult(intent, 1);  
            break;  
        case R.id.btn_upload:  
            new Thread(){  
                public void run() {  
                    String fixname = getSuffixName(file.getName());  
                    uploadFile("http://10.0.2.2:8080/SchoolApp/api/upload",file,System.currentTimeMillis()+"."+fixname,"");  
                };  
            }.start();  
              
            break;  
  
        default:  
            break;  
        }  
    }  
    @Override  
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {  
        if(resultCode == RESULT_OK){  
            Uri uridata = data.getData();  
            String dataString = data.getDataString();  
            Log.i(TAG, "uridata="+uridata);  
            String filePath = dataString.replace("file://", "");  
            Log.i(TAG, "dataString="+filePath);  
            tv_filePath.setText(filePath);  
            file = new File(filePath);  
            Log.i(TAG, "file="+file.exists()+"#"+file.getName());  
        }  
        super.onActivityResult(requestCode, resultCode, data);  
    }  
    private void uploadFile(String url,File file,String fileName,String savePath){  
        try {  
            HttpClient httpclient = new DefaultHttpClient();  
            HttpPost httppost = new HttpPost(url);  
              
            FileBody fileBody = new FileBody(file);  
            StringBody fileNameBody = new StringBody(fileName,ContentType.DEFAULT_TEXT);  
            MultipartEntityBuilder entityBuilder = MultipartEntityBuilder.create();  
              
            entityBuilder.addPart("file", fileBody);  
            entityBuilder.addPart("fileName", fileNameBody);  
              
            httppost.setEntity(entityBuilder.build());  
            HttpResponse response = httpclient.execute(httppost);  
            if(response.getStatusLine().getStatusCode() == 200){  
                HttpEntity entity = response.getEntity();  
                Log.i(TAG, EntityUtils.toString(entity));  
            }  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
    private String getSuffixName(String name){  
        String[] strings = name.split("\\.");  
        return strings[strings.length - 1];  
    }  
  
} 
```
### 四、总结 ###

经测试上传成功，日后可以封装成一个工具类来使用。