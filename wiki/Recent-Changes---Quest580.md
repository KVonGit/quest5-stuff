# Player\PlayerHTML.vb


```vb
            ' Added by KV
            Case "RestartGame"
                RestartGame(args)
            Case "SaveTranscript"
                SaveTranscript(args)
            Case "WriteToLog"
                WriteToLog(args)
        End Select
    End Sub
    Private Sub WriteToLog(data As String)
        Dim logPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "\Quest Logs"
        Dim gameName = Split(CurrentGame.Filename, "\")(Split(CurrentGame.Filename, "\").Length - 1)
        gameName = gameName.Replace(".aslx", "")
        If Not System.IO.Directory.Exists(logPath) = True Then
            System.IO.Directory.CreateDirectory(logPath)
        End If
        If Not System.IO.File.Exists(logPath + "\" + gameName + "-log.txt") = True Then
            Dim file As System.IO.FileStream
            file = System.IO.File.Create(logPath + "\" + gameName + "-log.txt")
            file.Close()
        End If
        My.Computer.FileSystem.WriteAllText(logPath + "\" + gameName + "-log.txt", data + Environment.NewLine, True)
    End Sub
    Private Sub SaveTranscript(data As String)
        Dim mgameName = Split(CurrentGame.Filename, "\")(Split(CurrentGame.Filename, "\").Length - 1)
        mgameName = mgameName.Replace(".aslx", "")
        Dim transcriptPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "\Quest Transcripts"
        If Not System.IO.Directory.Exists(transcriptPath) = True Then
            System.IO.Directory.CreateDirectory(transcriptPath)
        End If
        If Not System.IO.File.Exists(transcriptPath + "\" + mgameName + "-transcript.html") = True Then
            Dim file As System.IO.FileStream
            file = System.IO.File.Create(transcriptPath + "\" + mgameName + "-transcript.html")
            file.Close()
        End If
        My.Computer.FileSystem.WriteAllText(transcriptPath + "\" + mgameName + "-transcript.html", data, True)

    End Sub
    Private Sub RestartGame(data As String)
        m_keyHandler_KeyPressed(131154)
    End Sub
    ' End of Addition by KV
```

---
# Player\desktopplayer.js



```js
// SaveTranscript added by KV to write/append to GAMENAME-transcript.html in Documents\Quest Transcripts
function SaveTranscript(data) {
    data = data + "<style>*{color:black !important;background:white !important;text-align:left !important}</style>";
    if (!webPlayer && transcriptString != '') { UIEvent("SaveTranscript", data); }
    transcriptString += data;
}

// Added by KV to write/append to GAMENAME-log.txt in Documents\Quest Logs
function WriteToLog(data) {
    if (!webPlayer && data != '' && typeof (data) == 'string') {
        UIEvent("WriteToLog", getTimeAndDateForLog() + " " + data);
    }
}
```

---
 # PlayerController\playercore.js



```js
  <function name="InitInterface">
    <![CDATA[
    // Added by KV for transcript
    JS.eval("var gameName = '"+game.gamename+"';var transcriptName = gameName;")
    if (GetBoolean(game,"savetranscript")){
      JS.eval("var savingTranscript = true;")
      JS.replaceTranscriptString(game.transcriptstring)
    }
    // End of addition by KV for transcript
```

---


```js
// These 2 variables added by KV for the transcript
var savingTranscript = false;
var transcriptString = "";

// This function altered by KV for the transcript
function addText(text) {
    if (getCurrentDiv() == null) {
        createNewDiv("left");
    }
    if (savingTranscript) {
        SaveTranscript(text);
        ASLEvent("UpdateTranscriptString", text);
    }
    getCurrentDiv().append(text);
    $("#divOutput").css("min-height", $("#divOutput").height());
}
```

---


Changed ```clearScreen()``` to allow for a Scrollback feature. Added two functions for the scrollback, the important function being ```showScrollback()```.  This will display all text from the game (include text that has been cleared by ```ClearScreen```) in a dialog popup.



