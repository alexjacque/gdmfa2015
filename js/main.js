$( document ).ready(function() {
	
	checkDirectLink();
	
	$(".student").hover(function(e) {
		hideNames($(this));	
		// show student thumbnails
	}, function(e) {
		restoreNames();
		// remove student thumbnails
	});
	
	$(".student figure").click(function(e) {
		$("html").css("overflow","hidden");
		$("body").addClass("modal-open"); // add class to help prevent scrolling when overlay is open
		
		// helpful SO post: http://stackoverflow.com/a/1489802
		var id = $(this).parent().attr('id'); // id of elment we're requesting the overlay for
		var node = $('#' + id); // get element with id = to our hash
		if (node.length) { // if the node actually exists
			node.attr('id',''); // remove the id temporarily to prevent anchor jumping
		}
		document.location.hash = id; // set our document hash
		if (node.length) { // again, if the node actually exists
			node.attr('id',id); // add our hash id back to the original node
		}
		
		$(this).parent().find(".studentInfoOverlay").addClass("isOpen"); // add class to overlay
	});
	
	$(".close").click(function(e) {
		$("html").css("overflow","scroll");
		$("body").removeClass("modal-open"); // remove class to resume scrolling
		restoreNames(); // because on mobile names stay gone for whatever reason
		
		var scr = document.body.scrollTop; // get current distance of scroll from top 
		$(this).parent().removeClass("isOpen"); // remove class from overlay
		removeHash();
		document.body.scrollTop = scr; // scroll back to that position
	});
	
});

// function to enable direct linking to a students profile
function checkDirectLink() {
	var hash = window.location.hash;
	if (hash.length > 1) {
		var div = document.getElementById(hash.slice(1));
		
		$("body").addClass("modal-open"); // add class to help prevent scrolling when overlay is open
		$(div).find(".studentInfoOverlay").addClass("isOpen"); // add isOpen class
	}
}

// from another helpful SO answer: http://stackoverflow.com/a/5298684
function removeHash() { 
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
    else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}

// fade all student names on hover
function hideNames(exception) {
	
	// get all .student>figure>figcaption elements
	// remove the current hovered element figcaption
	// set all to 0 opacity
	
	$(".student").not(exception).find("figcaption").stop().animate({opacity: 0}, 200);
	
}

// restore all student names on mouse out
function restoreNames() {
	
	// get all .student>figure>figcaption elements
	// set all to 1 opacity
	
	$(".student").find("figcaption").stop().animate({opacity: 1}, 200);
	
}

// switch/overlay all profile images with project thumbnails