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

// TODO: wait for initial state load

// refresh data every hour
// TODO: should refresh at the top of the hour
main(state)
setInterval(() => main(state), 1000 * 60 * 60)

const server = http.createServer((request, response) => {
  if (request.url !== '/data.json') {
    response.statusCode = 404
    response.end('Not found')
    return
  }

  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  // TODO: dynamically set cache time based on time until next refresh
  response.setHeader('Cache-Control', '3600')
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.end(JSON.stringify(state))
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
