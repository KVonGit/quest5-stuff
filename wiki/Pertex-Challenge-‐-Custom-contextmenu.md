```js
// EDITED
// This is Version 3
var fakeMenu = '<div id="my-div-id" class="dropdown-content" style="display:none;cursor:pointer"><span id="look" class="droplink" onclick="$(this).parent().toggle(); sendCommand(this.id)">Look</span><span id="save" class="droplink" onclick="$(this).parent().toggle(); sendCommand(this.id)">Save</span><span id="transcript" class="droplink" onclick="$(this).parent().toggle(); sendCommand(this.id)">Transcript on</span></div>';

var fakeMenuCss = '.droplink:hover, .droplink:focus, .exit-link:hover {    color: blue; background-color: #ddd} .dropdown-content {    display: none;    position: absolute;    background-color: #f1f1f1;    overflow: auto;    border: 1px solid black;    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);    z-index: 1;}.dropdown-content span {    color: black;    padding: 2px;    text-decoration: none;    display: block;} .show {display:block;}'

$('body').append($(fakeMenu));
$('head').append('<style>' + fakeMenuCss + '</style');

document.addEventListener("contextmenu", function(e){
  $("#my-div-id").show().css("left",e.clientX).css("top",e.clientY);
  e.preventDefault(); 
});

// Testing outside of Quest
var sendCommand = sendCommand || function(cmd){
  console.log(cmd);
}
```

---
![quest-custom-contextmenu-phase3](https://github.com/user-attachments/assets/df16d75a-7a0f-4794-8e6f-36a0f3ce158a)
