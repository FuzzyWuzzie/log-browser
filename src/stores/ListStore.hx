package stores;

import msignal.Signal;

import Ajax;
import Ajax.HTTPMethod;
import Ajax.Response;

class ListStore {
	private function new(){}
	public static var files(default, null):Array<String>;
	public static var changed(default, null):Signal0 = new Signal0();

	public static function update() {
		Ajax.request(
			HTTPMethod.GET,
			'/api/v1/logs'
		).then(function(res:Response) {
			var data = haxe.Json.parse(res.response);
			files = data;
			changed.dispatch();
		}).catchError(function(err:Dynamic) {
			App.console.log(err);
		});
	}
}