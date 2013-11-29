/********************************************************
 * PrettyPrint HTML5ROCKS
 * Here is the bookmarklet version
 * For step by step explanation of the code look below.
 * Author:Ishan
 * email: ishan1608@gmail.com
 * Google Plus: https://plus.google.com/111814328368711145786
 ********************************************************/

/* Instructions:
 1. Create a new bookmark in your browser.
 2. In the address field copy and paste the code below.
 3. Open any tutorial at http://www.html5rocks.com
 4. Click on the bookmark you created in step 1.
    Article is now fit for printing.*/

javascript:(function(){document.getElementsByTagName('header')[0].style.display='none';var divs=document.getElementsByTagName('div');divs[5].style.margin='1em auto';var header=divs[5].firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling;header.nextSibling.nextSibling.style.display='none';header.getElementsByTagName('a')[2].style.display='none';var article=divs[5].firstChild.nextSibling.nextSibling.nextSibling;article.firstChild.nextSibling.style.display='none';article.style.marginLeft='0px';var ref=article.nextSibling.nextSibling;ref.innerText=location.href;ref.style.marginLeft='0px';ref.style.textAlign='center';ref.style.fontWeight='bold';ref.nextSibling.nextSibling.style.display='none';window.print();})();

/* Note:  
    This doesn't works on the 'Update' <updates.html5rocks.com/*> articles on HTML5ROCKS
    I will update the script for the same later.*/

/******************************************************
 *     Step By Step Code
 ******************************************************/
/**

//Wrapper for the bookmark
javascript:(function(){
	
})();


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
**/
