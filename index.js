const app = require('express')()
const scraper = require('./src/scraper')


//const db = require('./db')

//db.connectMongodb()



var a = {
'name': 'i7'
}


app.get('/',(req,res)=>{

a['speed']= 12
 res.json(a)

})


app.get('/all',(req,res)=>{
 
  scraper.getDATA().then(data=>{
    res.json(data)
  }).catch(err=>console.error(err))

})

app.get('/:rank',(req,res)=>{
  const cpuR = req.params.rank
  console.log(cpuR)
  res.end()
})

app.listen(3000,()=>{
  console.log('listing on port 3000',{})
  console.log('>>')
})




const readline = require('readline')

// Create a readline interface for interactive commands
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define a function to execute a command
function executeCommand(command) {
  switch (command) {
    case '' : 
      console.log('')
    break
    case 'cleanDB':
      // Add your logic to clean the database
      console.log('Cleaning the database...');
      break;
    default:
      console.log('Unknown command:', command);
  }
}

// Start the interactive CLI
rl.setPrompt('\n>> ');
rl.prompt();

rl.on('line', (input) => {
  const command = input.trim();
  if (command === 'exit') {
    rl.close();
  } else {
    executeCommand(command);
    rl.prompt();
  }
});

rl.on('close', () => {
  console.log('CLI closed');
  process.exit(0);
});
