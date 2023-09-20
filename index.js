
const app = require('express')()


const scraper = require('./src/scraper')
const cli = require('./src/cli')
const db = require('./src/db')

const PORT = process.env.port || 3000


app.get('/',(req,res)=>{
//  scraper.getDATA().then(data=>{
//    res.json(data)
//  }).catch(err=>console.error(err))
})

app.get('/:cpu',(req,res)=>{
  const cpuR = req.params.cpu
  console.log(cpuR)
  res.end(cpuR)
})



// Define a function to execute a command
function executeCommand(command) {
  switch (command) {
    case 'serve' :  
     var server = app.listen(PORT,()=>console.log('the web service is listing on port 3000'))
      break

    case 'stop':
      server.close(()=>console.log('the web service has stoped'))
      break

    case 'startdb':
      
      db.connectMongodb()
      break


    case 'initDB':
      db.connectMongodb()
      scraper.getDATA().then(data=>{
        db.insertAll(data)
      }).catch(err=>console.error('Error while getting data :',err))
      break


    default:
      console.log('Unknown command:', command);
  }
}


cli.on('line', (input) => {
  const command = input.trim();
  if (command === 'exit') {
    cli.close();
  } else {
    executeCommand(command);
    cli.prompt();
  }
})
  
