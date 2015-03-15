var express = require('express');
var app = express();
var crypto = require('crypto');
var defaultBytes = 32;
var maxBytes = 64;
var minBytes = 1;

app.get('/', function(req, res) {
	sendToken(defaultBytes, res);
});

app.get('/:bytes', function(req, res) {
	var bytes = parseInt(req.params.bytes);
	if (isNaN(bytes)) {
		bytes = defaultBytes;
	}
	if (bytes > maxBytes) {
		bytes = maxBytes;
	}
	if (bytes < minBytes) {
		bytes = minBytes;
	}
	sendToken(bytes, res);
});

function sendToken(size, res) {
	//credit: http://stackoverflow.com/a/8856177/533209
	crypto.randomBytes(size, function(ex, buf) {
		var token = buf.toString('hex');
		res.json({"token": token});
	});
}

app.get('*', function(req, res) {
	res.json({'error': 'Route not found'}, 404);
});

app.listen(80);
console.log("Running token generation server on port 80");
