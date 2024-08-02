This is a modified version of Quest 5.7.2.

You can download the zip and run Quest.exe directly from it, without altering your system.

...or you can install with quest573.exe.  This will NOT uninstall any current installation of Quest from your system, but it will take on the file associations (meaning it will take precedence over the normal version of Quest when opening files by double-clicking them).

---
My master library is automatically included in every game when using this mod.  You can remove it from the included libraries, save your game, then reload your game to exclude all of my library's additions.

**NOTE: My library is a combination of new code, modified settings/commands/functions, and a few of Pixie's libraries.**


---
The only changes other than my library concern font-size and word-wrap.  The font-size is larger in code-view, and word-wrap is enabled wherever possible.

---
<h1>KVMasterLib Features / Differences</h1>
<p>
<sub>Version: 1.0</sub>
</p>
<p>
<sub>Quest version: 5.7.2</sub>
</p>
<p>
<sub>Created in: Feb 2018</sub>
</p>
<br />
<hr />
<h3>ClockLib (by The Pixie) functionality is included by default.</h3>
<p>The default start time is 9 am.</p>
<p>You can enter the command "WAIT 10" to wait ten turns (or minutes, depending on your setup).  (Substitute 10 with whatever number you like.)</p>
<p>The command CLOCK will return the time.  (The command's name is "clock", if you'd like to remove this or alter its script.)</p>
<p>You can use IsAfter() to check the time in scripts.</p>
<p>Further info: <a target="_blank" href="https://github.com/ThePix/quest/wiki/Library:-Tracking-time">https://github.com/ThePix/quest/wiki/Library:-Tracking-time</a></p>
<hr />
<h3>NpcLib (by The Pixie) functionality is included by default.</h3>
<p>This is a mod of version 1.3.</p>
<p>The big differences are NpcFollow() and NpcUnfollow().</p>
<p>In this version, the NPC will follow the object until you call NpcUnfollow().</p>
<p>(Of course, changing their target does work without unfollowing.)</p>
<p>Further info: <a target="_blank" href="https://github.com/ThePix/quest/wiki/Library:-Independent-NPCs">https://github.com/ThePix/quest/wiki/Library:-Independent-NPCs</a></p>
<hr />
<h3>Changing or Setting Attributes from JS (without firing turn scripts)</h3>
<p>
<code>AslSet()</code>
</p>
<p>This Quest function is designed to be called from JS.</p>
<p>The parameter should be something like <code>player.odor=nice</code>.</p>
<p>You can also set multiple attributes by using <code>||</code> to separate them:
<code>player.odor=nice||sword.take=true||sword.takemsg=You pick it up.||sword.times_used=3_toInt||sword.sharpness=1.5_toDouble</code></p>
    <p>It works with the JS function <code>ASLSet()</code>.</p>
    <p>So, going by the first example here, you would put this line in JS:
