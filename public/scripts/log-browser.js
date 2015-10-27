var logData = [
	{ line: 0, entry: "i / 2015-10-27T04:16:18.224Z / server started on port 8000!" },
	{ line: 1, entry: "b / 2015-10-27T04:29:04.410Z / 70.74.201.34 => wishlist.hamaluik.com => 8001" },
	{ line: 2, entry: "e / 2015-10-27T04:38:33.597Z / 10.0.1.60 => 10.0.1.3 => X" },
	{ line: 3, entry: "e / 2015-10-27T04:38:37.947Z / 10.0.1.60 => 10.0.1.3 => X" },
	{ line: 4, entry: "e / 2015-10-27T04:38:39.418Z / 10.0.1.60 => 10.0.1.3 => X" },
	{ line: 5, entry: "e / 2015-10-27T05:08:11.045Z / 185.93.185.47 => 70.74.201.34 => X" }
];

var LogEntry = React.createClass({
	render: function() {
		return <li>{this.props.entry}</li>;
	}
});

var LogList = React.createClass({
	render: function() {
		return (
			<ul>{this.props.entries.reverse().map(function(entry) {
				return <LogEntry key={entry.line} entry={entry.entry}/>;
			})}</ul>
		);
	}
});

ReactDOM.render(
  <LogList entries={logData} />,
  document.getElementsByTagName('main')[0]
);