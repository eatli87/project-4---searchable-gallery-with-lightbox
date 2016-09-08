var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $captionTitle = $("<h3></h3>");

var thisImage;

var $leftArrow = $("<div id='leftArrow'></div>");
var $rightArrow = $("<div id='rightArrow'></div>");
var $closeLightbox = $("<div id='closeLightbox'></div><div style='clear:both'></div>");

$overlay.append($closeLightbox);

//An image to overlay
$overlay.append($image);

$overlay.append($leftArrow);
$overlay.append($rightArrow);

//A title to overlay
$overlay.append($captionTitle);

//A caption to overlay
$overlay.append($caption);



//Add overlay
$("body").append($overlay);

//Capture the click event on a link to an image
$("#imageGallery a").click(function(event){
  event.preventDefault();
  
	getCurrentImage(this);
  
  //Show the overlay.
  $overlay.show();
	
  
});


//When overlay is clicked
$closeLightbox.click(function(){
  //Hide the overlay
  $overlay.hide();
});

$leftArrow.click(function(){
  getPrevImage();
});

$rightArrow.click(function(){
  getNextImage();
});


function getCurrentImage(currentImage){
	thisImage = currentImage;
	
	var imageLocation = $(currentImage).attr("href");
	$image.attr("src", imageLocation);
	
	//Get child's alt attribute and set caption
  $captionTitle.text($(currentImage).next().text());
  $caption.text($(currentImage).next().next().text());

}

function getPrevImage() {
	var imageParent = $(thisImage).parent();
  if(imageParent.is(":first-child")) {											//created looping condition if previous selected from first item
		thisImage = $("ul li:last").children("a");
	} else {
		thisImage = $(imageParent).prev().children("a");
	}

	getCurrentImage(thisImage);
	
}

function getNextImage() {
	var imageParent = $(thisImage).parent();
  if(imageParent.is(":last-child")) {												//created looping condition if next selected from last item
		thisImage = $("ul li:first").children("a");
	} else {
		thisImage = $(imageParent).next().children("a");
	}	
	
	getCurrentImage(thisImage);
}


//keyboard bindings for esc, left arrow and right arrow
$(document).keyup(function(e){
	if( e.which == 27 ) {
		$overlay.hide();
	} else if (e.which == 37) {
		getPrevImage();
	} else if (e.which == 39) {
		getNextImage();
	}
});


