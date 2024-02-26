import express from "express"
import { additem, deleteItem, getCart, manipluateQuantity } from "../controllers/cart.js"
import { verifyToken } from "../middlewares/verifyToken.js"

const router=express.Router()
router.route("/additem").post(additem)
router.route("/getcart").get(verifyToken,getCart)
router.route("/deleteitem").post(deleteItem)
router.route("/quantity/:id").put(manipluateQuantity)

export default router