# Setting up Quest Interval Functions (Version 2)

## **Base Setup**

### Add two functions

---
Create a function, naming it "CreateInterval".

Give it the parameters:  "name", "function", and "duration"

Put this for the script in code view:
```
JS.eval ("var "+name+" = setInterval(function(){ ASLEvent('"+function+"', '');}, "+duration+");")
```

That function will look like this in Full Code View:  

<details>

```
  <function name="CreateInterval" parameters="name, function, duration">
    JS.eval ("var "+name+" = setInterval(function(){ ASLEvent('"+function+"', '');}, "+duration+");")
  </function>
```

</details>


---
Create a second function, naming it "ClearInterval".

Give it the parameter: "name"

Put this for the script in code view:
```
JS.eval("clearInterval("+name+");")
```

That function will look like this in Full Code View:  

<details>

```
  <function name="ClearInterval" params="name">
    JS.eval ("clearInterval("+name+");")
  </function>
```

</details>


---
## **Time to add your own stuff!**

### Step 1

Create a function to be called by your interval.   (You can name the function whatever you like.)

**IMPORTANT: Be sure your function has ONE SINGLE PARAMETER!  Otherwise, nothing will work!**

I am creating a function called ```IntervalStuff```.  

I am calling my SINGLE PARAMETER ```bs```, because that's what it is.

**IMPORTANT:** I am setting ```game.suppressturnscripts``` to true, because calling a Quest function from Javascript would cause the turn script to fire an extra time otherwise.

Beyond that, I can do whatever I want in my function.  (In this case, though, I'm simply printing a message.)

```xml
  <function name="IntervalStuff" parameters="bs">
    game.suppressturnscripts = true
    msg ("You can print stuff or do anything else you'd like to do here.")
  </function>
```

---
### Step 2

#### Initiating the Interval

To make sure this works in saved games, we need to create our interval in User Interface Initialisation, which is run each time our game is loaded.

So, I make sure I check "Show advanced features for the game object."  Then, I add this to the User Interface Initialisation script (under 'Advanced scripts' on the game object):

```c
CreateInterval ("myInterval", "IntervalStuff", 30000)
```

I am naming my interval "myInterval" 

I am telling it to call the function ```IntervalStuff```

And it will run that function every 30,000 milliseconds, which is 30 seconds.

---
### Finally

To stop it from running:

```c
ClearInterval("myInterval")
```

NOTE:  My interval was named "myInterval".  You must use your interval's name here, and it is case-sensitive.


---
# Example game

<details>

```xml
<!--Saved by Quest 5.8.6703.19818-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Message Every 30 Seconds">
    <gameid>078ba543-579c-4697-b798-b0187f53f914</gameid>
    <version>2.0</version>
    <firstpublished>2018</firstpublished>
    <feature_advancedscripts />
    <inituserinterface type="script">
      CreateInterval ("myInterval", "IntervalStuff", 30000)
    </inituserinterface>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
  </object>
  <function name="IntervalStuff" parameters="param">
    game.suppressturnscripts = true
    msg ("You can print stuff or do anything else you'd like to do here.")
  </function>

  <function name="CreateInterval" parameters="name, function, duration">
    JS.eval ("var "+name+" = setInterval(function(){ ASLEvent('"+function+"', '');}, "+duration+");")
  </function>
  <function name="ClearInterval" params="name">
    JS.eval ("clearInterval("+name+");")
  </function>
</asl>
```

</details>


---
#### **References**

http://docs.textadventures.co.uk/quest/using_javascript.html

http://docs.textadventures.co.uk/quest/ui-callback.html

https://www.w3schools.com/jsref/met_win_setinterval.asp