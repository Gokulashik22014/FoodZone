import express from "express"
import { adduser,deleteUser,getAdmin,getAllUser, getSingleUser, makeAdmin, updateUser } from "../controllers/user.js"
import { verifyToken } from "../middlewares/verifyToken.js"
import { verifyAdmin } from "../middlewares/verifyAdmin.js"
const router=express.Router()
router.route("/adduser").post(adduser)
router.route("/getusers").get(verifyToken,verifyAdmin,getAllUser)
router.route("/deleteuser/:id").post(verifyToken,verifyAdmin,deleteUser)
router.route("/makeadmin/:id").patch(verifyToken,verifyAdmin,makeAdmin)
router.route("/admin/:email").get(getAdmin)
router.route("/getsingleuser/:email").get(verifyToken,getSingleUser)
router.route("/updateuser/:id").post(verifyToken,updateUser)
export default router