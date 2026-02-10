const User=require("../models/user.model");

exports.getProfile=async(req,res)=>{
  const user=await User.findById(req.user.id).select("-password");
  res.json(user);
};

exports.updateProfile=async(req,res)=>{
  const updates={
    fullName:req.body.fullName,
    contactNumber:req.body.contactNumber,
  };

  if (req.file) {
    updates.profilePic=`/uploads/${req.file.filename}`;
  }

  const user=await User.findByIdAndUpdate(
    req.user.id,
    updates,
    {new:true}
  ).select("-password");

  res.json(user);
};
