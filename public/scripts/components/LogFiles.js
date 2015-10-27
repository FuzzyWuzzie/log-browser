(function() {
	var LogFiles = React.createClass({
		getInitialState: function() {
			return {files: []};
		},
		componentDidMount: function() {
			ListStore.bind('change', this.listChanged);
			ListStore.update();
		},
		componentWillUnmount: function() {
			ListStore.unbind('change', this.listChanged);
		},
		listChanged: function() {
			this.setState({
				files: ListStore.files,
			});
		},
		render: function() {
			return (
				<ul>{this.state.files.map(function(file) {
					return <LogFilename key={file} name={file}/>;
				})}</ul>
			);
		}
	});
	window.LogFiles = LogFiles;
})();