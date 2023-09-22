import express from "express";
import process from "process";
import Car from "./utils/cars.js";

const app = express();
const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";

const checkEmptyUrl = (req, res) => {
  res.status(404).json({ status: "failed", message: "page not found" });
};
const getRootUrl = (req, res) => {
  return res.status(200).json({
    message: "Ping successfully",
  });
};
const getAllCars = async (req, res) => {
  if (req.body.id) {
    return res.status(400).json({ status: "failed", message: "Bad request" });
  }
  const [cars, error] = await Car.getCars();
  if (error) {
    return res.status(404).json({ status: "failed", data: null });
  }
  return res.status(200).json({ status: "success", data: cars });
};
const getCar = async (req, res) => {
  if (req.body.id) {
    return res.status(400).json({ status: "failed", message: "Bad request" });
  }
  const id = req.params.id;
  const [car, error] = await Car.getCarById(id);
  if (!car) {
    return res
      .status(404)
      .json({ status: "failed", message: `Car with id ${id} not found` });
  }
  return res.status(200).json({ status: "success", data: car });
};
const createCar = async (req, res) => {
  if (req.body.id) {
    return res.status(400).json({ status: "failed", message: "Bad request" });
  }
  const data = req.body;
  const [newCar, error] = await Car.createCar(data);
  if (error) {
    console.info(error);
  }
  return res.status(201).json({ status: "success", data: newCar });
};
const updateCar = async (req, res) => {
  if (req.body.id) {
    res.status(400).json({ status: "failed", message: "Bad request" });
  }
  const id = req.params.id;
  const data = req.body;
  const [car, error] = await Car.getCarById(id);

  if (!car) {
    console.info(error);
    return res
      .status(404)
      .json({ status: "failed", message: `Car with id ${id} not found` });
  }
  const [newCar, errorUpdate] = await Car.updateCar(id, data);
  return res.status(201).json({
    status: "success",
    data: newCar,
  });
};
const deleteCar = async (req, res) => {
  const id = req.params.id;
  const [car, error] = await Car.getCarById(id);
  if (!car) {
    return res
      .status(404)
      .json({ status: "failed", message: `Car with id ${id} not found` });
  }
  const [success, errorDelete] = await Car.deleteCar(id);
  return res.status(204).json({ status: "success", message: success });
};

app.use(express.json());

app.get("/", getRootUrl);
app.get("/api/v1/cars", getAllCars);
app.get("/api/v1/cars/:id", getCar);
app.post("/api/v1/cars", createCar);
app.patch("/api/v1/cars/:id", updateCar);
app.delete("/api/v1/cars/:id", deleteCar);

app.use("/", checkEmptyUrl);

app.listen(PORT, hostname, () => {
  console.info(`Server listening at http://${hostname}:${PORT}`);
});
