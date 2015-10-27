(function() {
	var LogHeader = React.createClass({
		render: function() {
			return <header><h1>{this.props.logFile}</h1></header>;
		}
	});
	window.LogHeader = LogHeader;
})();