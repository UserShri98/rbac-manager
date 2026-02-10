const router=require("express").Router();
const auth=require("../middlewares/auth.middleware");
const ctrl=require("../controllers/task.controller");

router.use(auth);
router.get("/",ctrl.getTasks);
router.post("/",ctrl.createTask);
router.put("/:id",ctrl.updateTask);
router.delete("/:id",ctrl.deleteTask);

module.exports=router;
