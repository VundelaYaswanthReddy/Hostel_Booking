import express from "express"
const router = express.Router()
import { verifyAdmin,  verifyUser } from "../utils/verifyToken.js"
import {updateUser, deleteUser,getUser,getUsers} from "../controllers/user.js"

// router.get("/checkauthentication",verifyToken,(req, res,next) => {
//     res.send("hello user, you are logged in!!!")
// })

// router.get("/checkuser/:id",verifyUser,(req, res,next) => {
//     res.send("hello user, you are logged in and you can delete your account!!")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req, res,next) => {
//     res.send("hello admin, you are logged in and you can delete any account!!")
// })
//UPDATE
router.put("/:id",verifyUser,updateUser)
//DELETE
router.delete("/:id",verifyUser, deleteUser)
//GET
router.get("/:id",verifyUser, getUser)
//GET ALL
router.get("/",verifyAdmin, getUsers)

export default router