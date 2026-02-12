const Task=require('../models/task.model')

exports.getTasks = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    // Base filter (Role based)
    const filter =
      req.user.role === "admin"
        ? {}
        : { createdBy: req.user.id };

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const tasks = await Task.find(filter)
      .populate("createdBy", "username");

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};


exports.createTask=async(req,res)=>{
    const task=await Task.create({...req.body,
           createdBy:req.user.id,
    });
    res.status(201).json(task);
};

exports.updateTask=async(req,res)=>{
    const task=await Task.findById(req.params.id);
      
         if (!task) return res.status(404).json({message:"Task not found"});

    if(req.user.role!=="admin" && task.createdBy.toString()!==req.user.id)
      return res.status(403).json({message:"Forbidden"});

    Object.assign(task,req.body);
    await task.save();
    res.json(task);
};

exports.deleteTask=async(req,res)=>{
    const task=await Task.findById(req.params.id);

      if (req.user.role!=="admin" && task.createdBy.toString()!==req.user.id)
      return res.status(403).json({message:"Forbidden"});

 await task.deleteOne();
    res.json({message:"Task deleted"});
};