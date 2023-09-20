const mongoose = require('mongoose')
const cpu = require('./schema')



const dbURI = 'mongodb:/127.0.0.1:27017/intel'

const db = mongoose.connection

db.on('connected',()=>{  
console.log('connection established')
})

db.on('disconnected',()=>{  
console.log('disconnection')
})

db.on('error',(err)=>{
console.error(`connection error : ${err}`)
})

process.on('SIGINT',()=>{
db.close()
  .then(()=>{
    console.log('connection closed')
    process.exit(0)
  
  }).catch((err)=>{
     console.log('error while closing connection')
     process.exit(1)
    })
})

function insertOne(data){

console.log(data)
new cpu({data:data}).save()
  .then((err,c)=>{
    console.log(`new data`)
  }).catch(err=>{
    console.error(err)
    }) 
}

module.exports = {
connectMongodb : ()=> mongoose.connect(dbURI,{}),
close : ()=> mongoose.connection.close(),
insert: insertOne,
}
