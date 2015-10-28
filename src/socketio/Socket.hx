package socketio;

extern class Socket {
	private function new(){}
	public function on(event:String, callback:Dynamic->Void):Void;
	public function emit(event:String, data:Dynamic):Void;
}