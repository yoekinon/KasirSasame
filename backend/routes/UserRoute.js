import express from "express";
import {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/menus", getMenus);
router.get("/menus/:id", getMenuById);
router.post("/menus", createMenu);
router.patch("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);

export default router;
