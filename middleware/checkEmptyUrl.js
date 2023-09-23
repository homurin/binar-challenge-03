export default function checkEmptyUrl(req, res, next) {
  res.status(404).json({ status: "failed", message: "page not found" });
  next();
}
