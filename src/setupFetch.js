const fetch = require("node-fetch");
const { Headers } = jest.requireActual("node-fetch");
global.fetch = fetch;
global.Headers = Headers;
