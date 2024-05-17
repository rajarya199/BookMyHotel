const mongoose=require('mongoose')
const uuidv1=require('uuidv1') //
const crypto=require('crypto')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    role:{
        type:Number,
        default:0  
        // 0-user 1-admin
    },
    hashed_password:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required:true
      },
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required:'true'
      },
    salt:String,  //to store uuidv1 generated string
    isVerified:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

//virtual field
userSchema.virtual('password')
.set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.hashed_password=this.encryptPassFn(password)
})
.get(function(){
    return this._password
})
//defining methods
userSchema.methods={
    encryptPassFn:function(password){
        if(!password) return ''
        try{
            return crypto 
            .Hmac('sha1',this.salt) //algo to encrypt
            .update(password)
            .digest('hex') //in hex format 
        }
        catch(err){
            return err
        }
    }
}
module.exports=mongoose.model('User',userSchema)