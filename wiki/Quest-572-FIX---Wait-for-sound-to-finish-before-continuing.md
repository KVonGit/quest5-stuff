# When playing a sound and selecting "Wait for sound for finish before continuing", online games crash.

This should be taken care of in the next update.  Until then, you can follow these steps:

---
The easiest thing would probably be pasting this into the game's User Interface Initialisation script:

```C#
JS.eval ("var showCommandDiv = isElementVisible('#txtCommandDiv');function playAudio(filename, format, sync, looped) {_currentPlayer = 'jplayer';$('#jquery_jplayer').unbind($.jPlayer.event.ended);if (looped) {endFunction = function () { $('#jquery_jplayer').jPlayer('play'); };}else if (sync) {showCommandDiv = isElementVisible('#txtCommandDiv');_waitingForSoundToFinish = true;endFunction = function () { finishSync(showCommandDiv); };$('#txtCommandDiv').hide();}else {endFunction = null;}if (endFunction != null) {$('#jquery_jplayer').bind($.jPlayer.event.ended, function (event) { endFunction(); });} if (format == 'wav') $('#jquery_jplayer').jPlayer('setMedia', { wav: filename });if (format == 'mp3') $('#jquery_jplayer').jPlayer('setMedia', { mp3: filename });$('#jquery_jplayer').jPlayer('play');};")
```

---
# Where to add it, exactly?

[![](https://user-images.githubusercontent.com/30656341/37245312-cea5dbe6-245b-11e8-8a8a-6ad194c2fcd4.gif)](https://user-images.githubusercontent.com/30656341/37245312-cea5dbe6-245b-11e8-8a8a-6ad194c2fcd4.gif)