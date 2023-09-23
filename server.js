import app from "./app.js";

const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";

app.listen(PORT, hostname, () => {
  console.info(`Server listening at http://${hostname}:${PORT}`);
});
