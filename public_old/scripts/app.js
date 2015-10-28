(function () {
	"use strict";

	// start the websocket
	var socket = io();

	// show the file list
	ReactDOM.render(
	  <LogFiles />,
	  document.getElementById('logFiles')
	);

	// show the log inspector
	ReactDOM.render(
	  <LogInspector />,
	  document.getElementsByTagName('main')[0]
	);

	// update the file list when the server tells us to
	socket.on('filelist-changed', function(data) {
		ListStore.update();
	});

	// update the current file when the server tells us to
	socket.on('file-changed', function(data) {
		if(data.file === LogStore.file) {
			LogStore.update(data.file);
		}
	});
})();
