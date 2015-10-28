(function() {
	var LogInspector = React.createClass({
		getInitialState: function() {
			return {logFile: "", entries: []};
		},
		componentDidMount: function() {
			LogStore.bind('change', this.listChanged);
			LogStore.update('');
		},
		componentWillUnmount: function() {
			LogStore.unbind('change', this.listChanged);
		},
		listChanged: function() {
			console.log('list changed');
			this.setState({
				logFile: LogStore.file,
				entries: LogStore.entries
			});
		},
		render: function() {
			return (
				<section>
					<LogHeader logFile={this.state.logFile} />
					<LogEntries entries={this.state.entries} />
				</section>
			);
		}
	});
	window.LogInspector = LogInspector;
})();