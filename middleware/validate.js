const validator = require('../helpers/validate');

const saveEmployee = (req, res, next) => {
  const validationRule = {
    FirstName: 'required|string',
    LastName: 'required|string',
    DoB: 'required|date',
    HireDate: 'required|date',
    Salary: 'required|numeric',
    Job: 'required|string',
    Notes: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveEmployee
};