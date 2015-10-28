package views;

import api.react.ReactComponent;
import api.react.ReactMacro.jsx;
import js.html.Element;
import js.html.Event;

typedef LogFilesState = {
	var files:Array<String>;
};

typedef LogFilenameProps = {
	var name:String;
};

class LogFiles extends ReactComponentOfState<LogFilesState> {
	public function new() {
		super();
		state = {
			files: new Array<String>()
		};
	}

	private function update() {
		setState({
			files: stores.ListStore.files
		});
	}

	override public function componentDidMount() {
		stores.ListStore.changed.add(update);
	}

	override public function componentWillUnmount() {
		stores.ListStore.changed.remove(update);
	}

	override public function render() {
		return jsx('
			<ul>${createChildren()}</ul>
		');
	}

	private function createChildren() {
		return [for(file in state.files) jsx('<LogFilename key={file} name={file}/>')];
	}
}

class LogFilename extends ReactComponentOfProps<LogFilenameProps> {
	public function new() {
		super();
	}

	override public function render() {
		return jsx('<li onClick=${handleClick}><a href="#">{this.props.name}</a></li>');
	}

	function handleClick() {
		stores.LogStore.update(this.props.name);
	}
}