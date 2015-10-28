package socketio;

@:native('io')
extern class Client {
	public static function connect(?address:String):socketio.Socket;
}