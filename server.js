var express = require('express'),
jsonBody = require("body/json"),
app = express();
app.use(express.static("public"));

app.get('/templatePageData',function (req, res) {
	var data = "{}";
	res.send(data);
});

app.listen(9432);
console.log('localhost:9432 running ...');
