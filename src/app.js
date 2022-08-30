const port = process.env.PORT || 8081;

const http = require("http");
const url = require("url");

const storage = new Map();
const secrets = new Map();

const server = http.createServer((req, res) => {
    let data = "";

    req.on("data", chunk => {
        data += chunk;
    });

    req.on("end", () => {
        const parsedUrl = url.parse(req.url, false);
        const urlChunks = parsedUrl.path.split("/").filter(item => item.length);
        const [team, ...tail] = urlChunks;
        const password = req.headers.authorization;

        if (tail.length) {
            res.writeHead(400);
            return;
        }

        switch (req.method) {
            case "GET": {
                if (storage.has(team) === false) {
                    res.writeHead(404);
                    break;
                }

                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(storage.get(team)));
                break;
            }
            case "POST": {
                if (password === undefined) {
                    res.writeHead(401);
                    break;
                }

                if (storage.has(team) === true) {
                    res.writeHead(409);
                    break;
                }

                secrets.set(team, password);
                storage.set(team, JSON.parse(data));
                res.writeHead(200);
                break;
            }
            case "PUT": {
                if (password === undefined || secrets.get(team) !== password) {
                    res.writeHead(401);
                    break;
                }

                if (storage.has(team) === false) {
                    res.writeHead(404);
                    break;
                }

                storage.set(team, JSON.parse(data));
                res.writeHead(200);
                break;
            }
            case "DELETE": {
                if (password === undefined || secrets.get(team) !== password) {
                    res.writeHead(401);
                    break;
                }

                if (storage.has(team) === false) {
                    res.writeHead(404);
                    break;
                }

                secrets.delete(team);
                storage.delete(team);
                res.writeHead(200);
                break;
            }
        }

        res.end();
    });
}).listen(port, () => {
    if (process.env.NODE_ENV !== "test") {
        console.info("Server is listening on port", port);
    }
});

module.exports = server;
