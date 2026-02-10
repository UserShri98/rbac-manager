require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");

const app=express();
connectDB();

app.use(cors({
  origin: [
    "https://rbac-manager.vercel.app",
    "http://localhost:5173"
    
  ],
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth",require("./routes/auth.routes"));
app.use("/api/users",require("./routes/user.routes"));
app.use("/api/tasks",require("./routes/task.routes"));
app.use("/uploads",express.static("uploads"));




app.use(require("./middlewares/error.middleware"));

app.listen(process.env.PORT,()=>{
  console.log(`Server running on ${process.env.PORT}`);
});
