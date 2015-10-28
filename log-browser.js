// Get the packages we need
var express  = require('express');
var fs       = require('fs');
var http     = require('http');
var socket   = require('socket.io');
var watch    = require('watch');
var log      = require('bristol');

// initialize logging
/*log.addTarget('file', { file: '~/logs/browser.log' })
   .withFormatter('json');*/
log.addTarget('console').withFormatter('console');

process.on('uncaughtException', function (err) {
	log.error('uncaught exception', {err: err});
});

// initialize the server
var app = express();
var server = http.Server(app);
var io = socket(server);
var port = process.argv[2] || 1065;
var logDir = process.argv[3] || 'logs/';

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
				log.warn('failed to list log files', {logDir: logDir, err: err});
				return next(err);
			}
			res.json(files);
		})
	});

apiRouter.route('/log')
	.get(function(req, res, next) {
		res.json({
			f: '',
			l: [
				{ l: 0, e: "No file selected!" }
			]
		});
	});

apiRouter.route('/log/:log_id')
	.get(function(req, res, next) {
		fs.readFile(logDir + req.params.log_id, 'utf8', function(err, data) {
			if(err) {
				log.warn('client attempted to open invalid file', {logDir: logDir, log_id: log_id, err: err});
				return next(err);
			}
			var lines = data.split('\n');
			var id = Math.max(0, lines.length - 100);
			res.json({
				f: req.params.log_id,
				l: lines.slice(id).map(function(line) {
					return {
						l: id++,
						e: line
					};
				})
			});
		});
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
	log.error('problem with watch monitor', {logDir: logDir, err: err});
}

app.use('/api/v1', apiRouter);
try {
	server.listen(port, function() {
		log.info('listening', {port: port});
	});
}
catch(err) {
	log.error('couldn\'t start server', {err: err});
}