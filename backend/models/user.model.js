const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema(
  {
    fullName:{type:String,required:true},
    email:{type: String, unique: true, required:true},
    contactNumber:{type: String, required:true},
    username:{type: String, unique: true, required:true},
    password:{type: String, required: true},
    role:{type: String, enum: ["admin", "user"], default:"user"},
    profilePic:{
  type:String,
  default: "",
},
  },
  {timestamps:true}
);

userSchema.pre("save",async function(){
  if (!this.isModified("password")) return;
  this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword=function(password){
  return bcrypt.compare(password, this.password);
};

module.exports=mongoose.model("User",userSchema);
