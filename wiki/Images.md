# Adding Images

To add an image via HTML, we need a url.

If we are using online images, that is easy.  We've already got the url.

If using local files, we simply:

- Make sure the image file is in the game's directory
- Use ```GetFileURL("image_name.png")``` to retrieve the url (substituting the actual file's name for image_name.png).


An image tag looks like this:
```html
<img src="https://whatever.com/image_name.png" />
```

To enter that into code view (or as an expression), we will need to either change those double quotation marks to single quotation marks or escape them with backslashes to avoid errors.  I prefer to go with single quotation marks.

```c#
msg("<img src='https://whatever.com/image_name.png' />")
```

Now, to do the same thing, only using a variable, we could do this:
```c#
s = "https://whatever.com/image_name.png"
msg ("<img src='" + s + "' />")
```

It would now be easy to change the file to a local one:
```c#
s = GetFileURL("image_name.png")
msg ("<img src='" + s + "' />")
```

In fact, a function may be in order.

#### Create a function named: ```PrintImage```
#### Add the parameter: ```s```
#### Then, paste this into the script in code view:
```c#
msg ("<img src='" + s + "' />")
```

Now, we can do this:
```PrintImage(GetFileURL("image_name.png"))```

---

If we wished to get really fancy, we could make a function which returned a string:

#### Create a function named: ```GetImgTag```
#### Set the return type to: ```string```
#### Add the parameter: ```s```
#### Then, paste this into the script in code view:
```c#
return ("<img src='" + s + "' />")
```

Now, we could do something silly like this:

```c#
msg("You see a picture: "+GetImgTag("image_name.png")+"<br/><br/>It looks like someone familiar.")
```

To do the same thing with a variable:

```c#
pic = GetImgTag("image_name.png")
msg("You see a picture: " + pic + "<br/><br/>It looks like someone familiar.")
```