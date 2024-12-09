The easiest thing is to add this to your room description (or object description):

```html
<input type="file" accept="image/*" onchange="loadFile(event)"/>
<img id="output"/>
<script> var loadFile = function(event) {    var output = document.getElementById('output');    output.src = URL.createObjectURL(event.target.files[0]);        }; </script>
```

---
I stole this from Emmanuel B.

http://textadventures.co.uk/forum/quest/topic/ukfsqsyuxkqlqedpvc4tna/upload-image-display-code

---
If you add this to the end of the script, you can save the data as a variable to print the image whenever you like:

```
uploadedImg = output.src;
```


To use that:


```
JS.eval("addTextAndScroll (\"<img src='\"+uploadedImg+\"'>\");")
```