const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "ছবির সর্বোচ্চ size 2MB হতে পারবে।",
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

export default errorMiddleware;