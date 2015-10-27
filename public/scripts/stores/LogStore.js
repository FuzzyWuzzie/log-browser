(function() {
	var LogStore = {
		file: "",
		entries: [],
		update: function(fileName) {
			LogAPI(fileName).get()
			.then(function(json) {
				LogStore.file = json.f;
				LogStore.entries = json.l;
				LogStore.trigger('change');
			})
			.catch(function(err) {
				console.log('error: ');
				console.log(err);
			});
		}
	};
	MicroEvent.mixin(LogStore);

	window.LogStore = LogStore;
})();