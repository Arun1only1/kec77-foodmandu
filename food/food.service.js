import mongoose from "mongoose";
import Food from "./food.model.js";
import Yup from "yup";

// * get food list
export const getFoodList = async (req, res) => {
  const foodItems = await Food.find();

  return res.status(200).send({ message: "success", foodItems });
};

// * validate mongo id
export const validateMongoIdForFood = async (req, res, next) => {
  // extract id from params
  const id = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(id);

  // if not valid id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // call next function
  next();
};

// * find food and send food as res
export const findFood = async (req, res) => {
  // extract foodId from req.params
  const foodId = req.params.id;

  // find food using foodId
  const requiredFoodItem = await Food.findOne({ _id: foodId });

  // if not food, throw error
  if (!requiredFoodItem) {
    return res.status(404).send({ message: "Food item does not exist." });
  }

  return res
    .status(200)
    .send({ message: "success", foodItem: requiredFoodItem });
};

// * validate food item data
export const validateFoodItemData = async (req, res, next) => {
  const data = req.body;

  const addFoodSchema = Yup.object({
    name: Yup.string().required().trim().max(50),
    price: Yup.number().min(0).required(),
  });

  try {
    const validatedData = await addFoodSchema.validate(data);

    req.body = validatedData;
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  next();
};

// * add food item
export const addFoodItem = async (req, res) => {
  // extract new data from req.body
  const newFoodItem = req.body;

  // insert to db
  await Food.create(newFoodItem);

  // send res
  return res.status(201).send({ message: "Food item is added successfully." });
};

// * delete food item
export const deleteFoodItem = async (req, res) => {
  // extract food id from req.params
  const foodItemId = req.params.id;

  // find food item
  const foodItem = await Food.findOne({ _id: foodItemId });

  // if not food, throw error
  if (!foodItem) {
    return res.status(404).send({ message: "Food does not exist." });
  }

  // delete food
  await Food.deleteOne({ _id: foodItemId });

  // send res
  return res
    .status(200)
    .send({ message: "Food item is removed successfully." });
};

// * edit food item
export const editFoodItem = async (req, res) => {
  // extract food id from req.params
  const foodId = req.params.id;

  // find food item using food id
  const food = await Food.findOne({ _id: foodId });

  // if not food item, throw error
  if (!food) {
    return res.status(404).send({ message: "Food item does not exist." });
  }

  // extract new values from req.body
  const newValues = req.body;

  // edit food item
  await Food.updateOne(
    { _id: foodId },
    {
      $set: {
        ...newValues,
      },
    }
  );

  // send res
  return res
    .status(200)
    .send({ message: "Food item is updated successfully." });
};
