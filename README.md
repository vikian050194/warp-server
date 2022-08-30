# warp-server

[![MIT license][license-badge]][license-url]
[![Maintenance status][status-badge]][status-url]
[![Code coverage][coverage-badge]][coverage-url]

## About

**warp-server** is vanilla Node.js server for [warp] Google Chrome extension.

## Motivation

[warp] needs backend for at least one of its features. It's suitable time and place to gain a bit experience in vanilla Node. You can take a look at [list of questions and problems](./QA.md) that I faced during development.

## Requirements

Developed and tested on `Ubuntu 20.04.4 LTS`: `Node.js v12.22.12`.

## Usage

In fact this server could be used in any similar cases: push and pull JSON from remote server without authentication, data is not persisted if app failed.

Push data:

```
curl -X POST localhost:8081/somekey1 -i -H "Authorization: p@sw0rd" -d '{"number": 1234}'
```

Pull data:

```
curl -X GET localhost:8081/somekey1 -i
```

Update data:

```
curl -X PUT localhost:8081/somekey1 -i -H "Authorization: p@sw0rd" -d '{"number": 1234}'
```

Delete data:

```
curl -X DELETE localhost:8081/somekey1 -i -H "Authorization: p@sw0rd"
```

[status-url]: https://github.com/vikian050194/warp-server/pulse
[status-badge]: https://img.shields.io/github/last-commit/vikian050194/warp-server.svg

[license-url]: https://github.com/vikian050194/warp-server/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/vikian050194/warp-server.svg

[coverage-url]: https://codecov.io/gh/vikian050194/warp-server
[coverage-badge]: https://img.shields.io/codecov/c/github/vikian050194/warp-server

[warp]: https://github.com/vikian050194/warp
