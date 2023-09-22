import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

class Car {
  async getCars() {
    try {
      const buffer = await fs.readFile("./fixtures/cars.json");
      const results = JSON.parse(buffer.toString());
      return [results, null];
    } catch (err) {
      return [null, err];
    }
  }
  static async getCars() {
    try {
      const buffer = await fs.readFile("./fixtures/cars.json");
      const results = JSON.parse(buffer.toString());
      return [results, null];
    } catch (err) {
      return [null, err];
    }
  }
  static async getCarById(id) {
    try {
      const [cars, error] = await this.getCars();
      const car = cars.filter((car) => car.id === id.toString());
      if (car.length === 0) {
        return [false, null];
      }
      return [car, null];
    } catch (err) {
      return [null, err];
    }
  }
  static async createCar(data) {
    try {
      const [cars, error] = await this.getCars();
      const newCar = { id: uuidv4(), ...data };
      cars.push(newCar);
      const newData = JSON.stringify(cars);
      await fs.writeFile("./fixtures/cars.json", newData);
      return [newCar, null];
    } catch (err) {
      return [null, err];
    }
  }
  static async updateCar(id, data) {
    try {
      const [cars, error] = await this.getCars();
      const index = cars.findIndex((el) => el.id === id);
      cars[index] = { ...cars[index], ...data };
      const newData = JSON.stringify(cars);
      await fs.writeFile("./fixtures/cars.json", newData);
      return [cars[index], null];
    } catch (err) {
      return [null, err];
    }
  }
  static async deleteCar(id) {
    try {
      const [cars, error] = await this.getCars();
      const carFilter = cars.filter((value) => value.id !== id);
      const newData = JSON.stringify(carFilter);
      await fs.writeFile("./fixtures/cars.json", newData);
      return [null, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default Car;
