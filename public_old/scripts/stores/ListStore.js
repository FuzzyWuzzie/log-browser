(function() {
	var ListStore = {
		files: [],
		update: function() {
			LogsAPI.get()
			.then(function(json) {
				ListStore.files = json;
				ListStore.trigger('change');
			})
			.catch(function(err) {
				console.log('error: ');
				console.log(err);
			});
		}
	};

	window.ListStore = ListStore;
	MicroEvent.mixin(window.ListStore);
})();