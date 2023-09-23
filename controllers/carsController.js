import Car from "../utils/cars.js";

const checkId = async (req, res, next, val) => {
  const car = await Car.getCarById(val);
  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `Car with id ${val} not found`,
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (req.body.id) {
    return res.status(400).json({
      status: "failed",
      message: "autogenerate id, no need to input one",
    });
  }
  if (!req.body.plate) {
    return res.status(400).json({
      status: "failed",
      message: "plate is required",
    });
  }
  next();
};

const getAllCars = async (req, res) => {
  const cars = await Car.getCars();
  return res
    .status(200)
    .json({ status: "success", requestTime: req.requestTime, data: cars });
};

const getCarById = async (req, res) => {
  const id = req.params.id;
  const car = await Car.getCarById(id);

  return res
    .status(200)
    .json({ status: "success", requestTime: req.requestTime, data: car });
};

const createCar = async (req, res) => {
  const data = req.body;
  const newCar = await Car.createCar(data);
  return res
    .status(201)
    .json({ status: "success", requestTime: req.requestTime, data: newCar });
};

const updateCar = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const newCar = await Car.updateCar(id, data);
  return res.status(201).json({
    status: "success",
    requestTime: req.requestTime,
    data: newCar,
  });
};

const deleteCar = async (req, res) => {
  const id = req.params.id;
  const success = await Car.deleteCar(id);
  return res.status(204).json({
    status: "success",
    requestTime: req.requestTime,
    message: `car with id ${id} successfully deleted`,
  });
};

export {
  checkId,
  checkBody,
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
