import http from 'node:http'
import main from './main.mjs'

const hostname = '127.0.0.1'
const port = 3000

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

const server = http.createServer((_, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  // TODO: dynamically set cache time based on time until next refresh
  res.setHeader('Cache-Control', '3600')
  res.end(JSON.stringify(state))
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// refresh data every hour
