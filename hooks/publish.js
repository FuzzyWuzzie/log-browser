var fs = require('fs');

exports.hook = function(flow, done) {
	var dir = flow.project.project.app.output + '/web';
	var appname = flow.project.project.app.name;
	var min = flow.project.project.app.web.min;
	var filename = appname + (min ? '.min' : '') + '.js';
	var srcfilename = dir + '/' + filename;
	var dstfilename = 'public/' + filename;

	console.log('copying ' + filename + ' to public/...');
	fs.createReadStream(srcfilename).pipe(fs.createWriteStream(dstfilename));
	console.log('done!');

	done();
}