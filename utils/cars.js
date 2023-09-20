import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

class Car {
  async getCars() {
    try {
      const buffer = await fs.readFile("./fixtures/cars.json");
      const results = JSON.parse(buffer.toString());
      return results;
    } catch (err) {
      throw new Error("Failed to get data");
    }
  }
  static async getCars() {
    try {
      const buffer = await fs.readFile("./fixtures/cars.json");
      const results = JSON.parse(buffer.toString());
      return results;
    } catch (err) {
      throw new Error("Failed to get data");
    }
  }
  static async getCarById(id) {
    try {
      const cars = await this.getCars();
      const detailCar = cars.filter((car) => car.id === id.toString());
      if (detailCar.length === 0) {
        return false;
      }
      return detailCar;
    } catch (err) {
      throw new Error("Failed to get cars detail");
    }
  }
  static async createCar(data) {
    try {
      const cars = await this.getCars();
      const newCar = { id: uuidv4(), ...data };
      cars.push(newCar);
      const newData = JSON.stringify(cars);
      await fs.writeFile("./fixtures/cars.json", newData);
      return newCar;
    } catch (err) {
      throw new Error("Failed to post data");
    }
  }
  static async updateCar(id, data) {
    try {
      const cars = await this.getCars();
      const index = cars.findIndex((el) => el.id === id);
      cars[index] = { ...cars[index], ...data };
      const newData = JSON.stringify(cars);
      await fs.writeFile("./fixtures/cars.json", newData);
      return cars[index];
    } catch (err) {
      throw new Error("Failed to update data");
    }
  }
  static async deleteCar(id) {
    try {
      const cars = await this.getCars();
      const carFilter = cars.filter((value) => value.id !== id);
      const newData = JSON.stringify(carFilter);
      await fs.writeFile("./fixtures/cars.json", newData);
      return null;
    } catch (err) {
      throw new Error("Failed to delete data");
    }
  }
}

export default Car;
