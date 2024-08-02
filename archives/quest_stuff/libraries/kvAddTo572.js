function RestartGame() {
    if(!webPlayer){UIEvent("RestartGame", "");}else{window.location.reload();}
};

// ----------------------------------    

function isMobilePlayer() {
    if (typeof (currentTab) === 'string') {
        return true;
    }
    return false;
};

function makeAudio(src, sync, loop, id, controls, callback) {
    if (sync && loop) {
        throw new Error('makeAudio():  Attempted to sync and loop the same sound.');

    }
    var s = String.fromCharCode(60) + 'audio ';
    if (typeof (id) === "string") {
        s += 'id=\'' + id + '\'  ';
    }
    if (controls) {
        s += ' controls controlsList=\'nodownload\' ';
    }
    if (loop) {
        s += ' loop ';
    }
    s += ' autoplay' + String.fromCharCode(62) + '' + src;
    s += String.fromCharCode(60) + '/audio' + String.fromCharCode(62);
    var thisTag = s;
    if (isMobilePlayer()) {
        var repl = String.fromCharCode(60);
        repl += 'audio controls controlsList=\'nodownload\' class=\'mob-aud\'';
        thisTag = thisTag.replace(String.fromCharCode(60) + 'audio', repl);
        var tag = String.fromCharCode(60) + 'p' + String.fromCharCode(62);
        tag += thisTag + '' + String.fromCharCode(60);
        tag += '/p' + String.fromCharCode(62);
        addText(tag);
        if (typeof ($('.mob-aud').last().on('ended')) === 'function') {
            onEndBak = $('.mob-aud').last().on('ended');
        } else {
            onEndBak = function () { };
        }
        $('.mob-aud').last().insertAfter($('#txtCommandDiv')).on('ended', function () {

            $(this).remove();
            onEndBak();
        }).css('margin-top', '4px');
    } else if (controls) {
        var addon = String.fromCharCode(60) + 'p' + String.fromCharCode(62);
        addon += thisTag + '' + String.fromCharCode(60) + '/p' + String.fromCharCode(62);
        $("#divOutput").after(addon);
    } else {
        $('body').after(thisTag);
    }
}

var safeBreak = String.fromCharCode(60) + 'br/' + String.fromCharCode(62);
var noSoundMsg = safeBreak + 'There is no sound playing.';

function endAudioSync() {
    if (typeof (sendCommandBak) === 'function') { sendCommand = sendCommandBak; }
}

function increaseVolume(id) {
    var thisAud = document.getElementById(id);
    if (!thisAud) {
        addTextAndScroll(safeBreak + 'There is no sound playing.');
    }
    else if (thisAud.volume * 10 < 10) {
        thisAud.volume = (thisAud.volume * 10 + 1) / 10;
        addTextAndScroll(safeBreak + 'The volume has been increased.');
    }
    else {
        addTextAndScroll(safeBreak + 'The volume is already at the maximum level.');
    }
}

function increaseAllVolume() {
    $('audio').each(function () {
        if (this.volume != 1) { this.volume = this.volume + .1 };
    });
}

function decreaseVolume(id) {
    var thisAud = document.getElementById(id);
    if (!thisAud) {
        addTextAndScroll(safeBreak + 'There is no sound playing.');
    } else if (thisAud.volume * 10 > 0) {
        thisAud.volume = (thisAud.volume * 10 - 1) / 10;
        addTextAndScroll(safeBreak + 'The volume has been decreased.');
    } else {
        addTextAndScroll(safeBreak + 'The volume is already all the way down.');
    }
}

function decreaseAllVolume() {
    $('audio').each(function () {
        if (this.volume >= 0.1) { this.volume = this.volume - .1 };
    });
}

function endAudioSync() {
    if (typeof (sendCommandBak) === 'function') {
        sendCommand = sendCommandBak;
    }
}

function setAllAudioVolume(vol) {
    var audios = document.getElementsByTagName('audio');
    for (aud in audios) {
        audios[aud].volume = vol;
    }
}

function setAudioCurrentTime(id, pos) {
    document.getElementById(id).currentTime = pos;
}

function pauseAudio(id) {
    var thisAud = document.getElementById(id);
    thisAud.pause();
}

function resumePausedAudio(id) {
    var thisAud = document.getElementById(id);
    thisAud.play();
}

function restartPausedAudio(id) {
    var thisAud = document.getElementById(id);
    thisAud.load();
    thisAud.play()
}

function setAudioVolume(id, vol) {
    document.getElementById(id).volume = vol;
}



function muteAudio(id) {
    var aud = document.getElementById(id);
    aud.volbak = aud.volume;
    setAudioVolume(id, 0);
}


function unmuteAudio(id) {
    var aud = document.getElementById(id);
    aud.volume = aud.volbak;
}

function muteAllAudio() {
    $('audio').each(function () {
        $(this).attr('volbak', this.volume);
    });
    var audios = document.getElementsByTagName('audio');
    for (aud in audios) {
        if (typeof (audios[aud].volume) != 'undefined') {
            audios[aud].volume = 0;
        }
    }
}


function unmuteAllAudio() {
    $('audio').each(function () {
        $(this).prop('volume', $(this).attr('volbak'));
    });
}

function pauseAllAudio() {
    var audios = document.getElementsByTagName('audio');
    for (aud in audios) {
        audios[aud].pause();
    }
}

function destroyAllAudio() {
    $('audio').remove();
}


function restartAllPausedAudio() {
    var audios = document.getElementsByTagName('audio');
    for (aud in audios) {
        audios[aud].audios[aud].play();
    }
}

