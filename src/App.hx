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
		var socket:Socket = Client.connect();
		ReactDOM.render(jsx('<$LogFiles />'), Browser.document.getElementById('logFiles'));
		ReactDOM.render(jsx('<$LogInspector />'), Browser.document.getElementsByTagName('main')[0]);
		stores.ListStore.update();
		stores.LogStore.update('');
	}
}