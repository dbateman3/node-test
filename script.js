const http = require("http");

const hostName = "127.0.0.1";
const port = 3000;

const server = http.createServer((request, response) => {
	const { headers, method, url } = request;
	let body = [];
	request.on('error', (err) => {
		console.error(err);
	}).on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
		response.on('error', (err) => {
			console.error(err);
		});
		response.statusCode = 200;
		response.setHeader('Content-Type', 'application/json');
		const responseBody = { headers, method, url, body };
		response.write(JSON.stringify(responseBody));
		response.end();
	});
});

server.listen(port, hostName, () => {
	console.log(`Server started on port ${port}`);
});