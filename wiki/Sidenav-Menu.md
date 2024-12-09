Thanks to Dcoder and mrangel for this code!

---
This is basically all you need (remember to add your email address to ```game.contactaddress```).

Add ```SetupSidenav``` to your User Interface Initialisation script.


```
  <function name="SetupSidenav"><![CDATA[
      // Setup navCmdClick() function to handle sideNav command link clicks
      JS.eval ("function navCmdClick(cmd){addText('<br/>>'+cmd+'<br/>');ASLEvent('HandleSingleCommand', cmd);scrollToEnd();}")
      // Add the CSS
      JS.addText ("<style> .sidenav  {  height: 100%;    width: 0;    position: fixed;  transition: 0.5s;  z-index: 999;    top: 0;    left: 0;    background-color: #111;    overflow-x: hidden;    padding-top: 60px;   } .sidenav a {   padding: 8px 8px 8px 32px;    text-decoration: none;  transition: 0.5s;  font-size: 25px;    color: #818181;    display: block;   } .sidenav a:hover {   color: #f1f1f1;  } .sidenav .closebtn {   position: absolute;    top: 0;    right: 25px;    font-size: 36px;    margin-left: 50px; }#sidenav-open{top:25px;}</style>")
      // Add the sidenav element
      msg ("<div id=\"mySidenav\" class=\"sidenav\"><br/>    <a href=\"#\" class=\"closebtn\" onclick=\"closeNav();\">&times;</a> <center><span id='map-holder' /></center></div><span id=\"sidenav-open\" style=\"font-size:30px;cursor:pointer;top:0;position:fixed;\" onclick=\"openNav()\">&#9776; Menu</span>")
      // Move it to the body element
      JS.eval ("$('body').append($('#mySidenav'));")
      // Move the button, too.
      JS.eval ("$('body').append($('#sidenav-open'));")
      // Set up the openNav() and closeNav() functions
      JS.eval ("function openNav() { $('#mySidenav').width(($(window).width() - $('#gameBorder').width()) / 2);}; function closeNav() {  $('#mySidenav').width('0');};")
      AddSidenavCmdLink ("Look")
      AddSidenavCmdLink ("Get ALL")
      AddSidenavCmdLink ("Undo")
      AddSidenavCmdLink ("Wait")
      AddSidenavContactLink
  ]]></function>
```

```
  <function name="AddSidenavCmdLink" parameters="cmd"><![CDATA[
    // Add a link with "cmd" as the text, which will handle the command on click
    JS.eval ("$('#mySidenav').append('<a href=\"#\" class=\"sidenav-cmdlink\" onclick=\"navCmdClick($(this).html())\">"+cmd+"</a><br/>');")
  ]]></function>
```
```
  <function name="AddSidenavContactLink"><![CDATA[
    // Add a link with a mailto href, which pulls the email address from game.contactaddress
    JS.eval ("$('#mySidenav').append('<a href=\"mailto:"+game.contactaddress+"?subject="+game.gamename+"\">Contact</a><br/>');")
  ]]></function>
```

---
---
The Example Game's code:

<details>

```
<!--Saved by Quest 5.7.6606.27193-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Sidebar (DrAgon)">
    <gameid>40e27116-5623-4ab0-8a2d-8c82cbf55c73</gameid>
    <version>2.0</version>
    <firstpublished>2018</firstpublished>
    <feature_advancedscripts />
    <contactaddress>PUT_YOUR_EMAIL_ADDRESS_HERE</contactaddress>
    <inituserinterface type="script"><![CDATA[
      JS.eval ("function navCmdClick(cmd){addText('<br/>>'+cmd+'<br/>');ASLEvent('HandleSingleCommand', cmd);scrollToEnd();}")
      JS.addText ("<style> .sidenav  {  height: 100%;    width: 0;    position: fixed;  transition: 0.5s;  z-index: 1000;    top: 0;    left: 0;    background-color: #111;    overflow-x: hidden;    padding-top: 60px;   } .sidenav a {   padding: 8px 8px 8px 32px;    text-decoration: none;  transition: 0.5s;  font-size: 25px;    color: #818181;    display: block;   } .sidenav a:hover {   color: #f1f1f1;  } .sidenav .closebtn {   position: absolute;    top: 0;    right: 25px;    font-size: 36px;    margin-left: 50px; }#sidenav-open{top:25px;}</style>")
      msg ("<div id=\"mySidenav\" class=\"sidenav\"><br/>    <a href=\"#\" class=\"closebtn\" onclick=\"closeNav()\">&times;</a></div><span id=\"sidenav-open\" style=\"font-size:30px;cursor:pointer;top:0;position:fixed;\" onclick=\"openNav()\">&#9776; Menu</span>")
      JS.eval ("$('body').append($(#'mySidenav'));")
      JS.eval ("$('body').append($('#sidenav-open'));")
      JS.eval ("function openNav() {    $(\"#mySidenav\").css({width:'15vw'});};function closeNav() {    $(\"#mySidenav\").css({width: 0});};")
      AddSidenavCmdLink ("Help")
      AddSidenavCmdLink ("Look")
      AddSidenavCmdLink ("Wait")
      AddSidenavContactLink
    ]]></inituserinterface>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <description type="string"></description>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
  </object>
  <function name="AddSidenavCmdLink" parameters="cmd"><![CDATA[
    JS.eval ("$('#mySidenav').append('<a href=\"#\" class=\"sidenav-cmdlink\" onclick=\"navCmdClick($(this).html())\">"+cmd+"</a><br/>');")
  ]]></function>
  <function name="AddSidenavContactLink"><![CDATA[
    JS.eval ("$('#mySidenav').append('<a href=\"mailto:"+game.contactaddress+"?subject="+game.gamename+"\">Contact</a><br/>');")
  ]]></function>
</asl>
```

