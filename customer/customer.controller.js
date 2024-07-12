import express from "express";
import Customer from "./customer.model.js";
import mongoose from "mongoose";

const router = express.Router();

// ? add customer
router.post("/customer/add", async (req, res) => {
  //  extract new customer from req.body
  const newCustomer = req.body;

  //   insert customer
  await Customer.create(newCustomer);

  //   send res
  return res.status(201).send({ message: "Customer is added successfully." });
});

// ?get customer list
router.get("/customer/list", async (req, res) => {
  const customers = await Customer.find();

  return res.status(200).send({ message: "success", customerList: customers });
});

// ? get customer detail by id
router.get("/customer/detail/:id", async (req, res) => {
  // extract customer id from req.params
  const customerId = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(customerId);

  // if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find customer using customerId
  const customer = await Customer.findOne({ _id: customerId });

  // if not customer, throw error
  if (!customer) {
    return res.status(404).send({ message: "Customer does not exist." });
  }

  // send res
  return res.status(200).send({ message: "success", customerDetail: customer });
});

// ? delete a customer by id
router.delete("/customer/delete/:id", async (req, res) => {
  // extract customer id from req.params
  const customerId = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(customerId);

  // if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find customer using customer id
  // const customer = await Customer.findOne({ _id: customerId });
  const customer = await Customer.findById(customerId);

  // if not customer, throw error
  if (!customer) {
    return res.status(404).send({ message: "Customer does not exist." });
  }

  // delete customer
  // await Customer.deleteOne({ _id: customerId });
  await Customer.findByIdAndDelete(customerId);

  // send res

  return res.status(200).send({ message: "Customer is deleted successfully." });
});

// ? edit customer by id
router.put("/customer/edit/:id", async (req, res) => {
  // extract customer id from req.params
  const customerId = req.params.id;

  // check for mongo id validity

  const isValidId = mongoose.isValidObjectId(customerId);

  // if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find customer
  const customer = await Customer.find({ _id: customerId });
  // ? findOne => if no data, gives null
  // ? find => if no data, gives empty array []
  // if not customer, throw error
  if (!customer) {
    return res.status(404).send({ message: "Customer does not exist." });
  }

  // extract new values from req.body
  const newValues = req.body;

  // update customer
  // await Customer.updateOne(
  //   { _id: customerId },
  //   {
  //     $set: {
  //       ...newValues,
  //     },
  //   }
  // );

  await Customer.findByIdAndUpdate(customerId, { ...newValues });

  // send res
  return res.status(200).send({ message: "Customer is updated successfully." });
});
export default router;
