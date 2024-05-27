const express = require('express');
const router = express.Router();

const EmployeesController = require('../controllers/Employees');

router.get('/', EmployeesController.getAll);

router.get('/:id', EmployeesController.getSingle);

router.post('/', EmployeesController.createEmployee);

router.put('/:id', EmployeesController.updateEmployee);

router.delete('/:id', EmployeesController.deleteEmployee);

module.exports = router;