## Using the URL file Parameter

If you don't care about saving progress in games, an easy way to have your own server to play your games from its own local drive would be to simply use the URL with `&file=` followed by the path to the game file.

You can do this without modifying any source code. You'd only need to successfully build Quest (the Debug and the Release) in Visual Studio and create a **WebPlayerSettings.xml** file (mostly copied from [WebPlayerSettings.Default.xml](https://github.com/textadventures/quest/raw/refs/heads/master/WebPlayer/WebPlayerSettings.default.xml), which is included the textadventures/quest repo on GitHub).

---
Let's go through that file, bit by bit.

```xml
<!-- After entering settings, this file should be saved as WebPlayerSettings.xml -->
```

This line speaks for itself.

---
Lines 6 & 7 must be set to proper paths. This is what is in that file by default:

```xml
  <add key="GameFolder" value="C:\Games\"/>
  <add key="LibraryFolder" value="C:\Libraries\"/>
```

Assuming you are using IIS Manager on Windows to host the WebPlayer app, your library folder should ***probably*** be something like this:

```xml
  <add key="LibraryFolder" value="C:\inetpub\WebPlayer\bin\x86\Release\Core\"/>
```

I have no clue where you might possibly put your game files, but it will probably (maybe) be something like this:
```xml
  <add key="GameFolder" value="C:\inetpub\WebPlayer\games\"/>
```

---
We'll skip over the next 2 lines which concern logging, because logging will not be necessary.

```xml
  <!-- To enable logging, uncomment this line, and create a log config XML like the one below -->
  <!-- <add key="LogConfig" value="C:\Path\To\Config\File\logging.xml"/> -->
```

---
We won't need to alter anything from this section, either:

```xml
  <!-- PLUGINS -->
  
  <!-- To enable loading a file by ID, specify the type name of a class that implements IFileManager -->
  <!-- <add key="FileManagerType" value="SomeFileManager.FileManager, SomeFileManager"/> -->
  <!-- <add key="GameSaveFolder" value="C:\Path\To\Save Game Folder"/> -->
```

---
The next bit is where we'll make changes.

```xml
  <!-- DEBUG PLUGINS -->

  <!-- OR, when debugging, use the Debug Plugins -->
  <!-- <add key="SessionManagerType" value="WebPlayer.DebugSessionManager, WebPlayer"/> -->
  <!-- <add key="FileManagerType" value="WebPlayer.DebugFileManager, WebPlayer"/> -->
  <!-- <add key="GameSaveFolder" value="C:\Path\To\Save Game Folder"/> -->
  <!-- <add key="DebugFileManagerFile" value="C:\Path\To\some game file.aslx"/> -->
  <!-- <add key="DebugFileManagerSaveFile" value="C:\Path\To\some game file.quest-save"/> -->
```

---
The SessionManagerType and FileManagerType lines both need to be uncommented. (To do this, we remove the surrounding `<!-- -->`.)

The values are both correct. All we need to do is uncomment.

Those 2 lines should now look like this:

```xml
  <add key="SessionManagerType" value="WebPlayer.DebugSessionManager, WebPlayer"/>
  <add key="FileManagerType" value="WebPlayer.DebugFileManager, WebPlayer"/>
```

---
The only other thing we need to do is set a DebugFileManagerFile value (and to be honest we could probably skip this step, but setting this to a valid path to a real game file is definitely a good idea, just in case.)

```xml
<!-- <add key="DebugFileManagerFile" value="C:\Path\To\some game file.aslx"/> -->
```

So, ***assuming*** you have your game files in `C:\inetpub\WebPlayer\games\`, you would need to pick a game file from that folder as the "default" game. My example game is named **vorple.quest**, and I have placed it in `C:\inetpub\WebPlayer\games\`.

In this case, we'd change that line to:

```xml
  <add key="DebugFileManagerFile" value="C:\inetpub\WebPlayer\games\vorple.quest"/>
```

**NOTE: Be sure it is not commented out with `<!-- -->`!**
---
So, we should now have the DEBUG PLUGINS bit like this:

```xml
  <!-- DEBUG PLUGINS -->

  <!-- OR, when debugging, use the Debug Plugins -->
  <add key="SessionManagerType" value="WebPlayer.DebugSessionManager, WebPlayer"/>
  <add key="FileManagerType" value="WebPlayer.DebugFileManager, WebPlayer"/>
  <!-- <add key="GameSaveFolder" value="C:\Path\To\Save Game Folder"/> -->
  <add key="DebugFileManagerFile" value="C:\inetpub\WebPlayer\games\vorple.quest"/>
  <!-- <add key="DebugFileManagerSaveFile" value="C:\Path\To\some game file.quest-save"/> -->
