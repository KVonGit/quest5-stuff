---
layout: index
title: Changes and additions by KV since 572
---

# FIXES

Entering the SAVE command online will no longer cause the on-screen text to be lost

Fixed bug in the JS ```playAudio()``` function that kept games from resuming after a synced sound had finished playing.
 

---

# OTHER CHANGES AND ADDITIONS

---
Quest now saves logs to "Documents\Quest Logs\" if log entries are added.

New LOG command to view the log in-game (even online).

```game.nohtmllog``` can be set to **True** to disable the in-game log.


---
Quest now saves transcripts to "Documents\Quest Transcripts\" if the transcript is enabled.

New command enables the transcript: SCRIPT;TRANSCRIPT;SCRIPT ON;TRANSCRIPT ON 

New command disables an enabled transcript:  SCRIPT OFF;TRANSCRIPT OFF

New command to view the transcript in-game (even online):  SHOW SCRIPT;VIEW TRANSCRIPT

```game.notranscript``` can be set to **True** to disable the transcript.

---
New RESTART command.

---
New JS dialog popup functions:

JS.showPopup("window title","window text")

JS.showPopupFullscreen("window title","window text")

JS.showPopupCustomWidth("window title","window text","width", "height")


---
New JS showScrollback() function displays all text printed during play in a dialog popup.

```JS.showScrollback()```

---
Quest now keeps track of the number of times objects have been successfully examined.

```object.timesexamined```

---
The **TAKE ALL** command has been modified to ignore any objects with the attribute ```not_all``` set to **True**.

---
New dictionary functions:

```DictionaryAdd``` works just like ```dictionary add```, except it will change a value if the key exists.

```DictionaryRemove``` works just like ```dictionary remove```, except it will not throw an error if the key does not exist.

---
Objects which are created as rooms in the editor now have the attribute ```isroom``` set to true.

This will allow us to use the new function ```AllRooms()```, which returns a list of all objects with ```isroom``` set to true.