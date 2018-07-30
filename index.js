//primary file

const http = require("http");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");
const fs = require("fs");

// import  {http} from 'http';
// import https from 'https';
// import  parse  from 'url';
// import  StringDecoder  from 'string_decoder';
// import  {httpPort}  from './config';
// import fs from 'fs'

const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

httpServer.listen(config.httpPort, () => {
  console.log("the server is listening", config.httpPort);
});
////
const httpServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem")
};

const httpsServer = https.createServer(httpServerOptions, (req, res) => {
  unifiedServer(req, res);
});

httpsServer.listen(config.httpsPort, () => {
  console.log("the server is listening", config.httpsPort);
});

/////////
const unifiedServer = (req, res) => {
  //get utl
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //get path

  //send response

  //get http method
  let queryStringObject = parsedUrl.query;

  const method = req.method.toLowerCase();
  const headers = req.headers;
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", data => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    //choose the hanlder

    let chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer
    };
    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      payload = typeof payload == "object" ? payload : {};

      let payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
      console.dir("response", statusCode, payloadString);
    });

    console.log(
      "request on math " + trimmedPath + "methode " + method + "quesry "
    );
    console.dir(queryStringObject);
    console.log("headers", headers);

    console.log("payload", buffer);
  });
};

//hanlders
const handlers = {};

handlers.ping = (data, callback) => {
  callback(200);
};

handlers.notFound = (data, callback) => {
  callback(404);
};


const router = {
  ping: handlers.ping
};
