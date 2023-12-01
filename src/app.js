const express = require('express')
const app = express()
const authRouter  = require('./routes/auth')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

app.use(express.json())
app.use(cookieParser())






app.use(express.urlencoded({ extended: false }))
const cors = require('cors')
app.use(cors())


app.get('/',(req,res)=>{
    res.status(200).json({data:"yes"})
})




app.use('/api/v1/auth',authRouter)




app.use((err, req, res, next) => {

    console.log(err);

    const status = err.statusCode || 500
    const message = err.message
    const data = err.data
    res.status(status).json({
        message,
        data
    })

})
module.exports = app