function setAllAudioVolume(vol) {
    var audios = document.getElementsByTagName('audio');
    for (aud in audios) {
        audios[aud].volume = vol;
    }
}

function setAudioPosition(id, pos) {
    document.getElementById(id).currentTime = pos;
}

function testAudio(s) {
    s = s + " onloadstart='ASLEvent(\"AudioLog\",\"Loading \"+$(this).attr(\"src\"));$(this).remove();'";
    s = s + " onerror='ASLEvent(\"AudioLog\",$(this).attr(\"src\")+\" failed to load.\");$(this).remove();'";
    s = s + "/" + Chr(62);
    addText(s);
}

// ---------

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    }
};


var questKvMod = true;

function ASLSet(param) {
    ASLEvent('AslSet', param);
}

function msg(text) {
    addText("[br][br]" + text);
    scrollToEnd();
};

var clearedOnce = false;

clearScreen = function () {
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
};

var logVar = "";
function addLogEntry(text) {
    if (!text.startsWith("SaveLoadFile") && !text.startsWith("TxtFile") && !text.startsWith("Transcript")) {
        logVar += getTimeAndDateForLog() + ' ' + text + "NEW_LINE";
    }
};

function showLog() {
    var logDivString = "";
    logDivString += "<div ";
    logDivString += "id='log-dialog' ";
    logDivString += "style='display:none;'>";
    logDivString += "<textarea id='logdata' rows='13'";
    logDivString += "  cols='49'></textarea></div>";
    addText(logDivString);
    var logDialog = $("#log-dialog").dialog({
        autoOpen: false,
        width: 600,
        height: 500,
        title: "Log",
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            },
            Print: function () {
                $(this).dialog("close");
                printLogDiv();
            },
        },
        show: { effect: "fadeIn", duration: 500 },
        modal: true,
    });
    $('textarea#logdata').val(logVar.replace(/NEW_LINE/g, "\n"));
    logDialog.dialog("open");
};

function printLogDiv() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.contentWindow.document.write(logVar.replace(/NEW_LINE/g, "[br]"));
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
};

function getTimeAndDateForLog() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hrs = today.getHours();
    var mins = today.getMinutes();
    var secs = today.getSeconds();
    today = mm + '/' + dd + '/' + yyyy;
    if (hrs > 12) {
        ampm = 'AM';
        hrs = '0' + '' + hrs - 12
    } else {
        ampm = 'PM';
    }
    if (mins < 10) {
        mins = '0' + mins;
    }
    if (secs < 10) {
        secs = '0' + secs;
    }
    time = hrs + ':' + mins + ':' + secs + ' ' + ampm;
    return today + ' ' + time;
};
var transcriptVar = "";
function addTranscriptEntry(text) {
    transcriptVar += text;
};


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
            },
        },
        show: { effect: "fadeIn", duration: 500 },
        modal: true,
    });
    $('#transcriptdata').html($('#divOutput').html());
    $("#transcriptdata *").attr('style', '').attr('color', '');
    transcriptDialog.dialog("open");

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

function showPopup(title, text) {
    $('#msgboxCaption').html(text);

    var msgboxOptions = {
        modal: true,
        autoOpen: false,
        title: title,
        buttons: [
            {
                text: 'OK',
                click: function () { $(this).dialog('close'); }
            },
        ],
        closeOnEscape: false,
    };

    $('#msgbox').dialog(msgboxOptions);
    $('#msgbox').dialog('open');
};

function showPopupCustomSize(title, text, width, height) {
    $('#msgboxCaption').html(text);

    var msgboxOptions = {
        modal: true,
        autoOpen: false,
        title: title,
        width: width,
        height: height,
        buttons: [
            {
                text: 'OK',
                click: function () { $(this).dialog('close'); }
            },
        ],
        closeOnEscape: false,
    };

    $('#msgbox').dialog(msgboxOptions);
    $('#msgbox').dialog('open');
};

function showPopupFullscreen(title, text) {
    $('#msgboxCaption').html(text);

    var msgboxOptions = {
        modal: true,
        autoOpen: false,
        title: title,
        width: $(window).width(),
        height: $(window).height(),
        buttons: [
            {
                text: 'OK',
                click: function () { $(this).dialog('close'); }
            },
        ],
        closeOnEscape: false,
    };

    $('#msgbox').dialog(msgboxOptions);
    $('#msgbox').dialog('open');
};

var mobilePlayer = false;

function mobilePlayerSet() {
    if (document.getElementById('tabButton').clientWidth > 0) {
        mobilePlayer = true;
    }
};

setupRealDate = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hrs = today.getHours();
    var mins = today.getMinutes();
    var totalMinutes = (hrs * 60) + mins;
    var secs = today.getSeconds();
    var ampm = 'AM';
    var hrsMins = [hrs, mins];
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    today = mm + '/' + dd + '/' + yyyy;
    if (hrs > 12) { ampm = 'PM'; hrs = '0' + '' + hrs - 12 }
    else { ampm = 'AM' }
    if (mins < 10) { mins = '0' + mins }
    if (secs < 10) { secs = '0' + secs } time = hrs + ':' + mins + ':' + secs + ' ' + ampm;
    var realHrs = hrsMins[0]; var realMins = hrsMins[1];
    var param = realHrs + ';' + realMins + ';' + time + ';' + today + ';' + yyyy + ';' + mm + ';' + dd + ';' + totalMinutes;
    ASLSet('game.time_param=' + param);
};
setTimeout(function () { setupRealDate(); }, 2000);