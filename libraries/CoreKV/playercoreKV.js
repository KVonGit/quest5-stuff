function scrollToEnd() {
    var scrollTo = _animateScroll ? beginningOfCurrentTurnScrollPosition - 50 - $("#gamePanelSpacer").height() : $(document).height();
    var currentScrollTop = Math.max($("body").scrollTop(), $("html").scrollTop());
    if (scrollTo > currentScrollTop) {
        var maxScrollTop = $(document).height() - $(window).height();
        if (scrollTo > maxScrollTop) scrollTo = maxScrollTop;
        var distance = scrollTo - currentScrollTop;
        var duration = _animateScroll ? distance / 0.4 : 1;
        /* Added by The Pixie on behalf of alexandretorres*/
        if (duration>2000) duration=2000;
        $("body,html").stop().animate({ scrollTop: scrollTo }, duration, "easeInOutCubic");
    }
    $("#txtCommand").focus();
	
    /* 
	 * Added by The Pixie; this is a fall back, as the above seems not to work on some browsers
     * In fact it may be the all the rest of this can deleted
    */
	
	/*
	 * This is what makes it skip down past long sections of text - KV
	 * $('html,body').animate({ scrollTop: document.body.scrollHeight }, 'fast');
	 */
};


function updateList(listName, listData) {
    var listElement = "";
    var buttonPrefix = "";

    if (listName == "inventory") {
        listElement = "#lstInventory";
        inventoryVerbs = new Array();
        buttonPrefix = "cmdInventory";
    }

    if (listName == "placesobjects") {
        listElement = "#lstPlacesObjects";
        placesObjectsVerbs = new Array();
        buttonPrefix = "cmdPlacesObjects";
    }

    var previousSelectionText = "";
    var previousSelectionKey = "";
    var foundPreviousSelection = false;

    var $selected = $(listElement + " .ui-selected");
    if ($selected.length > 0) {
        previousSelectionText = $selected.first().text();
        previousSelectionKey = $selected.first().data("key");
    }

    $(listElement).empty();
    var count = 0;
    $.each(listData, function (key, value) {
        var scenery = false;
        var data = JSON.parse(value);
		/* Modified to ignore scenery in the inventory pane - KV */
        for (var i in ignoreScenery) {
            if (data['ElementName'] == ignoreScenery[i]) {
                scenery = true;
            }
        }
        var objectDisplayName = data["Text"];
        var verbsArray, idPrefix;

        if (listName == "inventory") {
            verbsArray = inventoryVerbs;
            idPrefix = "cmdInventory";
        } else {
            verbsArray = placesObjectsVerbs;
            idPrefix = "cmdPlacesObjects";
        }
        verbsArray.push(data);
        if ((listName == "inventory" || $.inArray(objectDisplayName, _compassDirs) == -1) && !scenery) {
            var vis = '';
            if (scenery) { vis = 'style=\'display:none;\''; }
            var $newItem = $("<li " + vis + "/>").data("key", key).data("elementid", data["ElementId"]).data("elementname", data["ElementName"]).data("index", count).html(objectDisplayName);

            if (objectDisplayName == previousSelectionText && key == previousSelectionKey) {
                $newItem.addClass("ui-selected");
                foundPreviousSelection = true;
                updateVerbButtons($newItem, verbsArray, idPrefix);
            }
            $(listElement).append($newItem);
            count++;
        }
    });

    var selectSize = count;
    if (selectSize < 3) selectSize = 3;
    if (selectSize > 12) selectSize = 12;
    $(listElement).attr("size", selectSize);

    if (!foundPreviousSelection) {
        for (var i = 1; i <= verbButtonCount; i++) {
            var target = $("#" + buttonPrefix + i);
            target.hide();
        }
    }
};


var sceneryArray = [];
function addToScenery(name) {
	sceneryArray.push(name); ignoreScenery.push(name); 
};

function removeFromScenery(name) {
	var index = sceneryArray.indexOf(name);
	if (index > -1) {
		sceneryArray.splice(index, 1); 
	} 
};


/* 
 * Improved by mrangel
 * Now we can append elements with the class 'donotclear' to divOutput and clearScreen() will ignore those elements.
*/
function clearScreen() {
    if (!saveClearedText) {
        $("#divOutput").children(":not(.donotclear)").remove();
    } else {
        $("#divOutput").append("<hr class='clearedAbove' />");
        if (!clearedOnce) {
            addText('<style>#divOutput > .clearedScreen { display: none; }</style>');
        }
        clearedOnce = true;
        $('#divOutput').children(":not(.donotclear)").addClass('clearedScreen');
    }
    $('#divOutput').css('min-height', 0);
    createNewDiv('left');
    beginningOfCurrentTurnScrollPosition = 0;
    setTimeout(function () {
        $('html,body').scrollTop(0);
    }, 100);
};

SetFloatingImage = function (image) {
  $('#floating-image').remove();
  var  pane = $('<img id=\'floating-image\' src=\''+image+'\' />');
  pane.appendTo('#divOutput');
  pane.css({position: 'fixed', right: 20, top: 50});
}; 