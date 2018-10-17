// YT-AUTOCLOSER 
// Copyright Adonis Najimi @AdoPi
// MIT License
(function() {
	"use strict";
	var browser = browser || chrome;
	const TIMER = 3000; // ms

	// Detect Youtube
	function isYoutubeUrl(url) {
		return (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?(.*)(v=.+)(.*)$/).test(url);
	};

	var port = browser.runtime.connect();

	function closeVideoEvent() {
		if (isYoutubeUrl(window.location.href)) {
			console.log('this is youtube');
			// Get video to be autoclosed
			var video = document.getElementsByTagName('video')[0];

			// Close the tab :)
			if (video) {
				video.addEventListener('ended', function(e) {
					// NOTE(@adopi) ask to close tab here
					port.postMessage(window.location.href);
				});
			}
		} 
	}

	// page has been updating
	browser.runtime.onMessage.addListener(function() {
		closeVideoEvent();
	});

}());

