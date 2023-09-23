export default function getRequestTime(req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
}
