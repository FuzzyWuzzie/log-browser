(function() {
	var LogEntryLineNumber = React.createClass({
		render: function() {
			return <span>{this.props.number}</span>;
		}
	});
	window.LogEntryLineNumber = LogEntryLineNumber;
})();