</details>

---
BONUS CODE:


Modified ```inituserinterface``` to display a map with a fullscreen menu background:

```
    <inituserinterface type="script"><![CDATA[
      // Setup navCmdClick() function to handle sideNav command link clicks
      JS.eval ("function navCmdClick(cmd){addText('<br/>>'+cmd+'<br/>');ASLEvent('HandleSingleCommand', cmd);scrollToEnd();}")
      // Add the CSS
      JS.addText ("<style> .sidenav  {  height: 100%;    width: 0;    position: fixed;  transition: 0.5s;  z-index: 1000;    top: 0;    left: 0;    background-color: #111;    overflow-x: hidden;    padding-top: 60px;   } .sidenav a {   padding: 8px 8px 8px 32px;    text-decoration: none;  transition: 0.5s;  font-size: 25px;    color: #818181;    display: block;   } .sidenav a:hover {   color: #f1f1f1;  } .sidenav .closebtn {   position: absolute;    top: 0;    right: 25px;    font-size: 36px;    margin-left: 50px; }#sidenav-open{top:25px;}</style>")
      // Add the sidenav element
      msg ("<div id=\"mySidenav\" class=\"sidenav\"><br/>    <a href=\"#\" class=\"closebtn\" onclick=\"closeNav()\">&times;</a> <center><img width=\"100%\" src=\""+GetFileURL("EasterEggsMap.png")+"\"/></center></div><span id=\"sidenav-open\" style=\"font-size:30px;cursor:pointer;top:0;position:fixed;\" onclick=\"openNav()\">&#9776; Map</span>")
      // Move it to the body element
      JS.eval ("$('body').append($(#'mySidenav'));")
      // Move the button, too.
      JS.eval ("$('body').append($('#sidenav-open'));")
      // Set up the openNav() and closeNav() functions
      JS.eval ("function openNav() {    $(\"#mySidenav\").css({width:'100vw'});};function closeNav() {    $(\"#mySidenav\").css({width: 0});};")
    ]]></inituserinterface>
```

---
This is the bit where you add your own image file's name:

```<img width=\"100%\" src=\""+GetFileURL("EasterEggsMap.png")+"\"/>```

---
GIF

<details>

<a href="https://user-images.githubusercontent.com/30656341/40399409-dd5a9254-5e02-11e8-9299-ff0afe4790a8.gif"><img loop src="https://user-images.githubusercontent.com/30656341/40399409-dd5a9254-5e02-11e8-9299-ff0afe4790a8.gif"/></a>


</details>

---
EXTRA BONUS CODE

<details>

Want to stick the Quest map in there?

```
    <inituserinterface type="script"><![CDATA[
      // Setup navCmdClick() function to handle sideNav command link clicks
      JS.eval ("function navCmdClick(cmd){addText('<br/>>'+cmd+'<br/>');ASLEvent('HandleSingleCommand', cmd);scrollToEnd();}")
      // Add the CSS
      JS.addText ("<style> .sidenav  {  height: 100%;    width: 0;    position: fixed;  transition: 0.5s;  z-index: 1000;    top: 0;    left: 0;    background-color: #111;    overflow-x: hidden;    padding-top: 60px;   } .sidenav a {   padding: 8px 8px 8px 32px;    text-decoration: none;  transition: 0.5s;  font-size: 25px;    color: #818181;    display: block;   } .sidenav a:hover {   color: #f1f1f1;  } .sidenav .closebtn {   position: absolute;    top: 0;    right: 25px;    font-size: 36px;    margin-left: 50px; }#sidenav-open{top:25px;}</style>")
      // Add the sidenav element
      msg ("<div id=\"mySidenav\" class=\"sidenav\"><br/>    <a href=\"#\" class=\"closebtn\" onclick=\"closeNav()\">&times;</a> <center><span id='map-holder' /></center></div><span id=\"sidenav-open\" style=\"font-size:30px;cursor:pointer;top:0;position:fixed;\" onclick=\"openNav()\">&#9776; Map</span>")
      // Move it to the body element
      JS.eval ("$('body').append($(#'mySidenav'));")
      // Move the button, too.
      JS.eval ("$('body').append($('#sidenav-open'));")
      JS.eval ("$('#map-holder').append($('#gridCanvas'));uiHide('#gridPanel');$('#gamePanelSpacer').height(0);")
      // Set up the openNav() and closeNav() functions
      JS.eval ("function openNav() {    $(\"#mySidenav\").css({width:'100vw'});};function closeNav() {    $(\"#mySidenav\").css({width: 0});};")
    ]]></inituserinterface>
```

