var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 8080;

var urlMap = [''];

app.get('/', function(req, res)
{	
	var fileName = path.join(__dirname, 'index.html');
	res.sendFile(fileName, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(err.status).end();
		}
		else
		{
			console.log('Sent');
		}
	});
});

app.get('/api/shorten/xxx/', function(req, res)
{
	console.log('/api/shorten/xxx');
});

app.get('/api/shorten/', function(req, res)
{
	console.log('/api/shorten/');
});

app.get('/api/shorten/:url', function(req, res)
{
	var str_url = req.params.url;
	var redirect = Math.floor(Math.random() * 100);
	while(urlMap[redirect] != undefined)
	{
		redirect = Math.floor(Math.random() * 100)
	}
	urlMap[redirect] = str_url;
	res.end("original url: "+urlMap[redirect] +", short url:" + redirect);
});

app.get('/:redirect', function(req, res)
{
	console.log(req.params.redirect);
	var int_redirect = parseInt(req.params.redirect);
	
	if(urlMap[int_redirect] == undefined)
	{
		res.end('Invalid Shortened URL' + req.params.redirect);
	}
	else
	{
		res.writeHead(301,
  		{
  			Location:  "http" + (req.socket.encrypted ? "s" : "") + "://" + urlMap[int_redirect]
  		});
		res.end();		
	}	
});



app.listen(port);