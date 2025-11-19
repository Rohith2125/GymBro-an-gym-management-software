const express= require('express')
const dotenv= require('dotenv') 
dotenv.config()
const cors= require('cors')
const app = express() 
const userRoutes= require('./Routes/userRoutes')
const authRoutes= require('./Routes/authRoutes')
const connectDB= require('./Config/db')
const cookieparser= require('cookie-parser')

connectDB()
const PORT= process.env.PORT|| 4000

app.use(cors({
   origin:'http://localhost:5173', 
   credentials: true,
   allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(cookieparser())

app.get('/',(req,res)=>{
    res.send('ROUTE IS TAPPED')
})

app.use('/api', userRoutes)
app.use('/api', authRoutes)


app.listen(PORT, ()=>{
    console.log(`app is running on http://localhost:${PORT}`)
})