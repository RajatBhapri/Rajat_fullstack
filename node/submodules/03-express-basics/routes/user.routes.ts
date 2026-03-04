import Router from "express"

const router = Router()

router.use((req, _res, next) => {
  console.log("Router Middleware:", req.method, req.url);
  next();
});

router.get("/",(req,res)=>{
  res.json({msg:"all good"})
})

router.post("/",(req,res) => {
  res.status(201).json({ message: "User created" });
})

export default router;