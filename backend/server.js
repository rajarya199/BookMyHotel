const express=require('express')
const app=express()
require('dotenv').config()
require('./db/connection')
 const morgan=require('morgan') //to show which request is hit in console

const bodyParser=require('body-parser')

const userRoute=require('./routes/userRoute')

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())

const port=process.env.PORT || 5000
app.listen( port, ()=>{
    console.log(`server started on port ${port}`)
})

//routes
app.use('/api',userRoute)
