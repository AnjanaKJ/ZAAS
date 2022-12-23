const mongoose=require("mongoose")
const validator=require("validator")
require("dotenv").config()
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true})

const myFun=async(pass)=>{
   // const pass="anjana@123"                           //process.env.MONGO_URI
    const hashpw=await bcrypt.hash(pass,8)             //'mongodb://127.0.0.1:27017/ZAAS'
    console.log(hashpw)
}


const schema = new mongoose.Schema({ 
    name:{
    type:String,
    required:true
}, 
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email invalid")
            }
        }
    },address:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(validator.equals(value.toLowerCase(),"password")){
                throw new Error("Invalid password")
            }
            if(!validator.isStrongPassword(value)){
                throw new Error("Not Strong")
            }
        }
    },
    coins:{
        type:Number,
        default:0
    }

});
const User = mongoose.model('User', schema);
module.exports=User