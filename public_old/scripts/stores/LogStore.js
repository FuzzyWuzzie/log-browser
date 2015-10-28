(function() {
	var LogStore = {
		file: "",
		entries: [],
		update: function(fileName) {
			console.log('updating log store!');
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

	window.LogStore = LogStore;
	MicroEvent.mixin(window.LogStore);
})();