const User=require("../models/user.model");
const jwt=require("jsonwebtoken");
const ApiError=require("../utils/ApiError");

exports.register=async(req,res,next)=>{
    try{
    const user=await User.create(req.body);
    res.status(201).json({message:"Registration is successful"});
}catch(err){
      next(err);
  }
};

exports.login=async(req,res,next)=>{
  try{
    const {identifier,password}=req.body;

    const user=await User.findOne({
      $or:[{email:identifier},{username:identifier}],
    });

       if(!user || !(await user.comparePassword(password))){
     throw new ApiError(401, "Invalid credentials");
    }

    const token=jwt.sign(
      {id:user._id,role:user.role},
      process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRES }
    );

    res.json({
      token,user:{
    id:user._id,
        fullName:user.fullName,
        role:user.role,
      },
    });
  }catch (err) {
      next(err);
  }
};
