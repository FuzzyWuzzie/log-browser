package stores;

import msignal.Signal;

import Ajax;
import Ajax.HTTPMethod;
import Ajax.Response;

class LogStore {
	private function new(){}
	public static var file(default, null):String;
	public static var entries(default, null):Array<LogEntry>;
	public static var changed(default, null):Signal0 = new Signal0();

	public static function update(filename:String) {
		Ajax.request(
			HTTPMethod.GET,
			'/api/v1/log/' + filename
		).then(function(res:Response) {
			var data = haxe.Json.parse(res.response);
			file = data.f;
			entries = data.d;
			changed.dispatch();
		}).catchError(function(err:Dynamic) {
			App.console.log(err);
		});
	}
}