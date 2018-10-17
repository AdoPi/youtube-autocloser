// YT-AUTOCLOSER 
// Copyright Adonis Najimi @AdoPi
// MIT License
var browser = browser || chrome;


// open donation page
browser.runtime.onInstalled.addListener(function(){
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
				browser.tabs.remove(tabs[0].id);
			}
		});
	});
});

