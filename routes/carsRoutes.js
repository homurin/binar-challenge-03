import express from "express";
import * as carsController from "../controllers/carsController.js";

const router = express.Router();

router.param("id", carsController.checkId);

router
  .route("/")
  .get(carsController.getAllCars)
  .post(carsController.checkBody, carsController.createCar);

router
  .route("/:id")
  .get(carsController.getCarById)
  .patch(carsController.checkBody, carsController.updateCar)
  .delete(carsController.deleteCar);

export default router;
