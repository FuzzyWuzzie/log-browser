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
	MicroEvent.mixin(ListStore);

	window.ListStore = ListStore;
})();