Ever wanted to be able to check if a walkthrough is running in one of your scripts?

---
In Player\WalkthroughRunner.vb, change ```Run()``` to this:

```vb
    Public Sub Run()
        m_game.SendEvent("SetWalkthrough", "true")
        For Each cmd As String In m_gameDebug.Walkthroughs.Walkthroughs(m_walkthrough).Steps
            If m_cancelled Then Exit For

            RaiseEvent MarkScrollPosition()

            If m_showingMenu Then
                SetMenuResponse(cmd)
            ElseIf m_showingQuestion Then
                SetQuestionResponse(cmd)
            Else
                If cmd.StartsWith("assert:") Then
                    Dim expr As String = cmd.Substring(7)
                    WriteLine("<br/><b>Assert:</b> " + expr)
                    If m_gameDebug.Assert(expr) Then
                        WriteLine("<span style=""color:green""><b>Pass</b></span>")
                    Else
                        WriteLine("<span style=""color:red""><b>Failed</b></span>")
                        Return
                    End If
                ElseIf cmd.StartsWith("label:") Then
                    ' ignore
                ElseIf cmd.StartsWith("event:") Then
                    Dim eventData As String() = cmd.Substring(6).Split(New Char() {";"c}, 2)
                    Dim eventName As String = eventData(0)
                    Dim param As String = eventData(1)
                    m_game.SendEvent(eventName, param)
                    m_game.SendEvent("CallFinishTurn", "")
                Else
                    m_game.SendCommand(cmd)
                    m_game.SendEvent("CallFinishTurn", "")
                End If

            End If

            If m_cancelled Then Exit For

            Do
                If m_waiting Then
                    m_waiting = False
                    FinishWait()
                End If

                If m_pausing Then
                    m_pausing = False
                    FinishPause()
                End If
            Loop Until (Not m_waiting And Not m_pausing) Or m_cancelled

        Next
        m_game.SendEvent("SetWalkthrough", "false")
    End Sub
```

---
Add this function to your game:

```xml
  <function name="SetWalkthrough" parameters="boolstring">
    bool = false
    game.runturnscripts = false
    if (LCase(boolstring) = "true") {
      bool = true
      game.runturnscripts = true
    }
    game.runningwalkthrough = bool
  </function>
```

---
Now, you can use ```GetBoolean(game, "runningwalkthrough")``` to see if the walkthrough is running.  Once the walkthrough is finished, it will set **game.runningwalkthrough** to false.