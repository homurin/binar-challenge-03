import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

class Car {
  static async getCars() {
    try {
      const buffer = await fs.readFile("./dev-data/cars.json");
      const results = JSON.parse(buffer.toString());
      return results;
    } catch (err) {
      return err;
    }
  }
  static async getCarById(id) {
    try {
      const cars = await this.getCars();
      const car = cars.filter((car) => car.id === id.toString());
      if (car.length === 0) {
        return false;
      }
      return car;
    } catch (err) {
      return err;
    }
  }
  static async createCar(data) {
    try {
      const cars = await this.getCars();
      const newCar = { id: uuidv4(), ...data };
      cars.push(newCar);
      const newData = JSON.stringify(cars);
      await fs.writeFile("./dev-data/cars.json", newData);
      return newCar;
    } catch (err) {
      return err;
    }
  }
  static async updateCar(id, data) {
    try {
      const cars = await this.getCars();
      const index = cars.findIndex((el) => el.id === id);
      cars[index] = { ...cars[index], ...data };
      const newData = JSON.stringify(cars);
      await fs.writeFile("./dev-data/cars.json", newData);
      return cars[index];
    } catch (err) {
      return err;
    }
  }
  static async deleteCar(id) {
    try {
      const cars = await this.getCars();
      const carFilter = cars.filter((value) => value.id !== id);
      const newData = JSON.stringify(carFilter);
      await fs.writeFile("./dev-data/cars.json", newData);
      return null;
    } catch (err) {
      return err;
    }
  }
}

export default Car;
