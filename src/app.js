const port = process.env.PORT || 8081;

const http = require("http");
const url = require("url");

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });

    const { query } = url.parse(req.url, true);
    const { id } = query;
    const nextId = parseInt(id) + 1;

    console.info(nextId);

    const result = {
        nextId
    };

    res.write(JSON.stringify(result));
    res.end();
}).listen(port);

console.info(`Server is listening on port ${port}`);