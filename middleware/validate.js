const validator = require('../helpers/validate');

const checkEmployee = (req, res, next) => {
  const validationRule = {
    FirstName: 'required|string',
    LastName: 'required|string',
    DoB: 'string',
    HireDate: 'string',
    Salary: 'required|int',
    Job: 'required|string',
    Notes: 'string'
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