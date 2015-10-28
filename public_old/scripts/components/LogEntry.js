(function() {
	var LogEntry = React.createClass({
		render: function() {
			return <span>{this.props.entry}</span>;
		}
	});
	window.LogEntry = LogEntry;
})();