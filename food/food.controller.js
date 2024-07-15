import express from "express";
import {
  addFoodItem,
  deleteFoodItem,
  editFoodItem,
  findFood,
  getFoodList,
  validateFoodItemData,
  validateMongoIdForFood,
} from "./food.service.js";

const router = express.Router();

// * add food item
router.post("/add", validateFoodItemData, addFoodItem);

// * get all food items
router.get("/list", getFoodList);

// * get food detail by id
router.get("/detail/:id", validateMongoIdForFood, findFood);

// * delete food item by id
router.delete("/delete/:id", validateMongoIdForFood, deleteFoodItem);

// * edit food item by id
router.put(
  "/edit/:id",
  validateMongoIdForFood,
  validateFoodItemData,
  editFoodItem
);

export default router;
