# This can be used for things like anonymous letters.

### **Enable the advance scripts feature in your game (if you haven't already done so).**

---
### **In "User Interface Initialisation", add this:**

```c#
// Edit this list to include/exclude any font from fonts.google.com.
// Mind your capitalization and spacing!!!
game.webfonts = Split("Chicle;Indie Flower;Anton;Lobster;Press Start 2P")
foreach (font, game.webfonts) {
  SetWebFontName (font)
}
// Assuming your initial font is the default font, and not a web font.  If not, change the next line.
SetFontName (game.defaultfont)
// If your initial font is a web font, and you set it up in the editor (or before this script),  uncomment the next line.
//SetWebFontName(game.defaultwebfont)
```

---
This needs to be in the User Interface Initialisation script because this will load your fonts any time the game is loaded, whether it is a saved game or a new game.

If you were to put this script anywhere else (like the start script), the fonts would not preload when loading a saved game.


---
### **Add these functions to your game in full code view:**

```xml
  <function name="RandomFontMsg" parameters="txt"><![CDATA[
    msg(RandomizeFont(txt))
  ]]></function>
  <function name="RandomizeFont" parameters="txt" type="string"><![CDATA[
    textarray = Split(txt, " ")
    s= ""
    foreach (a, textarray) {
      s = s + "<span style='font-family:" + PickOneString (game.webfonts) + ";'>" + a + " </span>"
    }
    return (s)
  ]]></function>
```

---

The function will split the text you feed it at each space, and print each item from the list with a random font, which is selected from ```game.webfonts``` (from your User Interface Initialisation script).

---
### **To use it:**

```c#
RandomFontMsg ("No!  I am your father!")
```

<image style='box-shadow:0 0 12px black;border:1px solid black' src='https://user-images.githubusercontent.com/30656341/38063086-e7cbd78c-32bc-11e8-834d-027b10375793.png'/>