---
<a href="https://user-images.githubusercontent.com/30656341/40399792-ea2b6a92-5e04-11e8-84de-a25b46e2e482.gif"><img loop src="https://user-images.githubusercontent.com/30656341/40399792-ea2b6a92-5e04-11e8-84de-a25b46e2e482.gif"/></a>


</details>

---
# UPDATE

My ```openNav()``` and ```closeNav()``` functions when NOT opening a full-screen menu:
```c
JS.eval ("function openNav() {   $('#mySidenav').width(($(window).width() - $('#gameBorder').width()) / 2);};function closeNav() {    $('#mySidenav').width('0');};")
```

---
Example game (with command to toggle menu):

<a href="https://user-images.githubusercontent.com/30656341/40573789-5c55e9d8-608c-11e8-8953-276cec23cb3d.gif"><img loop src="https://user-images.githubusercontent.com/30656341/40573789-5c55e9d8-608c-11e8-8953-276cec23cb3d.gif"/></a>

<details>

```xml
<!--Saved by Quest 5.8.6719.26266-->
<asl version="580">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Sidebar (Dcoder)">
    <gameid>40e27116-5623-4ab0-8a2d-8c82cbf55c73</gameid>
    <version>2.1</version>
    <firstpublished>2018</firstpublished>
    <feature_advancedscripts />
    <contactaddress>YourMama@compuserve.com</contactaddress>
    <cover type="string"></cover>
    <gridmap type="boolean">false</gridmap>
    <inituserinterface type="script"><![CDATA[
      // Setup navCmdClick() function to handle sideNav command link clicks
      JS.eval ("function navCmdClick(cmd){addText('<br/>>'+cmd+'<br/>');ASLEvent('HandleSingleCommand', cmd);scrollToEnd();}")
      // Add the CSS
      JS.addText ("<style> .sidenav  {  height: 100%;    width: 0;    position: fixed;  transition: 0.5s;  z-index: 999;    top: 0;    left: 0;    background-color: #111;    overflow-x: hidden;    padding-top: 60px;   } .sidenav a {   padding: 8px 8px 8px 32px;    text-decoration: none;  transition: 0.5s;  font-size: 25px;    color: #818181;    display: block;   } .sidenav a:hover {   color: #f1f1f1;  } .sidenav .closebtn {   position: absolute;    top: 0;    right: 25px;    font-size: 36px;    margin-left: 50px; }#sidenav-open{top:25px;}</style>")
      // Add the sidenav element
      msg ("<div id=\"mySidenav\" class=\"sidenav\"><br/>    <a href=\"#\" class=\"closebtn\" onclick=\"closeNav();\">&times;</a> <center><span id='map-holder' /></center></div><span id=\"sidenav-open\" style=\"font-size:30px;cursor:pointer;top:0;position:fixed;\" onclick=\"openNav()\">&#9776; Menu</span>")
      // Move it to the body element
      JS.eval ("$('body').append($('#mySidenav'));")
      // Move the button, too.
      JS.eval ("$('body').append($('#sidenav-open'));")
      // Set up the openNav() and closeNav() functions
      JS.eval ("function openNav() { $('#mySidenav').width(($(window).width() - $('#gameBorder').width()) / 2);}; function closeNav() {  $('#mySidenav').width('0');};")
      AddSidenavCmdLink ("Help")
      AddSidenavCmdLink ("Look")
      AddSidenavCmdLink ("Wait")
      AddSidenavContactLink
    ]]></inituserinterface>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <description type="string"></description>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
  </object>
  <command name="testcmd">
    <pattern>test</pattern>
    <script><![CDATA[
      JS.eval ("if ($('#mySidenav').width() != '0') { closeNav(); addTextAndScroll('Menu closed.'); } else { openNav(); addTextAndScroll('Menu opened.');}")
    ]]></script>
  </command>
  <function name="AddSidenavCmdLink" parameters="cmd"><![CDATA[
    JS.eval ("$('#mySidenav').append('<a href=\"#\" class=\"sidenav-cmdlink\" onclick=\"navCmdClick($(this).html())\">"+cmd+"</a><br/>');")
  ]]></function>
  <function name="AddSidenavContactLink"><![CDATA[
    JS.eval ("$('#mySidenav').append('<a href=\"mailto:"+game.contactaddress+"?subject="+game.gamename+"\">Contact</a><br/>');")
  ]]></function>
</asl>
```

</details>

