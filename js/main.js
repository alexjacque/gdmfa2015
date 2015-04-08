$( window ).load(function () {
	
});

$( document ).ready(function() {
	
	checkDirectLink();
	
	$(".student figure").click(function() {
		$(this).parent().find(".studentInfoOverlay").addClass("isOpen");
		var id = $(this).parent().attr('id');
		window.location.hash = id;
	});
	
	$(".close").click(function() {
		$(this).parent().removeClass("isOpen");
		window.location.hash = ''; // cannot remove #
	});
	
});

// function to enable direct linking to a students profile
function checkDirectLink() {
	var hash = window.location.hash;
	if (hash.length > 1) {
		var div = document.getElementById(hash.slice(1));
		
		$(div).find(".studentInfoOverlay").addClass("isOpen"); // add isOpen class
	}
}

// function to switch all images with project thumbnails