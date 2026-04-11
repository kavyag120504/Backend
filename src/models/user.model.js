import mongoose, {Schema} from "mongoose";
import jsonwebtoken from "jsonwebtoken"
import bycrypt from "bcrypt"

const userSchema= new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true

  },
   email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    
   },
   fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
   },
   avatar:{
    type:String, 
    required:true,
   },
   coverImage:{
    type:String,
   },
   watchHistory:[{
    type:Schema.Types.ObjectId,
    ref:"Video"
   }],
   password:{
    type:String,
    required:[true, "Password is required"],
    },
    refreshToken:{
        type:String,
    }
},
{    timestamps:true
}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }   
    const bcrypt= await import("bcrypt")
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.isPasswordCorrect= async function(password){
    const bcrypt= await import("bcrypt")
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateToken= function(){
   return jwt.sign(
        {_id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname},
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


    
const User=mongoose.model("User", userSchema)
export default User