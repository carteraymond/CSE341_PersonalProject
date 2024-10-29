const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("Personal")
    .collection("Employees")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("Personal")
      .collection("Employees")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res
      .status(500)
      .json(error || "Some error occurred while attempting this request.");
    return;
  }
};

const createEmployee = async (req, res) => {
  try {
    const Employee = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      DoB: req.body.DoB,
      HireDate: req.body.HireDate,
      Salary: req.body.Salary,
      Job: req.body.Job,
      Notes: req.body.Notes,
    };
    const response = await mongodb
      .getDb()
      .db("Personal")
      .collection("Employees")
      .insertOne(Employee);
    if (response.acknowledged) {
      res.status(201).json(response)
      console.log(response);
    } else {
      res
        .status(500)
        .json(response.error || "Employee creation was unsuccessful");
    }
  } catch (err) {
    res
      .status(500)
      .json(error || "Some error occurred while attempting this request.");
    return;
  }
};

const updateEmployee = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const Employee = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      DoB: req.body.DoB,
      HireDate: req.body.HireDate,
      Salary: req.body.Salary,
      Job: req.body.Job,
      Notes: req.body.Notes,
    };
    const response = await mongodb
      .getDb()
      .db("Personal")
      .collection("Employees")
      .replaceOne({ _id: userId }, Employee);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Employee update unsuccessful");
    }
  } catch (error) {
    res
      .status(500)
      .json(error || "Some error occurred while attempting this request.");
    return;
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("Personal")
      .collection("Employees")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the Employee."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(error || "Some error occurred while deleting the Employee.");
    return;
  }
};

module.exports = {
  getAll,
  getSingle,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
