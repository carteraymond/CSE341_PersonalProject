const validator = require('../validation/');

const checkEmployee = (req, res, next) => {
  const validationRule = {
    FirstName: 'required|string',
    LastName: 'required|string',
    DoB: 'required|string',
    HireDate: 'required|string',
    Salary: 'required|int',
    Job: 'required|string',
    Notes: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  checkEmployee
};