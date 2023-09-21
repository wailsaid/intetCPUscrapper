const mongoose = require('mongoose')

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




const schema = mongoose.Schema({
data : mongoose.Schema.Types.Mixed,
})

const cpu = mongoose.model('cpu',schema)


function insertOne(data){
//console.log(data)

  new cpu({data:data}).save()
    .then((c)=>{
      console.log(`new data entry : ${c}`)
    }).catch(err=>{
      console.error(err)
    }) 
}

function insertMany(d) {
 
  const cpuarr = d.map(c=>{return {data:c}})
  cpu.insertMany(cpuarr)
    .catch(err=>{
      console.error(err)
    }) 

}

function retrive({}) {
  return cpu.find({})
    .catch(err=>console.error(err))
}
module.exports = {
 
connectMongodb : ()=> mongoose.connect(dbURI,{}),
close : ()=> mongoose.connection.close(),
insert : insertOne,
insertAll : insertMany,
 
}
 
