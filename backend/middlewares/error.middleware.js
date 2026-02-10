module.exports=(err,req,res,next)=>{
  console.error(err);

  if(err.code===11000){
    return res.status(400).json({
        message:"Email or username already exists",
    });
  }

     res.status(err.statusCode || 500).json({
    message:err.message || "Server error",
  });
};
