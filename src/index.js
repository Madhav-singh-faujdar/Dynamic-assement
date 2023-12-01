const app = require('./app')
require("dotenv").config()



const mongoose = require('mongoose')
dburl  = process.env.URL_MONGO
mongoose.connect(dburl)





app.listen(process.env.PORT,()=>{
    console.log('server is running on the port '+ process.env.PORT);
})