import express from "express";
import process from "process";
import Car from "../utils/cars.js";

const app = express();
const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Ping successfully",
  });
});

app.get("/api/v1/cars", async (req, res) => {
  const carList = await Car.getCars();
  return res.status(200).json(carList);
});

app.get("/api/v1/cars/:id", async (req, res) => {
  const id = req.params.id;
  const carDetail = await Car.getCarById(id);

  if (!carDetail) {
    return res.status(404).json({ message: `Car with id ${id} not found` });
  }
  return res.status(200).json({ status: "success", data: carDetail });
});

app.post("/api/v1/cars", async (req, res) => {
  const data = req.body;
  if (data.id) {
    return res.status(400).json({ status: "failed", message: "Bad request" });
  }
  const carInput = await Car.createCar(data);
  return res.status(201).json({ status: "success", data: carInput });
});

app.patch("/api/v1/cars/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const carDetail = await Car.getCarById(id);
  if (req.body.id) {
    res.status(400).json({ status: "failed", message: "Bad request" });
  }
  if (!carDetail) {
    return res
      .status(404)
      .json({ status: "failed", message: `Car with id ${id} not found` });
  }
  const updateCar = await Car.updateCar(id, data);
  return res.status(201).json({
    status: "success",
    data: updateCar,
  });
});

app.delete("/api/v1/cars/:id", async (req, res) => {
  const id = req.params.id;
  const carDetail = await Car.getCarById(id);
  if (!carDetail) {
    return res
      .status(404)
      .json({ status: "failed", message: `Car with id ${id} not found` });
  }
  const deleteCar = await Car.deleteCar(id);
  return res.status(204).json({ status: "success", message: deleteCar });
});

app.use("/", (req, res) => {
  res.status(404).json({ status: "failed", message: "page not found" });
});

app.listen(PORT, hostname, () => {
  console.info(`Server listening at http://${hostname}:${PORT}`);
});