```js
// Modified by KV to handle the scrollback feature
var saveClearedText = true;
var clearedOnce = false;
function clearScreen() {
    if (!saveClearedText) {
        $("#divOutput").css("min-height", 0);
        $("#divOutput").html("");
        createNewDiv("left");
        beginningOfCurrentTurnScrollPosition = 0;
        setTimeout(function () {
            $("html,body").scrollTop(0);
        }, 100);
    } else {
        $("#divOutput").append("<hr class='clearedAbove' />");
        if (!clearedOnce) {
            addText('<style>#divOutput > .clearedScreen { display: none; }</style>');
        }
        clearedOnce = true;
        $('#divOutput').children().addClass('clearedScreen');
        $('#divOutput').css('min-height', 0);
        createNewDiv('left');
        beginningOfCurrentTurnScrollPosition = 0;
        setTimeout(function () {
            $('html,body').scrollTop(0);
        }, 100);
    }
}

// Scrollback functions added by KV

function showScrollback() {
    var scrollbackDivString = "";
    scrollbackDivString += "<div ";
    scrollbackDivString += "id='scrollback-dialog' ";
    scrollbackDivString += "style='display:none;'>";
    scrollbackDivString += "<div id='scrollbackdata'></div></div>";
    addText(scrollbackDivString);
    var scrollbackDialog = $("#scrollback-dialog").dialog({
        autoOpen: false,
        width: 600,
        height: 500,
        title: "Scrollback",
        buttons: {
            Ok: function () {
                $(this).dialog("close");
                $(this).remove();
            },
            Print: function () {
                printScrollbackDiv();
            },
        },
        show: { effect: "fadeIn", duration: 500 },
        modal: true,
    });
    $('#scrollbackdata').html($('#divOutput').html());
    $("#scrollbackdata a").addClass("disabled");
    scrollbackDialog.dialog("open");
    setTimeout(function () {
        $("#scrollbackdata a").addClass("disabled");
    }, 1);
};



function printScrollbackDiv() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.contentWindow.document.write($("#scrollbackdata").html());
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
    $("#scrollback-dialog").dialog("close");

```

---

```js
function getTimeAndDateForLog(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	var hrs = today.getHours();
	var mins = today.getMinutes();
	var secs = today.getSeconds();
	today = mm + '/' + dd + '/' + yyyy;
	if(hrs>12) {
	  ampm = 'PM';
	  hrs = '0' + '' + hrs - 12
	}else{
	  ampm = 'AM';
	} 
	if (mins<10) {
	  mins = '0'+mins;
	} 
	if(secs<10) {
	  secs = '0' + secs;
	}
	time = hrs + ':' + mins + ':' + secs + ' ' + ampm;
	return today + ' ' + time;
};
    
// **********************************

// TRANSCRIPT FUNCTIONS

// This function is for loading a saved game
function replaceTranscriptString(data) {
    transcriptString = data;
}

function showTranscript() {
    var transcriptDivString = "";
    transcriptDivString += "<div ";
    transcriptDivString += "id='transcript-dialog' ";
    transcriptDivString += "style='display:none;'>";
    transcriptDivString += "<div id='transcriptdata'></div></div>";
    addText(transcriptDivString);
    var transcriptDialog = $("#transcript-dialog").dialog({
        autoOpen: false,
        width: 600,
        height: 500,
        title: "Transcript",
        buttons: {
            Ok: function () {
                $(this).dialog("close");
                $(this).remove();
            },
            Print: function () {
                printTranscriptDiv();
                $(this).dialog("close");
                $(this).remove();
            },
        },
        show: { effect: "fadeIn", duration: 500 },
        modal: true,
    });
    $('#transcriptdata').html(transcriptString);
    $("#transcriptdata a").addClass("disabled");
    transcriptDialog.dialog("open");
    setTimeout(function () {
        $("#transcriptdata a").addClass("disabled");
    }, 1);
};

function printTranscriptDiv() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.contentWindow.document.write($("#transcriptdata").html());
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
    $("#transcript-dialog").dialog("close");
    $("#transcript-dialog").remove();
};


// ***********************************
```

---
# WorldModel\WorldModel\Core\CoreOutput


```xml
  <function name="Log" parameters="text"><![CDATA[
    request (Log, text)
    if (not GetBoolean(game, "nohtmllog")){
      JS.eval("if(typeof(addLogEntry)===\"function\"){ addLogEntry('"+text+"'); };")
    }
    JS.eval("if(!webPlayer && typeof(WriteToLog)===\"function\"){var s = '"+text+"';WriteToLog(s);}")
  ]]></function>
```

---
# WorldModel\WorldModel\Core\CoreParser


(This just changes ```fullmatches + partialmatches``` to ```ListCombine(fullmatches, partialmatches)``` to resolve an issue in QuestJS.)

```c
      candidates = ListCompact(ListCombine(fullmatches, partialmatches))

```

---
# WorldModel\WorldModel\Core\CoreCommands.aslx



