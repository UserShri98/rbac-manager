const router=require("express").Router();
const auth=require("../middlewares/auth.middleware");
const upload=require("../middlewares/upload.middleware");
const {getProfile,updateProfile}=require("../controllers/user.controller");

router.get("/me",auth,getProfile);

router.put("/me",
 auth,upload.single("profilePic"),updateProfile);

module.exports=router;
