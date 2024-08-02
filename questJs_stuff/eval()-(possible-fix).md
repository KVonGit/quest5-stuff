Object names work differently in QuestJS.

```player``` is usually ```_obj395``` in QuestJS, but that just depends on the order of the objects in the game file.  If you want ```player``` in a QuestJS script, you must use ```GetObject("player")```.

Now, QuestJS converts everything correctly, as long as every instance of object names in scripts are not part of a string.  I.e., all instances of a ```player``` variable will be replaced with ```_obj395``` during the conversion.  BUT, if you have ```player``` in a string, like ```eval("player.name=\"player\"")``` or ```eval("StartsWith(\"player\", \"p\")")```, QuestJS will leave that alone, because it is within a string.

This is no good.  ```eval("StartsWith(\"player\", \"p\")")``` throws an error.  It needs to be ```eval("StartsWith(GetObject(\"player\"), \"p\")")``` for things to work correctly in a QuestJS game.



---
This is my current "fix":

```
var evalBak = eval

eval = function(data){
	try {
		return evalBak(data);
	}
	catch {
		for (o in allObjects){
			if(data.indexOf(allObjects[o].name) > -1){
				data = data.split(allObjects[o].name).join("GetObject(\""+allObjects[o].name+"\")");
			}
		}
		return evalBak(data);
	}
}
```