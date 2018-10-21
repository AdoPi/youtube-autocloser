// YT-AUTOCLOSER 
// Copyright Adonis Najimi @AdoPi
// MIT License
var browser = browser || chrome;

var isDisable = false;


function enable() {
	browser.browserAction.setBadgeText({text:'ON'});
	browser.browserAction.setBadgeBackgroundColor({color:'green'});
}

function disable() {
	browser.browserAction.setBadgeText({text:'OFF'});
	browser.browserAction.setBadgeBackgroundColor({color:'red'});
}

browser.browserAction.onClicked.addListener(function(tab){
	// change background color icon and toggle activation
	if (isDisable) {
		browser.tabs.sendMessage(tab.id, 'enabled');
		enable();
	} else {
		disable();
	}
	isDisable = !isDisable;
});

browser.runtime.onInstalled.addListener(function(){
	// Enable extension
	enable();
	// Open donation page
	browser.tabs.create({url:'pages/donation.html'});
});

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	browser.tabs.sendMessage(tabId, 'updated');
});

browser.tabs.onCreated.addListener(function(tab) {
	if (tab.url.includes('youtube') || tab.url.includes('youtu.be'))
		browser.tabs.sendMessage(tab.id, 'created');
});

browser.runtime.onConnect.addListener(function(port) {
	// Closing the corresponding tab
	port.onMessage.addListener(function(msg){
		browser.tabs.query({ url: msg }, function(tabs) {
			if (tabs && tabs[0]) {
				if (!isDisable)
					browser.tabs.remove(tabs[0].id);
			}
		});
	});
});

