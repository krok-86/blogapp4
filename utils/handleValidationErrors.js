const { validationResult } = require("express-validator");
const CustomError = require("../errors");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array()[0].msg;
      throw new CustomError(errorMsg, 400)
      //return res.status(400).json(errors.array());
    }
    next()
}

module.exports = handleValidationErrors;