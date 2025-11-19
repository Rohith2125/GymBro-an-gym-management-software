const mongoose= require('mongoose')

const connectDB= ()=>{
    try{
    mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected successfully`)

    }catch(err){
    console.log(`error in db connection: ${err}`)
    }
}
module.exports = connectDB