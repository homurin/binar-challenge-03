import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

class Car {
  constructor(params) {
    this.id = uuidv4();
    this.plate = params.plate;
    this.manufacture = params.manufacture;
    this.model = params.model;
    this.image = params.image;
    this.rentPerDay = params.rentPerDay;
    this.capacity = params.capacity;
    this.description = params.description;
    this.availableAt = params.availableAt;
    this.transmission = params.transmission;
    this.available = params.available;
    this.type = params.type;
    this.year = params.year;
    this.options = params.options;
    this.specs = params.specs;
  }
  async readCar() {
    try {
      const buffer = await fs.readFile("./fixtures/cars.json");
      const results = JSON.parse(buffer.toString());
      return results;
    } catch (err) {
      throw new Error("Failed to get data");
    }
  }
  static async printCar() {
    try {
      const buffer = await fs.readFile("./fixtures/cars.json");
      const results = JSON.parse(buffer.toString());
      return results;
    } catch (err) {
      throw new Error("Failed to get data");
    }
  }
  static async carDetail(id) {
    try {
      const cars = await this.printCar();
      const detailCar = cars.filter((car) => {
        return car.id === id.toString();
      });
      return detailCar;
    } catch (err) {
      throw new Error("Failed to get cars detail");
    }
  }
  async carInput() {
    const data = {
      id: this.id,
      plate: this.plate,
      manufacture: this.manufacture,
      model: this.model,
      image: this.image,
      rentPerDay: this.rentPerDay,
      capacity: this.capacity,
      description: this.description,
      availableAt: this.availableAt,
      transmission: this.transmission,
      available: this.available,
      type: this.type,
      year: this.year,
      options: this.options,
      spces: this.specs,
    };
    try {
      const cars = await this.readCar();
      cars.push(data);
      await fs.writeFile("./fixtures/cars.json", JSON.stringify(cars));
      return data;
    } catch (err) {
      throw new Error("Failed to post data");
    }
  }
  static async carDelete(id) {
    try {
      const cars = await this.printCar();
      const carFilter = cars.filter((value) => value.id !== id);
      await fs.writeFile("./fixtures/cars.json", JSON.stringify(carFilter));
    } catch (err) {
      throw new Error("Failed to delete data");
    }
  }
}

export default Car;
