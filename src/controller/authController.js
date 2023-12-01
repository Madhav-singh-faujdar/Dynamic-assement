const AUTH_MODEL = require('../model/auth')
const bcrypt = require('bcrypt')

exports.signUp = async(req,res,next)=>{
try {
    


const {firstName,
    email,
    password,
    role} = req.body


    // We can use the express validator also but cause of timee we direct validate😊



    if (!firstName) {
        throw new Error('Bad request || FirstName!')
    }

if (!(email && password)) {
    throw new Error('Bad request')

}

let isEmail =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

if (!isEmail.test(email)) {
    throw new Error('Please provide a valid email!')
}


const hashpassword = await bcrypt.hash(password,12)

let authData = await AUTH_MODEL.create({
    firstName,
email,
password:hashpassword,
role
})
if (!authData) {
    throw new Error("Something went wrong!")
}

res.status(201).json({
    error:false,
    mesaage:"user created successfully"
})



} catch (error) {
    next(error)
}
}



exports.login = async(req,res,next)=>{
try {
    
const {
    email,
    password
    } = req.body



if (!(email && password)) {
    throw new Error('Bad request')

}

let isEmail =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

if (!isEmail.test(email)) {
    throw new Error('Please provide a valid email!')
}

let authData = await AUTH_MODEL.findOne({email})
if (!authData) {
    throw new Error("Please signup first!")
}


const comparePassord = await  bcrypt.compare(password,authData.password)

if (!comparePassord) {
    throw new Error("email and password does not exits!")

}


res.status(200).json({
    error:false,
    mesaage:"user created successfully",
    data:authData
})



} catch (error) {
    next(error)
}
}