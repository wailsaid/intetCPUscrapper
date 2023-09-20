const mongoose = require('mongoose')
const cpu = require('./schema')



const dbURI = 'mongodb://127.0.0.1:27017/intel'

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
//console.log(data)
  new cpu({data:data}).save()
    .then((c)=>{
      console.log(`new data entry : ${c}`)
    }).catch(err=>{
      console.error(err)
    }) 
}

function insertMany(data) {
  const arr =  data.map((item) => {
    return{data:item}
  })
//  console.log(arr)
  
  cpu.insertMany()
    //.insertMany()
    .then((c)=>{
      console.log('db has ben filled')
    }).catch(err=>{
      console.error('error while save data :',err)
    }) 
}

module.exports = {
connectMongodb : ()=> mongoose.connect(dbURI,{}),
close : ()=> mongoose.connection.close(),
insert : insertOne,
insertAll : insertMany,
}