```xml
  <!-- Modified by KV to resolve issue with empty divOutput when saving online with this command. -->
  <command name="save">
    <pattern type="string">^save$</pattern>
    <script>
      if (HasAttribute(game, "questplatform")) {
        if (game.questplatform = "desktop") {
          RequestSave
        }
        else {
          JS.saveGame ()
        }
      }
      else {
        RequestSave
      }
    </script>
  </command>
```

---
# WorldModel\WorldModel\Core\CoreCommands.aslx (continued)


Changes to transcript commands and an added function for loading saved games with transcripts

```xml
  <command name="view_transcript_cmd" pattern="[view_transcript_cmd]">
    <script>
      game.notarealturn = true
      if (not GetBoolean(game, "notranscript")){
        JS.showTranscript ()
      }
      else {
        msg ("This game has no transcript feature.")
      }
    </script>
  </command>

  <command name="transcript_on_cmd">
    <pattern type="string">^(transcript|script)( on|)$|^enable (script|transcript)$</pattern>
    <script>
      <![CDATA[
      game.notarealturn = true
      if (not GetBoolean(game, "notranscript")) {
        if (not GetBoolean(game,"savetranscript")) {
          msg ("Please enter a filename.  (<b>  \"-transcript.html\" will be appended to this filename.)<br/>  <i>(The file will be saved in \"Documents\\Quest Transcripts\".)</i></b>")
          JS.eval ("$('input#txtCommand').val(transcriptName);")
          get input {
            filename = Trim(result)
            if (not filename = "") {
              JS.eval ("transcriptName = '"+filename+"';")
            }
            JS.eval ("savingTranscript = true;")
            game.savetranscript = true
            pre = "<hr/>Transcript enabled for:<br/>"
            table = "<table style='padding:9px;border:1px solid black;'>"
            table = table + "<tr><td>TITLE: </td><td>" + game.gamename + "</td></tr>"
            if (HasAttribute (game, "author")) {
              table = table + "<tr><td>AUTHOR: </td><td>" + game.author + "</td></tr>"
            }
            table = table + "<tr><td>VERSION: </td><td>" + game.version + "</td></tr>"
            table = table + "<tr><td>IFID: </td><td>" + game.gameid + "</td></tr>"
            table = table + "</table>"
            s = pre + table
            msg("")
            msg (s)
            msg ("<br/><b><i>[  Enter </i>SCRIPT OFF<i> to disable the transcript.  ]</i></b>")
          }
        }
        else {
          msg ("The transcript is already enabled.")
        }
      }
      else {
        msg ("This game has no transcript feature.")
      }
    ]]>
    </script>
  </command>

  <command name="transcript_off_cmd" pattern="[transcript_off_cmd]">
    <script>
      game.notarealturn = true
      if (not GetBoolean(game, "notranscript")){
        if (GetBoolean(game,"savetranscript")){
          game.savetranscript = false
          JS.eval("var saveTranscript = false;")
          msg("Transcript disabled.")
        }
        else{
          msg("The transcript is already disabled.")
        }
      }
      else {
        msg ("This game has no transcript feature.")
      }
    </script>
  </command>
  
  <function name="UpdateTranscriptString" parameters="data">
    game.suppressturnscripts = true
    game.transcriptstring = game.transcriptstring + data
  </function>
```

---
# WorldModel\WorldModel\Core\Languages\English.aslx



```xml
  <template templatetype="command" name="transcript_on_cmd">^(transcript|script)( on|)$|^enable (script|transcript)$</template>
  <template templatetype="command" name="transcript_off_cmd">^(transcript|script) off$|^disable (script|transcript)$</template>
  <template templatetype="command" name="view_transcript_cmd">^(view|display|show) (the |)(script|transcript)$</template>
```

---
# Removed SpellCheck from RichTextControl.xaml


---
# WorldModel\WorldModel\Core\Core.aslx


```xml
  <function name="InitInterface">
    <![CDATA[
    // Added by KV for transcript
    JS.eval("var gameName = '"+game.gamename+"';var transcriptName = gameName;")
    if (GetBoolean(game,"savetranscript")){
      JS.eval("var savingTranscript = true;")
      JS.replaceTranscriptString(game.transcriptstring)
    }
    // End of addition by KV for transcript
```

---
# WorldModel\WorldModel.csproj

Added CoreDevMode.aslx (which is included in Core.aslx, but would not be copied to Quest until this change)

Lines 337 - 339

```xml
    <None Include="Core\CoreDevMode.aslx">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
```