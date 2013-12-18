/****************************************************************************
 * PrettyPrint HTML5ROCKS
 * Here is the bookmarklet version of PrettyPrintHTML5Rocks
 * For step by step explanation of the code look below.
 * Author:Ishan
 * email: ishan1608@gmail.com
 * Google Plus: https://plus.google.com/111814328368711145786
 ****************************************************************************/

/* Instructions:
 1. Create a new bookmark in your browser.
 2. Type PrettyPrintHTML5Rocks in the title field.
 3. In the address field copy and paste the code below.
 4. Open any article at http://www.html5rocks.com
 5. Click on the bookmark you created in step 1.
    Article is now fit for printing.*/

javascript:(function(){if(location.href.substring(0,39) === "http://www.html5rocks.com/en/tutorials/" && location.href.length > 46) {document.getElementsByTagName('header')[0].style.display='none';var divs=document.getElementsByTagName('div');divs[5].style.margin='1em auto';var header=divs[5].firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling;header.nextSibling.nextSibling.style.display='none';header.getElementsByTagName('a')[2].style.display='none';var article=divs[5].firstChild.nextSibling.nextSibling.nextSibling;article.firstChild.nextSibling.style.display='none';article.style.marginLeft='0px';var ref=article.nextSibling.nextSibling;ref.innerText=location.href;ref.style.marginLeft='0px';ref.style.textAlign='center';ref.style.fontWeight='bold';ref.nextSibling.nextSibling.style.display='none';window.print();} else if(location.href.substring(0,30) === "http://updates.html5rocks.com/" && location.href.length > 30) {document.getElementsByTagName('header')[0].style.display='none';var divs=document.getElementsByTagName('div');divs[5].style.margin='1em auto';divs[7].style.display='none';divs[8].style.display='none';divs[9].style.display='none';var ref=divs[5].firstChild.nextSibling.lastChild.previousSibling;ref.innerText=location.href;ref.style.marginLeft='0px';ref.style.textAlign='center';ref.style.fontWeight='bold';window.print();} else if(location.href.substring(0,30) === "http://updates.html5rocks.com/" || location.href.substring(0,29) === "http://www.html5rocks.com/en/"){window.alert("You are on html5rocks, Now Please choose an article");} else {window.alert("This bookmark only prettyfies html5rocks Please go to http://www.html5rocks.com");}})();


/******************************************************
 *     Step By Step Code
 ******************************************************/
/**

//Wrapper for the bookmark
javascript:(function(){
	
})();

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
	window.alert("This bookmark only prettyfies html5rocks Please go to http://www.html5rocks.com");
}

**/
