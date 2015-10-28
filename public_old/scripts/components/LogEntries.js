(function() {
	var LogEntries = React.createClass({
		render: function() {
			return (
				<ul>
					<li><pre>{this.props.entries.map(function(entry) {
						return <LogEntry key={entry.l} entry={entry.e}/>;
					})}</pre></li>
				</ul>
			);
		}
	});
	window.LogEntries = LogEntries;
})();