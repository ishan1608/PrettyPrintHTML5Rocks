/****************************************************************************
 * PrettyPrintHTML5ROCKS
 * This is the script which modifies the articles on 
 * http://www.html5rocks.com and make them fit for printing.
 * Author:Ishan
 * email: ishanatmuzaffarpur@gmail.com
 * Google Plus: https://plus.google.com/111814328368711145786
 ****************************************************************************/

/* Steps:
  1. Rmove the top header of the page.
  2. Remove the Table of Contents.
  3. Fill the extra space by the article content.
  4. Remove the number of comments.
  5. Add the URL to bottom of the article.
  6. Remove the disqus comments.
  7. Remove the footer
  8. If there are embedded videos remove them.
  9. If there is redirect message remove it.
 10. Call window.print() to print the document.
*/

/******************************************************
 *     Step By Step Code
 ******************************************************/

// jsLint global variables
/*jslint browser: true, devel: true */

// Current Working set

// Global variables
var pageMode, urlMode;
var embeds, ref;
var i;
var urlHolder, redirectMessage;

if (location.href.substring(0, 30) === "http://updates.html5rocks.com/" || location.href.substring(0, 26) === "http://www.html5rocks.com/") {
    // Breaking URL into parts
    var partsOfURL = location.href.split('/');

    if (partsOfURL[4] === "tutorials" && partsOfURL[6] !== undefined) {

        var articleModifier = function () {
            'use strict';
            // html5rocks->tutorial

            // switching between print and web display
            // document.getElementsByTagName('header')[0].style.display
            // Defaults to 'false' in the first run.
            // element.style doesn't get computed styles it gets set styles
            // instead use window.getComputedStyle(element)
            // referred from here http://stackoverflow.com/questions/20329730/
            if (window.getComputedStyle(document.getElementsByTagName('header')[0]).display === 'none') {
                pageMode = 'block';
                urlMode = 'none';
            } else {
                pageMode = 'none';
                urlMode = 'block';
            }
    
            // Remove top header
            document.getElementsByTagName('header')[0].style.display = pageMode;
    
            // selecting divs so that further elements of the page can be selected
            var divs = document.getElementsByTagName('div');
    
            // Hide Table of Contents
            divs[1].style.display = pageMode;
    
            // switching the article between print mode and web mode
            if (pageMode === 'none') {
                // Making article fill the screen
                divs[2].style.marginLeft = '0px';
                divs[2].style.maxWidth = 'inherit';
                divs[2].style.width = '100%';
            } else {
                // Making article shrink back
                divs[2].style.marginLeft = '350px';
                divs[2].style.maxWidth = '660px';
                divs[2].style.width = '87%';
            }
    
            // Remove the number of comments
            document.getElementsByClassName('load-comments')[0].parentElement.style.display = pageMode;
    
            // Creating URL Holder if it is not deifned
            if (typeof (urlHolder) === 'undefined') {
                // Create a new element for the URL
                urlHolder = document.createElement('section');
                // make it look like it belongs
                urlHolder.className = 'cc pattern-bg-lighter';
                // append it after the article
                divs[2].appendChild(urlHolder);
    
                // Set innerText to the url
                urlHolder.innerText = location.href;
                // Stylising the reference
                urlHolder.style.marginLeft = '0px';
                urlHolder.style.textAlign = 'center';
                urlHolder.style.fontWeight = 'bold';
                urlHolder.style.paddingTop = '20px';
            }
    
            // switching display of disqus comments for print mode and web mode
            // divs[8].style.display=pageMode;
            // This moethod doesn't works as embedded youtube videos are contained in div elements with class 'embed-container'
            document.getElementById('disqus').style.display = pageMode;
    
            // switching display of urlHolder for print mode and web mode
            urlHolder.style.display = urlMode;
    
            // switching display of footer for print mode and web mode
            document.getElementsByTagName('footer')[0].style.display = pageMode;
    
            // Removing Youtube embedded videos if any because they come up as black spots in the print
            embeds = document.getElementsByClassName('embed-container');
            for (i = 0; i < embeds.length; i = i + 1) {
                embeds[i].style.display = pageMode;
            }
    
            // Removing the redirection from different language message
            redirectMessage = document.getElementsByClassName('redirect_notification')[0];
            if (redirectMessage) {
                redirectMessage.style.display = pageMode;
            }
    
            // Print the document.
            if (pageMode === 'none') {
                window.print();
                // Switching back to webmode
                articleModifier();
            }
        };
        
        // document.readyState returns 'complete' when the dom is ready to be manipulated.
        if (document.readyState !== 'complete') {
            window.alert("Please wait for the page to load completely.");
        } else {
            // calling articleModifier causes the switch between printMode and webMode
            // First call for printMode
            articleModifier();
        }
        
	} else if (location.href.substring(0, 30) === "http://updates.html5rocks.com/" && location.href.length > 30) {
        var updateModifier = function () {
            'use strict';
            // I couldn't find any redirect pages for 'Update' but just in case
            // Going from redirect URL to the original English article
            if (location.href.substring(location.href.lastIndexOf('/'), location.href.lastIndexOf('/') + 22) === "/?redirect_from_locale") {
                window.alert("Redirecting you to original article. Please print the article from there.");
                window.location = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
            }
    
            // html5rocks->update
    
            // switching between print and web display
            // document.getElementsByTagName('header')[0].style.display === 'block'
            // Defaults to 'false' in the first run.
            // element.style doesn't get computed styles it gets set styles
            // instead use window.getComputedStyle(element)
            // referred from here http://stackoverflow.com/questions/20329730/
            if (window.getComputedStyle(document.getElementsByTagName('header')[0]).display === 'none') {
                pageMode = 'block';
                urlMode = 'none';
            } else {
                pageMode = 'none';
                urlMode = 'block';
            }
    
            // Remove top header
            document.getElementsByTagName('header')[0].style.display = pageMode;
    
            // selecting divs so that further elements of the page can be selected
            var divs = document.getElementsByTagName('div');
            // switch margin between 4.5em to 1em to give nice spacing
            if (pageMode === 'none') {
                divs[5].style.margin = '1em auto';
            } else {
                divs[5].style.margin = '4.5em auto';
            }
    
            // Remove tags, blank space and google+ share
            divs[7].style.display = pageMode;
            divs[8].style.display = pageMode;
            divs[9].style.display = pageMode;
    
            // Setting reference div
            ref = divs[5].firstChild.nextSibling.lastChild.previousSibling;
    
            // switch between print mode and web mode for displaying reference
            ref.style.display = pageMode;
    
            // Creating URL Holder if it is not deifned
            if (typeof (urlHolder) === 'undefined') {
                // Create a new element for the URL
                urlHolder = document.createElement('section');
                // make it look like it belongs
                urlHolder.className = 'cc pattern-bg-lighter';
                // append it side by side with reference
                divs[5].appendChild(urlHolder);
                // Set innerText to the url
                urlHolder.innerText = location.href;
                // Stylising the reference
                urlHolder.style.marginLeft = '0px';
                urlHolder.style.textAlign = 'center';
                urlHolder.style.fontWeight = 'bold';
            }
    
            // switching display of urlHolder for print mode and web mode
            urlHolder.style.display = urlMode;
            
            // Print the document.
            if (pageMode === 'none') {
                window.print();
                // Switching back to webmode
                updateModifier();
            }
        };
        // document.readyState returns 'complete' when the dom is ready to be manipulated.
        if (document.readyState !== 'complete') {
            window.alert("Please wait for the page to load completely.");
        } else {
            // calling updateModifier causes the switch between printMode and webMode
            // First call for printMode
            updateModifier();
        }
	} else {
		// HTML5Rocks but not article
		window.alert("You are on html5rocks, Now Please choose an article to print");
	}
} else {
	// Some website other than HTML5Rocks
	window.alert("This extension only prettifies html5rocks Please visit http://www.html5rocks.com");
}
