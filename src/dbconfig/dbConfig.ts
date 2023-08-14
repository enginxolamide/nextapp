import mongoose from 'mongoose'

export async function connect() {
    try{
mongoose.connect(process.env.MONGO_URI!)
const connection = mongoose.connection

connection.on('connected',()=>{
    console.log('mongoDB connected successfully')
})
connection.on('error', (err)=>{
console.log('Mongo connection erroe, please makesure mongoDB is running' + err)
process.exit()
})
    }catch(err){
console.log("something went wrong!")
console.log(err)
    }
    
}