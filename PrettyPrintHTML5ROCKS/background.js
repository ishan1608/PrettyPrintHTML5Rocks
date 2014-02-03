/*global chrome */

// Respond to the click on extension Icon
chrome.browserAction.onClicked.addListener(function (tab) {
    'use strict';
    
    // Add all the libraries one by one through callback using programmatic injection
    // chrome.tabs.executeScript(integer tabId, InjectDetails details, function callback)
    chrome.tabs.executeScript(null, {
        file: 'thirdParty/jquery-2.0.3.js'
    }, function () {
        chrome.tabs.executeScript(null, {
            file: 'thirdParty/require.js'
        }, function () {
            chrome.tabs.executeScript(null, {
                file: 'thirdParty/text.js'
            }, function () {
                chrome.tabs.executeScript(null, {
                    file: 'thirdParty/mustache.js'
                }, function () {
                    chrome.tabs.executeScript(null, {
                        file: 'print.js'
                    });
                });
            });
        });
    });
    
    // Keeping other methods in here for future reference.
    
    /*
    // Old method asynchronousity problem
	chrome.tabs.executeScript({
        file: 'thirdParty/jquery-2.0.3.js'
	});
    chrome.tabs.executeScript({
		file: 'print.js'
	});
    */
    
    /*
    // This method solves asynchronousity but causes jQuery to be not available to my script.
    // I have NO idea why
    function loadExtension(callback) {
        chrome.tabs.executeScript({
            file: 'thirdParty/jquery-2.0.3.js'
        });
        callback();
    }
    
    function runPrint() {
        chrome.tabs.executeScript({
            file: 'print.js'
        });
    }
    
    loadExtension(runPrint);
    */
    
    /*
    // Context of jquery and print.js is not same.
    function loadExtension(callback) {
        chrome.tabs.executeScript({
            file: 'thirdParty/jquery-2.0.3.js'
        });
        // callback.call(this);
        // callback.bind(this);
        callback.apply(this);
        // callback();
    }
    
    function runPrint() {
        chrome.tabs.executeScript({
            file: 'print.js'
        });
    }
    
    loadExtension(runPrint);
    */
    
    /*
    // This method doesn't works
    chrome.tabs.executeScript({
        file: 'thirdParty/jquery-2.0.3.js'
    }).chrome.tabs.executeScript({
        file: 'print.js'
    });
    */
});
