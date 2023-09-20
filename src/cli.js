const { model, Model, models } = require('mongoose')
const readline = require('readline')


const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

cli.setPrompt('>>')
cli.prompt()

cli.on('close', () => {
  console.log('CLI closed');
  process.exit(0);
})

module.exports = cli
