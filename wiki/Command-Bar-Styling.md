# Customizing the Command Bar

Quest runs the function ```ResetCommandBarFormat``` after every turn (which resets it to its default style), so you have to add your own settings in a turn script to override this.

We can use JS to modify the CSS:
```c#
JS.eval("$('#txtCommand').css({'color':'lightgray','outline':'1px solid black','background-image':\"url('http://soundimage.org/wp-content/uploads/2018/01/P1030524_Standard.jpg')\"});")
```

To make this the default for every turn, including the first turn AND the turn when loading a saved game, we need to call that function in:

- the 'After entering room for the first time' script on the starting room
- a turn script
- the 'User Interface Initialisation' script

So, to simplify things, let's make a function called: ```CustomCmdBarCss```.

Put this for the script in code view:
```C#
JS.eval("$('#txtCommand').css({'color':'lightgray','outline':'1px solid black','background-image':\"url('http://soundimage.org/wp-content/uploads/2018/01/P1030524_Standard.jpg')\"});")
```

Now, add this line to a turn script, the starting room's 'After entering for the first time' script, and the game's 'User Interface Initialisation' script:

```
CustomCmdBarCss
```

---
Here's the output and the example game's code (Texture Images by Eric Matyas from http://soundimage.org/):

![image](https://user-images.githubusercontent.com/30656341/37248312-b1a2f734-2494-11e8-8733-0e33b7097390.png)

---

```xml
<!--Saved by Quest 5.7.6606.27193-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Border Play">
    <gameid>5f3cc3fc-7c4e-4ba0-9b97-6cfe86e29d81</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
    <feature_advancedscripts />
    <description>Texture Images by Eric Matyas from http://soundimage.org/</description>
    <inituserinterface type="script">
      // The next 3 lines set the panes and status bar styles
      JS.eval ("$('#status, #compassLabel, #compassAccordion, #placesObjectsLabel, #placesObjectsAccordion, #inventoryLabel, #inventoryAccordion, #compassTable, .compassbutton').css({'color':'white','background-image':\"url('http://soundimage.org/wp-content/uploads/2018/01/P1030524_Standard.jpg')\",\"border-image\":\"url('http://soundimage.org/wp-content/uploads/2017/10/P1030368_Standard.jpg') 50 round\"})")
      JS.eval ("$('.compassbutton').css('background',\"url('http://soundimage.org/wp-content/uploads/2017/10/P1030368_Standard.jpg')\");")
      JS.eval ("$('.ui-icon').css(\"background-image\", \"url('" + GetFileURL("ui-icon-white.png") + "')\");$('.ui-button-text, .accordion-header-text').css('text-shadow','2px 2px black');")
      //The following line sets the Command Bar Style
      JS.eval ("$('#txtCommand').css({'color':'white','outline':'1px solid black','background-image':\"url('http://soundimage.org/wp-content/uploads/2018/01/P1030524_Standard.jpg')\"});")
    </inituserinterface>
    <start type="script">
    </start>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <description>Texture Images by Eric Matyas from http://soundimage.org/</description>
    <beforeenter type="script">
    </beforeenter>
    <beforefirstenter type="script">
    </beforefirstenter>
    <firstenter type="script">
      JS.eval ("$('#txtCommand').css({'color':'white','outline':'1px solid black','background-image':\"url('http://soundimage.org/wp-content/uploads/2018/01/P1030524_Standard.jpg')\"});")
    </firstenter>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <exit alias="north" to="second room">
      <inherit name="northdirection" />
    </exit>
  </object>
  <object name="second room">
    <inherit name="editor_room" />
    <exit alias="south" to="room">
      <inherit name="southdirection" />
    </exit>
  </object>
  <turnscript name="cmdbar_customcss">
    <enabled />
    <script>
      JS.eval ("$('#txtCommand').css({'color':'white','outline':'1px solid black','background-image':\"url('http://soundimage.org/wp-content/uploads/2018/01/P1030524_Standard.jpg')\"});")
    </script>
  </turnscript>
  <function name="CustomCmdBarCss">
    JS.eval ("$('#txtCommand').css({'color':'lightgray','outline':'1px solid black','background-image':\"url('http://soundimage.org/wp-content/uploads/2018/01/P1030524_Standard.jpg')\"});")
  </function>
</asl>
```

---
Resources:

http://docs.textadventures.co.uk/quest/ui-javascript2.html

---
# UPDATE

To change more settings (including the text color):

```c#
JS.setInterfaceString ("TypeHereLabel", "What would you like to do?")
JS.eval ("$('#txtCommand').addClass('txt-command');")
JS.eval ("$('head').append('<style>.txt-command::-moz-placeholder{  color:white;}.txt-command:-ms-input-placeholder{ color:white;}.txt-command::-webkit-input-placeholder{ color:white;}</style>');")
JS.eval ("$('input#txtCommand').css({'color':'white','background':'black','outline':'1px solid blue'});")
JS.eval ("var setCommandBarStyleBak = setCommandBarStyle;setCommandBarStyle=function(){};")
```

---
## RELATED

[Command Prompt - Random Placeholders](Command-Prompt---Random-Placeholders)