package views;

import api.react.ReactComponent;
import api.react.ReactMacro.jsx;
import js.html.Element;
import js.html.Event;

typedef LogInspectorState = {
	var file:String;
	var entries:Array<LogEntry>;
};

typedef LogHeaderProps = {
	var file:String;
};

typedef LogEntriesProps = {
	var entries:Array<LogEntry>;
};

typedef LogEntryItemProps = {
	var item:LogEntry;
};

class LogInspector extends ReactComponentOfState<LogInspectorState> {
	public function new() {
		super();
		state = {
			file: '',
			entries: []
		};
	}

	private function update() {
		setState({
			file: stores.LogStore.file,
			entries: stores.LogStore.entries
		});
	}

	override public function componentDidMount() {
		stores.LogStore.changed.add(update);
	}

	override public function componentWillUnmount() {
		stores.LogStore.changed.remove(update);
	}

	override public function render() {
		return jsx('
			<section>
				<$LogHeader file=${state.file}/>
				<$LogEntries entries=${state.entries}/>
			</section>
		');
	}
}

class LogHeader extends ReactComponentOfProps<LogHeaderProps> {
	public function new() {
		super();
	}

	override public function render() {
		return jsx('<header><h1>${props.file}</h1></header>');
	}
}

class LogEntries extends ReactComponentOfProps<LogEntriesProps> {
	public function new() {
		super();
	}

	override public function render() {
		return jsx('
			<ul>
				${createChildren()}
			</ul>
		');
	}

	private function createChildren() {
		return [for(entry in props.entries) jsx('<LogEntryItem key={entry.date} item={entry}/>')];
	}
}

class LogEntryItem extends ReactComponentOfProps<LogEntryItemProps> {
	public function new() {
		super();
	}

	override public function render() {
		var entry:LogEntry = props.item;
		var data:String = entry.data != null ? haxe.Json.stringify(entry.data) : '';
		return jsx('
			<li>
				<span className="date">${entry.date}</span>
				<span className="severity">
					<span className="${entry.severity}"/>
				</span>
				<span className="message">${entry.message}</span>
				<span className="data">${data}</span>
			</li>
		');
	}
}