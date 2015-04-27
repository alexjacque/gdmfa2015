$( document ).ready(function() {
	
	checkDirectLink();
	
	$(".student").hover(function(e) {
		changeNameToProjectTitle($(this)); // change student name to project title
		//hideNames($(this)); // hide all other names
		switchImageSource($(this));
		// show student thumbnails
	}, function(e) {
		restoreNames($(this));
		switchImageSource($(this));
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
		var student = $(this).parent().parent(); // get current student element
		closeModal( student );
	});
	
	$(".prev").click(function(e) {
		var student = $(this).parent().parent().parent(); // get current student element
		goPrevious( student ); // go to the prev student
	});
	
	$(".next").click(function(e) {
		var student = $(this).parent().parent().parent(); // get current student element
		goNext( student ); // go to the next student
	});
	
	// key navigation
	$("body").keydown(function(e) {
		var hash = window.location.hash; // get hash (is an overlay open?)
		if (hash.length > 1) { // if hash found
			var curStudent = $(hash);// get student elemnent with id from hash
			
			if (e.which == 27) { // escape
				closeModal(curStudent);
			}
			else if (e.which == 37) { // left     
				goPrevious(curStudent);
			}
			else if (e.which == 39) { // right     
				goNext(curStudent);
			}
			
		}
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
function restoreNames(student) {
	
	// get all .student>figure>figcaption elements
	// set all to 1 opacity
	
	$(".student").find("figcaption").stop().animate({opacity: 1}, 200);
	
	// if we're hovering off of a particular student
	if (student) {
		var studentName = student[0].getAttribute('data-name');
		student.find('figcaption')[0].innerHTML = studentName;
	}
	
}

function closeModal(student) {
	$("html").css("overflow","scroll");
	$("body").removeClass("modal-open"); // remove class to resume scrolling
	restoreNames(student); // because on mobile names stay gone for whatever reason
	
	var scr = document.body.scrollTop; // get current distance of scroll from top 
	student.find(".studentInfoOverlay").removeClass("isOpen"); // remove class from overlay
	student.find(".studentInfoOverlay").removeClass("noFade");
	removeHash();
	document.body.scrollTop = scr; // scroll back to that position
}

// navigate to previous student, show detail overlay
function goPrevious(student) {
	var prevStudent = student.prev(".student"); // get previous student element, if there is one

	if (prevStudent.attr('id') !== undefined) { // if a prev student exists
		var id = prevStudent.attr('id'); // get id of prev student element
		// console.log("previous student: " + id);
	
		student.find(".studentInfoOverlay").removeClass("isOpen"); // remove isOpen from current student overlay
	
		var node = $('#' + id); // node we'll be acting on
		// update hash
		if (node.length) { // if the node actually exists
			node.attr('id',''); // remove the id temporarily to prevent anchor jumping
		}
		document.location.hash = id; // set our document hash
		if (node.length) { // again, if the node actually exists
			node.attr('id',id); // add our hash id back to the original node
		}
		node.find(".studentInfoOverlay").addClass("isOpen noFade"); // add isOpen & noFade to previous student overlay
	
		//var loc = window.location;
	    //window.history.pushState("", document.title, document.location.hash);
	} else {
		closeModal(student); // close overlay
	}
}

// navigation to next student, show detail overlay
function goNext(student) {
	var nextStudent = student.next(".student"); // get next student element, if there is one
	
	if (nextStudent.attr('id') !== undefined) { // if a next student exists
		var id = nextStudent.attr('id'); // get id of next student element
		// console.log("next student: " + id);
	
		student.find(".studentInfoOverlay").removeClass("isOpen"); // remove isOpen from current student overlay
	
		var node = $('#' + id); // node we'll be acting on
		// update hash
		if (node.length) { // if the node actually exists
			node.attr('id',''); // remove the id temporarily to prevent anchor jumping
		}
		document.location.hash = id; // set our document hash
		node.find(".studentInfoOverlay").addClass("isOpen noFade"); // add isOpen & noFade to next student overlay
		if (node.length) { // again, if the node actually exists
			node.attr('id',id); // add our hash id back to the original node
		}
	
		//var loc = window.location;
	    //window.history.pushState("", document.title, document.location.hash);
	} else {
		closeModal(student); // close overlay
	}
}

function changeNameToProjectTitle(student) {
	// get specific element (figcaption)
	// theObject.getAttribute("data-project")
	// set innerHTML
	var projectName = student[0].getAttribute('data-project');
	student.find('figcaption')[0].innerHTML = projectName;
}

function switchImageSource(student) {
	var img = student.find("figure").find("img");
	
	// if class hovered is found
	if (!img.hasClass("hovered")) {
		img.addClass("hovered"); // add class
		var src = img.attr("src").match(/[^\.]+/) + "_over.jpg"; // new src
		img.attr("src", src); // change src
	} else {
		img.removeClass("hovered");
		var src = img.attr("src").split("_over")[0] + ".jpg";
		img.attr("src", src);
	}	
}