const express=require('express')
const app=express()
require('dotenv').config()
require('./db/connection')
const port=process.env.PORT || 5000
app.listen( port, ()=>{
    console.log(`server started on port ${port}`)
})
