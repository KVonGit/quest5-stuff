### How to use:

Example:

```c#
FadeInTextWithDelayAndID ("Welcome to the game!", 2, "fadein1")
SetTimeout (3) {
  FadeOutElementWithDelay ("#fadein1", 3)
}
```

---
### The functions:

```xml
  <function name="FadeOutElement" parameters="element">
    JS.eval ("$(\""+element+"\").fadeOut();")
  </function>
```
```xml
  <function name="FadeOutElementWithDelay" parameters="element, interval">
    interval = interval * 1000
    JS.eval ("$(\""+element+"\").fadeOut(parseInt("+interval+"));")
  </function>
```
```xml
  <function name="FadeInText" parameters="text"><![CDATA[
    if (not HasAttribute(game, "texts_faded_in_count")) {
      game.texts_faded_in_count = 0
    }
    game.texts_faded_in_count = game.texts_faded_in_count + 1
    msg ("<span id=\"fade-in-div"+game.texts_faded_in_count+"\" style=\"display:none\">"+text+"</span>")
    JS.eval ("$(\"#fade-in-div"+game.texts_faded_in_count+"\").fadeIn();")
  ]]></function>
```
```xml
  <function name="FadeInTextWithDelay" parameters="text, interval"><![CDATA[
    interval = interval * 1000
    if (not HasAttribute(game, "texts_faded_in_count")) {
      game.texts_faded_in_count = 0
    }
    game.texts_faded_in_count = game.texts_faded_in_count + 1
    msg ("<span id=\"fade-in-div"+game.texts_faded_in_count+"\" style=\"display:none\">"+text+"</span>")
    JS.eval ("$(\"#fade-in-div"+game.texts_faded_in_count+"\").fadeIn(parseInt("+interval+"));")
  ]]></function>
```
```xml
  <function name="FadeInTextWithID" parameters="text, id"><![CDATA[
    if (not HasAttribute(game, "texts_faded_in_count")) {
      game.texts_faded_in_count = 0
    }
    game.texts_faded_in_count = game.texts_faded_in_count + 1
    msg ("<span id=\""+id+"\" style=\"display:none\">"+text+"</span>")
    JS.eval ("$(\"#"+id+"\").fadeIn();")
  ]]></function>
```
```xml
  <function name="FadeInTextWithDelayAndID" parameters="text, interval, id"><![CDATA[
    interval = interval * 1000
    if (not HasAttribute(game, "texts_faded_in_count")) {
      game.texts_faded_in_count = 0
    }
    game.texts_faded_in_count = game.texts_faded_in_count + 1
    msg ("<span id=\""+id+"\" style=\"display:none\">"+text+"</span>")
    JS.eval ("$(\"#"+id+"\").fadeIn(parseInt("+interval+"));")
  ]]></function>
```
```xml
  <function name="FadeInTextWithClass" parameters="text, class"><![CDATA[
    if (not HasAttribute(game, "texts_faded_in_count")) {
      game.texts_faded_in_count = 0
    }
    game.texts_faded_in_count = game.texts_faded_in_count + 1
    msg ("<span class=\""+class+"\" style=\"display:none\">"+text+"</span>")
    JS.eval ("$(\"."+class+"\").fadeIn();")
  ]]></function>
```
```xml
  <function name="FadeInTextWithDelayAndClass" parameters="text, interval, class"><![CDATA[
    interval = interval * 1000
    if (not HasAttribute(game, "texts_faded_in_count")) {
      game.texts_faded_in_count = 0
    }
    game.texts_faded_in_count = game.texts_faded_in_count + 1
    msg ("<span class=\""+class+"\" style=\"display:none\">"+text+"</span>")
    JS.eval ("$(\"."+class+"\").fadeIn(parseInt("+interval+"));")
  ]]></function>
```