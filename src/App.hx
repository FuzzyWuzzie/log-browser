import api.react.ReactDOM;
import api.react.ReactMacro.jsx;
import js.Browser;
import socketio.Client;
import socketio.Socket;

import views.LogFiles;
import views.LogInspector;

class App {
	public static var console:js.html.Console = Browser.console;

	static public function main() {
		// connect with websockets
		var socket:Socket = Client.connect();

		// render the JS
		ReactDOM.render(jsx('<$LogFiles />'), Browser.document.getElementById('logFiles'));
		ReactDOM.render(jsx('<$LogInspector />'), Browser.document.getElementsByTagName('main')[0]);

		// update the file list when the server tells us to
		socket.on('filelist-changed', function(data) {
			stores.ListStore.update();
		});

		// update the current file when the server tells us to
		socket.on('file-changed', function(data) {
			if(data.file == stores.LogStore.file) {
				stores.LogStore.update(data.file);
			}
		});

		// set the intial states
		stores.ListStore.update();
		stores.LogStore.update('');
	}
}