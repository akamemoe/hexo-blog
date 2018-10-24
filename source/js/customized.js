/*
 * this js is already insert into HTML footer.
 * if you want include other js please wirte in this file.
 * such as:
 *     document.write("<script src='/js/some.js'></script>");
 */

//document.write("<script src='/js/love.min.js'></script>");
document.write("<script src='/js/assistant.js'></script>");
/*
在md文件中插入以下代码以执行js
<pre id="scriptcode" style="display:none;">
var s = document.title;
console.log(s);
</pre>
*/
var code = document.getElementById("scriptcode");
code && eval(code.innerHTML);


