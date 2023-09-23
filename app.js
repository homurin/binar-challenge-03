import express from "express";
import morgan from "morgan";
import carsRouter from "./routes/carsRoutes.js";
import getRequestTime from "./middleware/getRequestTime.js";
import checkEmptyUrl from "./middleware/checkEmptyUrl.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(getRequestTime);
app.use("/api/v1/cars", carsRouter);
app.use(checkEmptyUrl);
export default app;
