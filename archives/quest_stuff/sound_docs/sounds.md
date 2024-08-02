---
layout: index
title: Adding Sounds
---

### Using Quest's Built-in Script Commands to Add MP3 or WAV Files


#### Adding Sounds

You can add sounds to your game using the [```play sound```](http://docs.textadventures.co.uk/quest/scripts/play_sound.html) script command. 

![](play_a_sound.jpg)

---

This script supports both WAV and MP3 files, but it is recommended that you use MP3 files because these are more widely supported by web browsers on different platforms.

![](play_a_sound_GUI.jpg)

---

You can choose “Wait for sound to finish before continuing” if you want to run the remaining script only after the sound has finished. This is useful for intro sequences, or letting some speech finish before moving the player to a different room, for example.

---

Note that Quest won’t let you use both the “wait” and “loop” options at the same time, as this would create an infinite loop.

---

Also note that Quest will only play one sound at a time when using the ```play sound``` script command.  If you have a sound set to loop for ambience, playing a new sound will stop the current one!

---
#### Stopping Sounds

#### The ```stop sound``` script command

Sometimes, you need to stop a sound.  For instance the “loop” option will cause the sound to continue playing until the [```stop sound```](http://docs.textadventures.co.uk/quest/scripts/stop_sound.html) script command is run. 

![](stop_sound.jpg)

---

Another sure-fire way to stop a sound from playing is to use ```play sound``` to play another sound!  Quest will only play one sound at a time when using the ```play sound``` script command.

---

### Example Game

Let's see this in action.

We have an example game with a starting room called "Hub".  If the door is open in the hub, we can hear an ambient sound.

#### The Hub

We can set up an "After entering" script.  If the "Door" object is open, the sound "ambient sound.mp3" will play, and it will be set to loop.

Then, we set up an "After leaving" script, which stops the sound (because we can only hear that particular sound in the hub).


![](play_audio_example1_loop.jpg)

---

#### The Door

We set the Door up as a container, making it "Openable/Closable".  Then we set up the open and close scripts to play and stop the sound.

![](play_audio_example4_door.jpg)

---

#### A Silent Room

We also have a room called "Hall of Silence".

This one is easy.  We just add a 'stop sound' script command to the "Before entering" script on the room.

![](stop_audio_example1.jpg)


---

#### A Sound Playing Between Rooms

We have a third room called "Sound Effects Room", and a message plays before entering.

In this script, we're using the ```sync``` option to pause play until the sound has finished playing.

![](play_audio_example2_sync.jpg)


---

#### A Noise-making Object

Just for fun, we have a button.  We've set up a "Press" verb on the button so it plays a sound when pressed.

![](play_audio_example3_button.jpg)


---

Play the example game:

http://textadventures.co.uk/games/view/w1m_x18cmual0x11x098og/play-audio-example

---

The example game's code:

```
<!--Saved by Quest 5.7.6606.27193-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="play audio Example">
    <gameid>5355a3e6-f30e-4c19-b19e-67cb2c3c3a9d</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
  </game>
  <object name="Hub">
    <inherit name="editor_room" />
    <usedefaultprefix type="boolean">false</usedefaultprefix>
    <description><![CDATA[Not much here, besides the door, which can be noisy when left open.<br/>]]></description>
    <enter type="script">
      if (Door.isopen) {
        play sound ("ambient sound.mp3", false, true)
      }
    </enter>
    <beforeenter type="script">
    </beforeenter>
    <onexit type="script">
      stop sound
    </onexit>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <object name="Door">
      <inherit name="editor_object" />
      <inherit name="openable" />
      <feature_container />
      <isopen />
      <displayverbs type="stringlist">
        <value>Look at</value>
        <value>Open</value>
        <value>Close</value>
      </displayverbs>
      <look>It is {if Door.isopen:open, and needs to be }closed.</look>
      <closescript type="script">
        this.isopen = false
        msg ("It is now closed.")
        stop sound
      </closescript>
      <openscript type="script">
        this.isopen = true
        msg ("It is now open.")
        play sound ("ambient sound.mp3", false, true)
      </openscript>
    </object>
    <exit alias="east" to="Hall of Silence">
      <inherit name="eastdirection" />
    </exit>
  </object>
  <object name="Sound Effects Room">
    <inherit name="editor_room" />
    <description><![CDATA[Nothing in here but a button.<br/>]]></description>
    <beforeenter type="script"><![CDATA[
      msg ("<br/>Just before entering the room, you pause to listen to an announcement...<br/>")
      play sound ("announcement.mp3", true, false)
    ]]></beforeenter>
    <exit alias="west" to="Hall of Silence">
      <inherit name="westdirection" />
    </exit>
    <object name="sound effect button">
      <inherit name="editor_object" />
      <displayverbs type="stringlist">
        <value>Look at</value>
      </displayverbs>
      <takemsg>It is fixed in place.</takemsg>
      <look>It's just an ordinary-looking sound effect button.</look>
      <press type="script">
        msg ("You press it.")
        play sound ("snd effect.mp3", false, false)
      </press>
    </object>
  </object>
  <verb>
    <property>press</property>
    <pattern>press</pattern>
    <defaultexpression>"You can't press " + object.article + "."</defaultexpression>
  </verb>
  <object name="Hall of Silence">
    <inherit name="editor_room" />
    <description><![CDATA[There are no in-game sounds in the Hall of Silence.<br/>]]></description>
    <beforeenter type="script">
      stop sound
    </beforeenter>
    <exit alias="west" to="Hub">
      <inherit name="westdirection" />
    </exit>
    <exit alias="east" to="Sound Effects Room">
      <inherit name="eastdirection" />
    </exit>
  </object>
</asl>
```


---

### Using HTML Audio Elements


Playing .ogg files requires a bit more coding, but it can be done.

Using an HTML audio tag is the easiest way to handle this, and it will allow you to use whatever file format you like.

---

The most basic example of an audio tag:

```<audio src='YOUR_URL_GOES_HERE' autoplay />```

For more information:

https://www.w3schools.com/html/html5_audio.asp

---

When using a local audio file in Quest, we need to use [```GetFileURL()```](http://docs.textadventures.co.uk/quest/functions/getfileurl.html) to retrieve our local file's URL.

This will find the correct path to the file, whether we are using the desktop player or the web player.

```
src = GetFileURL("snd effect.ogg")
msg ("<audio src='" + src + "' autoplay/>")
```

---

**NOTES:**  

The file "snd effect.ogg" is in my game's main folder.

I also had to add ";*.ogg" to the end of the string attribute ```game.publishfileextensions``` so Quest would include the file when publishing the game.  Otherwise, it would not work because the file would not be present.

For more on the file extensions included in your game, see the 'A Note on The Publish Process' section on this page:

http://docs.textadventures.co.uk/quest/tutorial/releasing_your_game.html


---

To simulate the “Wait for sound to finish before continuing” option when adding sounds to your game via HTML audio elements, see the end of this document.

---

You can also use an HTML audio tag to play audio from an external site, which will help you keep your game under the site's maximum upload size. Everything works the same way, you just use the actual URL instead of ```GetFileURL()```.

Here's an example with an actual URL:

```
src = "http://media.textadventures.co.uk/games/1RurGHLuLUqrWdMJh53LTQ/bushcave-explicit-r9/sounds/bushcave.ogg"
msg ("<audio src='" + src + "' autoplay>")
```

(For more on the maximum upload size, see the last section on this page:

http://docs.textadventures.co.uk/quest/publishing.html)


---

### Adding Controls

You can add ```controls``` to the tag, giving the player an option to play or pause the sound at will.

```
src = GetFileURL("snd effect.ogg")
msg ("<audio src='" + src + "' autoplay controls />")
```

This will look like so: 


 <audio controls ><source src="snd effect.ogg" type="audio/ogg"><source src="snd effect.mp3" type="audio/mp3"> ![](audio_controls.jpg)</audio>
 
 
**NOTE:**

If you were to add the ```controls``` option, you could remove ```autoplay```, making it so the player would have to press 'Play'.

---

### Looping HTML Audio

You can also add a ```loop``` option, if you wish.  (Guess what this does!)

```
src = GetFileURL("snd effect.ogg")
msg ("<audio src='" + src + "' autoplay loop />")
```

---

If you choose to loop your audio, you will probably need a way to stop the sound.

Like everything else, there are numerous ways to handle this.

---

### Controlling HTML Audio with JS (Stopping, Pausing, and Playing)


The easiest to stop a sound would be removing ALL audio tags from the game.  This can be handled [using Javascript](http://docs.textadventures.co.uk/quest/using_javascript.html) via ```JS.eval()```.

(NOTE: This will completely remove any HTML audio tags you have added to the game!)

```
JS.eval("$('audio').remove();")
```

---

### Using an ID to Control a Specific Audio Element


An alternate approach would be assigning an ID to the audio element.

This can be done like so:

```
src = GetFileURL("snd effect.ogg")
msg ("<audio id='html-audio' src='" + src + "' autoplay loop />")
```

Once you have assigned an ID, you can actually pause the audio like this:

```
JS.eval("document.getElementById('html-audio').pause();")
```

---

After pausing, you could resume like this:

```
JS.eval("document.getElementById('html-audio').play();")
```

---

You could also remove just that audio element:

```
JS.eval("$('#html-audio').remove();")
```

---

### Browser Compatibility


Another thing to worry about is browser compatibility.  

Some older browsers might not play the .ogg format, and others might not play .mp3.

The desktop version of Quest will not play an .mp3 from an HTML audio element (as of version 5.7.2), but it will play an .ogg.

On the other hand, most modern browsers will play .ogg files, but Internet Explorer and Edge will not.  (I think Safari will play certain types of .ogg files, if you have the proper plugin, but I'm not certain.)

For more information concerning this:

https://en.wikipedia.org/wiki/HTML5_Audio#Supported_audio_coding_formats

---

As a "workaround", you can include both formats.

```
s = "<audio autoplay>"
s = s + "<source src='" + GetFileURL("snd effect.ogg") + "' type='audio/ogg' >"
s = s + "<source src='" + GetFileURL("snd effect.mp3") + "' type='audio/mp3' >"
s = s + "Your browser does not support the audio tag.</audio>"
msg (s)
```

---

### Mobile Browsers

Also, if you want things to work in a mobile browser, you MUST include the ```controls``` option!

(The ```autoplay``` option will do nothing in a mobile browser, by the way.  The player must actually press 'play' on a mobile device.)

---

There is a way to check for the mobile player using Javascript.

Add this to the start script:

```
js = "function isMobilePlayer(){"
js = js + "if (typeof(currentTab) === 'string'){"
js = js + "return true;}return false;};"
JS.eval (js)
```

With that JS function now included, you can add the audio to your script like this:

```
src = GetFileURL("snd effect.ogg")
JS.eval ("var controlsOpt = '';if(isMobilePlayer()){controlsOpt = 'controls';}")
JS.eval ("addText (\"<audio autoplay \" + controlsOpt + \" src='" + src + "' />\");")
```

If the game is loaded in the mobile player, the JS variable ```currentTab``` will be a string, and the controls will be displayed.  If ```currentTab``` is not a string, the controls will not be displayed.

You can see this in action in the example game to which there is a link in the next section.


---

### Playing Multiple Sounds Simultaneously


Sometimes, you may want to play two sounds at once.

Here is an example game that does just that.  (The game's code is in the listing's description.)

http://textadventures.co.uk/games/view/ro3fkuza30ee6ya-clhega/two-sounds-and-a-cup

NOTE:  There are two sounds in the game.  One sound (listening to the cup) is triggered with a ```play sound``` script command, and this does not work in a mobile browser.  The other sound (shaking the cup) is added to the game using the method I just described, and it works in any player.

---

The code in that game is based on this:

https://textadventures.co.uk/forum/general/topic/4632/pointers-for-where-to-start-studying-code-used-in-quest#30515




---

### Creating Functions


Nobody enjoys writing the same code repeatedly, so we have created a few functions you can add to your game.

If you're using the desktop version of Quest, you can download the library which contains all of these functions.  The link can be found near the end of this document.

If you're using the web player, let's get to work!


---

### The Functions

---

Create a function and give it the name: ```PlayHtmlAudio```

Add the following parameters, in this order:  ```src```, ```sync```, ```loop```

(This function has no return type, so don't worry about that.)

For the script, paste this into code view:

```
if ((sync) and loop) {
  error ("Attempted to sync looped audio.")
}
if ((sync) and GetBoolean(game,"audiosyncing")) {
  error ("Can only sync one audio file at a time.")
}
if (not HasAttribute(game,"audiofilesplayed")) {
  game.audiofilesplayed = 0
}
looped = ""
if (loop) {
  looped = "loop"
}
s = Chr(60)+"audio style='display:none;' "
s = s + "id='audio-"+game.audiofilesplayed+"' "
s = s + "src='"+src+"' "+ looped
s = s + " autoplay/"+Chr(62)
JS.eval("$('body').after('"+s+"');")
if (sync) {
  game.preventturnscripts = true
  DoSync
  js = "$('#audio-"+game.audiofilesplayed+"').on('ended', function() "
  js = js + "{ASLEvent('EndSync','');});"
  JS.eval (js)
}
game.audiofilesplayed = game.audiofilesplayed + 1
```
  
---

Now create a new function, naming it: ```DoSync```

(It has no parameters or return type.)

Paste this script into code view:

```
firsttime {
  JS.eval ("var sendCommandBak = sendCommand;")
}
game.audiosyncing = true
JS.eval ("sendCommand = function(){$('input#txtCommand').val();};")
```
  
---

Create the function:  ```EndSync```

Add one parameter:  ```bool```

(It has no return type.)

Paste this script into code view:

```
game.audiosyncing = false
js = "if (typeof(sendCommandBak) === 'function')"
js = js + "{sendCommand = sendCommandBak;}"
JS.eval (js)
```
  
---
  
Create the function:  ```StopAllAudio```

(It has no parameters or return type.)

Paste this script into code view:

```
stop sound
JS.eval ("$('audio').remove();")
EndSyncAnd
```
  
---
  
Create the function: ```PlayHtmlAudioSyncedWithScript```

Add the parameters:  ```src```, ```callback```

(There is no return type.)

Paste this script into code view:

```
if (not HasAttribute(game,"audiofilesplayed")) {
  game.audiofilesplayed = 0
}
s = Chr(60)+"audio style='display:none;'"
s = s + " id='audio-" + game.audiofilesplayed + "'"
s = s + " src='" + src + "'autoplay/"+Chr(62)
JS.eval("$('body').after('"+s+"');")
game.preventturnscripts = true
DoSync
js = "$('#audio-"+game.audiofilesplayed+"').on('ended', function() "
js = js + "{ASLEvent('EndSyncAnd','');});"
JS.eval (js)
game.audiofinishedcallback = callback
game.audiofilesplayed = game.audiofilesplayed + 1
```
  
---

Finally, create the function:  ```EndSyncAnd```

Add the parameter:  ```bool```

(There is no return type.)

Paste this script into code view:

```
game.audiosyncing = false
js = "if (typeof(sendCommandBak) === 'function')"
js = js + "{sendCommand = sendCommandBak;}"
JS.eval (js)
if (HasAttribute(game, "audiofinishedcallback")){
  if (HasAttribute(game, "audiofinishedcallback")){
    invoke (game.audiofinishedcallback)
  }
  game.audiofinishedcallback = null
}
```



---

This is all set up so the ```PlayHtmlAudio()``` function behaves similarly to ```play sound``` when setting ```sync``` to ```true``` (which doesn't let the player do anything until the sound is over).


---

You can now use this function (among others):

```
PlayHtmlAudio(url, sync, loop)
```

---

EXAMPLES:

To loop a sound:

```
src = "http://media.textadventures.co.uk/games/1RurGHLuLUqrWdMJh53LTQ/bushcave-explicit-r9/sounds/bushcave.ogg"
PlayHtmlAudio (src, false, true)
```

---

To play a sound and prevent the player from entering a command until it has finished playing:

```
src = "http://media.textadventures.co.uk/games/1RurGHLuLUqrWdMJh53LTQ/bushcave-explicit-r9/sounds/bushcave.ogg"
PlayHtmlAudio (src, true, false)
```
---

### Using PlayHtmlAudioSyncedWithScript


NOTE: Everything does not behave EXACTLY like ```play sound``` when using the ```PlayHtmlAudio()``` function with ```sync``` set to ```true```!!!

E.g., with the following script command, the message will not print until the sound is finished:

```
play sound("myfile.mp3", true, false)
msg ("The sound is finished playing.")
```


This is NOT the case when using ```PlayHtmlAudio()``` with ```sync``` set to ```true```!

When using ```PlayHtmlAudio()```, Quest will immediately print that message!  In fact, it will do anything else which is scripted after this function has been called, but it will not let the player do anything until the sound has finished.

Sometimes this is acceptable, but sometimes it's not.

So, we have ```PlayHtmlAudioSyncedWithScript()``` to make things happen after the sound has finished playing.

To use it:

```
src = "http://media.textadventures.co.uk/games/1RurGHLuLUqrWdMJh53LTQ/bushcave-explicit-r9/sounds/bushcave.ogg"
PlayHtmlAudioSyncedWithScript (src) {
  msg ("DONE.")
}
```

---

Note that this is set to ```sync``` by default, and you must enter a script, just like you would with [```ShowMenu()```](http://docs.textadventures.co.uk/quest/functions/showmenu.html).

If there is ANYTHING you don't wish to happen until after the sound has finished, you must use this to trigger it.

---

This will not stop you from entering rooms!

If you set this up in a start script or a ```beforeenter``` script, the room WILL be entered before the sound has finished playing!  (This means the room description will print, and any script set to fire upon entering will fire!)

To get around this, you could create a blank room, moving the player to it before playing the sound.  Then, move the player to the real room in the ```PlayHtmlAudioSyncedWithScript()``` function's script.

There are surely other ways to manipulate things.  Just be creative!

To learn more about the order in which scripts run (and when they will run), see:

http://docs.textadventures.co.uk/quest/blocks_and_scripts.html



---

### A WARNING Concerning the ASLEvent()

As of Quest 5.7.2, calling an ```ASLEvent()``` from Javascript will fire all enabled turn scripts!!!

This only concerns you if you use the function ```PlayHtmlAudioSyncedWithScript()```!

We can get around this with the desktop editor, but we cannot using the web editor.  (Sorry, online users!  I believe this will be possible for you in the next update, if that's any consolation.)

#### **For Desktop Users Only**

The ```FinishTurn()``` function can be modified so the turn scripts will not fire when we are calling an [```ASLEvent()```](http://docs.textadventures.co.uk/quest/ui-callback.html) from Javascript while ```game.preventturnscripts``` is set to ```true```.

If you have been adding these functions manually you will need to do this.  If you will be using HtmlAudioLib, this is already included.

To do this, we can override the function.

For information concerning overriding functions, see:

http://docs.textadventures.co.uk/quest/overriding.html


---

#### Overriding FinishTurn **(Desktop Only)**


At the bottom left of the editor, click on “Filter”and select “Show Library Elements”. 

Find the ```FinishTurn``` function and click the "Copy" button so the function can be modified.

Open the script in code view, delete everything that is currently there, replacing it with this:

```
if (GetBoolean(game,"preventturnscripts")) {
  game.preventturnscripts = false
}
else {
  RunTurnScripts
}
UpdateStatusAttributes
CheckDarkness
UpdateObjectLinks
```

---

### Link to the library:

[HtmlAudioLib.aslx](https://github.com/KVonGit/QuestStuff/blob/master/libraries/HtmlAudioLib.aslx)

---