(function() {
	var LogEntries = React.createClass({
		render: function() {
			return (
				<table><tbody><tr>
					<td>{this.props.entries.map(function(entry) {
						return <LogEntryLineNumber key={entry.l} number={entry.l}/>;
					})}</td>
					<td><pre>{this.props.entries.map(function(entry) {
						return <LogEntry key={entry.l} entry={entry.e}/>;
					})}</pre></td>
				</tr></tbody></table>
			);
		}
	});
	window.LogEntries = LogEntries;
})();