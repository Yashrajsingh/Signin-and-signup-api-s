import mongoose from "mongoose"

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

password:{
        type:String,
        required:true,
    },
avatar:{
        type:String,
        default:"https://lh3.googleusercontent.com/a/ACg8ocKtCjtDFqkgFsV_Ow4jXDblRC9cP0KgYomLpTvSYpKiTe38VVw=s96-c",
    },

}, {timestamps:true})

const User = mongoose.model("User",userschema)

export default User