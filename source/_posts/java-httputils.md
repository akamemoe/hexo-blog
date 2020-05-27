---
title: 对于httpclient上传文件的封装
date: 2016-06-24 19:02:59
tags: android
---

```java
public class HttpUtils {  
      
    private static HttpClient httpClient = new DefaultHttpClient();  
      
    /** 
     * 使用post方式访问指定URL 
     * @param url 需要访问的URL 
     * @param paramsMap 参数（形式 key:String -> value:Object） 
     * @return 返回服务器返回的文本。（注：对于返回其他类型数据的此方法不适用） 
     * @throws ClientProtocolException 
     * @throws IOException 
     */  
    public static String post(String url,Map<String, Object> paramsMap) throws ClientProtocolException, IOException{  
        HttpPost httpPost = new HttpPost(url);  
        MultipartEntityBuilder entityBuilder = MultipartEntityBuilder.create();  
        //填充参数  
        Set<String> keySet = paramsMap.keySet();  
        for(String key:keySet){  
            Object obj = paramsMap.get(key);  
            if(obj instanceof File){ //参数是File 类型  
                File file = (File) obj;  
                entityBuilder.addPart(key, new FileBody(file));  
            }  
            if(obj instanceof String){ //参数是String 类型  
                String value = (String) obj;  
                entityBuilder.addPart(key, new StringBody(value,ContentType.DEFAULT_TEXT));  
            }  
        }  
          
        httpPost.setEntity(entityBuilder.build());  
          
        HttpResponse response = httpClient.execute(httpPost);  
        if(response.getStatusLine().getStatusCode() == 200){  
            HttpEntity entity = response.getEntity();  
            String result = EntityUtils.toString(entity);  
            return result;  
        }  
        return null;  
    }  
} 
```

使用方法：
```java
private void uploadFileByHttpUtils(String url,File file,String fileName){  
    Map<String, Object> paramsMap = new HashMap<String, Object>();  
    paramsMap.put("file", file);  
    paramsMap.put("fileName", fileName);  
    try {  
        String josn = HttpUtils.post(url, paramsMap);  
        Log.i(TAG, josn);  
    } catch (ClientProtocolException e) {  
        e.printStackTrace();  
    } catch (IOException e) {  
        e.printStackTrace();  
    }  
}  
```