<code>ASLSet("player.odor=nice");</code></p>
    <p>
      <strong>NOTE:</strong> This is using ASLEvent(), but not finishing a turn.</p>
    <p>
      <strong>NOTE2:</strong>  You can actually add this line to ANY script to keep the script from finishing a turn <code>game.suppressturnscripts = true</code>.</p>
    <p>
      <strong>NOTE3:</strong>  The <code>FinishTurn()</code> function was modified to make this work.</p>
    <hr />
    <h3>Real start time and date</h3>
    <p>Attributes are now set when the game first loads, setting the actual time and date.</p>
    <p>(This can be used to make ClockLib's clock start at the actual start time, among other things.)</p>
    <p>Use the function <code>SetJsTimeAndDate()</code> to update the real-time attributes.</p>
    <hr />
    <h3>Loading content (creating objects or changing settings) from an external file</h3>
    <p>Added a mod of The Pixie's file-loading code.</p>
    <p>You can add objects to the game, or you can change existing attributes.</p>
    <p>The command pattern is LOAD FILE #TEXT#.</p>
    <p>Info:
<a target="_blank" href="https://textadventures.co.uk/forum/quest/topic/np4q-x6_je_uw_aqk27zpq/creating-content-from-a-text-file-im-bringing-it-back">https://textadventures.co.uk/forum/quest/topic/np4q-x6_je_uw_aqk27zpq/creating-content-from-a-text-file-im-bringing-it-back</a></p>
    <hr />
    <h3>JS dialog popup functions</h3>
    <p>
      <code>showPopup(title, text)</code>
    </p>
    <p>This will create a dialog box (like an alert, but with whatever title you choose.</p>
    <p>There is also:
<code>showPopupCustomSize(title, text, width, height)</code> and <code>showPopupFullscreen(title, text)</code>.</p>
    <hr />
    <h3>Check if player is on mobile device</h3>
    <p>Check the JS boolean: <code>mobilePlayer</code></p>
    <hr />
    <h3>View the log from in-game (online or off)</h3>
    <p>Just enter LOG</p>
    <hr />
    <h3>View the transcript from in-game (online or off)</h3>
    <p>Just enter SCRIPT or TRANSCRIPT</p>
    <hr />
    <h3>Return a list of rooms</h3>
    <p>Any room created with my mod will have the boolean attribute <code>isroom</code> set to True.</p>
    <p>You can use the new function <code>AllRooms()</code> to return an object list of all objects with the <code>isroom</code> attribute set to True.</p>
    <hr />
    <h3>Times examined</h3>
    <p>The <code>lookat</code> script now increases the <code>timesexamined</code> count on an object each time said object is successfully examined.</p>
    <hr />
    <h3>Object excluded from TAKE ALL</h3>
    <p>Any object with attribute <code>not_all</code> set to true will not be included when the command is TAKE ALL.</p>
    <hr />
    <h3>Are you sure you want to quit?</h3>
    <p>It asks if you are sure when entering QUIT.  (This does not work when the ESCAPE key is pressed.)</p>
    <hr />
    <h3>New Command: VERSION</h3>
    <p>Prints game information.</p>
    <hr />
    <h3>New faux-command: RESTART</h3>
    <p>Prints "Try pressing CTRL+R"</p>
    <hr />
    <h3>New Command: ASK THE ROOM ABOUT</h3>
    <p>
      <code>ask about #TEXT#</code>
    </p>
    <hr />
    <h3>DbgLog() and DbgMsg()</h3>
    <p>These will only do something if <code>game.debugging</code> is set to True.</p>
    <hr />
    <h3>Function: SendToJsEval()</h3>
    <p>This strips line-breaks and notes from a string and runs it through <code>JS.eval()</code>.</p>
    <hr />
    <h3>Function: ReportBug()</h3>
    <p>This displays a nice form for the user to fill in, which links to the email address set on <code>game.mailto</code>.</p>
    <hr />
    <h3>Function: PlayLocalOgvVideo()</h3>
    <p>This plays a local .ogv video.</p>
    <hr />
    <h3>OPTION: Use the Oxford command</h3>
    <p>If you set <code>game.oxford_comma</code> to true, the Oxford comma will be used.</p>
    <hr />
    <h3>MORE Added Functions:</h3>
    <p>
      <code>IsEven()</code>
    </p>
    <p>
      <code>IsOdd()</code>
    </p>
    <p>
      <code>MakeCurrentExitsVisible()</code>
    </p>
    <p>
      <code>MakeCurrentExitsInvisible()</code>
    </p>
    <p>
      <code>SetMakeCurrentExitsInvisibleTimeout()</code>
    </p>
    <p>
      <code>SetHideCommandBarAndPanesTimeout()</code>
    </p>
    <hr />
    <h3>CHANGED DEFAULT SETTINGS</h3>
    <ul>
      <li>
        <p>The descriptions print in this order: ROOM NAME, DESCRIPTION, OBJECTS, EXITS</p>
      </li>
      <li>
        <p>The player's alias is YOU  (not ME)</p>
      </li>
      <li>
        <p>Game features now enabled:  Advanced Features, Ask/Tell, Light/Dark, Annotations</p>
      </li>
      <li>
        <p>autodescription_youarein_useprefix is set to False</p>
      </li>
      <li>
        <p>publishfileextensions: <em>.jpg;</em>.jpeg;<em>.png;</em>.gif;<em>.js;</em>.wav;<em>.mp3;</em>.htm;<em>.html;</em>.svg;<em>.txt;</em>.md;<em>.mp4;</em>.ogg;<em>.ogv</em>.pdf;*.css</p>
      </li>
      <li>
        <p>Added these attributes to the game:</p>
      </li>
    </ul>
    <pre>
      <code>        &lt;questkvmod /&gt;
        &lt;oxford_comma/&gt;
        &lt;turns type="int"&gt;0&lt;/turns&gt;
        &lt;save_transcript type="boolean"&gt;false&lt;/save_transcript&gt;
        &lt;notarealturn type="boolean"&gt;false&lt;/notarealturn&gt;
        &lt;debugging type="boolean"&gt;false&lt;/debugging&gt;
</code>
    </pre>
    <ul>
      <li>
        <p>Removed "Use" from default object inventory list</p>
      </li>
      <li>
        <p>Added <code>lastparent</code> attribute to default objects, which is set in the changedparent script</p>
      </li>
      <li>
        <p>
          <code>usedefaultprefix</code> is now set to false on all plural objects</p>
      </li>
    </ul>

---
# AUDIO/VIDEO FUNCTIONS
	
### PlayAudio (src)

Plays a sound.

---

### PlayAudioID (src, id)

Plays a sound with an assigned ID.

---

### PlayAudioLooped (src)

Plays a looped sound.

---

### PlayAudioLoopedID (src, id)

Plays a looped sound with an assigned ID.

---

### PlayAudioSynced (src)

Plays a sound which interrupts play until it has finished.

---

### PlayAudioSyncedID (src, id)

Plays a sound with an assigned ID which interrupts play until it has finished.

---

### PlayAudioSyncedWithCallback (src, callback)

Plays a sound which interrupts play until it has finished, upon which time it invokes a callback script.

---

### PlayAudioSyncedIDWithCallback (src, id, callback)

Plays a sound with an assigned ID which interrupts play until it has finished, upon which time it invokes a callback script.

---

### PlayAudioControls (src)

Plays a sound.

(The audio element will have controls displayed.)

---

### PlayAudioIDControls (src, id)

Plays a sound with an assigned ID.

(The audio element will have controls displayed.)

---

### PlayAudioLoopedControls (src)

Plays a looped sound.

(The audio element will have controls displayed.)

---

### PlayAudioLoopedIDControls (src, id)

Plays a looped sound with an assigned ID.

(The audio element will have controls displayed.)

---

### PlayAudioSyncedControls (src)

Plays a sound which interrupts play until it has finished.

(The audio element will have controls displayed.)

---

### PlayAudioSyncedIDControls (src, id)

Plays a sound with an assigned ID which interrupts play until it has finished.

(The audio element will have controls displayed.)

---

### PlayAudioSyncedWithCallbackControls (src, callback)

Plays a sound which interrupts play until it has finished, upon which time it invokes a callback script.

(The audio element will have controls displayed.)

---

### PlayAudioSyncedIDWithCallbackControls (src, id, callback)

Plays a sound with an assigned ID which interrupts play until it has finished, upon which time it invokes a callback script.

(The audio element will have controls displayed.)

---

### PlaySound (src, sync, loop, id, controls, addscript, callback)

Plays a sound.  (This function is for the GUI.  It is probably easier to use one of the functions listed above when actually coding.)

---

### AddVideo (src, sync, loop, id, controls, autoplay, addscript, callback)

Plays a video.

---

### HideVideo (id)

Hides a video.

---

### DestroyVideo (id)

Removes a video.

---

### DestroyAllVideos

Removes all videos.

---

### ShowHiddenVideo (id)

Shows a hidden video.

---

### PauseVideo (id)

Pauses a video.

---

### ResumePausedVideo (id)

Resumes a paused video.

---

### RestartPausedVideo (id)

Plays a paused video from the beginning.

---

### SetVideoCurrentTime (id, time)

Plays a video from the specified time.

---

### SetVideoWidth (id, width)

Sets the width of a video.

---

### CreateVideoID

Creates an ID for a video element and returns it as a string.

---

### SetVideoCallback (id, callback)

Adds a script which will be run when the video has finished playing to a dictionary named ```game.videofinishedcallback```.

---

### EndVideoSync (useless)

Called by JS to alert Quest that the video has finished playing.

NOTE: This causes a turn to finish if you have set this up online!

---

### EndVideoSyncAndInvoke (id)

Called by JS to alert Quest that the video has finished playing and runs the video's callback script.

NOTE: This causes a turn to finish if you have set this up online!

---

### DoVideoSync

Called internally to keep the player from entering commands during a sync.

---

### CreateAudioID

**Internal function**

Creates an ID and returns it as a string.

---

### SetAudioCallback

**Internal function**

Adds an entry to a script dictionary to be run when a sound finishes.

---

### DestroyAllAudio

Stops ALL audio.

---

### DestroyAudio (id)

Stops a sound.

---

### PauseAudio (id)

Pauses a sound.

#### See ResumePausedAudio and RestartPausedAudio.

---

### ResumePausedAudio (id)

Resumes a paused sound from its saved position.

---

### RestartPausedAudio (id)

Starts a paused sound from the beginning.

---

### PauseAllAudio

Pauses all sounds, saving the current position of each.

---

### RestartAllPausedAudio

Restarts all paused sounds, each from its saved position.

---

### SetAudioVolume (id, vol)

Sets the volume of a sound.

#### This must be a double, between 0.0 and 1.0.

---

### MuteAudio (id)

Mutes a sound and saves the current level before doing so.

#### See UnmuteAudio.

---

### UnmuteAudio (id)

Restores muted sound to its saved level.

---

### MuteAllAudio

Mutes all sounds, saving the current level of each before doing so.

#### See UnmuteAllAudio.

---

### UnmuteAllAudio

Restores all muted sounds, each to its saved level.

---

### SetAllAudioVolume (vol)

Sets the volume of every sound to one level.

#### This must be a double between 0.0 and 1.0.

---

### SetAudioCurrentTime (id, pos)

Sets the current time (or position) of a sound.

---

### IncreaseVolume (id)

Increases the volume of a sound by .1.

---

### DecreaseVolume (id)

Decreases the volume of a sound by .1.

---

### IncreaseAllVolume

Increases the volume of every sound by .1.

---

### DecreaseAllVolume

Decreases the volume of every sound by .1.

---

### DestroyAudioAndRunScript (id)

Stops a sound and runs its callback script.

---

### DoAudioSync

**Internal function**

This begins a simulated sync, stopping the player from entering commands.

#### See EndAudioSync and EndAudioSyncAndInvoke.

---

### EndAudioSync

**Internal function**

Ends a simulated sync, resuming play.

---

### EndAudioSyncAndInvoke (id)

Ends a simulated sync and runs a sounds callback script.

---

### GetSrc (src)

**Internal function**

Takes a formatted string fo audio sources and returns the HTML string.

---

### MobileCheck

**Internal function**

Adds a JS function to check for the mobile player.  If it returns true, audio controls are automatically shown.

---

### AddAudio (src)

**Internal function**

Adds a sound with no ID to the game and plays it.

---

### AddAudioID (src, id)

**Internal function**

Adds a sound with an assigned ID to the game and plays it.

---

# Debugging Functions


### AudioLog (text)

**Internal function.**

---

### TestAudio (src)

Tests whether a sound loads.

---

# CONCERNING THE DESKTOP PLAYER AND THE MP3 FORMAT

The desktop version of Quest will not play an .mp3 from an HTML audio element (as of version 5.7.2), but it will play an .ogg.

On the other hand, most modern browsers will play .ogg files, but Internet Explorer and Edge will not.  (I think Safari will play certain types of .ogg files, if you have the proper plugin, but I'm not certain.)

For more information concerning this:

https://en.wikipedia.org/wiki/HTML5_Audio#Supported_audio_coding_formats

As a "workaround", we can now include both formats.

```
PlayAudio("my-song.mp3;my-song.ogg")
```

---

# CONCERNING MOBILE BROWSERS

These new functions automatically add the audio controls to the screen if a check for a mobile browser returns ```true```. 

ALSO:  The player will have to actually press the play button for the sound to play, but looping and syncing should still work correctly.

---

# CONCERNING ASLEvents

As of Quest 5.7.2, calling an ```ASLEvent()``` from Javascript will run Quest's ```FinishTurn``` function, which calls ```RunTurnScripts````.

This means any of these functions with a callback script will cause your turn scripts to fire.  This is because there is an ```onended``` script set on the HTML audio element when we use a function which syncs and runs a script afterwards.  The only way for ```onended```, which is a JS function, to communicate with Quest is via ```ASLEvent()```.

Desktop users can simply modify the ```FinishTurn()``` function as a quick fix (this has already been done for you if you have the library), but online users cannot override functions.  If creating a game in the web editor, be sure to watch out for this, especially if the game keeps track of the player's turn count.



# **FOR DESKTOP USERS ONLY**

### It is possible to override the FinishTurn function to prevent turn scripts from firing on ASLEvents.

Copy the ```FinishTurn()``` function into your game and replace the entire script with this:

```
if (not HasAttribute(game, "noclear")){
  if (GetBoolean(game,"preventturnscripts")) {
	game.preventturnscripts = false
  }
  else {
	RunTurnScripts
  }
  UpdateStatusAttributes
  CheckDarkness
  UpdateObjectLinks
}
```