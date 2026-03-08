export const verifyFarmer = (req, res, next) => {
  if (req.user.role !== "FARMER") {
    return res
      .status(403)
      .json({ message: "Only farmers can perform this action" });
  }

  next();
};
