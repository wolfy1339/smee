#!/usr/bin/env node

const program = require('commander')

const Client = require('..')

program
  .usage('[options]')
  .option('-u, --url <url>', 'URL of the webhook proxy service. Default: https://smee.io/new')
  .option('-t, --target <target>', 'URL of the target service the events will forwarded to. Default: http://127.0.0.1:port/path')
  .option('-p, --port <n>', 'Local HTTP server port', process.env.PORT || 3000)
  .option('-P, --path <path>', 'URL path to post proxied requests to`', '/')
  .parse(process.argv)

let target
if (program.target) {
  target = program.target
} else {
  target = `http://127.0.0.1:${program.port}${program.path}`
}

async function setup () {
  let source = program.url

  if (!source) {
    source = await Client.createChannel()
  }

  const client = new Client({ source, target })
  client.start()
}

setup()
