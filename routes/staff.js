const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate')
const EmployeesController = require('../controllers/Employees');

router.get('/', EmployeesController.getAll);

router.get('/:id', EmployeesController.getSingle);

router.post('/', validation.saveEmployee, EmployeesController.createEmployee);

router.put('/:id', validation.saveEmployee, EmployeesController.updateEmployee);

router.delete('/:id', EmployeesController.deleteEmployee);

module.exports = router;