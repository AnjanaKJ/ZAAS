const mongoose=require("mongoose")
const validator=require("validator")
mongoose.set('strictQuery', false);
const myFun=async(pass)=>{
   // const pass="anjana@123"
    const hashpw=await bcrypt.hash(pass,8)
    console.log(hashpw)
}


const schema = new mongoose.Schema({ 
    cname:{
    type:String,
    required:true
}, 
    cat:{
        type:String,
        required:true,
        trim:true,
    },cadd:{
        type:String,
        required:true,
        trim:true
    },
    ccoin:{
        type:Number,
        default:0
    },
    cpassword:{
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
    }
});
const Company = mongoose.model('Company', schema);
module.exports=Company