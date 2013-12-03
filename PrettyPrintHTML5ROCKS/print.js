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
	
	// switching between print and web display
	// document.getElementsByTagName('header')[0].style.display
	// Defaults to 'false' in the first run.
	// element.style doesn't get computed styles it gets set styles
	// instead use window.getComputedStyle(element)
	// referred from here http://stackoverflow.com/questions/20329730/
	if(window.getComputedStyle(document.getElementsByTagName('header')[0]).display==='none') {
		pageMode='block';
		urlMode='none';
	} else {
		pageMode='none';
		urlMode='block';
	}
	
	// Remove top header
	document.getElementsByTagName('header')[0].style.display=pageMode;

	// selecting divs so that further elements of the page can be selected
	var divs=document.getElementsByTagName('div');
	// switch margin between 4.5em to 1em to give nice spacing
	if(pageMode=='none') {
		divs[5].style.margin='1em auto';
	} else {
		divs[5].style.margin='4.5em auto';
	}

	// Select article header
	var header=divs[5].firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling;
	// Remove Social Share Buttons
	header.nextSibling.nextSibling.style.display=pageMode;
	// Remove no. of Comments
	header.getElementsByTagName('a')[2].style.display=pageMode;

	// Select the main article wrapper
	var article=divs[5].firstChild.nextSibling.nextSibling.nextSibling;
	// Remove the table of contents
	article.firstChild.nextSibling.style.display=pageMode;
	
	// Eliminating the gap created because of removing 'table of conents' (switching for filling space with table of contents)
	if(pageMode=='none') {
		article.style.marginLeft='0px';
	} else {
		article.style.marginLeft='340px';
	}

	// Selecting reference div
	var ref=article.nextSibling.nextSibling;
	// switch between print mode and web mode for displaying reference
	ref.style.display=pageMode;
	
	// Removing the comments
	ref.nextSibling.nextSibling.style.display=pageMode;
	
	// Creating URL Holder if it is not deifned
	if(typeof(urlHolder)=='undefined') {
		// Create a new element for the URL
		var urlHolder = document.createElement('section');
		// make it look like it belongs
		urlHolder.className='cc pattern-bg-lighter';
		// append it side by side with reference
		divs[5].appendChild(urlHolder);
		// Set innerText to the url
		urlHolder.innerText=location.href;
		// Stylising the reference
		urlHolder.style.marginLeft='0px';
		urlHolder.style.textAlign='center';
		urlHolder.style.fontWeight='bold';
	}
	
	// switching display of urlHolder for print mode and web mode
	urlHolder.style.display=urlMode;

	// Print the document.
	if(pageMode=='none') {
		window.print();
	}
	
} else if(location.href.substring(0,30) === "http://updates.html5rocks.com/" && location.href.length > 30) {
	// html5rocks->update
	
	// switching between print and web display
	// document.getElementsByTagName('header')[0].style.display
	// Defaults to 'false' in the first run.
	// element.style doesn't get computed styles it gets set styles
	// instead use window.getComputedStyle(element)
	// referred from here http://stackoverflow.com/questions/20329730/
	if(window.getComputedStyle(document.getElementsByTagName('header')[0]).display==='none') {
		pageMode='block';
		urlMode='none';
	} else {
		pageMode='none';
		urlMode='block';
	}
	
	// Remove top header
	document.getElementsByTagName('header')[0].style.display=pageMode;
	
	// selecting divs so that further elements of the page can be selected
	var divs=document.getElementsByTagName('div');
	// switch margin between 4.5em to 1em to give nice spacing
	if(pageMode=='none') {
		divs[5].style.margin='1em auto';
	} else {
		divs[5].style.margin='4.5em auto';
	}
	
	// Remove tags, blank space and google+ share
	divs[7].style.display=pageMode;
	divs[8].style.display=pageMode;
	divs[9].style.display=pageMode;
	
	// Setting reference div
	var ref=divs[5].firstChild.nextSibling.lastChild.previousSibling;
	
	// switch between print mode and web mode for displaying reference
	ref.style.display=pageMode;
	
	// Creating URL Holder if it is not deifned
	if(typeof(urlHolder)=='undefined') {
		// Create a new element for the URL
		var urlHolder = document.createElement('section');
		// make it look like it belongs
		urlHolder.className='cc pattern-bg-lighter';
		// append it side by side with reference
		divs[5].appendChild(urlHolder);
		// Set innerText to the url
		urlHolder.innerText=location.href;
		// Stylising the reference
		urlHolder.style.marginLeft='0px';
		urlHolder.style.textAlign='center';
		urlHolder.style.fontWeight='bold';
	}
	
	// switching display of urlHolder for print mode and web mode
	urlHolder.style.display=urlMode;
	
	// Print the document.
	if(pageMode=='none') {
		window.print();
	}
	
} else if(location.href.substring(0,30) === "http://updates.html5rocks.com/" || location.href.substring(0,29) === "http://www.html5rocks.com/en/")
{
	// HTML5Rocks but not article
	window.alert("You are on html5rocks, Now Please choose an article to print");
} else {
	// Some website other than HTML5Rocks
	window.alert("This extension only prettifies html5rocks Please visit http://www.html5rocks.com");
}
