// Get the packages we need
var express  = require('express');
var fs       = require('fs');
var http     = require('http');
var socketio = require('socket.io');
var watch    = require('watch');
var log      = require('bristol');

// grab command line args
var port = parseInt(process.argv[2]) || 1065;
var logDir = process.argv[3] || 'logs';

// initialize logging
log.addTarget('file', { file: logDir + '/browser.json' }).withFormatter('json');
//log.addTarget('console').withFormatter('human');
/*process.on('uncaughtException', function (err) {
	log.error('uncaught exception', {err: err});
});*/

// initialize the server
var app = express();
var server = http.Server(app);
var io = socketio(server);

app.use(express.static('public'));

var apiRouter = express.Router();
apiRouter.use(function(err, req, res, next) {
	res.status(400);
	res.json(err);
});

apiRouter.route('/logs')
	.get(function(req, res, next) {
		fs.readdir(logDir, function(err, files) {
			if(err) {
				log.warn('failed to list log files', {data: {logDir: logDir, err: err}});
				return next(err);
			}
			res.json(files);
		})
	});

apiRouter.route('/log')
	.get(function(req, res, next) {
		var ds = new Date().toISOString().replace('T', ' ');
		ds = ds.substr(0, ds.length - 5);
		res.json({
			f: '',
			d: [{"message":"No file selected!","date":ds,"severity":"info"}]
		});
	});

apiRouter.route('/log/:log_id')
	.get(function(req, res, next) {
		if(!req.params.log_id) {
			res.json({
				f: '',
				l: [ "No file selected!" ]
			});
		}
		else {
			fs.readFile(logDir + '/' + req.params.log_id, 'utf8', function(err, data) {
				if(err) {
					log.warn('client attempted to open invalid file', {data: {logDir: logDir, log_id: req.params.log_id, err: err}});
					return next(err);
				}
				var data = data.split('\n');
				var id = Math.max(0, data.length - 100);
				res.json({
					f: req.params.log_id,
					d: data.slice(id)
						.filter(function(line) {
							if(line) return true;
							return false;
						}).map(function(line) {
						return JSON.parse(line);
					}).reverse()
				});
			});
		}
	});

try {
	watch.createMonitor(logDir, function(monitor) {
		var fileListChanged = function(f, stat) {
			io.emit('filelist-changed', {file: f.substr(logDir.length)});
		}
		var fileChanged = function(f, stat) {
			io.emit('file-changed', {file: f.substr(logDir.length)});
		}
		monitor.on('created', fileListChanged);
		monitor.on('changed', fileChanged);
		monitor.on('removed', fileListChanged);
	});
}
catch(err) {
	log.error('problem with watch monitor', {data: {logDir: logDir, err: err}});
}

try {
	app.use('/api/v1', apiRouter);
	server.listen(port, function() {
		log.info('listening', {data: {port: port}});
	});
}
catch(err) {
	log.error('couldn\'t start server', {data: {err: err}});
}