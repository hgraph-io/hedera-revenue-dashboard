import http from 'node:http'
import main from './main.mjs'

const hostname = '0.0.0.0'
const port = 3001

let state = {
  hour: {},
  day: {},
  week: {},
  month: {},
  quarter: {},
  year: {},
  all: {},
  deposits: {},
  income: {},
}

// refresh data every 10 minutes
main(state)
setInterval(() => main(state), 10 * 60 * 1000)

const server = http.createServer((request, response) => {
  if (request.url !== '/data.json') {
    response.statusCode = 404
    response.end('Not found')
    return
  }

  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Cache-Control', '300')
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.end(JSON.stringify(state))
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
