import User from "../models/user.js";

export async function adduser(req, res) {
  const { email, cart, admin, photoURL, address, name } = req.body;
  await User.create({ email, cart, admin, photoURL, address, name }).then(()=>{
    console.log("created successfully");
    res.json({ success: true });
  }).catch(error=>{
    res.json({success:false,message:error})
  })
  
}
export async function getSingleUser(req,res){
    try {
        const {email}=req.params
        const result=await User.findOne({email:email})
        res.json({success:true,user:result})
    } catch (error) {
        res.json({success:false,message:error})   
    }
}
export async function getAllUser(req,res){
    try {
        const users=await User.find()
        res.json({ success: true,users }) 
    } catch (error) {
        res.json({success:false})
    }
}

export async function deleteUser(req,res){
    const {id}=req.params
    try {
        const deleteUser=await User.findByIdAndDelete(id)
        res.json({ success: true,user:deleteUser });
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
}

export async function makeAdmin(req,res){
    const {id}=req.params
    try {
        const updateUser=await User.findByIdAndUpdate(id,{admin:true},{new:true,runValidators:true})
        res.json({ success: true,user:updateUser })
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
}

export async function getAdmin(req,res){
    const {email}=req.params
    try {
        const user=await User.findOne({email:email})
        let admin=false
        if(user){
            admin=user?.admin
        }
        res.json({success:true,message:"admin access granted",admin})
    } catch (error) {
        res.json({success:false})
    }
}
export async function updateUser(req,res){
    const {id}=req.params
    const {data}=req.body
    try {
        console.log(data)
        const user=await User.findByIdAndUpdate(id,{...data})
        res.json({ success: true })
    } catch (error) {
        res.json({success:false})
    }
}