const express=require('express')
const app=express()
require('dotenv').config()
require('./db/connection')
 const morgan=require('morgan') //to show which request is hit in console
    const cors=require('cors')
const bodyParser=require('body-parser')

const userRoute=require('./routes/userRoute')
const hotelRoute=require('./routes/hotelRoute')

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
const port=process.env.PORT || 5000
app.listen( port, ()=>{
    console.log(`server started on port ${port}`)
})

//routes
app.use('/api',userRoute)
app.use('/api',hotelRoute)
