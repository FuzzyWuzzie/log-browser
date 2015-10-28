(function() {
	var LogFilename = React.createClass({
		render: function() {
			return <li onClick={this.handleClick}><a href="#">{this.props.name}</a></li>;
		},
		handleClick: function() {
			LogStore.update(this.props.name);
		}
	});
	window.LogFilename = LogFilename;
})();