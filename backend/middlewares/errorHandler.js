export const errorHandler = (err, req, res, next) => {
  console.error("Error is : ", err.message);
  res.json({
    msg: err.message,
  });
};
