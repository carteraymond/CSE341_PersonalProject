const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb
      .getDb()
      .db("Personal")
      .collection("Store")
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  };
  
  const getSingle = async (req, res, next) => {
    try {
      const storeId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db("Personal")
        .collection("Store")
        .find({ _id: storeId });
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

  module.exports = {
    getAll,
    getSingle
  };