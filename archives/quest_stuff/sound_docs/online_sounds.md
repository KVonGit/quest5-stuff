---
layout: index
title: Adding Online Sounds
---

There are a few ways you can add sounds from an external source.

Using an HTML audio tag is the easiest way to handle this, and it will allow you to use whatever file format you like.

---
The most basic example of an audio tag:
```<audio src='YOUR_URL_GOES_HERE' autoplay />```

If you go this route, be sure to include ```autoplay```.  (If you don't the sound will not play!)


Here's an example with an actual URL:
```
msg ("<audio src='http://media.textadventures.co.uk/games/1RurGHLuLUqrWdMJh53LTQ/bushcave-explicit-r9/sounds/bushcave.ogg' autoplay>")
```

---
You can add ```controls``` to the tag, giving the player an option to play or pause the sound at will.

```
msg ("<audio src='http://media.textadventures.co.uk/games/1RurGHLuLUqrWdMJh53LTQ/bushcave-explicit-r9/sounds/bushcave.ogg' autoplay controls />")
```

This will look like so:  ![](audio_controls.jpg)

If you were to add the ```controls``` option, you could remove ```autoplay```, making it so the player would have to press 'Play'.

---
You can also add a ```loop``` option, if you wish.  (Guess what this does!)
```
msg ("<audio src='http://media.textadventures.co.uk/games/1RurGHLuLUqrWdMJh53LTQ/bushcave-explicit-r9/sounds/bushcave.ogg' autoplay loop />")
```

---
If you choose to loop your audio, you will probably need a way to stop the sound.

Like everything else, there are numerous ways to handle this.

---
The easiest would be removing ALL audio tags from the game.  This can be handled using ```JS.eval()```.

(NOTE: This will completely remove any HTML audio tags you have added to the game!)

```
JS.eval("$('audio').remove();")
```

---
An alternate approach would be assigning an ID to the audio element.

This can be done like so:
```
msg ("<audio id='html-audio' src='http://media.textadventures.co.uk/games/1RurGHLuLUqrWdMJh53LTQ/bushcave-explicit-r9/sounds/bushcave.ogg' autoplay loop />")
```

Once you have assigned an ID, you can actually pause the audio like this:
```
JS.eval("document.getElementById('html-audio').pause();")
```

---
After pausing, you could resume like this:
```
JS.eval("document.getElementById('html-audio').play()')
```

---
WARNING: Some browsers will only handle specific file formats!

Including an .ogg and an .mp3 is probably wise, as this will handle most browsers.


```
msg ("Playing audio file 2...<audio autoplay><source src=\"" + GetFileURL("SOUNDEFFECT1.ogg") + "\" type=\"audio/ogg\" /><source src=\"" + GetFileURL("SOUNDEFFECT1.mp3") + "\" type=\"audio/mp3\"/>Your browser does not support the audio tag.</audio>")
```

For more info concerning this:
https://en.wikipedia.org/wiki/HTML5_Audio#Supported_audio_coding_formats

---
This will not give you the option to pause play until the audio has finished.

