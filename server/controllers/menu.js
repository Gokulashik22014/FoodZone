import Menu from "../models/menu.js"
export async function getMenu(req,res){
    const menu=await Menu.find().sort([["createdAt",-1]])
    res.json({success:true,menu})
}
export async function addMenu(req,res){
    try {
        const data=req.body
        data.price=Number(data.price)
        const newFood=await Menu.create(data)
        res.json({success:true,newFood})
    } catch (error) {
        res.json({success:false,error})
        
    }
}

export async function deleteMenu(req,res){
    try {
        const {id}=req.params
        const result=await Menu.findByIdAndDelete(id)
        res.json({success:true,deleted:result})
    } catch (error) {
        res.json({success:false,error})
    }
}
export async function getSingleItem(req,res){
    try {
        const {id}=req.params
        const result=await Menu.findById(id)
        res.json({success:true,item:result})
    } catch (error) {
        res.json({success:false,error})
    }
}
export async function updateMenu(req,res){
    console.log(req.params,req.body)
    try {
        const {id}=req.params
        const data=req.body
        const result=await Menu.findByIdAndUpdate(id,data)
        res.json({success:true,item:result})
    } catch (error) {
        res.json({success:false,error})
    }
}