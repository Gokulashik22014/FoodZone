import jwt, { decode } from "jsonwebtoken"

export function verifyToken(req,res,next){
    const info=req.headers.authorization
    //console.log(req.headers.authorization)
    if(!info){
        res.json({success:true,message:"Unauthorized Access"})
        return
    }
    const token=info.split(" ")[1]
    jwt.verify(token,process.env.TOKEN,(err,decoded)=>{
        if(err){
            res.json({success:false,message:"Invalid Token"})
            return 
        }
        // console.log(decoded)
        req.decoded=decoded
        
        next()
    })
}