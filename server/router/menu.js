import express from "express"
import {addMenu, deleteMenu, getMenu, getSingleItem, updateMenu} from "../controllers/menu.js"
import { verifyAdmin } from "../middlewares/verifyAdmin.js"
import { verifyToken } from "../middlewares/verifyToken.js"

const router=express.Router()

router.route("/menu").get(getMenu)
router.route("/addmenu").post(verifyToken,verifyAdmin,addMenu)
router.route("/deletemenu/:id").post(verifyToken,verifyAdmin,deleteMenu)
router.route("/getitem/:id").get(getSingleItem)
router.route("/updatemenu/:id").patch(verifyToken,verifyAdmin,updateMenu)

export default router