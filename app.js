import express from "express";
import process from "process";
import Car from "./cars.js";

const app = express();
const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Ping successfully",
  });
});

app.get("/cars", async (req, res) => {
  const carList = await Car.printCar();
  return res.status(200).json(carList);
});

app.get("/cars/:id", async (req, res) => {
  const id = req.params.id;
  const carDetail = await Car.carDetail(id);
  if (carDetail.length === 0) {
    return res.status(404).json({ message: "Car not found" });
  }
  return res.status(200).json(carDetail);
});

app.post("/cars", async (req, res) => {
  if (req.body.id) {
    return res
      .status(400)
      .json({ message: "Autogenerate id, no need to fill" });
  }
  const carInput = await new Car(req.body).carInput();
  return res.status(201).json(carInput);
});

app.delete("/cars/:id", async (req, res) => {
  const id = req.params.id;
  await Car.carDelete(id);
  return res.status(204);
});

app.listen(PORT, hostname, () => {
  console.info(`Server listening at http://${hostname}:${PORT}`);
});
