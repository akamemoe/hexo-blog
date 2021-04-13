/*
 * this js is already insert into HTML footer.
 * if you want include other js please wirte in this file.
 * such as:
 *     document.write("<script src='/js/some.js'></script>");
 */

//document.write("<script src='/js/love.min.js'></script>");
/*
eval javescript code that in markdown file
<pre id="scriptcode" style="display:none;">
var s = document.title;
console.log(s);
</pre>
*/
var code = document.getElementById("scriptcode");
code && eval(code.innerHTML);


