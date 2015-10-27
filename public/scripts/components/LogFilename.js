(function() {
	var LogFilename = React.createClass({
		render: function() {
			return <li><a href="#" onClick={this.handleClick}>{this.props.name}</a></li>;
		},
		handleClick: function() {
			LogStore.update(this.props.name);
		}
	});
	window.LogFilename = LogFilename;
})();