// Respond to the click on extension Icon
chrome.browserAction.onClicked.addListener(function (tab) {
    'use strict';
	chrome.tabs.executeScript({
        file: 'thirdParty/jquery-2.0.3.js'
	});
    chrome.tabs.executeScript({
		file: 'print.js'
	});
});
