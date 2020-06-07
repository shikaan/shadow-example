const http = require('http')

const config = {
  name: process.env.APP_NAME,
  payload: process.env.PAYLOAD,
  port: process.env.PORT
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(config.payload);
})

server.listen(config.port, () => {
  console.log(`Service ${config.name} listining on ${config.port}`)  
})