/****************************************************************************
 * PrettyPrintHTML5ROCKS
 * This is the script which modifies the articles on 
 * http://www.html5rocks.com and make them fit for printing.
 * Author:Ishan
 * email: ishanatmuzaffarpur@gmail.com
 * Google Plus: https://plus.google.com/111814328368711145786
 ****************************************************************************/

/*global $ */

/* Steps:
  1. Rmove the top header of the page.
  2. Remove the Table of Contents.
  3. Fill the extra space by the article content.
  4. Resize the Code Snippets
  5. Remove the number of comments.
  6. Add the URL to bottom of the article.
  7. Remove the disqus comments.
  8. Remove the footer
  9. If there are embedded videos remove them.
 10. If there is redirect message remove it.
 11. Call window.print() to print the document.
*/

/******************************************************
 *     Step By Step Code
 ******************************************************/

// jsLint global variables
/*jslint browser: true, devel: true */

// Current Working set

// Global variables
var pageMode, urlMode;
var embeds, ref, codeSnippets;
var i;
var urlHolder, redirectMessage;

// Font sizes for different modes
// 9 - small, 12 - normal, 18 - large
var articleFontSize = '12px', codeSnippetsFontSize = '10px';
var ARTICLEFONTSIZEORIGINAL = '18px', CODESNIPPETSFONTSIZEORIGINAL = '15px';
var container, options;
var small, normal, large, buttons;

// variables which do not work due to asynchronous nature of the input taken from user.
// var continueCondition = false;
var result;
var promise;

// size selector - a way to chose the font size
// this function waits for the user response, and thus by nature acts as asynchronous function
// Alas! I finally made an asynchronous function.
// This should return a jQuery promise object, which will reject when the user either clicks on blank space or resolve when clicked on any one of the three buttons.
var sizeSelector = function () {
    'use strict';
    // console.log('Size selector has been called');
    
    // A Deferred object to return
    result = new $.Deferred();
    
    // Currently I will be rendering the choice container with the old mehtods of creating every element using javascript
    // TODO: I plan to keep HTML for the choice container in a separate file.
    // It should be having the functionality of text plugin of requirejs. https://github.com/requirejs/text
    // And rendering of Mustache. https://github.com/janl/mustache.js  --  http://coenraets.org/blog/2011/12/tutorial-html-templates-with-mustache-js/
    // jQuery promise object is used to handle the input from user which essentially behaves as an asynchronous call.
    // I am hoping to handle third party libraries using git submodules.
    
    if (typeof (container) === 'undefined') {
        // Creating a div element of size equivalent to the visible area.
        container = document.createElement('div');
        container.setAttribute('id', 'optionsContainer');
        container.style.display = 'block';
        container.style.position = 'fixed';
        container.style.top = '0px';
        container.style.left = '0px';
        container.style.bottom = '0px';
        container.style.right = '0px';
        // background as 50% opaque black
        container.style.backgroundColor = '#000';
        container.style.opacity = 0.5;
        // Setting the z-index 999
        container.style.zIndex = 999;
        // Add the element to the html of the page
        document.body.appendChild(container);
        
        // Show the underneath page when clicked on blank area
        container.onclick = function () {
            // Hide the option container
            container.style.display = 'none';
            // continueCondition = false;
            
            // Reject the promise
            result.reject();
        };
        
        // Creating the font size choser
        if (typeof (options) === 'undefined') {
            // The 'Small' button
            small  = document.createElement('button');
            small.setAttribute('id', 'small');
            small.innerText = 'Small';
            small.style.backgroundColor = 'rgba(149,126,210)';
            
            // click handler
            small.onclick = function () {
                // Hide the option container
                container.style.display = 'none';
                // setting the size for printing
                articleFontSize = '9px';
                codeSnippetsFontSize = '8px';
                // continueCondition = true;
                // console.log('articleFontSize : ' + articleFontSize + '  codeSnippetsFontSize : ' + codeSnippetsFontSize);
                // Resolve the promise
                result.resolve();
                /*
                if (result.resolve()) {
                    console.log('Successfully resolved the promise');
                } else {
                    console.log('error while trying to resolve the promise');
                }
                */
            };
            
            // The 'Normal' button
            normal = document.createElement('button');
            normal.setAttribute('id', 'normal');
            normal.innerText = 'Normal';
            normal.style.backgroundColor = 'rgba(89,161,62)';
            
            // click handler
            normal.onclick = function () {
                // Hide the option container
                container.style.display = 'none';
                // setting the size for printing
                articleFontSize = '12px';
                codeSnippetsFontSize = '10px';
                // continueCondition = true;
                // console.log('articleFontSize' + articleFontSize + 'codeSnippetsFontSize' + codeSnippetsFontSize);
                // Resolve the promise
                result.resolve();
            };
            
            // The 'Large' button
            large  = document.createElement('button');
            large.setAttribute('id', 'large');
            large.innerText = 'Large';
            large.style.backgroundColor = 'rgba(188,19,51)';
            
            // click handler
            large.onclick = function () {
                // Hide the option container
                container.style.display = 'none';
                // setting the size for printing
                articleFontSize = '18px';
                codeSnippetsFontSize = '15px';
                // continueCondition = true;
                // console.log('articleFontSize' + articleFontSize + 'codeSnippetsFontSize' + codeSnippetsFontSize);
                // Resolve the promise
                result.resolve();
            };
            
            // Adding buttons to the overlay options panel
            buttons = [small, normal, large];
            for (i = 0; i <= 2; i = i + 1) {
                buttons[i].style.padding = '5px 10px 6px';
                buttons[i].style.color = '#000';
                buttons[i].style.textDecoration = 'none';
                buttons[i].style.fontWeight = 'bold';
                buttons[i].style.lineHeight = 3;
                buttons[i].style.borderRadius = '5px';
                buttons[i].style.boxShadow = '0 1px 3px rgba(0,0,0,0.5)';
                buttons[i].style.textShadow = '0 -1px 1px rgba(0,0,0,0.25)';
                buttons[i].style.borderBottom = '1px solid #222';
                buttons[i].style.position = 'relative';
                buttons[i].style.cursor = 'relative';
                container.appendChild(buttons[i]);
            }
        } else {
            options.style.display = 'block';
        }
    } else {
        container.style.display = 'block';
    }
    return result.promise();
};

