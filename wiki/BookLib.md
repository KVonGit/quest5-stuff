# BookLib

The library:

[BookLib.aslx](https://github.com/KVonGit/QuestStuff/blob/master/libraries/BookLib.aslx)

---
Once the library is included, you will see a new tab on objects:

![image](https://user-images.githubusercontent.com/30656341/37440654-90cb39ce-27cb-11e8-92b2-a15c1e38ad83.png)

---
You can select a "Book" type or a "Page" type.

![image](https://user-images.githubusercontent.com/30656341/37440693-be7b2294-27cb-11e8-8740-92000d3d8ba6.png)

---
### Creating a Book Type

Simply select "Book" from the dropdown.


![image](https://user-images.githubusercontent.com/30656341/37440728-00b8ac3a-27cc-11e8-87ec-ab9f9a19342c.png)

---
The object will be made openable/closable, and the READ verb will be added to it.

---
You can go to the object's "Container" tab to make things happen after opening or closing the book (or to lock it).

![image](https://user-images.githubusercontent.com/30656341/37440771-3e791cd0-27cc-11e8-8ade-c1e4e2a2cdac.png)

---
### Creating a Page Type

When creating a "Page" object, I highly recommend naming the object "Page 1" (using the appropriate page number).

Go to the "Book Options" tab, and select "Page" from the dropdown.

![image](https://user-images.githubusercontent.com/30656341/37440845-9c2529dc-27cc-11e8-8005-d10b3f5fc7c6.png)

---
Now you will see this screen:

![image](https://user-images.githubusercontent.com/30656341/37440833-89c534b2-27cc-11e8-86c9-9d708578b33a.png)

---
Fill in the page's text in the field.


---
If the page has a next page in the same book, you can check the box and select the object:

![image](https://user-images.githubusercontent.com/30656341/37440926-f4a80462-27cc-11e8-9cd0-ee92d50ddb2d.png)

---
The object will have READ and TURN verbs automatically added.

---
The ```look``` attribute on the object will be set to a script which runs the object's ```read``` script, whichprints the text in the field on the object's "Book Options" tab, then adds a "Next Page" link if the next page is set up.

Changing the ```look``` script (or changing it to plain text) shouldn't hurt anything.  I left it like it is so author's could easily customize that if they wished to do so.

---
### Adding/Removing Pages

To add a page, just move the object to the book object, and to remove a page, remove it from the book object.


---
### Example Game

[Play the example game.](http://textadventures.co.uk/games/view/tohyhdvvwkgqfh95zz77uw/booklib-tester)

The code:

```xml
<!--Saved by Quest 5.7.6606.27193-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <include ref="BookLib.aslx" />
  <game name="BookLib Tester">
    <gameid>b7403834-cb15-41c2-ab17-97571afb3aac</gameid>
    <version>0.0.1</version>
    <firstpublished>2018</firstpublished>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <object name="book">
      <inherit name="editor_object" />
      <inherit name="booktype" />
      <object name="Page 1">
        <inherit name="editor_object" />
        <inherit name="pagetype" />
        <hasnextpage />
        <pagetext><![CDATA[This is the first page of the book!<br/>]]></pagetext>
        <nextpage type="object">Page 2</nextpage>
      </object>
      <object name="Page 2">
        <inherit name="editor_object" />
        <inherit name="pagetype" />
        <pagetext><![CDATA[This is the second page of the book!<br/>]]></pagetext>
      </object>
    </object>
  </object>
</asl>
```