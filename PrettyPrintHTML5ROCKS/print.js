/****************************************************************************
 * PrettyPrintHTML5ROCKS
 * This is the script which modifies the articles on 
 * http://www.html5rocks.com and make them fit for printing.
 * Author:Ishan
 * email: ishan1608@gmail.com
 * Google Plus: https://plus.google.com/111814328368711145786
 ****************************************************************************/

/* Steps:
 1. Rmove the top header of the page.
 2. Move the contents upward.
 3. Remove social sharing buttons from the article header.
 4. Remove the Table of Contents.
 5. Fill the extra space by the article content.
 6. Change the content of reference to the page's URL
 7. Remove the footer (comments).
 8. Call window.print() to print the document.
*/

/******************************************************
 *     Step By Step Code
 ******************************************************/

// Current Working set

if(location.href.substring(0,39) === "http://www.html5rocks.com/en/tutorials/" && location.href.length > 46) {
	// html5rocks->tutorial
	
	// Remove top header
	document.getElementsByTagName('header')[0].style.display='none';

	// set margin to 1em to give nice spacing
	var divs=document.getElementsByTagName('div');
	divs[5].style.margin='1em auto';

	// Select article header
	var header=divs[5].firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling;
	// Remove Social Share Buttons
	header.nextSibling.nextSibling.style.display='none';
	// Remove no. of Comments
	header.getElementsByTagName('a')[2].style.display='none';

	// Select the main article wrapper
	var article=divs[5].firstChild.nextSibling.nextSibling.nextSibling;
	// Remove the table of contents
	article.firstChild.nextSibling.style.display='none';
	// Eliminating the gap created because of removing 'table of conents'
	article.style.marginLeft='0px';

	// Selecting reference div
	var ref=article.nextSibling.nextSibling;
	// Set innerText to the url
	ref.innerText=location.href;
	// Stylising the reference
	ref.style.marginLeft='0px';
	ref.style.textAlign='center';
	ref.style.fontWeight='bold';
	// Removing the comments
	ref.nextSibling.nextSibling.style.display='none';

	// Print the document.
	window.print();
	
} else if(location.href.substring(0,30) === "http://updates.html5rocks.com/" && location.href.length > 30) {
	// html5rocks->update
	
	// Remove top header
	document.getElementsByTagName('header')[0].style.display='none';

	// set margin to 1em to give nice spacing
	var divs=document.getElementsByTagName('div');
	divs[5].style.margin='1em auto';

	// Remove tags, blank space and google+ share
	divs[7].style.display='none';
	divs[8].style.display='none';
	divs[9].style.display='none';

	// Setting reference div
	var ref=divs[5].firstChild.nextSibling.lastChild.previousSibling;
	// Set innerText to the url
	ref.innerText=location.href;
	// Stylising the reference
	ref.style.marginLeft='0px';
	ref.style.textAlign='center';
	ref.style.fontWeight='bold';
	
	// Print the document.
	window.print();
	
} else if(location.href.substring(0,30) === "http://updates.html5rocks.com/" || location.href.substring(0,29) === "http://www.html5rocks.com/en/")
{
	// HTML5Rocks but not article
	window.alert("You are on html5rocks, Now Please choose an article");
} else {
	// Some website other than HTML5Rocks
	window.alert("This extension only prettyfies html5rocks Please visit http://www.html5rocks.com");
}