if (location.href.substring(0, 30) === "http://updates.html5rocks.com/" || location.href.substring(0, 26) === "http://www.html5rocks.com/") {
    // Breaking URL into parts
    var partsOfURL = location.href.split('/');

    if (partsOfURL[4] === "tutorials" && partsOfURL[6] !== undefined) {
        
        var articleModifier = function () {
            // removed the printMode argument
            'use strict';
            // html5rocks->tutorial
            
            // console.log('articleModifier got called');
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
                // Making text small
                divs[2].style.fontSize = articleFontSize;
                // Reduce the line-height
                divs[2].style.lineHeight = 1.0;
            } else {
                // Making article shrink back
                divs[2].style.marginLeft = '350px';
                divs[2].style.maxWidth = '660px';
                divs[2].style.width = '87%';
                //Enlarging the text again
                divs[2].style.fontSize = ARTICLEFONTSIZEORIGINAL;
                // Reset the line-height
                divs[2].style.lineHeight = 1.5;
            }
            
            // Resizng the code snippets
            codeSnippets = document.getElementsByClassName('prettyprint');
            if (pageMode === 'none') {
                for (i = codeSnippets.length - 1; i >= 0; i = i - 1) {
                    codeSnippets[i].style.fontSize = codeSnippetsFontSize;
                }
            } else {
                for (i = codeSnippets.length - 1; i >= 0; i = i - 1) {
                    codeSnippets[i].style.fontSize = CODESNIPPETSFONTSIZEORIGINAL;
                }
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
                // calling articleModifier causes the switch between print_Mode and webMode
                // Switching back to webmode
                articleModifier();
            }
            
        };
        
        // document.readyState returns 'complete' when the dom is ready to be manipulated.
        if (document.readyState !== 'complete') {
            window.alert("Please wait for the page to load completely.");
        } else {
            // console.log('the start is called ');
            promise = sizeSelector();
            // console.log('promise = ' + promise + '\t now either the promise will be resolved or rejected');
            
            // user selected a font size thus resolving the promise
            promise.done(function () {
                'use strict';
                // console.log('sizeSelector resolved the promise');
                articleModifier();
            });
            
            // user chose to go back to the webpage thus rejecting the promise
            promise.fail(function () {
                'use strict';
                // console.log('sizeSelector rejected the promise');
            });
            
            // articleModifier(true);
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
            // calling updateModifier causes the switch between print_Mode and webMode
            // First call for print_Mode
            updateModifier();
        }
	} else {
		// HTML5Rocks but not article
		window.alert("You are on html5rocks, Now Please choose an article to print");
	}
} else {
	// Some website other than HTML5Rocks
	window.alert("This extension only prettifies html5rocks Please visit http://www.html5rocks.com");
    // now since jquery is available with asynchronousity, the object $ is available.
    // $("body").html("Foo!");
}