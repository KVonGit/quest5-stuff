```js
var scrollTimeout = null;

function scrollToEnd() {
    if (scrollTimeout != null) {
        clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(function () {
        scrollTimeout = null;
        scrollToEndNow();
    }, 200);
};

function scrollToEndNow() {
    $('html, body').animate({ scrollTop: beginningOfCurrentTurnScrollPosition - 50 }, 200);
};

var morePrompt = "<div style='opacity:0.7;display:none;position:fixed;right:5px;bottom:5px;background:black;padding:4px;color:white'";
morePrompt += "id='morePrompt'><center><b>PRESS SPACEBAR<br/>OR SCROLL DOWN</b></center></div>";

setTimeout(function(){
	$('body').append(morePrompt);
	$("#morePrompt").css({
		"background":$("#status").css("background"),
		"background-image":$("#status").css("background-image"),
		"background-color":$("#status").css("background-color"),
		"color":$("#status").css("color"),
		"font-family":$("#status").css("font-family")
	});
	$('#txtCommand').unbind('inview');
	$('#txtCommand').bind('inview', function (event, visible) {
		if (visible) {
			if(typeof(moreTimeout)!='undefined'){
				clearTimeout(moreTimeout);
			}
			$('#morePrompt').css('display', 'none');
			$('#txtCommand').focus();
		}else if (!visible && $("#txtCommand").attr("display")=="none" && $("#txtCommandDiv").attr("display")=="none"){
			$('#txtCommand').blur();
		}else{
			moreTimeout = setTimeout(function(){
				$('#morePrompt').css('display', 'block');
			},2001);
			$('#txtCommand').blur();
		}
	});
},2000);
```