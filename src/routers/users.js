import { Router } from "express";
import { userController } from "../controllers/users.js";
import { verifyAccesToken } from "../middleweres/verifyAccesToken.js";
export const router = Router()

router.get("/", userController.getAll)
router.get("/s", userController.getByApellido)
router.post("/", verifyAccesToken, userController.createOne)
router.patch("/:id", verifyAccesToken, userController.updateOne)
router.delete("/:id", verifyAccesToken, userController.deleteOne)