```

**NOTE: GameSaveFolder and DebugFileManagerSaveFile are no longer used. So they can be left as is.**

---
That entire file should look like this now:

```xml
<?xml version="1.0" ?>

<!-- After entering settings, this file should be saved as WebPlayerSettings.xml -->

<appSettings>
  <add key="GameFolder" value="C:\inetpub\WebPlayer\games\"/>
  <add key="LibraryFolder" value="C:\inetpub\WebPlayer\bin\x86\Release\Core\"/>

  <!-- To enable logging, uncomment this line, and create a log config XML like the one below -->
  <!-- <add key="LogConfig" value="C:\Path\To\Config\File\logging.xml"/> -->

  <!-- PLUGINS -->
  
  <!-- To enable loading a file by ID, specify the type name of a class that implements IFileManager -->
  <!-- <add key="FileManagerType" value="SomeFileManager.FileManager, SomeFileManager"/> -->
  <!-- <add key="GameSaveFolder" value="C:\Path\To\Save Game Folder"/> -->

  <!-- DEBUG PLUGINS -->

  <!-- OR, when debugging, use the Debug Plugins -->
  <add key="SessionManagerType" value="WebPlayer.DebugSessionManager, WebPlayer"/>
  <add key="FileManagerType" value="WebPlayer.DebugFileManager, WebPlayer"/>
  <!-- <add key="GameSaveFolder" value="C:\Path\To\Save Game Folder"/> -->
  <add key="DebugFileManagerFile" value="C:\inetpub\WebPlayer\games\vorple.quest"/>
  <!-- <add key="DebugFileManagerSaveFile" value="C:\Path\To\some game file.quest-save"/> -->

</appSettings>

<!--
  <log4net>
    <appender name="FileAppender" type="log4net.Appender.FileAppender">
      <file value="${TMP}\Quest WebPlayer Log.txt" />
      <appendToFile value="true" />
      <lockingModel type="log4net.Appender.FileAppender+MinimalLock" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger [%aspnet-request{REMOTE_ADDR}] - %message%newline" />
      </layout>
    </appender>
    <root>
      <level value="DEBUG" />
      <appender-ref ref="FileAppender" />
    </root>
  </log4net>
-->
```

---
### At This Point

You should have:
- Successfully built Quest in Visual Studio, both the Debug and Release builds and Set Up Your Windows Server (or IIS Manager)
- Copied your "WebPlayer" folder from that project directory into `C:\inetpub\`
- Modified **WebPlayerSettings.default.xml** and saved the result as **WebPlayerSettings.xml**

---
Now, we'll do this as if you are using IIS Manager in Windows to run this on localhost, because anyone who is doing this differently will have their own domain rather than using localhost.

With your server running, open your browser and paste in this URL: http://localhost/Play.aspx?id=1

That should load the game you added to **WebPlayerSettings.xml**. You won't be able to save progress during play, but it should load and work correctly.

---
Now let's say we have more than one game in "C:\inetpub\WebPlayer\games\". Let's say there is also a game in there named **foobar.quest**.

To load that game, we should able to use this URL:

http://localhost/Play.aspx?id=1&file=C:\inetpub\WebPlayer\games\foobar.quest

That works because `&file=` being there with a valid path to a game will override everything else. The value of `?id=` will no longer matter while we can't save our progress during play anyway.

---
NOTE: When using IIS Manager, the default binding is 80. Those last two example URLs depend on that being the case in your setup. If you have changed the binding to something like 88, you would need to replace `http://localhost/` with `http://localhost:88/` in those URLs.

Also, this is assuming you are still testing this, and you have not set up your own domain. This will just run the WebPlayer app from IIS on your local machine. If you are ready to host the WebPlayer app online, you will most probably already know how to fiddle with DNS and use your URL in place of `localhost` and all that good stuff. 👍👍


---
With this setup and these two games, I could have a page with links to play each game like this:

```html
<a href="http://localhost/Play.aspx?id=1" target="_blank">Play</a> Vorple
<br/>
<a href="http://localhost/Play.aspx?id=1&file=C:\inetpub\WebPlayer\games\foobar.quest" target="_blank">Play</a> Foobar
```